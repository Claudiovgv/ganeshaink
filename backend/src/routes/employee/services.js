const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requireEmployee } = require('../../middleware/auth');

router.use(authenticate, requireEmployee);

router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, category, description, durationMin, price, requiresConsultation } = req.body;
    if (!name || !category || !durationMin || price === undefined)
      return res.status(400).json({ error: 'name, category, durationMin, price required' });
    const service = await prisma.service.create({
      data: {
        name,
        category,
        description: description || null,
        durationMin: parseInt(durationMin),
        price: parseFloat(price),
        requiresConsultation: requiresConsultation || false,
      },
    });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, category, description, durationMin, price, requiresConsultation, isActive } = req.body;
    const data = {};
    if (name !== undefined) data.name = name;
    if (category !== undefined) data.category = category;
    if (description !== undefined) data.description = description;
    if (durationMin !== undefined) data.durationMin = parseInt(durationMin);
    if (price !== undefined) data.price = parseFloat(price);
    if (requiresConsultation !== undefined) data.requiresConsultation = requiresConsultation;
    if (isActive !== undefined) data.isActive = isActive;
    const service = await prisma.service.update({ where: { id }, data });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
