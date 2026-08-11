// Gestão dos horários semanais de TODOS os funcionários.
// O funcionário edita o seu próprio horário em /v1/employee/schedule;
// esta rota permite a um admin/superadmin ver e alterar o de qualquer pessoa
// (ex.: o funcionário não sabe fazer e pede para lhe mexerem no horário).
const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requirePermission } = require('../../middleware/auth');

router.use(authenticate, requirePermission('manage_employees'));

const DAYS = [0, 1, 2, 3, 4, 5, 6];
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

function validate(schedules) {
  if (!Array.isArray(schedules)) return 'schedules must be an array';
  const seen = new Set();
  for (const s of schedules) {
    if (!DAYS.includes(s.dayOfWeek)) return `dayOfWeek inválido: ${s.dayOfWeek}`;
    if (seen.has(s.dayOfWeek)) return `dia repetido: ${s.dayOfWeek}`;
    seen.add(s.dayOfWeek);
    if (!TIME_RE.test(s.startTime) || !TIME_RE.test(s.endTime)) {
      return `hora inválida no dia ${s.dayOfWeek} (formato HH:MM)`;
    }
    if (s.startTime >= s.endTime) {
      return `no dia ${s.dayOfWeek} a hora de fim tem de ser depois da de início`;
    }
  }
  return null;
}

// Todos os funcionários, cada um com o seu horário semanal.
router.get('/', async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        workSchedules: {
          where: { isActive: true },
          orderBy: { dayOfWeek: 'asc' },
          select: { dayOfWeek: true, startTime: true, endTime: true },
        },
      },
    });
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Substitui o horário semanal de um funcionário.
router.put('/:employeeId', async (req, res) => {
  try {
    const employeeId = parseInt(req.params.employeeId, 10);
    if (Number.isNaN(employeeId)) {
      return res.status(400).json({ error: 'employeeId inválido' });
    }

    const employee = await prisma.employee.findUnique({ where: { id: employeeId } });
    if (!employee) return res.status(404).json({ error: 'Funcionário não encontrado' });

    const { schedules } = req.body;
    const error = validate(schedules);
    if (error) return res.status(400).json({ error });

    await prisma.$transaction([
      prisma.workSchedule.deleteMany({ where: { employeeId } }),
      ...(schedules.length > 0
        ? [prisma.workSchedule.createMany({
            data: schedules.map(s => ({
              employeeId,
              dayOfWeek: s.dayOfWeek,
              startTime: s.startTime,
              endTime: s.endTime,
              isActive: true,
            })),
          })]
        : []),
    ]);

    const updated = await prisma.workSchedule.findMany({
      where: { employeeId, isActive: true },
      orderBy: { dayOfWeek: 'asc' },
      select: { dayOfWeek: true, startTime: true, endTime: true },
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
