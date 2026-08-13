const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');
const { computeDatetimes, findConflicts, createBlock } = require('../../lib/timeBlocks.service');

router.use(authenticate, requirePermission('manage_blocks'));

async function getEmployee(userId) {
  return prisma.employee.findUnique({ where: { userId } });
}

router.get('/', async (req, res) => {
  try {
    const emp = await getEmployee(req.user.id);
    if (!emp) return res.status(404).json({ error: 'Employee profile not found' });

    const blocks = await prisma.timeBlock.findMany({ where: { employeeId: emp.id, endDatetime: { gte: new Date() } }, orderBy: { startDatetime: 'asc' } });
    res.json(blocks);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Devolve as marcações que ficariam afetadas, sem criar o bloqueio.
router.post('/preview', async (req, res) => {
  try {
    const emp = await getEmployee(req.user.id);
    if (!emp) return res.status(404).json({ error: 'Employee profile not found' });

    const { type, startDate, startTime, endDate, endTime } = req.body;
    if (!type || !startDate || !endDate) return res.status(400).json({ error: 'type, startDate, endDate required' });

    const { startDatetime, endDatetime } = computeDatetimes({ type, startDate, startTime, endDate, endTime });
    const conflicts = await findConflicts(emp.id, startDatetime, endDatetime);
    res.json({ conflicts });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const emp = await getEmployee(req.user.id);
    if (!emp) return res.status(404).json({ error: 'Employee profile not found' });

    const { type, reason, startDate, startTime, endDate, endTime, cancelAppointmentIds } = req.body;
    if (!type || !startDate || !endDate) return res.status(400).json({ error: 'type, startDate, endDate required' });

    const { startDatetime, endDatetime } = computeDatetimes({ type, startDate, startTime, endDate, endTime });
    const block = await createBlock({
      employeeId: emp.id,
      type,
      reason,
      startDatetime,
      endDatetime,
      cancelAppointmentIds: cancelAppointmentIds || [],
    });
    res.status(201).json(block);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const emp = await getEmployee(req.user.id);
    if (!emp) return res.status(404).json({ error: 'Employee profile not found' });

    const id = parseInt(req.params.id);
    const block = await prisma.timeBlock.findUnique({ where: { id } });
    if (!block) return res.status(404).json({ error: 'Time block not found' });
    if (block.employeeId !== emp.id) return res.status(403).json({ error: 'Forbidden' });

    await prisma.timeBlock.delete({ where: { id } });
    res.json({ message: 'Time block deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
