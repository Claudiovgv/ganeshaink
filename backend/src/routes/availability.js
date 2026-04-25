const router = require('express').Router();
const prisma = require('../config/database');
const { getAvailableSlots } = require('../services/availability.service');

router.get('/:employeeId', async (req, res) => {
  try {
    const employeeId = parseInt(req.params.employeeId);
    const { date, serviceId } = req.query;

    if (!date || !serviceId) {
      return res.status(400).json({ error: 'date and serviceId query params are required' });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: 'date must be in YYYY-MM-DD format' });
    }

    const service = await prisma.service.findUnique({
      where: { id: parseInt(serviceId) },
    });
    if (!service) return res.status(404).json({ error: 'Service not found' });

    // Verify employee offers this service
    const employeeService = await prisma.employeeService.findUnique({
      where: {
        employeeId_serviceId: {
          employeeId,
          serviceId: parseInt(serviceId),
        },
      },
    });
    if (!employeeService) {
      return res.status(400).json({ error: 'Employee does not offer this service' });
    }

    // Load employee with schedule, blocks, and appointments for the given date
    const dayStart = new Date(`${date}T00:00:00.000Z`);
    const dayEnd = new Date(`${date}T23:59:59.999Z`);

    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        workSchedules: { where: { isActive: true } },
        timeBlocks: {
          where: {
            startDatetime: { lte: dayEnd },
            endDatetime: { gte: dayStart },
          },
        },
        appointments: {
          where: {
            startDatetime: { lte: dayEnd },
            endDatetime: { gte: dayStart },
          },
        },
      },
    });

    if (!employee || !employee.isActive) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const slots = getAvailableSlots(employee, date, service.durationMin);

    res.json({
      date,
      employeeId,
      serviceId: service.id,
      durationMin: service.durationMin,
      slots,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
