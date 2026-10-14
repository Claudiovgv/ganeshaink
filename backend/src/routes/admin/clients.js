const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');

router.use(authenticate, requirePermission('manage_clients'));

router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    const appointments = await prisma.appointment.findMany({
      where: email ? { clientEmail: email } : {},
      include: { employee: { select: { id: true, name: true } }, service: true, partnership: { select: { id: true, name: true } } },
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
    const clients = Object.values(clientMap).map((c) => ({
      ...c,
      appointmentCount: c.appointments.length,
      lastPartnership: c.appointments.find((a) => a.partnership)?.partnership?.name ?? null,
    }));
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:email', async (req, res) => {
  try {
    const currentEmail = decodeURIComponent(req.params.email);
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const email = typeof req.body.email === 'string' ? req.body.email.trim() : '';
    const phone = typeof req.body.phone === 'string' ? req.body.phone.trim() : '';
    const nickname = req.body.nickname;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'name, email e phone são obrigatórios' });
    }

    const [aptCount, consultCount] = await Promise.all([
      prisma.appointment.count({ where: { clientEmail: currentEmail } }),
      prisma.consultationRequest.count({ where: { clientEmail: currentEmail } }),
    ]);
    if (aptCount === 0 && consultCount === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const emailChanged = email.toLowerCase() !== currentEmail.toLowerCase();
    if (emailChanged) {
      const [takenApts, takenConsults] = await Promise.all([
        prisma.appointment.count({ where: { clientEmail: email } }),
        prisma.consultationRequest.count({ where: { clientEmail: email } }),
      ]);
      if (takenApts || takenConsults) {
        return res.status(409).json({ error: 'Já existe um cliente com este email' });
      }
    }

    const nextNickname = nickname === undefined
      ? undefined
      : (typeof nickname === 'string' && nickname.trim() ? nickname.trim() : null);

    await prisma.$transaction(async (tx) => {
      await tx.appointment.updateMany({
        where: { clientEmail: currentEmail },
        data: { clientName: name, clientEmail: email, clientPhone: phone },
      });
      await tx.consultationRequest.updateMany({
        where: { clientEmail: currentEmail },
        data: { clientName: name, clientEmail: email, clientPhone: phone },
      });

      if (nextNickname === null) {
        await tx.clientNickname.deleteMany({ where: { email: { in: [currentEmail, email] } } });
      } else if (nextNickname) {
        await tx.clientNickname.deleteMany({ where: { email: currentEmail } });
        await tx.clientNickname.upsert({
          where: { email },
          update: { nickname: nextNickname },
          create: { email, nickname: nextNickname },
        });
      } else if (emailChanged) {
        const existing = await tx.clientNickname.findUnique({ where: { email: currentEmail } });
        if (existing) {
          await tx.clientNickname.delete({ where: { email: currentEmail } });
          await tx.clientNickname.upsert({
            where: { email },
            update: { nickname: existing.nickname },
            create: { email, nickname: existing.nickname },
          });
        }
      }
    });

    const savedNick = await prisma.clientNickname.findUnique({ where: { email } });
    res.json({
      name,
      email,
      phone,
      nickname: savedNick?.nickname ?? null,
    });
  } catch (err) {
    console.error(err);
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
