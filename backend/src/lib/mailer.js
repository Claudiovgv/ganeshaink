const nodemailer = require('nodemailer');
const path = require('path');
const prisma = require('../config/database');
const { logEvent } = require('./logger');

// Embedded via cid so the logo shows up reliably without depending on the site being live/reachable.
const LOGO_ATTACHMENT = {
  filename: 'ganesha-logo.png',
  path: path.join(__dirname, '../assets/ganesha-logo-gold.png'),
  cid: 'ganesha-logo',
};

async function getSmtpConfig() {
  const rows = await prisma.setting.findMany({
    where: { key: { in: ['smtp_host', 'smtp_port', 'smtp_user', 'smtp_pass', 'smtp_from'] } },
  });
  const byKey = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return {
    host: byKey.smtp_host || process.env.SMTP_HOST,
    port: Number(byKey.smtp_port || process.env.SMTP_PORT || 587),
    user: byKey.smtp_user || process.env.SMTP_USER,
    pass: byKey.smtp_pass || process.env.SMTP_PASS,
    from: byKey.smtp_from || process.env.SMTP_FROM || 'Ganesha Ink <noreply@ganeshaink.pt>',
  };
}

// Fire-and-forget email send — never throws, never blocks the caller.
// Booking/consultation flows must succeed even if SMTP is unreachable or unconfigured.
async function sendMail({ to, subject, html }) {
  try {
    const config = await getSmtpConfig();
    if (!config.host || !config.user || !config.pass) {
      console.log(`[mailer] SMTP not configured — skipping email to ${to} ("${subject}")`);
      return;
    }

    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass },
    });

    await transporter.sendMail({ from: config.from, to, subject, html, attachments: [LOGO_ATTACHMENT] });
    logEvent('info', 'email', `Email enviado: "${subject}" para ${to}`);
  } catch (err) {
    console.error('[mailer] Failed to send email:', err.message);
    logEvent('error', 'email', `Falha ao enviar email "${subject}" para ${to}: ${err.message}`);
  }
}

module.exports = { sendMail };
