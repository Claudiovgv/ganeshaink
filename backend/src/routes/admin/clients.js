const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requireAdmin } = require('../../middleware/auth');

router.use(authenticate, requireAdmin);

router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    const appointments = await prisma.appointment.findMany({
      where: email ? { clientEmail: email } : {},
      include: { employee: { select: { id: true, name: true } }, service: true },
      orderBy: { createdAt: 'desc' },
    });

    const clientMap = {};
    appointments.forEach(apt => {
      if (!clientMap[apt.clientEmail]) {
        clientMap[apt.clientEmail] = { email: apt.clientEmail, name: apt.clientName, phone: apt.clientPhone, appointments: [] };
      }
      clientMap[apt.clientEmail].appointments.push(apt);
    });
    res.json(Object.values(clientMap));
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
