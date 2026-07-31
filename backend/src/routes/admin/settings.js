const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');
const { logEvent } = require('../../lib/logger');

router.use(authenticate, requirePermission('manage_settings'));

const SMTP_KEYS = ['smtp_host', 'smtp_port', 'smtp_user', 'smtp_pass', 'smtp_from'];

router.get('/smtp', async (req, res) => {
  try {
    const rows = await prisma.setting.findMany({ where: { key: { in: SMTP_KEYS } } });
    const byKey = Object.fromEntries(rows.map((r) => [r.key, r.value]));

    res.json({
      smtpHost: byKey.smtp_host ?? process.env.SMTP_HOST ?? '',
      smtpPort: byKey.smtp_port ?? process.env.SMTP_PORT ?? '',
      smtpUser: byKey.smtp_user ?? process.env.SMTP_USER ?? '',
      smtpPass: byKey.smtp_pass || process.env.SMTP_PASS ? '••••••••' : '',
      smtpFrom: byKey.smtp_from ?? process.env.SMTP_FROM ?? '',
      source: byKey.smtp_host ? 'database' : 'env',
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/smtp', async (req, res) => {
  try {
    const { smtpHost, smtpPort, smtpUser, smtpPass, smtpFrom } = req.body;

    const updates = [
      ['smtp_host', smtpHost],
      ['smtp_port', smtpPort],
      ['smtp_user', smtpUser],
      ['smtp_from', smtpFrom],
    ];
    // Only overwrite the password if a new one was actually provided (not the masked placeholder)
    if (smtpPass && smtpPass !== '••••••••') updates.push(['smtp_pass', smtpPass]);

    for (const [key, value] of updates) {
      if (value === undefined) continue;
      await prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }

    await logEvent('info', 'settings', 'SMTP settings updated', { userId: req.user.id, ip: req.ip });
    res.json({ message: 'SMTP settings saved' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
