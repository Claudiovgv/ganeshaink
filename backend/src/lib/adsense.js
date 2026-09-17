const prisma = require('../config/database');

const ADSENSE_KEY = 'adsense_enabled';

function parseEnabled(value) {
  return value === 'true' || value === '1';
}

async function isAdsenseEnabled() {
  const row = await prisma.setting.findUnique({ where: { key: ADSENSE_KEY } });
  return parseEnabled(row?.value);
}

async function setAdsenseEnabled(enabled) {
  const value = enabled ? 'true' : 'false';
  await prisma.setting.upsert({
    where: { key: ADSENSE_KEY },
    update: { value },
    create: { key: ADSENSE_KEY, value },
  });
  return enabled;
}

module.exports = { ADSENSE_KEY, isAdsenseEnabled, setAdsenseEnabled };
