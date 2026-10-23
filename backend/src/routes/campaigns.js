const router = require('express').Router();
const crypto = require('crypto');
const prisma = require('../config/database');
const { publicLimiter } = require('../middleware/rateLimit');

const CLICK_KEY = 'halloween_flash_party_clicks';
const RSVP_KEY = 'halloween_flash_party_rsvps';
const PRICES = { 1: 40, 2: 70, 3: 99 };
const FLASH_ID_RE = /^flash-(0[1-9]|[1-4]\d|5[0-4])$/;

async function readClicks() {
  const row = await prisma.setting.findUnique({ where: { key: CLICK_KEY } });
  return Number.parseInt(row?.value ?? '0', 10) || 0;
}

async function readRsvps() {
  const row = await prisma.setting.findUnique({ where: { key: RSVP_KEY } });
  if (!row?.value) return [];
  try {
    const parsed = JSON.parse(row.value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function summarize(rsvps) {
  const counts = new Map();
  for (const item of rsvps) {
    const key = item.flashLabel || item.flashId || '—';
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  const byFlash = [...counts.entries()]
    .map(([label, count]) => ({ id: label, label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'pt'));
  return {
    total: rsvps.length,
    byFlash,
    rsvps,
  };
}

function cleanName(value) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 40);
}

function parseFlashChoice(body) {
  const quantity = Number(body?.quantity);
  if (![1, 2, 3].includes(quantity)) return { error: 'Escolhe 1, 2 ou 3 flashes' };
  const raw = String(body?.flashIds || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
  if (raw.includes('own')) {
    return {
      quantity,
      price: PRICES[quantity],
      flashId: 'own',
      flashIds: ['own'],
      flashLabel: quantity === 1 ? 'Levo a minha' : `Levo as minhas (${quantity})`,
    };
  }
  if (raw.length !== quantity || raw.some((id) => !FLASH_ID_RE.test(id))) {
    return { error: 'Escolhe as flashes da folha ou «Levo a minha»' };
  }
  return {
    quantity,
    price: PRICES[quantity],
    flashId: raw.join(','),
    flashIds: raw,
    flashLabel: raw.map((id) => id.replace('flash-', 'Flash ')).join(' + '),
  };
}

router.post('/halloween-flash/click', publicLimiter, async (req, res) => {
  try {
    await prisma.$executeRaw`
      INSERT INTO settings (\`key\`, \`value\`, updated_at)
      VALUES (${CLICK_KEY}, '1', NOW())
      ON DUPLICATE KEY UPDATE
        \`value\` = CAST(\`value\` AS UNSIGNED) + 1,
        updated_at = NOW()
    `;
    res.json({ clicks: await readClicks() });
  } catch (err) {
    res.status(500).json({ error: 'Não foi possível registar o clique' });
  }
});

router.post('/halloween-flash/rsvp', publicLimiter, async (req, res) => {
  try {
    const firstName = cleanName(req.body?.firstName);
    const lastName = cleanName(req.body?.lastName);
    if (firstName.length < 2 || lastName.length < 2) {
      return res.status(400).json({ error: 'Indica o primeiro e o último nome' });
    }
    const choice = parseFlashChoice(req.body);
    if (choice.error) {
      return res.status(400).json({ error: choice.error });
    }

    const rsvps = await readRsvps();
    rsvps.push({
      id: crypto.randomUUID(),
      firstName,
      lastName,
      flashId: choice.flashId,
      flashIds: choice.flashIds,
      flashLabel: choice.flashLabel,
      quantity: choice.quantity,
      price: choice.price,
      createdAt: new Date().toISOString(),
    });

    await prisma.setting.upsert({
      where: { key: RSVP_KEY },
      create: { key: RSVP_KEY, value: JSON.stringify(rsvps) },
      update: { value: JSON.stringify(rsvps) },
    });

    res.json(summarize(rsvps));
  } catch (err) {
    res.status(500).json({ error: 'Não foi possível gravar a reserva' });
  }
});

module.exports = router;
module.exports.CLICK_KEY = CLICK_KEY;
module.exports.readClicks = readClicks;
module.exports.readRsvps = readRsvps;
module.exports.summarize = summarize;
