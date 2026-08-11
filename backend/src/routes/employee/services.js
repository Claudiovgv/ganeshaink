const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');

router.use(authenticate, requirePermission('view_services'));

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

// Ordem em que OS MEUS serviços aparecem na minha página de artista.
router.get('/my-order', async (req, res) => {
  try {
    const employee = await prisma.employee.findUnique({ where: { userId: req.user.id } });
    if (!employee) return res.status(404).json({ error: 'Perfil de funcionário não encontrado' });

    const services = await prisma.employeeService.findMany({
      where: { employeeId: employee.id },
      orderBy: { sortOrder: 'asc' },
      include: { service: { include: { category: { include: { parent: true } } } } },
    });
    res.json(services.map(es => ({ ...es.service, sortOrder: es.sortOrder })));
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/my-order', async (req, res) => {
  try {
    const employee = await prisma.employee.findUnique({ where: { userId: req.user.id } });
    if (!employee) return res.status(404).json({ error: 'Perfil de funcionário não encontrado' });

    const { serviceIds } = req.body;
    if (!Array.isArray(serviceIds)) return res.status(400).json({ error: 'serviceIds must be an array' });

    const owned = await prisma.employeeService.findMany({ where: { employeeId: employee.id }, select: { serviceId: true } });
    const ownedIds = new Set(owned.map(o => o.serviceId));
    const invalid = serviceIds.map(Number).filter(id => !ownedIds.has(id));
    if (invalid.length > 0) {
      return res.status(400).json({ error: `Serviços não atribuídos a ti: ${invalid.join(', ')}` });
    }

    await prisma.$transaction(
      serviceIds.map((serviceId, index) =>
        prisma.employeeService.update({
          where: { employeeId_serviceId: { employeeId: employee.id, serviceId: parseInt(serviceId) } },
          data: { sortOrder: index },
        })
      )
    );

    const services = await prisma.employeeService.findMany({
      where: { employeeId: employee.id },
      orderBy: { sortOrder: 'asc' },
      include: { service: { include: { category: { include: { parent: true } } } } },
    });
    res.json(services.map(es => ({ ...es.service, sortOrder: es.sortOrder })));
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

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, categoryId, description, durationMin, price, requiresConsultation, isActive } = req.body;
    const data = {};
    if (name !== undefined) data.name = name;
    if (categoryId !== undefined) data.categoryId = parseInt(categoryId);
    if (description !== undefined) data.description = description;
    if (durationMin !== undefined) data.durationMin = parseInt(durationMin);
    if (price !== undefined) data.price = parseFloat(price);
    if (requiresConsultation !== undefined) data.requiresConsultation = requiresConsultation;
    if (isActive !== undefined) data.isActive = isActive;
    const service = await prisma.service.update({ where: { id }, data, include: { category: { include: { parent: true } } } });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
