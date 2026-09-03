const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requireSuperadmin } = require('../../middleware/auth');
const { logEvent } = require('../../lib/logger');
const { resetAuthLimits, listAuthBlocks } = require('../../middleware/rateLimit');

router.use(authenticate, requireSuperadmin);

router.get('/login-blocks', (req, res) => {
  res.json({ blocks: listAuthBlocks() });
});

router.delete('/login-blocks', (req, res) => {
  resetAuthLimits();
  logEvent('security', 'auth', 'Superadmin desbloqueou os logins', { ip: req.ip, userId: req.user.id });
  res.json({ message: 'Bloqueios de login limpos' });
});

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

router.delete('/', async (req, res) => {
  try {
    const result = await prisma.systemLog.deleteMany({});
    logEvent('info', 'logs', 'Superadmin limpou o log', { ip: req.ip, userId: req.user.id });
    res.json({ deleted: result.count, message: 'Log limpo' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
