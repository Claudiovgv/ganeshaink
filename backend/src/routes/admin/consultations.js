const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');
const { lisboaTimeToUTC } = require('../../services/availability.service');
const { addMinutes } = require('date-fns');
const { v4: uuidv4 } = require('uuid');

router.use(authenticate, requirePermission('manage_appointments'));

const CONSULTATION_INCLUDE = {
  service: { include: { category: { include: { parent: true } } } },
  employee: { select: { id: true, name: true } },
};

function serviceCategoryWhere(slug) {
  return {
    OR: [
      { category: { slug } },
      { category: { parent: { slug } } },
    ],
  };
}

router.get('/', async (req, res) => {
  try {
    const { status, category, excludeCategory } = req.query;
    const where = {};
    if (status) where.status = status;
    if (category) where.service = serviceCategoryWhere(category);
    if (excludeCategory) where.NOT = { service: serviceCategoryWhere(excludeCategory) };

    const consultations = await prisma.consultationRequest.findMany({
      where,
      include: CONSULTATION_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
    res.json(consultations);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function applyConsultationUpdate(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { status, employeeId, date, time } = req.body;
    const consultation = await prisma.consultationRequest.findUnique({ where: { id }, include: { service: true } });
    if (!consultation) return res.status(404).json({ error: 'Consultation not found' });

    const updateData = {};
    if (status) updateData.status = status;
    if (employeeId) updateData.employeeId = parseInt(employeeId);

    if (status === 'scheduled' && date && time) {
      const startDatetime = lisboaTimeToUTC(date, time);
      const endDatetime = addMinutes(startDatetime, consultation.service.durationMin);
      const appointment = await prisma.appointment.create({
        data: {
          clientName: consultation.clientName, clientEmail: consultation.clientEmail,
          clientPhone: consultation.clientPhone,
          employeeId: employeeId ? parseInt(employeeId) : consultation.employeeId,
          serviceId: consultation.serviceId, startDatetime, endDatetime,
          status: 'confirmed', cancelToken: uuidv4(),
        },
      });
      updateData.scheduledAppointmentId = appointment.id;
    }

    const updated = await prisma.consultationRequest.update({
      where: { id }, data: updateData,
      include: { ...CONSULTATION_INCLUDE, scheduledAppointment: true, employee: true },
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

router.post('/:id/schedule', (req, res) => {
  req.body.status = 'scheduled';
  return applyConsultationUpdate(req, res);
});

router.post('/:id/reject', (req, res) => {
  req.body.status = 'rejected';
  return applyConsultationUpdate(req, res);
});

router.put('/:id', applyConsultationUpdate);

module.exports = router;
