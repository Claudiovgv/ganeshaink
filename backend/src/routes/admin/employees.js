const router = require('express').Router();
const prisma = require('../../config/database');
const bcrypt = require('bcryptjs');
const { authenticate, requireAdmin } = require('../../middleware/auth');

router.use(authenticate, requireAdmin);

router.get('/', async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        user: { select: { id: true, email: true, role: true } },
        services: { include: { service: true } },
        workSchedules: { where: { isActive: true } },
      },
    });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, password, bio, role = 'employee', serviceIds } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email, password required' });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Email already in use' });

    const user = await prisma.user.create({
      data: {
        name, email, password: await bcrypt.hash(password, 10), role,
        employee: { create: { name, bio: bio || null, isActive: true } },
      },
      include: { employee: true },
    });

    if (serviceIds && serviceIds.length > 0) {
      await prisma.employeeService.createMany({
        data: serviceIds.map(sid => ({ employeeId: user.employee.id, serviceId: parseInt(sid) })),
        skipDuplicates: true,
      });
    }

    const { password: _, ...safeUser } = user;
    res.status(201).json(safeUser);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, bio, isActive, serviceIds } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (isActive !== undefined) updateData.isActive = isActive;

    const employee = await prisma.employee.update({ where: { id }, data: updateData });

    if (serviceIds !== undefined) {
      await prisma.employeeService.deleteMany({ where: { employeeId: id } });
      if (serviceIds.length > 0) {
        await prisma.employeeService.createMany({
          data: serviceIds.map(sid => ({ employeeId: id, serviceId: parseInt(sid) })),
          skipDuplicates: true,
        });
      }
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
