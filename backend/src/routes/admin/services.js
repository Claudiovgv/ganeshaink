const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');

router.use(authenticate, requirePermission('manage_services'));

router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      include: { category: { include: { parent: true } } },
      orderBy: [{ category: { sortOrder: 'asc' } }, { name: 'asc' }],
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, categoryId, description, durationMin, price, requiresConsultation } = req.body;
    if (!name || !categoryId || !durationMin || price === undefined)
      return res.status(400).json({ error: 'name, categoryId, durationMin, price required' });

    const service = await prisma.service.create({
      data: {
        name,
        categoryId: parseInt(categoryId),
        description: description || null,
        durationMin: parseInt(durationMin),
        price: parseFloat(price),
        requiresConsultation: requiresConsultation || false,
      },
      include: { category: { include: { parent: true } } },
    });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ordem do catálogo público /servicos, dentro de cada categoria.
// Tem de ficar ANTES de PUT /:id — senão "reorder" é lido como id.
router.put('/reorder', async (req, res) => {
  try {
    const { serviceIds } = req.body;
    if (!Array.isArray(serviceIds)) return res.status(400).json({ error: 'serviceIds must be an array' });

    await prisma.$transaction(
      serviceIds.map((id, index) =>
        prisma.service.update({ where: { id: parseInt(id) }, data: { sortOrder: index } })
      )
    );

    const services = await prisma.service.findMany({
      include: { category: { include: { parent: true } } },
      orderBy: [{ category: { sortOrder: 'asc' } }, { sortOrder: 'asc' }],
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, categoryId, description, durationMin, price, requiresConsultation, isActive } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (categoryId !== undefined) updateData.categoryId = parseInt(categoryId);
    if (description !== undefined) updateData.description = description;
    if (durationMin !== undefined) updateData.durationMin = parseInt(durationMin);
    if (price !== undefined) updateData.price = parseFloat(price);
    if (requiresConsultation !== undefined) updateData.requiresConsultation = requiresConsultation;
    if (isActive !== undefined) updateData.isActive = isActive;

    const service = await prisma.service.update({ where: { id }, data: updateData, include: { category: { include: { parent: true } } } });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) return res.status(404).json({ error: 'Serviço não encontrado' });

    const [appointmentCount, consultationCount] = await Promise.all([
      prisma.appointment.count({ where: { serviceId: id } }),
      prisma.consultationRequest.count({ where: { serviceId: id } }),
    ]);
    if (appointmentCount > 0 || consultationCount > 0) {
      return res.status(409).json({
        error: `Este serviço tem ${appointmentCount} marcação(ões) e ${consultationCount} pedido(s) de consulta associados e não pode ser apagado. Desative-o em vez disso.`,
      });
    }

    await prisma.$transaction([
      prisma.employeeService.deleteMany({ where: { serviceId: id } }),
      prisma.service.delete({ where: { id } }),
    ]);
    res.json({ message: 'Serviço apagado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
