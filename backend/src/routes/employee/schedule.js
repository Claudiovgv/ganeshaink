const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');
const { parseSchedulePrefs, selectPrefs, normalizeTime } = require('../../lib/schedulePrefs');

router.use(authenticate, requirePermission('manage_schedule'));

async function getEmployee(userId) {
  return prisma.employee.findUnique({ where: { userId } });
}

router.get('/', async (req, res) => {
  try {
    const emp = await getEmployee(req.user.id);
    if (!emp) return res.status(404).json({ error: 'Employee profile not found' });

    const schedules = await prisma.workSchedule.findMany({ where: { employeeId: emp.id, isActive: true }, orderBy: { dayOfWeek: 'asc' } });
    res.json({ schedules, ...selectPrefs(emp) });
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

    const parsed = parseSchedulePrefs(req.body);
    if (parsed.error) return res.status(400).json({ error: parsed.error });

    await prisma.workSchedule.updateMany({ where: { employeeId: emp.id }, data: { isActive: false } });

    if (schedules.length > 0) {
      await prisma.workSchedule.createMany({
        data: schedules.map(s => ({
          employeeId: emp.id,
          dayOfWeek: s.dayOfWeek,
          startTime: normalizeTime(s.startTime),
          endTime: normalizeTime(s.endTime),
          isActive: true,
        })),
      });
    }

    if (Object.keys(parsed.prefs).length > 0) {
      await prisma.employee.update({ where: { id: emp.id }, data: parsed.prefs });
    }

    const updated = await prisma.employee.findUnique({ where: { id: emp.id } });
    const newSchedules = await prisma.workSchedule.findMany({ where: { employeeId: emp.id, isActive: true }, orderBy: { dayOfWeek: 'asc' } });
    res.json({ schedules: newSchedules, ...selectPrefs(updated) });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
