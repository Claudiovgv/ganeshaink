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

    const { date, status } = req.query;
    const where = { employeeId: emp.id };
    if (date) {
      where.startDatetime = { gte: new Date(`${date}T00:00:00.000Z`), lt: new Date(`${date}T23:59:59.999Z`) };
    }
    if (status) where.status = status;

    const appointments = await prisma.appointment.findMany({ where, include: { service: true }, orderBy: { startDatetime: 'asc' } });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const emp = await getEmployee(req.user.id);
    if (!emp) return res.status(404).json({ error: 'Employee profile not found' });

    const id = parseInt(req.params.id);
    const apt = await prisma.appointment.findUnique({ where: { id } });
    if (!apt) return res.status(404).json({ error: 'Appointment not found' });
    if (apt.employeeId !== emp.id) return res.status(403).json({ error: 'Forbidden' });

    const { status } = req.body;
    if (!['confirmed', 'cancelled', 'completed'].includes(status))
      return res.status(400).json({ error: 'Invalid status' });

    const updated = await prisma.appointment.update({ where: { id }, data: { status } });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
