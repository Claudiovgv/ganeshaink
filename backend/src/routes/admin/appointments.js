const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');
const { lisboaTimeToUTC } = require('../../services/availability.service');
const { addMinutes, addDays, format } = require('date-fns');
const { v4: uuidv4 } = require('uuid');
const { notifyAppointmentCreated, notifyAppointmentStatusChanged, APPOINTMENT_INCLUDE } = require('../../lib/notifications');
const { resolveBookingPartnership } = require('../../lib/partnerships');

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
      include: APPOINTMENT_INCLUDE,
      orderBy: { startDatetime: 'asc' },
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/export', async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        employee: { select: { name: true } },
        service: { select: { name: true } },
      },
      orderBy: { startDatetime: 'asc' },
    });
    res.json({
      exportedAt: new Date().toISOString(),
      count: appointments.length,
      appointments: appointments.map((a) => ({
        clientName: a.clientName,
        clientEmail: a.clientEmail,
        clientPhone: a.clientPhone,
        employeeName: a.employee.name,
        serviceName: a.service.name,
        startDatetime: a.startDatetime,
        endDatetime: a.endDatetime,
        status: a.status,
        price: a.price,
        notes: a.notes,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/import', async (req, res) => {
  try {
    const rows = Array.isArray(req.body) ? req.body : req.body.appointments;
    if (!Array.isArray(rows)) {
      return res.status(400).json({ error: 'Envia um JSON com { appointments: [...] }' });
    }

    const [employees, services] = await Promise.all([
      prisma.employee.findMany({ select: { id: true, name: true } }),
      prisma.service.findMany({ select: { id: true, name: true, durationMin: true } }),
    ]);
    const empByName = new Map(employees.map((e) => [e.name.trim().toLowerCase(), e]));
    const svcByName = new Map(services.map((s) => [s.name.trim().toLowerCase(), s]));

    let created = 0;
    let skipped = 0;
    const errors = [];

    for (const row of rows) {
      const emp = empByName.get(String(row.employeeName || '').trim().toLowerCase());
      const svc = svcByName.get(String(row.serviceName || '').trim().toLowerCase());
      if (!emp) {
        errors.push(`Funcionário não encontrado: ${row.employeeName || '(vazio)'} (${row.clientName || 'sem nome'})`);
        continue;
      }
      if (!svc) {
        errors.push(`Serviço não encontrado: ${row.serviceName || '(vazio)'} (${row.clientName || 'sem nome'})`);
        continue;
      }
      const start = new Date(row.startDatetime);
      if (Number.isNaN(start.getTime())) {
        errors.push(`Data inválida para ${row.clientName || 'sem nome'}`);
        continue;
      }
      const end = row.endDatetime ? new Date(row.endDatetime) : addMinutes(start, svc.durationMin);

      const dup = await prisma.appointment.findFirst({
        where: { employeeId: emp.id, startDatetime: start, status: { not: 'cancelled' } },
      });
      if (dup) {
        skipped += 1;
        continue;
      }

      await prisma.appointment.create({
        data: {
          clientName: row.clientName || 'Sem nome',
          clientEmail: row.clientEmail || `sem-contacto+${uuidv4().slice(0, 8)}@ganeshaink.pt`,
          clientPhone: row.clientPhone || 'Sem contacto',
          employeeId: emp.id,
          serviceId: svc.id,
          startDatetime: start,
          endDatetime: end,
          status: ['pending', 'confirmed', 'cancelled', 'completed'].includes(row.status) ? row.status : 'confirmed',
          price: row.price === undefined || row.price === '' ? null : row.price,
          notes: row.notes || null,
          cancelToken: uuidv4(),
        },
      });
      created += 1;
    }

    res.json({ created, skipped, errors, total: rows.length });
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
    const { clientName, clientEmail, clientPhone, employeeId, serviceId, date, time, notes, force, price, partnershipId, extraFieldValue } = req.body;
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

    let partner;
    try {
      partner = await resolveBookingPartnership({
        partnershipId,
        extraFieldValue,
        servicePrice: service.price,
        explicitPrice: price,
      });
    } catch (err) {
      if (err.status) return res.status(err.status).json({ error: err.message });
      throw err;
    }

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
        price: partner.price !== undefined ? partner.price : null,
        partnershipId: partner.partnershipId,
        extraFieldValue: partner.extraFieldValue,
        cancelToken: uuidv4(),
      },
      include: APPOINTMENT_INCLUDE,
    });
    notifyAppointmentCreated(appointment);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status, notes, date, time, clientName, clientEmail, clientPhone, force, price, partnershipId, extraFieldValue } = req.body;

    const existing = await prisma.appointment.findUnique({ where: { id }, include: { service: true } });
    if (!existing) return res.status(404).json({ error: 'Appointment not found' });

    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (clientName) updateData.clientName = clientName;
    if (clientEmail) updateData.clientEmail = clientEmail;
    if (clientPhone) updateData.clientPhone = clientPhone;
    // price: string vazia ou null limpa o valor específico (volta a usar o preço do serviço).
    if (price !== undefined) updateData.price = price === '' || price === null ? null : price;
    if (partnershipId !== undefined || extraFieldValue !== undefined) {
      try {
        const partner = await resolveBookingPartnership({
          partnershipId: partnershipId === undefined ? existing.partnershipId : partnershipId,
          extraFieldValue: extraFieldValue === undefined ? existing.extraFieldValue : extraFieldValue,
          servicePrice: existing.service.price,
          explicitPrice: price,
        });
        updateData.partnershipId = partner.partnershipId;
        updateData.extraFieldValue = partner.extraFieldValue;
        const partnershipChanged = (partner.partnershipId || null) !== (existing.partnershipId || null);
        if (partnershipChanged) updateData.price = partner.price;
      } catch (err) {
        if (err.status) return res.status(err.status).json({ error: err.message });
        throw err;
      }
    }
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
      include: APPOINTMENT_INCLUDE,
    });

    if (status && status !== existing.status) {
      notifyAppointmentStatusChanged(updated, existing.status);
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await prisma.appointment.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Appointment not found' });

    // Uma consulta agendada pode apontar para esta marcação — desliga-a antes
    // de apagar para não violar a foreign key.
    await prisma.$transaction([
      prisma.consultationRequest.updateMany({ where: { scheduledAppointmentId: id }, data: { scheduledAppointmentId: null } }),
      prisma.appointment.delete({ where: { id } }),
    ]);

    res.json({ message: 'Marcação apagada' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

