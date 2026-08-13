const COLORS = {
  bgPrimary: '#0D0D0D',
  bgCard: '#1A1A1A',
  bgSection: '#111111',
  gold: '#C9A84C',
  goldLight: '#E8C96A',
  goldBorder: 'rgba(201,168,76,0.3)',
  textPrimary: '#F5F5F5',
  textSecondary: '#A0A0A0',
};

function formatDateTime(date) {
  return new Date(date).toLocaleString('pt-PT', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
    timeZone: 'Europe/Lisbon',
  });
}

function layout(title, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ganesha Ink</title>
</head>
<body style="margin:0; padding:24px 12px; background:${COLORS.bgPrimary};">
  <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 480px; margin: 0 auto; background: ${COLORS.bgPrimary}; border: 1px solid ${COLORS.goldBorder}; border-radius: 8px; overflow: hidden;">
    <div style="padding: 36px 24px 24px; text-align: center; border-bottom: 1px solid ${COLORS.goldBorder};">
      <img src="cid:ganesha-logo" width="72" height="72" alt="Ganesha Ink" style="display: inline-block;" />
      <p style="margin: 12px 0 0; color: ${COLORS.gold}; font-size: 20px; letter-spacing: 3px; text-transform: uppercase;">Ganesha Ink</p>
      <p style="margin: 2px 0 0; color: ${COLORS.textSecondary}; font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">Tatuagem &middot; Barbearia &middot; Piercing</p>
    </div>
    <div style="padding: 32px 28px; font-family: Arial, sans-serif;">
      <h1 style="margin: 0 0 16px; color: ${COLORS.textPrimary}; font-family: Georgia, serif; font-size: 22px; font-weight: normal;">${title}</h1>
      ${bodyHtml}
    </div>
    <div style="padding: 20px 28px 32px; border-top: 1px solid ${COLORS.goldBorder}; font-family: Arial, sans-serif;">
      <p style="margin: 0; font-size: 12px; color: ${COLORS.textSecondary}; line-height: 1.6;">
        Ganesha Ink — Tatuagem, Barbearia &amp; Piercing<br>
        Para alterar ou cancelar uma marcação, contacta-nos diretamente.
      </p>
    </div>
  </div>
</body>
</html>`;
}

function appointmentDetails(appointment) {
  const row = (label, value, isLast) => `
    <tr>
      <td style="padding: 12px 0; ${isLast ? '' : `border-bottom: 1px solid ${COLORS.goldBorder};`} color: ${COLORS.textSecondary}; font-size: 13px;">${label}</td>
      <td style="padding: 12px 0; ${isLast ? '' : `border-bottom: 1px solid ${COLORS.goldBorder};`} color: ${COLORS.textPrimary}; font-size: 14px; text-align: right; font-weight: bold;">${value}</td>
    </tr>
  `;
  return `
    <table style="width: 100%; border-collapse: collapse; background: ${COLORS.bgCard}; border: 1px solid ${COLORS.goldBorder}; border-radius: 8px; padding: 4px 20px; margin: 20px 0;">
      ${row('Serviço', appointment.service.name, false)}
      ${row('Profissional', appointment.employee.name, false)}
      ${row('Data', formatDateTime(appointment.startDatetime), true)}
    </table>
  `;
}

function paragraph(text) {
  return `<p style="color: ${COLORS.textSecondary}; font-size: 14px; line-height: 1.7; margin: 0 0 12px;">${text}</p>`;
}

function appointmentConfirmedEmail(appointment) {
  return {
    subject: 'Marcação confirmada — Ganesha Ink',
    html: layout('A tua marcação está confirmada', `
      ${paragraph(`Olá <strong style="color:${COLORS.textPrimary};">${appointment.clientName}</strong>,`)}
      ${paragraph('A tua marcação na Ganesha Ink foi confirmada com sucesso:')}
      ${appointmentDetails(appointment)}
      ${paragraph('Se precisares de alterar ou cancelar, contacta-nos com antecedência.')}
    `),
  };
}

function appointmentReceivedEmail(appointment) {
  return {
    subject: 'Marcação recebida — Ganesha Ink',
    html: layout('Recebemos o teu pedido de marcação', `
      ${paragraph(`Olá <strong style="color:${COLORS.textPrimary};">${appointment.clientName}</strong>,`)}
      ${paragraph('Recebemos o teu pedido de marcação. Fica pendente de confirmação pelo artista — assim que for confirmada, receberás um novo email.')}
      ${appointmentDetails(appointment)}
    `),
  };
}

function appointmentStatusChangedEmail(appointment) {
  const STATUS_LABEL = { confirmed: 'confirmada', cancelled: 'cancelada', completed: 'concluída', pending: 'pendente' };
  const label = STATUS_LABEL[appointment.status] || appointment.status;
  return {
    subject: `Marcação ${label} — Ganesha Ink`,
    html: layout(`A tua marcação foi ${label}`, `
      ${paragraph(`Olá <strong style="color:${COLORS.textPrimary};">${appointment.clientName}</strong>,`)}
      ${paragraph(`O estado da tua marcação foi atualizado para <strong style="color:${COLORS.gold};">${label}</strong>:`)}
      ${appointmentDetails(appointment)}
    `),
  };
}

function consultationReceivedEmail(consultation) {
  return {
    subject: 'Pedido de consulta recebido — Ganesha Ink',
    html: layout('Recebemos o teu pedido de consulta', `
      ${paragraph(`Olá <strong style="color:${COLORS.textPrimary};">${consultation.clientName}</strong>,`)}
      ${paragraph(`Recebemos o teu pedido de consulta para <strong style="color:${COLORS.gold};">${consultation.service.name}</strong>.`)}
      ${paragraph('A nossa equipa vai analisar o teu pedido e entrar em contacto brevemente para agendar.')}
    `),
  };
}

module.exports = { appointmentConfirmedEmail, appointmentReceivedEmail, appointmentStatusChangedEmail, consultationReceivedEmail };
