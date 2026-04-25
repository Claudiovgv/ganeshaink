const router = require('express').Router();
const prisma = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      where: { isActive: true },
      include: {
        services: { include: { service: true } },
      },
      orderBy: { name: 'asc' },
    });

    const result = employees.map(emp => ({
      ...emp,
      services: emp.services.map(es => es.service),
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        services: { include: { service: true } },
        workSchedules: { where: { isActive: true } },
      },
    });

    if (!employee || !employee.isActive) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({
      ...employee,
      services: employee.services.map(es => es.service),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
