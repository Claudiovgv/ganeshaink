const router = require('express').Router();
const { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, addWeeks, addMonths, addYears, format } = require('date-fns');
const { toZonedTime, fromZonedTime } = require('date-fns-tz');
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');

router.use(authenticate, requirePermission('view_stats'));

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

// GET /v1/admin/stats/barbershop — receita, custo de material e valor a
// pagar por barbeiro. Usado pela página Análise > Barbearia.
router.get('/barbershop', async (req, res) => {
  try {
    const { period = 'month', offset = '0' } = req.query;
    if (!['week', 'month', 'year'].includes(period)) {
      return res.status(400).json({ error: 'period must be week, month or year' });
    }
    const { start, end } = getRange(period, offset);

    const barbershop = await prisma.category.findUnique({
      where: { slug: 'barbershop' },
      include: { children: { select: { id: true } } },
    });
    const emptyResponse = {
      period, offset: parseInt(offset, 10) || 0,
      range: { start: start.toISOString(), end: end.toISOString() },
      barbers: [],
      totals: { count: 0, revenue: 0, materialCost: 0, netRevenue: 0, payoutAmount: 0 },
    };
    if (!barbershop) return res.json(emptyResponse);

    const categoryIds = barbershop.children.length > 0 ? barbershop.children.map((c) => c.id) : [barbershop.id];

    const appointments = await prisma.appointment.findMany({
      where: {
        startDatetime: { gte: start, lte: end },
        service: { categoryId: { in: categoryIds } },
        OR: [
          { status: 'completed' },
          { status: 'confirmed', endDatetime: { lt: new Date() } },
        ],
      },
      include: {
        service: { select: { price: true } },
        employee: { select: { id: true, name: true, materialCost: true, payoutPercent: true } },
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
          payoutPercent: e.payoutPercent !== null ? Number(e.payoutPercent) : null,
        };
      }
      byEmployee[e.id].count += 1;
      byEmployee[e.id].revenue += priceOf(a);
    }

    const barbers = Object.values(byEmployee).map((b) => {
      const hasConfig = b.materialCostPerUnit !== null && b.payoutPercent !== null;
      const materialCost = b.count * (b.materialCostPerUnit ?? 0);
      const netRevenue = b.revenue - materialCost;
      const payoutAmount = netRevenue * ((b.payoutPercent ?? 0) / 100);
      return {
        employeeId: b.employeeId,
        name: b.name,
        count: b.count,
        revenue: b.revenue,
        materialCost,
        netRevenue,
        payoutPercent: b.payoutPercent,
        payoutAmount,
        hasConfig,
      };
    }).sort((a, b) => b.revenue - a.revenue);

    const totals = barbers.reduce((acc, b) => ({
      count: acc.count + b.count,
      revenue: acc.revenue + b.revenue,
      materialCost: acc.materialCost + b.materialCost,
      netRevenue: acc.netRevenue + b.netRevenue,
      payoutAmount: acc.payoutAmount + b.payoutAmount,
    }), { count: 0, revenue: 0, materialCost: 0, netRevenue: 0, payoutAmount: 0 });

    res.json({
      period, offset: parseInt(offset, 10) || 0,
      range: { start: start.toISOString(), end: end.toISOString() },
      barbers, totals,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
