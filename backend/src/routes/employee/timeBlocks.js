const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');
const { fromZonedTime } = require('date-fns-tz');

router.use(authenticate, requirePermission('manage_blocks'));
const TIMEZONE = 'Europe/Lisbon';

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

router.post('/', async (req, res) => {
  try {
    const emp = await getEmployee(req.user.id);
    if (!emp) return res.status(404).json({ error: 'Employee profile not found' });

    const { type, reason, startDate, startTime, endDate, endTime } = req.body;
    if (!type || !startDate || !endDate) return res.status(400).json({ error: 'type, startDate, endDate required' });

    let startDatetime, endDatetime;
    if (type === 'vacation') {
      startDatetime = fromZonedTime(new Date(`${startDate}T00:00:00`), TIMEZONE);
      endDatetime = fromZonedTime(new Date(`${endDate}T23:59:59`), TIMEZONE);
    } else {
      if (!startTime || !endTime) return res.status(400).json({ error: 'startTime and endTime required for break/custom blocks' });
      startDatetime = fromZonedTime(new Date(`${startDate}T${startTime}:00`), TIMEZONE);
      endDatetime = fromZonedTime(new Date(`${endDate}T${endTime}:00`), TIMEZONE);
    }

    const block = await prisma.timeBlock.create({ data: { employeeId: emp.id, startDatetime, endDatetime, type, reason: reason || null } });
    res.status(201).json(block);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
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
