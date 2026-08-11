const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');

router.use(authenticate, requirePermission('manage_services'));

function slugify(name) {
  return name
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // remove acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function uniqueSlug(base) {
  let slug = base || 'categoria';
  let n = 2;
  while (await prisma.category.findUnique({ where: { slug } })) {
    slug = `${base}-${n++}`;
  }
  return slug;
}

// Lista plana (com parentId) — o backoffice agrupa por pai no ecrã.
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { services: true } } },
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, parentId } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ error: 'name é obrigatório' });

    let parent = null;
    if (parentId !== undefined && parentId !== null) {
      parent = await prisma.category.findUnique({ where: { id: parseInt(parentId) } });
      if (!parent) return res.status(400).json({ error: 'Categoria-pai não encontrada' });
      if (parent.parentId !== null) {
        return res.status(400).json({ error: 'Só se pode criar subcategorias dentro de uma categoria de topo (1 nível apenas)' });
      }
    }

    const maxOrder = await prisma.category.aggregate({
      where: { parentId: parent ? parent.id : null },
      _max: { sortOrder: true },
    });
    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        slug: await uniqueSlug(slugify(name)),
        sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
        parentId: parent ? parent.id : null,
      },
    });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reordena um conjunto de categorias-irmãs (todas do mesmo pai, ou todas de topo).
router.put('/reorder', async (req, res) => {
  try {
    const { categoryIds } = req.body;
    if (!Array.isArray(categoryIds)) return res.status(400).json({ error: 'categoryIds must be an array' });

    await prisma.$transaction(
      categoryIds.map((id, index) =>
        prisma.category.update({ where: { id: parseInt(id) }, data: { sortOrder: index } })
      )
    );

    const categories = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, isActive } = req.body;
    const data = {};
    if (name !== undefined) {
      if (!name.trim()) return res.status(400).json({ error: 'name não pode ficar vazio' });
      data.name = name.trim();
    }
    if (isActive !== undefined) data.isActive = isActive;

    const category = await prisma.category.update({ where: { id }, data });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const category = await prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { services: true, children: true } } },
    });
    if (!category) return res.status(404).json({ error: 'Categoria não encontrada' });

    if (category._count.services > 0) {
      return res.status(409).json({
        error: `Esta categoria ainda tem ${category._count.services} serviço(s). Move-os para outra categoria antes de a apagar.`,
      });
    }
    if (category._count.children > 0) {
      return res.status(409).json({
        error: `Esta categoria ainda tem ${category._count.children} subcategoria(s). Apaga-as primeiro.`,
      });
    }

    await prisma.category.delete({ where: { id } });
    res.json({ message: 'Categoria apagada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
