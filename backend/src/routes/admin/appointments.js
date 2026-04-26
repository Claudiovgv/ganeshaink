const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requireAdmin } = require('../../middleware/auth');
const { lisboaTimeToUTC } = require('../../services/availability.service');
const { addMinutes } = require('date-fns');
const { v4: uuidv4 } = require('uuid');

router.use(authenticate, requireAdmin);

router.get('/', async (req, res) => {
  try {
    const { date, employeeId, status } = req.query;
    const where = {};
    if (date) {
      where.startDatetime = {
        gte: new Date(`${date}T00:00:00.000Z`),
        lt: new Date(`${date}T23:59:59.999Z`),
      };
    }
    if (employeeId) where.employeeId = parseInt(employeeId);
    if (status) where.status = status;

    const appointments = await prisma.appointment.findMany({
      where,
      include: { employee: { select: { id: true, name: true } }, service: true },
      orderBy: { startDatetime: 'asc' },
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { clientName, clientEmail, clientPhone, employeeId, serviceId, date, time, notes } = req.body;
    if (!clientName || !clientEmail || !clientPhone || !employeeId || !serviceId || !date || !time) {
      return res.status(400).json({ error: 'All fields required' });
    }
    const service = await prisma.service.findUnique({ where: { id: parseInt(serviceId) } });
    if (!service) return res.status(404).json({ error: 'Service not found' });

    const startDatetime = lisboaTimeToUTC(date, time);
    const endDatetime = addMinutes(startDatetime, service.durationMin);

    const appointment = await prisma.appointment.create({
      data: {
        clientName, clientEmail, clientPhone,
        employeeId: parseInt(employeeId),
        serviceId: parseInt(serviceId),
        startDatetime, endDatetime,
        status: 'confirmed',
        notes: notes || null,
        cancelToken: uuidv4(),
      },
      include: { employee: { select: { id: true, name: true } }, service: true },
    });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status, notes, date, time } = req.body;

    const existing = await prisma.appointment.findUnique({ where: { id }, include: { service: true } });
    if (!existing) return res.status(404).json({ error: 'Appointment not found' });

    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (date && time) {
      updateData.startDatetime = lisboaTimeToUTC(date, time);
      updateData.endDatetime = addMinutes(updateData.startDatetime, existing.service.durationMin);
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: updateData,
      include: { employee: { select: { id: true, name: true } }, service: true },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

