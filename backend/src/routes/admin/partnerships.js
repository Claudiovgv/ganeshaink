const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');

router.use(authenticate, requirePermission('manage_appointments'));

function parsePercent(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0 || n > 100) return null;
  return n;
}

router.get('/', async (req, res) => {
  try {
    const partnerships = await prisma.partnership.findMany({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include: { _count: { select: { appointments: true } } },
    });
    res.json(partnerships);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, percent, extraFieldLabel } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ error: 'name é obrigatório' });
    const pct = parsePercent(percent);
    if (pct === null) return res.status(400).json({ error: 'percent deve ser um número entre 0 e 100' });

    const maxOrder = await prisma.partnership.aggregate({ _max: { sortOrder: true } });
    const partnership = await prisma.partnership.create({
      data: {
        name: name.trim(),
        percent: pct,
        extraFieldLabel: extraFieldLabel && String(extraFieldLabel).trim() ? String(extraFieldLabel).trim() : null,
        sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
      },
    });
    res.status(201).json(partnership);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await prisma.partnership.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Parceria não encontrada' });

    const data = {};
    if (req.body.name !== undefined) {
      if (!String(req.body.name).trim()) return res.status(400).json({ error: 'name é obrigatório' });
      data.name = String(req.body.name).trim();
    }
    if (req.body.percent !== undefined) {
      const pct = parsePercent(req.body.percent);
      if (pct === null) return res.status(400).json({ error: 'percent deve ser um número entre 0 e 100' });
      data.percent = pct;
    }
    if (req.body.extraFieldLabel !== undefined) {
      const label = req.body.extraFieldLabel == null ? '' : String(req.body.extraFieldLabel).trim();
      data.extraFieldLabel = label || null;
    }
    if (req.body.isActive !== undefined) data.isActive = Boolean(req.body.isActive);

    const updated = await prisma.partnership.update({ where: { id }, data });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await prisma.partnership.findUnique({
      where: { id },
      include: { _count: { select: { appointments: true } } },
    });
    if (!existing) return res.status(404).json({ error: 'Parceria não encontrada' });
    if (existing._count.appointments > 0) {
      return res.status(409).json({
        error: `Esta parceria tem ${existing._count.appointments} marcação(ões) e não pode ser apagada. Desative-a em vez disso.`,
      });
    }
    await prisma.partnership.delete({ where: { id } });
    res.json({ message: 'Parceria apagada' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
