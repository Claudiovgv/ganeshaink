const { toZonedTime, fromZonedTime, format } = require('date-fns-tz');
const { parseISO, addMinutes, isBefore, isAfter } = require('date-fns');

const TIMEZONE = 'Europe/Lisbon';

/**
 * Converts "HH:mm" time string + "YYYY-MM-DD" date string → UTC Date
 * Interprets the time as Europe/Lisbon local time
 */
function lisboaTimeToUTC(dateStr, timeStr) {
  const localDateStr = `${dateStr}T${timeStr}:00`;
  return fromZonedTime(new Date(localDateStr), TIMEZONE);
}

/**
 * Returns true if [slotStart, slotEnd) overlaps with [blockStart, blockEnd)
 */
function overlaps(slotStart, slotEnd, blockStart, blockEnd) {
  return isBefore(slotStart, blockEnd) && isAfter(slotEnd, blockStart);
}

/**
 * Returns available time slots for an employee on a given date.
 * @param {object} employee - with workSchedules, timeBlocks, appointments arrays
 * @param {string} dateStr - "YYYY-MM-DD"
 * @param {number} durationMin - service duration in minutes
 * @returns {string[]} - array of "HH:mm" strings in Europe/Lisbon timezone
 */
function getAvailableSlots(employee, dateStr, durationMin) {
  const date = parseISO(dateStr);
  const dayOfWeek = date.getDay(); // 0=Sunday, 6=Saturday

  // Find work schedule for this day of week
  const schedule = employee.workSchedules.find(
    ws => ws.dayOfWeek === dayOfWeek && ws.isActive
  );
  if (!schedule) return [];

  // Convert work hours to UTC for comparison
  const workStart = lisboaTimeToUTC(dateStr, schedule.startTime);
  const workEnd = lisboaTimeToUTC(dateStr, schedule.endTime);

  const slots = [];
  let current = workStart;

  while (isBefore(current, workEnd)) {
    const slotEnd = addMinutes(current, durationMin);

    // Slot must fit entirely within work hours
    if (isAfter(slotEnd, workEnd)) break;

    // Check if slot is blocked by a time block
    const blockedByTimeBlock = employee.timeBlocks.some(tb =>
      overlaps(current, slotEnd, new Date(tb.startDatetime), new Date(tb.endDatetime))
    );

    // Check if slot is occupied by a non-cancelled appointment
    const blockedByAppointment = employee.appointments.some(apt =>
      apt.status !== 'cancelled' &&
      overlaps(current, slotEnd, new Date(apt.startDatetime), new Date(apt.endDatetime))
    );

    if (!blockedByTimeBlock && !blockedByAppointment) {
      // Format as Lisbon local time "HH:mm"
      const zonedTime = toZonedTime(current, TIMEZONE);
      slots.push(format(zonedTime, 'HH:mm', { timeZone: TIMEZONE }));
    }

    current = addMinutes(current, durationMin);
  }

  return slots;
}

module.exports = { getAvailableSlots, lisboaTimeToUTC };
