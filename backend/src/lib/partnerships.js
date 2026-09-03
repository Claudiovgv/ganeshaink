const prisma = require('../config/database');

function discountedPrice(basePrice, percent) {
  const base = Number(basePrice);
  const pct = Number(percent);
  if (!Number.isFinite(base) || !Number.isFinite(pct)) return null;
  return Math.round(base * (1 - pct / 100) * 100) / 100;
}

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

async function resolveBookingPartnership({ partnershipId, extraFieldValue, servicePrice, explicitPrice }) {
  const hasPartnership = partnershipId !== undefined && partnershipId !== null && partnershipId !== '';
  if (!hasPartnership) {
    const price = explicitPrice === undefined || explicitPrice === '' || explicitPrice === null
      ? null
      : Number(explicitPrice);
    return { partnershipId: null, extraFieldValue: null, price };
  }

  const id = parseInt(partnershipId, 10);
  const partnership = await prisma.partnership.findUnique({ where: { id } });
  if (!partnership || !partnership.isActive) {
    throw httpError(400, 'Parceria não encontrada ou inactiva');
  }

  const extra = extraFieldValue != null ? String(extraFieldValue).trim() : '';
  if (partnership.extraFieldLabel && !extra) {
    throw httpError(400, `${partnership.extraFieldLabel} é obrigatório`);
  }

  const price = discountedPrice(servicePrice, partnership.percent);

  return {
    partnershipId: partnership.id,
    extraFieldValue: extra || null,
    price,
  };
}

module.exports = { discountedPrice, resolveBookingPartnership };
