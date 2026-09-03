const { fromZonedTime } = require('date-fns-tz');
const prisma = require('../config/database');
const { notifyAppointmentStatusChanged } = require('./notifications');

const TIMEZONE = 'Europe/Lisbon';

function computeDatetimes({ type, startDate, startTime, endDate, endTime }) {
  if (!startDate || !endDate) throw new Error('startDate and endDate required');

  if (type === 'vacation') {
    return {
      startDatetime: fromZonedTime(new Date(`${startDate}T00:00:00`), TIMEZONE),
      endDatetime: fromZonedTime(new Date(`${endDate}T23:59:59`), TIMEZONE),
    };
  }

  if (!startTime || !endTime) throw new Error('startTime and endTime required for break/custom blocks');
  return {
    startDatetime: fromZonedTime(new Date(`${startDate}T${startTime}:00`), TIMEZONE),
    endDatetime: fromZonedTime(new Date(`${endDate}T${endTime}:00`), TIMEZONE),
  };
}

// Marcações pending/confirmed que ficam dentro do intervalo a bloquear.
async function findConflicts(employeeId, startDatetime, endDatetime) {
  return prisma.appointment.findMany({
    where: {
      employeeId,
      status: { in: ['pending', 'confirmed'] },
      startDatetime: { lt: endDatetime },
      endDatetime: { gt: startDatetime },
    },
    include: { service: true, employee: { select: { id: true, name: true } } },
    orderBy: { startDatetime: 'asc' },
  });
}

// Cria o bloqueio e cancela (com email ao cliente) as marcações indicadas em cancelAppointmentIds.
// Devolve o bloqueio criado.
async function createBlock({ employeeId, type, reason, startDatetime, endDatetime, cancelAppointmentIds = [] }) {
  const block = await prisma.timeBlock.create({
    data: { employeeId, startDatetime, endDatetime, type, reason: reason || null },
    include: { employee: { select: { id: true, name: true } } },
  });

  if (cancelAppointmentIds.length > 0) {
    const appointments = await prisma.appointment.findMany({
      where: { id: { in: cancelAppointmentIds }, employeeId },
      include: { service: true, employee: { select: { id: true, name: true } } },
    });

    for (const apt of appointments) {
      const updated = await prisma.appointment.update({
        where: { id: apt.id },
        data: { status: 'cancelled' },
        include: { service: true, employee: { select: { id: true, name: true, userId: true } } },
      });
      notifyAppointmentStatusChanged(updated, apt.status);
    }
  }

  return block;
}

module.exports = { computeDatetimes, findConflicts, createBlock };
