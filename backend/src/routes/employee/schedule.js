const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requireEmployee } = require('../../middleware/auth');

router.use(authenticate, requireEmployee);

async function getEmployee(userId) {
  return prisma.employee.findUnique({ where: { userId } });
}

router.get('/', async (req, res) => {
  try {
    const emp = await getEmployee(req.user.id);
    if (!emp) return res.status(404).json({ error: 'Employee profile not found' });

    const schedules = await prisma.workSchedule.findMany({ where: { employeeId: emp.id, isActive: true }, orderBy: { dayOfWeek: 'asc' } });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/', async (req, res) => {
  try {
    const emp = await getEmployee(req.user.id);
    if (!emp) return res.status(404).json({ error: 'Employee profile not found' });

    const { schedules } = req.body;
    if (!Array.isArray(schedules)) return res.status(400).json({ error: 'schedules must be an array' });

    await prisma.workSchedule.updateMany({ where: { employeeId: emp.id }, data: { isActive: false } });

    if (schedules.length > 0) {
      await prisma.workSchedule.createMany({
        data: schedules.map(s => ({ employeeId: emp.id, dayOfWeek: s.dayOfWeek, startTime: s.startTime, endTime: s.endTime, isActive: true })),
      });
    }

    const newSchedules = await prisma.workSchedule.findMany({ where: { employeeId: emp.id, isActive: true }, orderBy: { dayOfWeek: 'asc' } });
    res.json(newSchedules);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
