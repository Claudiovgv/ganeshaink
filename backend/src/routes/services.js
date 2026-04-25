const router = require('express').Router();
const prisma = require('../config/database');

const VALID_CATEGORIES = ['barbershop', 'tattoo', 'piercing', 'nails'];

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const where = { isActive: true };
    if (category) {
      if (!VALID_CATEGORIES.includes(category)) {
        return res.json([]);
      }
      where.category = category;
    }

    const services = await prisma.service.findMany({
      where,
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });

    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
