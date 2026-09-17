const router = require('express').Router();
const { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, addWeeks, addMonths, addYears, format } = require('date-fns');
const { toZonedTime, fromZonedTime } = require('date-fns-tz');
const prisma = require('../../config/database');
const { authenticate } = require('../../middleware/auth');
const { loadUserStatsContext, canViewTradeStats, TRADE_SLUGS } = require('../../lib/statsAccess');

router.use(authenticate);

const TIMEZONE = 'Europe/Lisbon';

// "Semana/mês/ano" têm de ser calculados à hora de Lisboa, não à do servidor —
// caso contrário, marcações perto da meia-noite podiam cair no período errado.
function getRange(period, offset) {
  const n = parseInt(offset, 10) || 0;
  const nowLisbon = toZonedTime(new Date(), TIMEZONE);

  let startLisbon, endLisbon;
  if (period === 'year') {
    const base = addYears(nowLisbon, n);
    startLisbon = startOfYear(base);
    endLisbon = endOfYear(base);
  } else if (period === 'month') {
    const base = addMonths(nowLisbon, n);
    startLisbon = startOfMonth(base);
    endLisbon = endOfMonth(base);
  } else {
    const base = addWeeks(nowLisbon, n);
    startLisbon = startOfWeek(base, { weekStartsOn: 1 });
    endLisbon = endOfWeek(base, { weekStartsOn: 1 });
  }

  return {
    start: fromZonedTime(format(startLisbon, "yyyy-MM-dd'T'HH:mm:ss.SSS"), TIMEZONE),
    end: fromZonedTime(format(endLisbon, "yyyy-MM-dd'T'HH:mm:ss.SSS"), TIMEZONE),
  };
}

router.get('/', async (req, res) => {
  try {
    const ctx = await loadUserStatsContext(req.user.id);
    if (!ctx.canViewGeneralStats) {
      return res.status(403).json({ error: 'A tua conta não tem permissão para as estatísticas gerais' });
    }

    const { period = 'month', offset = '0' } = req.query;
    if (!['week', 'month', 'year'].includes(period)) {
      return res.status(400).json({ error: 'period must be week, month or year' });
    }
    const { start, end } = getRange(period, offset);

    // Ninguém marca manualmente cada marcação como "concluída" depois do
    // horário passar — por isso uma "confirmed" cujo horário já passou conta
    // como receita na mesma, tal como uma "completed" explícita.
    const appointments = await prisma.appointment.findMany({
      where: {
        startDatetime: { gte: start, lte: end },
        OR: [
          { status: 'completed' },
          { status: 'confirmed', endDatetime: { lt: new Date() } },
        ],
      },
      include: { service: { select: { id: true, name: true, price: true, category: { include: { parent: true } } } } },
    });

    // Uma marcação pode ter um valor próprio (desconto, ajuste manual) — quando
    // existe, prevalece sobre o preço de catálogo do serviço.
    const priceOf = (a) => Number(a.price ?? a.service.price);

    const totalRevenue = appointments.reduce((sum, a) => sum + priceOf(a), 0);
    const totalAppointments = appointments.length;

    const byCategoryMap = {};
    const byServiceMap = {};
    for (const a of appointments) {
      const price = priceOf(a);

      const cat = a.service.category.slug;
      if (!byCategoryMap[cat]) byCategoryMap[cat] = { category: a.service.category, revenue: 0, count: 0 };
      byCategoryMap[cat].revenue += price;
      byCategoryMap[cat].count += 1;

      const sid = a.service.id;
      if (!byServiceMap[sid]) byServiceMap[sid] = { serviceId: sid, name: a.service.name, category: a.service.category, revenue: 0, count: 0 };
      byServiceMap[sid].revenue += price;
      byServiceMap[sid].count += 1;
    }

    const byCategory = Object.values(byCategoryMap).sort((a, b) => b.revenue - a.revenue);
    const byService = Object.values(byServiceMap).sort((a, b) => b.revenue - a.revenue);
    const mostRequested = [...byService].sort((a, b) => b.count - a.count)[0] || null;

    res.json({
      period, offset: parseInt(offset, 10) || 0,
      range: { start: start.toISOString(), end: end.toISOString() },
      totalRevenue, totalAppointments,
      averageTicket: totalAppointments > 0 ? totalRevenue / totalAppointments : 0,
      byCategory, byService, mostRequested,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /v1/admin/stats/barbershop — receita, custo de material e o que fica
// para o estúdio vs. o que o barbeiro recebe. Usado pela página Análise >
// Barbearia.
async function tradeStats(req, res, slug) {
  const ctx = await loadUserStatsContext(req.user.id);
  if (!canViewTradeStats(ctx, slug)) {
    return res.status(403).json({ error: 'A tua conta não tem permissão para estas estatísticas' });
  }
  if (!ctx.canViewGeneralStats && !ctx.employeeId) {
    return res.status(403).json({ error: 'A tua conta não tem permissão para estas estatísticas' });
  }

  const { period = 'month', offset = '0' } = req.query;
  if (!['week', 'month', 'year'].includes(period)) {
    return res.status(400).json({ error: 'period must be week, month or year' });
  }
  const { start, end } = getRange(period, offset);

  const root = await prisma.category.findUnique({
    where: { slug },
    include: { children: { select: { id: true } } },
  });
  const emptyResponse = {
    period, offset: parseInt(offset, 10) || 0,
    range: { start: start.toISOString(), end: end.toISOString() },
    barbers: [],
    people: [],
    totals: { count: 0, revenue: 0, materialCost: 0, netRevenue: 0, studioAmount: 0, barberAmount: 0 },
  };
  if (!root) return res.json(emptyResponse);

  const categoryIds = root.children.length > 0 ? root.children.map((c) => c.id) : [root.id];

  const appointments = await prisma.appointment.findMany({
    where: {
      startDatetime: { gte: start, lte: end },
      ...(ctx.canViewGeneralStats ? {} : { employeeId: ctx.employeeId }),
      service: { categoryId: { in: categoryIds } },
      OR: [
        { status: 'completed' },
        { status: 'confirmed', endDatetime: { lt: new Date() } },
      ],
    },
    include: {
      service: { select: { price: true } },
      employee: { select: { id: true, name: true, materialCost: true, studioPercent: true } },
    },
  });

  const priceOf = (a) => Number(a.price ?? a.service.price);

  const byEmployee = {};
  for (const a of appointments) {
    const e = a.employee;
    if (!byEmployee[e.id]) {
      byEmployee[e.id] = {
        employeeId: e.id,
        name: e.name,
        count: 0,
        revenue: 0,
        materialCostPerUnit: e.materialCost !== null ? Number(e.materialCost) : null,
        studioPercent: e.studioPercent !== null ? Number(e.studioPercent) : null,
      };
    }
    byEmployee[e.id].count += 1;
    byEmployee[e.id].revenue += priceOf(a);
  }

  const people = Object.values(byEmployee).map((b) => {
    const hasConfig = b.materialCostPerUnit !== null && b.studioPercent !== null;
    const materialCost = b.count * (b.materialCostPerUnit ?? 0);
    const netRevenue = b.revenue - materialCost;
    const studioAmount = netRevenue * ((b.studioPercent ?? 0) / 100);
    const barberAmount = netRevenue - studioAmount;
    return {
      employeeId: b.employeeId,
      name: b.name,
      count: b.count,
      revenue: b.revenue,
      materialCost,
      netRevenue,
      studioPercent: b.studioPercent,
      studioAmount,
      barberAmount: hasConfig ? barberAmount : 0,
      hasConfig,
    };
  }).sort((a, b) => b.revenue - a.revenue);

  const totals = people.reduce((acc, b) => ({
    count: acc.count + b.count,
    revenue: acc.revenue + b.revenue,
    materialCost: acc.materialCost + b.materialCost,
    netRevenue: acc.netRevenue + b.netRevenue,
    studioAmount: acc.studioAmount + b.studioAmount,
    barberAmount: acc.barberAmount + b.barberAmount,
  }), { count: 0, revenue: 0, materialCost: 0, netRevenue: 0, studioAmount: 0, barberAmount: 0 });

  return res.json({
    period, offset: parseInt(offset, 10) || 0,
    range: { start: start.toISOString(), end: end.toISOString() },
    barbers: people,
    people,
    totals,
  });
}

router.get('/barbershop', async (req, res) => {
  try {
    return await tradeStats(req, res, 'barbershop');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/trade/:slug', async (req, res) => {
  try {
    const slug = String(req.params.slug || '');
    if (!TRADE_SLUGS.includes(slug)) {
      return res.status(400).json({ error: 'Área inválida' });
    }
    return await tradeStats(req, res, slug);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
