// Gestão de bloqueios (férias/indisponibilidade) de TODOS os funcionários.
// O funcionário bloqueia o seu próprio calendário em /v1/employee/time-blocks;
// esta rota permite a um admin/superadmin bloquear por qualquer funcionário,
// ou por todos de uma vez (ex.: loja fechada numa data específica).
const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');
const { computeDatetimes, findConflicts, createBlock } = require('../../lib/timeBlocks.service');

router.use(authenticate, requirePermission('manage_employees'));

async function resolveEmployeeIds(employeeId) {
  if (employeeId === 'all') {
    const employees = await prisma.employee.findMany({ where: { isActive: true }, select: { id: true } });
    return employees.map((e) => e.id);
  }
  const id = parseInt(employeeId);
  if (!id) throw new Error('employeeId inválido');
  return [id];
}

router.get('/', async (req, res) => {
  try {
    const { employeeId } = req.query;
    const where = { endDatetime: { gte: new Date() } };
    if (employeeId) where.employeeId = parseInt(employeeId);

    const blocks = await prisma.timeBlock.findMany({
      where,
      include: { employee: { select: { id: true, name: true } } },
      orderBy: { startDatetime: 'asc' },
    });
    res.json(blocks);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Devolve as marcações afetadas (por funcionário), sem criar nenhum bloqueio.
router.post('/preview', async (req, res) => {
  try {
    const { employeeId, type, startDate, startTime, endDate, endTime } = req.body;
    if (!employeeId || !type || !startDate || !endDate) {
      return res.status(400).json({ error: 'employeeId, type, startDate, endDate required' });
    }

    const { startDatetime, endDatetime } = computeDatetimes({ type, startDate, startTime, endDate, endTime });
    const employeeIds = await resolveEmployeeIds(employeeId);

    const conflicts = (
      await Promise.all(employeeIds.map((id) => findConflicts(id, startDatetime, endDatetime)))
    ).flat();

    res.json({ conflicts });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { employeeId, type, reason, startDate, startTime, endDate, endTime, cancelAppointmentIds } = req.body;
    if (!employeeId || !type || !startDate || !endDate) {
      return res.status(400).json({ error: 'employeeId, type, startDate, endDate required' });
    }

    const { startDatetime, endDatetime } = computeDatetimes({ type, startDate, startTime, endDate, endTime });
    const employeeIds = await resolveEmployeeIds(employeeId);

    const blocks = await Promise.all(
      employeeIds.map((id) =>
        createBlock({
          employeeId: id,
          type,
          reason,
          startDatetime,
          endDatetime,
          cancelAppointmentIds: cancelAppointmentIds || [],
        })
      )
    );

    res.status(201).json(blocks);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const block = await prisma.timeBlock.findUnique({ where: { id } });
    if (!block) return res.status(404).json({ error: 'Time block not found' });

    await prisma.timeBlock.delete({ where: { id } });
    res.json({ message: 'Time block deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
