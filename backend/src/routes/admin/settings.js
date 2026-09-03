const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');
const { logEvent } = require('../../lib/logger');
const { sendTestMail, sendMailOrThrow, getSmtpConfig } = require('../../lib/mailer');
const { getNotificationMatrix, saveNotificationPreferences, EVENT_TYPES } = require('../../lib/notifications');
const { templateForEvent } = require('../../lib/emailTemplates');

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

router.post('/smtp/test', async (req, res) => {
  try {
    const { smtpHost, smtpPort, smtpUser, smtpPass, smtpFrom, testEmail } = req.body;
    if (!testEmail) return res.status(400).json({ error: 'testEmail é obrigatório' });

    const saved = await getSmtpConfig();
    const config = {
      host: smtpHost || saved.host,
      port: Number(smtpPort || saved.port),
      user: smtpUser || saved.user,
      // Reuse the saved password when the form still shows the masked placeholder or was left empty.
      pass: smtpPass && smtpPass !== '••••••••' ? smtpPass : saved.pass,
      from: smtpFrom || saved.from,
    };

    await sendTestMail(config, testEmail);
    await logEvent('info', 'settings', `Email de teste SMTP enviado para ${testEmail}`, { userId: req.user.id, ip: req.ip });
    res.json({ message: `Email de teste enviado para ${testEmail}` });
  } catch (err) {
    res.status(422).json({ error: err.message || 'Falha ao enviar o email de teste' });
  }
});

router.get('/notifications', async (req, res) => {
  try {
    res.json(await getNotificationMatrix());
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/notifications', async (req, res) => {
  try {
    const matrix = await saveNotificationPreferences(req.body.preferences, req.body.mailboxes);
    await logEvent('info', 'settings', 'Preferências de notificação actualizadas', { userId: req.user.id, ip: req.ip });
    res.json(matrix);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Não foi possível guardar as preferências' });
  }
});

router.post('/smtp/test-template', async (req, res) => {
  try {
    const { eventType, testEmail, audience = 'client' } = req.body;
    if (!testEmail) return res.status(400).json({ error: 'testEmail é obrigatório' });
    if (!EVENT_TYPES.includes(eventType)) return res.status(400).json({ error: 'Tipo de email inválido' });
    const template = templateForEvent(eventType, audience === 'staff' ? 'staff' : 'client');
    if (!template) return res.status(400).json({ error: 'Tipo de email inválido' });
    await sendMailOrThrow({ to: testEmail, subject: `[TESTE] ${template.subject}`, html: template.html });
    await logEvent('info', 'settings', `Email de teste (${eventType}) enviado para ${testEmail}`, { userId: req.user.id, ip: req.ip });
    res.json({ message: `Email de teste (${eventType}) enviado para ${testEmail}` });
  } catch (err) {
    res.status(422).json({ error: err.message || 'Falha ao enviar o email de teste' });
  }
});

module.exports = router;
