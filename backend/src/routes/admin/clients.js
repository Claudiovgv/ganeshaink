const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');

router.use(authenticate, requirePermission('manage_clients'));

router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    const appointments = await prisma.appointment.findMany({
      where: email ? { clientEmail: email } : {},
      include: { employee: { select: { id: true, name: true } }, service: true },
      orderBy: { createdAt: 'desc' },
    });

    const nicknames = await prisma.clientNickname.findMany();
    const nicknameByEmail = Object.fromEntries(nicknames.map((n) => [n.email, n.nickname]));

    const clientMap = {};
    appointments.forEach(apt => {
      if (!clientMap[apt.clientEmail]) {
        clientMap[apt.clientEmail] = {
          email: apt.clientEmail,
          name: apt.clientName,
          phone: apt.clientPhone,
          nickname: nicknameByEmail[apt.clientEmail] ?? null,
          appointments: [],
        };
      }
      clientMap[apt.clientEmail].appointments.push(apt);
    });
    const clients = Object.values(clientMap).map((c) => ({ ...c, appointmentCount: c.appointments.length }));
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:email/nickname', async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    const { nickname } = req.body;

    if (!nickname || !nickname.trim()) {
      await prisma.clientNickname.deleteMany({ where: { email } });
      return res.json({ email, nickname: null });
    }

    await prisma.clientNickname.upsert({
      where: { email },
      update: { nickname: nickname.trim() },
      create: { email, nickname: nickname.trim() },
    });
    res.json({ email, nickname: nickname.trim() });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
