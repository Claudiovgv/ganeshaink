const router = require('express').Router();
const prisma = require('../../config/database');
const bcrypt = require('bcryptjs');
const { authenticate, requirePermission } = require('../../middleware/auth');
const { photoUploadMiddleware, saveEmployeePhoto } = require('../../lib/employeePhotos');

router.use(authenticate, requirePermission('edit_profile'));

router.get('/', async (req, res) => {
  try {
    const emp = await prisma.employee.findUnique({
      where: { userId: req.user.id },
      include: { user: { select: { id: true, name: true, email: true, role: true } }, services: { include: { service: true } } },
    });
    if (!emp) return res.status(404).json({ error: 'Employee profile not found' });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/photo', photoUploadMiddleware, async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'É obrigatório enviar uma foto' });
    const emp = await prisma.employee.findUnique({ where: { userId: req.user.id } });
    if (!emp) return res.status(404).json({ error: 'Employee profile not found' });

    const photoUrl = saveEmployeePhoto(emp.id, req.file.buffer, req.file.mimetype);
    await prisma.employee.update({ where: { id: emp.id }, data: { photoUrl } });

    const updated = await prisma.employee.findUnique({
      where: { id: emp.id },
      include: { user: { select: { id: true, name: true, email: true, role: true } } },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/', async (req, res) => {
  try {
    const { name, bio, photoUrl, currentPassword, newPassword } = req.body;
    const emp = await prisma.employee.findUnique({ where: { userId: req.user.id } });
    if (!emp) return res.status(404).json({ error: 'Employee profile not found' });

    const empUpdate = {};
    if (name !== undefined) empUpdate.name = name;
    if (bio !== undefined) empUpdate.bio = bio;
    if (photoUrl !== undefined) empUpdate.photoUrl = photoUrl;
    if (Object.keys(empUpdate).length > 0) await prisma.employee.update({ where: { id: emp.id }, data: empUpdate });

    if (newPassword) {
      if (!currentPassword) return res.status(400).json({ error: 'currentPassword required' });
      const user = await prisma.user.findUnique({ where: { id: req.user.id } });
      const valid = await bcrypt.compare(currentPassword, user.password);
      if (!valid) return res.status(401).json({ error: 'Current password is incorrect' });
      await prisma.user.update({ where: { id: req.user.id }, data: { password: await bcrypt.hash(newPassword, 10) } });
    }

    const updated = await prisma.employee.findUnique({
      where: { id: emp.id },
      include: { user: { select: { id: true, name: true, email: true, role: true } } },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
