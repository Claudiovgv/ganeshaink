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

    const appointments = await prisma.appointment.findMany({
      where: { status: 'completed', startDatetime: { gte: start, lte: end } },
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

module.exports = router;
