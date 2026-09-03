const router = require('express').Router();
const { clientErrorLimiter } = require('../middleware/rateLimit');
const { logEvent } = require('../lib/logger');

router.post('/', clientErrorLimiter, async (req, res) => {
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  if (!message) return res.status(400).json({ error: 'message required' });

  const path = typeof req.body?.path === 'string' ? req.body.path.slice(0, 200) : '';
  const source = req.body?.source === 'backoffice' ? 'backoffice' : 'frontend';
  const detail = typeof req.body?.detail === 'string' ? req.body.detail.slice(0, 1000) : undefined;
  const status = Number.isFinite(Number(req.body?.status)) ? Number(req.body.status) : undefined;

  await logEvent('error', source, message.slice(0, 500), {
    ip: req.ip,
    meta: { path, detail, status, userAgent: req.get('user-agent') },
  });

  res.status(204).end();
});

module.exports = router;
