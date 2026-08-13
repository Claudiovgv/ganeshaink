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

// Avisa de duas marcações do mesmo artista em horários que se sobrepõem —
// não bloqueia: quem gere marcações por dentro (admin/artista) pode saber
// que vai mais rápido nesse serviço, ou juntar clientes de propósito.
async function findConflict(employeeId, startDatetime, endDatetime, excludeId) {
  return prisma.appointment.findFirst({
    where: {
      employeeId,
      status: { not: 'cancelled' },
      ...(excludeId ? { id: { not: excludeId } } : {}),
      startDatetime: { lt: endDatetime },
      endDatetime: { gt: startDatetime },
    },
    include: { service: true },
  });
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

// Marcações inseridas internamente (ex.: recuperadas de fora do site) podem
// ainda não ter o contacto do cliente confirmado — fica um placeholder único
// (para não fundir clientes diferentes na página de Clientes) e o artista
// substitui pelo contacto real assim que o souber, via PUT /:id.
function placeholderContact() {
  const token = uuidv4().slice(0, 8);
  return { email: `sem-contacto+${token}@ganeshaink.pt`, phone: 'Sem contacto' };
}

router.post('/', async (req, res) => {
  try {
    const { clientName, clientEmail, clientPhone, employeeId, serviceId, date, time, notes, force } = req.body;
    if (!clientName || !employeeId || !serviceId || !date || !time) {
      return res.status(400).json({ error: 'clientName, employeeId, serviceId, date e time são obrigatórios' });
    }
    const service = await prisma.service.findUnique({ where: { id: parseInt(serviceId) } });
    if (!service) return res.status(404).json({ error: 'Service not found' });

    const startDatetime = lisboaTimeToUTC(date, time);
    const endDatetime = addMinutes(startDatetime, service.durationMin);

    if (!force) {
      const conflict = await findConflict(parseInt(employeeId), startDatetime, endDatetime);
      if (conflict) {
        return res.status(409).json({
          error: 'Este artista já tem uma marcação nesse horário',
          conflict: {
            clientName: conflict.clientName,
            startDatetime: conflict.startDatetime,
            endDatetime: conflict.endDatetime,
            service: conflict.service.name,
          },
        });
      }
    }

    const placeholder = (!clientEmail || !clientPhone) ? placeholderContact() : null;

    const appointment = await prisma.appointment.create({
      data: {
        clientName,
        clientEmail: clientEmail || placeholder.email,
        clientPhone: clientPhone || placeholder.phone,
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
    const { status, notes, date, time, clientName, clientEmail, clientPhone, force } = req.body;

    const existing = await prisma.appointment.findUnique({ where: { id }, include: { service: true } });
    if (!existing) return res.status(404).json({ error: 'Appointment not found' });

    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (clientName) updateData.clientName = clientName;
    if (clientEmail) updateData.clientEmail = clientEmail;
    if (clientPhone) updateData.clientPhone = clientPhone;
    if (date && time) {
      updateData.startDatetime = lisboaTimeToUTC(date, time);
      updateData.endDatetime = addMinutes(updateData.startDatetime, existing.service.durationMin);

      if (!force) {
        const conflict = await findConflict(existing.employeeId, updateData.startDatetime, updateData.endDatetime, id);
        if (conflict) {
          return res.status(409).json({
            error: 'Este artista já tem uma marcação nesse horário',
            conflict: {
              clientName: conflict.clientName,
              startDatetime: conflict.startDatetime,
              endDatetime: conflict.endDatetime,
              service: conflict.service.name,
            },
          });
        }
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

