const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requireSuperadmin } = require('../../middleware/auth');

router.use(authenticate, requireSuperadmin);

router.get('/', async (req, res) => {
  try {
    const { level, category, page = '1', pageSize = '50' } = req.query;
    const take = Math.min(parseInt(pageSize, 10) || 50, 200);
    const skip = (Math.max(parseInt(page, 10) || 1, 1) - 1) * take;

    const where = {
      ...(level ? { level } : {}),
      ...(category ? { category } : {}),
    };

    const [logs, total] = await Promise.all([
      prisma.systemLog.findMany({ where, orderBy: { createdAt: 'desc' }, take, skip }),
      prisma.systemLog.count({ where }),
    ]);

    res.json({ logs, total, page: Number(page), pageSize: take });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
