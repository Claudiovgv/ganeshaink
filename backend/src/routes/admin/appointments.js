const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');
const { lisboaTimeToUTC } = require('../../services/availability.service');
const { addMinutes, addDays, format } = require('date-fns');
const { v4: uuidv4 } = require('uuid');
const { sendMail } = require('../../lib/mailer');
const { appointmentStatusChangedEmail } = require('../../lib/emailTemplates');

router.use(authenticate, requirePermission('manage_appointments'));

const TIMEZONE = 'Europe/Lisbon';

// Impede duas marcações do mesmo artista em horários que se sobrepõem.
async function hasConflict(employeeId, startDatetime, endDatetime, excludeId) {
  const conflict = await prisma.appointment.findFirst({
    where: {
      employeeId,
      status: { not: 'cancelled' },
      ...(excludeId ? { id: { not: excludeId } } : {}),
      startDatetime: { lt: endDatetime },
      endDatetime: { gt: startDatetime },
    },
  });
  return Boolean(conflict);
}

router.get('/', async (req, res) => {
  try {
    const { date, employeeId, status } = req.query;
    const where = {};
    if (date) {
      // O dia é sempre o dia em Lisboa, independentemente do fuso do servidor.
      const nextDate = format(addDays(new Date(`${date}T12:00:00`), 1), 'yyyy-MM-dd');
      where.startDatetime = {
        gte: lisboaTimeToUTC(date, '00:00'),
        lt: lisboaTimeToUTC(nextDate, '00:00'),
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

    if (await hasConflict(parseInt(employeeId), startDatetime, endDatetime)) {
      return res.status(409).json({ error: 'Este artista já tem uma marcação nesse horário' });
    }

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

      if (await hasConflict(existing.employeeId, updateData.startDatetime, updateData.endDatetime, id)) {
        return res.status(409).json({ error: 'Este artista já tem uma marcação nesse horário' });
      }
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: updateData,
      include: { employee: { select: { id: true, name: true } }, service: true },
    });

    if (status && status !== existing.status) {
      const { subject, html } = appointmentStatusChangedEmail(updated);
      sendMail({ to: updated.clientEmail, subject, html });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

