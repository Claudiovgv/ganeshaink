// Categorias de serviços, públicas — usado pelo site para montar o menu
// de categorias e os separadores da página /servicos. Devolve a árvore
// (categorias de topo, cada uma com as suas subcategorias, se tiver).
const router = require('express').Router();
const prisma = require('../config/database');
const { logRouteError } = require('../lib/logger');

router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true, parentId: null },
      orderBy: { sortOrder: 'asc' },
      include: {
        children: { where: { isActive: true }, orderBy: { sortOrder: 'asc' } },
      },
    });
    res.json(categories);
  } catch (err) {
    logRouteError(req, err, 'categories');
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
