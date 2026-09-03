const router = require('express').Router();
const prisma = require('../../config/database');
const bcrypt = require('bcryptjs');
const { authenticate, requirePermission } = require('../../middleware/auth');
const { logEvent } = require('../../lib/logger');
const { isDeliverableEmail } = require('../../lib/notifications');

router.use(authenticate, requirePermission('manage_employees'));

const EMPLOYEE_INCLUDE = {
  user: { select: { id: true, email: true, role: true, notificationEmail: true } },
  services: { orderBy: { sortOrder: 'asc' }, include: { service: { include: { category: { include: { parent: true } } } } } },
  workSchedules: { where: { isActive: true } },
};

router.use(authenticate, requirePermission('manage_employees'));

router.get('/', async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      include: EMPLOYEE_INCLUDE,
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ordem em que os artistas aparecem em /artistas no site.
router.put('/reorder', async (req, res) => {
  try {
    const { employeeIds } = req.body;
    if (!Array.isArray(employeeIds)) return res.status(400).json({ error: 'employeeIds must be an array' });

    await prisma.$transaction(
      employeeIds.map((id, index) =>
        prisma.employee.update({ where: { id: parseInt(id) }, data: { sortOrder: index } })
      )
    );

    const employees = await prisma.employee.findMany({ orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, password, bio, role = 'employee', serviceIds, notificationEmail } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email, password required' });

    const mailbox = notificationEmail == null ? '' : String(notificationEmail).trim();
    if (mailbox && !isDeliverableEmail(mailbox)) {
      return res.status(400).json({ error: 'Email de notificação inválido' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Email already in use' });

    const user = await prisma.user.create({
      data: {
        name, email, password: await bcrypt.hash(password, 10), role,
        notificationEmail: mailbox || null,
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

    const employee = await prisma.employee.findUnique({
      where: { id: user.employee.id },
      include: EMPLOYEE_INCLUDE,
    });
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, bio, isActive, serviceIds, materialCost, studioPercent, notificationEmail } = req.body;

    const existing = await prisma.employee.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Funcionário não encontrado' });

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (isActive !== undefined) updateData.isActive = isActive;
    // Vazio/null limpa o valor (volta a "por configurar").
    if (materialCost !== undefined) updateData.materialCost = materialCost === '' || materialCost === null ? null : materialCost;
    if (studioPercent !== undefined) updateData.studioPercent = studioPercent === '' || studioPercent === null ? null : studioPercent;

    await prisma.employee.update({ where: { id }, data: updateData });

    if (notificationEmail !== undefined) {
      const mailbox = notificationEmail == null ? '' : String(notificationEmail).trim();
      if (mailbox && !isDeliverableEmail(mailbox)) {
        return res.status(400).json({ error: 'Email de notificação inválido' });
      }
      await prisma.user.update({
        where: { id: existing.userId },
        data: { notificationEmail: mailbox || null },
      });
    }

    if (serviceIds !== undefined) {
      await prisma.employeeService.deleteMany({ where: { employeeId: id } });
      if (serviceIds.length > 0) {
        await prisma.employeeService.createMany({
          data: serviceIds.map(sid => ({ employeeId: id, serviceId: parseInt(sid) })),
          skipDuplicates: true,
        });
      }
    }

    const employee = await prisma.employee.findUnique({ where: { id }, include: EMPLOYEE_INCLUDE });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ordem em que os serviços de UM funcionário aparecem na página dele —
// o superadmin/admin pode ajustar por ele (ex.: se ele próprio não souber fazê-lo).
router.put('/:id/services/reorder', async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id);
    const { serviceIds } = req.body;
    if (!Array.isArray(serviceIds)) return res.status(400).json({ error: 'serviceIds must be an array' });

    const owned = await prisma.employeeService.findMany({ where: { employeeId }, select: { serviceId: true } });
    const ownedIds = new Set(owned.map(o => o.serviceId));
    const invalid = serviceIds.map(Number).filter(id => !ownedIds.has(id));
    if (invalid.length > 0) {
      return res.status(400).json({ error: `Serviços não atribuídos a este funcionário: ${invalid.join(', ')}` });
    }

    await prisma.$transaction(
      serviceIds.map((serviceId, index) =>
        prisma.employeeService.update({
          where: { employeeId_serviceId: { employeeId, serviceId: parseInt(serviceId) } },
          data: { sortOrder: index },
        })
      )
    );

    const services = await prisma.employeeService.findMany({
      where: { employeeId },
      orderBy: { sortOrder: 'asc' },
      include: { service: { include: { category: { include: { parent: true } } } } },
    });
    res.json(services.map(es => ({ ...es.service, sortOrder: es.sortOrder })));
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const employee = await prisma.employee.findUnique({ where: { id } });
    if (!employee) return res.status(404).json({ error: 'Funcionário não encontrado' });

    const appointmentCount = await prisma.appointment.count({ where: { employeeId: id } });
    if (appointmentCount > 0) {
      return res.status(409).json({
        error: `Este funcionário tem ${appointmentCount} marcação(ões) associada(s) e não pode ser apagado. Desative-o em vez disso.`,
      });
    }

    await prisma.$transaction([
      prisma.employeeService.deleteMany({ where: { employeeId: id } }),
      prisma.workSchedule.deleteMany({ where: { employeeId: id } }),
      prisma.timeBlock.deleteMany({ where: { employeeId: id } }),
      prisma.consultationRequest.updateMany({ where: { employeeId: id }, data: { employeeId: null } }),
      prisma.employee.delete({ where: { id } }),
      prisma.user.delete({ where: { id: employee.userId } }),
    ]);

    logEvent('info', 'employees', `Funcionário apagado: ${employee.name}`, { userId: req.user.id, ip: req.ip });
    res.json({ message: 'Funcionário apagado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
