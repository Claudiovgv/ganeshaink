const router = require('express').Router();
const prisma = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query; // slug, ex.: "barbershop" ou "barba" (subcategoria)
    const where = { isActive: true };
    if (category) {
      const cat = await prisma.category.findUnique({
        where: { slug: category },
        include: { children: { where: { isActive: true }, select: { id: true } } },
      });
      if (!cat || !cat.isActive) return res.json([]);
      // Categoria de topo com subcategorias: mostra os serviços de TODAS elas.
      where.categoryId = cat.children.length > 0 ? { in: cat.children.map(c => c.id) } : cat.id;
    }

    const services = await prisma.service.findMany({
      where,
      include: { category: { include: { parent: true } } },
      orderBy: [{ category: { sortOrder: 'asc' } }, { sortOrder: 'asc' }, { name: 'asc' }],
    });

    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
