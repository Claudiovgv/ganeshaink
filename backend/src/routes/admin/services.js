const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');

router.use(authenticate, requirePermission('manage_services'));

router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany({ orderBy: [{ category: 'asc' }, { name: 'asc' }] });
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
      data: { name, category, description: description || null, durationMin: parseInt(durationMin), price: parseFloat(price), requiresConsultation: requiresConsultation || false },
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
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (category !== undefined) updateData.category = category;
    if (description !== undefined) updateData.description = description;
    if (durationMin !== undefined) updateData.durationMin = parseInt(durationMin);
    if (price !== undefined) updateData.price = parseFloat(price);
    if (requiresConsultation !== undefined) updateData.requiresConsultation = requiresConsultation;
    if (isActive !== undefined) updateData.isActive = isActive;

    const service = await prisma.service.update({ where: { id }, data: updateData });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.service.update({ where: { id: parseInt(req.params.id) }, data: { isActive: false } });
    res.json({ message: 'Service deactivated' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
