function clientIdentity(appointment) {
  const name = String(appointment.clientName || '').trim();
  const email = String(appointment.clientEmail || '').trim().toLowerCase();
  const phone = String(appointment.clientPhone || '').replace(/\s+/g, '');
  const realEmail = email && !email.startsWith('sem-contacto+') ? email : '';
  const realPhone = phone && phone.toLowerCase() !== 'sem contacto' ? phone : '';
  const key = realEmail
    ? `email:${realEmail}`
    : realPhone
      ? `phone:${realPhone}`
      : `name:${name.toLowerCase()}`;
  return { key, name, email: realEmail, phone: realPhone };
}

function mergeBarbershopClients(appointments, priceOf) {
  const byKey = {};
  for (const appointment of appointments) {
    const identity = clientIdentity(appointment);
    if (!byKey[identity.key]) {
      byKey[identity.key] = {
        name: identity.name,
        email: identity.email,
        phone: identity.phone,
        cuts: 0,
        spent: 0,
      };
    }
    const row = byKey[identity.key];
    row.cuts += 1;
    row.spent += priceOf(appointment);
    if (identity.name && identity.name.length > row.name.length) row.name = identity.name;
    if (identity.email && !row.email) row.email = identity.email;
    if (identity.phone && !row.phone) row.phone = identity.phone;
  }
  return Object.values(byKey).sort((a, b) => b.cuts - a.cuts || b.spent - a.spent);
}

module.exports = { clientIdentity, mergeBarbershopClients };
