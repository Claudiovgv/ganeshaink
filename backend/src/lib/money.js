function asFiniteNumber(value) {
  if (value == null || value === '') return null;
  if (typeof value === 'object') {
    if (typeof value.toNumber === 'function') {
      const viaToNumber = value.toNumber();
      if (Number.isFinite(viaToNumber)) return viaToNumber;
    }
    if (typeof value.toString === 'function') {
      const viaString = Number(value.toString());
      if (Number.isFinite(viaString)) return viaString;
    }
    return null;
  }
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function tradePayout({ revenue, count, materialCostPerUnit, studioPercent }) {
  const materialUnit = asFiniteNumber(materialCostPerUnit) ?? 0;
  const percent = asFiniteNumber(studioPercent);
  const hasConfig = percent !== null;
  const materialCost = (Number(count) || 0) * materialUnit;
  const netRevenue = Number(revenue) - materialCost;
  const studioAmount = hasConfig ? netRevenue * (percent / 100) : 0;
  const barberAmount = hasConfig ? netRevenue - studioAmount : 0;
  return {
    materialCost,
    netRevenue,
    studioPercent: percent,
    studioAmount,
    barberAmount,
    hasConfig,
  };
}

module.exports = { asFiniteNumber, tradePayout };
