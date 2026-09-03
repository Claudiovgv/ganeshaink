const router = require('express').Router();
const prisma = require('../config/database');
const { publicLimiter } = require('../middleware/rateLimit');
const { notifyConsultationCreated } = require('../lib/notifications');

router.post('/', publicLimiter, async (req, res) => {
  try {
    const { clientName, clientEmail, clientPhone, serviceId, employeeId, description, referenceImages } = req.body;

    if (!clientName || !clientEmail || !clientPhone || !serviceId || !description) {
      return res.status(400).json({
        error: 'Required: clientName, clientEmail, clientPhone, serviceId, description',
      });
    }

    const service = await prisma.service.findUnique({ where: { id: parseInt(serviceId) } });
    if (!service) return res.status(404).json({ error: 'Service not found' });

    const consultation = await prisma.consultationRequest.create({
      data: {
        clientName,
        clientEmail,
        clientPhone,
        serviceId: parseInt(serviceId),
        employeeId: employeeId ? parseInt(employeeId) : null,
        description,
        referenceImages: referenceImages || null,
        status: 'pending',
      },
      include: {
        service: true,
        employee: { select: { id: true, name: true, userId: true } },
      },
    });

    notifyConsultationCreated(consultation);

    res.status(201).json(consultation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

    const consultation = await prisma.consultationRequest.findUnique({
      where: { id },
      include: {
        service: true,
        employee: { select: { id: true, name: true } },
      },
    });

    if (!consultation) return res.status(404).json({ error: 'Consultation not found' });
    res.json(consultation);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
