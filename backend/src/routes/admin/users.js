const router = require('express').Router();
const prisma = require('../../config/database');
const bcrypt = require('bcryptjs');
const { authenticate, requireSuperadmin } = require('../../middleware/auth');
const { logEvent } = require('../../lib/logger');

router.use(authenticate, requireSuperadmin);

router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, twoFactorEnabled: true, createdAt: true, employee: { select: { id: true, isActive: true } } },
      orderBy: { createdAt: 'asc' },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, password, role = 'admin' } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email, password required' });
    if (!['superadmin', 'admin', 'employee'].includes(role)) return res.status(400).json({ error: 'Papel inválido' });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Esse utilizador já existe' });

    const user = await prisma.user.create({
      data: { name, email, password: await bcrypt.hash(password, 10), role },
      select: { id: true, name: true, email: true, role: true, twoFactorEnabled: true, createdAt: true },
    });

    logEvent('info', 'users', `Utilizador criado: ${email} (${role})`, { userId: req.user.id, ip: req.ip });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, role } = req.body;

    if (id === req.user.id && role && role !== req.user.role) {
      return res.status(400).json({ error: 'Não podes alterar o teu próprio papel' });
    }
    if (role && !['superadmin', 'admin', 'employee'].includes(role)) {
      return res.status(400).json({ error: 'Papel inválido' });
    }

    const data = {};
    if (name !== undefined) data.name = name;
    if (role !== undefined) data.role = role;

    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, role: true, twoFactorEnabled: true, createdAt: true },
    });

    logEvent('info', 'users', `Utilizador atualizado: ${user.email}`, { userId: req.user.id, ip: req.ip });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (id === req.user.id) {
      return res.status(400).json({ error: 'Não podes apagar a tua própria conta' });
    }

    const user = await prisma.user.findUnique({ where: { id }, include: { employee: true } });
    if (!user) return res.status(404).json({ error: 'Utilizador não encontrado' });

    if (user.employee) {
      const appointmentCount = await prisma.appointment.count({ where: { employeeId: user.employee.id } });
      if (appointmentCount > 0) {
        return res.status(409).json({
          error: `Esta conta tem ${appointmentCount} marcação(ões) associada(s) e não pode ser apagada. Desative o funcionário em vez disso.`,
        });
      }
      await prisma.$transaction([
        prisma.employeeService.deleteMany({ where: { employeeId: user.employee.id } }),
        prisma.workSchedule.deleteMany({ where: { employeeId: user.employee.id } }),
        prisma.timeBlock.deleteMany({ where: { employeeId: user.employee.id } }),
        prisma.consultationRequest.updateMany({ where: { employeeId: user.employee.id }, data: { employeeId: null } }),
        prisma.employee.delete({ where: { id: user.employee.id } }),
        prisma.user.delete({ where: { id } }),
      ]);
    } else {
      await prisma.user.delete({ where: { id } });
    }

    logEvent('info', 'users', `Utilizador apagado: ${user.email}`, { userId: req.user.id, ip: req.ip });
    res.json({ message: 'Utilizador apagado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
