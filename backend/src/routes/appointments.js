const router = require('express').Router();
const prisma = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const { lisboaTimeToUTC } = require('../services/availability.service');
const { publicLimiter } = require('../middleware/rateLimit');
const { addMinutes } = require('date-fns');
const { notifyAppointmentCreated, notifyAppointmentStatusChanged, APPOINTMENT_INCLUDE } = require('../lib/notifications');

const EMAIL_OPTIONAL_ROOTS = new Set(['barbershop', 'nails']);

function placeholderEmail() {
  return `sem-contacto+${uuidv4().slice(0, 8)}@ganeshaink.pt`;
}

router.post('/', publicLimiter, async (req, res) => {
  try {
    const { clientName, clientEmail, clientPhone, employeeId, serviceId, date, time, notes } = req.body;

    if (!clientName || !clientPhone || !employeeId || !serviceId || !date || !time) {
      return res.status(400).json({
        error: 'Required fields: clientName, clientPhone, employeeId, serviceId, date, time',
      });
    }

    const service = await prisma.service.findUnique({
      where: { id: parseInt(serviceId) },
      include: { category: { include: { parent: true } } },
    });
    if (!service) return res.status(404).json({ error: 'Service not found' });

    const rootSlug = service.category.parent?.slug || service.category.slug;
    const email = typeof clientEmail === 'string' ? clientEmail.trim() : '';
    if (!email && !EMAIL_OPTIONAL_ROOTS.has(rootSlug)) {
      return res.status(400).json({ error: 'Required fields: clientEmail' });
    }

    const employee = await prisma.employee.findUnique({ where: { id: parseInt(employeeId) } });
    if (!employee || !employee.isActive) return res.status(404).json({ error: 'Employee not found' });

    const startDatetime = lisboaTimeToUTC(date, time);
    const endDatetime = addMinutes(startDatetime, service.durationMin);

    // Check for conflicts
    const conflict = await prisma.appointment.findFirst({
      where: {
        employeeId: parseInt(employeeId),
        status: { not: 'cancelled' },
        startDatetime: { lt: endDatetime },
        endDatetime: { gt: startDatetime },
      },
    });

    if (conflict) {
      return res.status(409).json({ error: 'Time slot is no longer available' });
    }

    const appointment = await prisma.appointment.create({
      data: {
        clientName,
        clientEmail: email || placeholderEmail(),
        clientPhone,
        employeeId: parseInt(employeeId),
        serviceId: parseInt(serviceId),
        startDatetime,
        endDatetime,
        status: 'pending',
        notes: notes || null,
        cancelToken: uuidv4(),
      },
      include: APPOINTMENT_INCLUDE,
    });

    notifyAppointmentCreated(appointment);

    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        employee: { select: { id: true, name: true } },
        service: true,
      },
    });

    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

    // Never expose cancelToken in GET
    const { cancelToken, ...safe } = appointment;
    res.json(safe);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { cancelToken } = req.body;

    const appointment = await prisma.appointment.findUnique({ where: { id } });
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    if (appointment.cancelToken !== cancelToken) {
      return res.status(403).json({ error: 'Invalid cancel token' });
    }
    if (appointment.status === 'cancelled') {
      return res.status(400).json({ error: 'Appointment is already cancelled' });
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: { status: 'cancelled' },
      include: APPOINTMENT_INCLUDE,
    });

    notifyAppointmentStatusChanged(updated, appointment.status);

    const { cancelToken: _, ...safe } = updated;
    res.json(safe);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
