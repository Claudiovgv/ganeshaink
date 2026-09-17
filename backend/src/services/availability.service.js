const { toZonedTime, fromZonedTime, format } = require('date-fns-tz');
const { parseISO, addMinutes, addDays, isBefore, isAfter } = require('date-fns');

const TIMEZONE = 'Europe/Lisbon';

/**
 * Converts "HH:mm" time string + "YYYY-MM-DD" date string → UTC Date
 * Interprets the time as Europe/Lisbon local time
 */
function normalizeTime(value) {
  const m = String(value || '').trim().match(/^(\d{1,2}):(\d{2})/);
  if (!m) return String(value || '').trim();
  return `${String(parseInt(m[1], 10)).padStart(2, '0')}:${m[2]}`;
}

function lisboaTimeToUTC(dateStr, timeStr) {
  const localDateStr = `${dateStr}T${normalizeTime(timeStr)}:00`;
  return fromZonedTime(new Date(localDateStr), TIMEZONE);
}

/**
 * Returns true if [slotStart, slotEnd) overlaps with [blockStart, blockEnd)
 */
function overlaps(slotStart, slotEnd, blockStart, blockEnd) {
  return isBefore(slotStart, blockEnd) && isAfter(slotEnd, blockStart);
}

function lisbonDateAndTime(now) {
  const zoned = toZonedTime(now, TIMEZONE);
  return {
    dateStr: format(zoned, 'yyyy-MM-dd', { timeZone: TIMEZONE }),
    timeStr: format(zoned, 'HH:mm', { timeZone: TIMEZONE }),
  };
}

function tomorrowDateStr(dateStr) {
  return format(addDays(parseISO(`${dateStr}T12:00:00`), 1), 'yyyy-MM-dd');
}

/**
 * After the employee's cutoff hour, the public site stops offering tomorrow.
 * Later days stay open. Backoffice bookings skip this check.
 */
function isNextDayCutoffClosed(employee, dateStr, now = new Date()) {
  if (!employee.nextDayCutoffEnabled) return false;
  const cutoff = employee.nextDayCutoffTime || '23:00';
  const { dateStr: today, timeStr } = lisbonDateAndTime(now);
  if (timeStr < cutoff) return false;
  return dateStr === tomorrowDateStr(today);
}

function formatHourLabel(hhmm) {
  const [h, m] = String(hhmm || '00:00').split(':');
  const hour = String(parseInt(h, 10) || 0);
  if (!m || m === '00') return `${hour}h`;
  return `${hour}h${m}`;
}

function earliestWorkStart(employee) {
  const times = (employee.workSchedules || [])
    .filter((ws) => ws.isActive && ws.startTime)
    .map((ws) => ws.startTime)
    .sort();
  return times[0] || '09:00';
}

function publicCutoffNotice(employee, dateStr, now = new Date()) {
  if (!isNextDayCutoffClosed(employee, dateStr, now)) return null;
  const start = earliestWorkStart(employee);
  const end = employee.nextDayCutoffTime || '23:00';
  return `O horário de agendamento online é das ${formatHourLabel(start)} às ${formatHourLabel(end)}. Já não é possível marcar para amanhã.`;
}

function lunchWindow(employee, dateStr) {
  if (!employee.lunchStart || !employee.lunchEnd) return null;
  if (employee.lunchStart >= employee.lunchEnd) return null;
  return {
    start: lisboaTimeToUTC(dateStr, employee.lunchStart),
    end: lisboaTimeToUTC(dateStr, employee.lunchEnd),
  };
}

/**
 * Returns available time slots for an employee on a given date.
 * @param {object} employee - with workSchedules, timeBlocks, appointments arrays
 * @param {string} dateStr - "YYYY-MM-DD"
 * @param {number} durationMin - service duration in minutes
 * @param {{ now?: Date }} [opts]
 * @returns {string[]} - array of "HH:mm" strings in Europe/Lisbon timezone
 */
function getAvailableSlots(employee, dateStr, durationMin, opts = {}) {
  if (isNextDayCutoffClosed(employee, dateStr, opts.now || new Date())) return [];

  const [year, month, day] = dateStr.split('-').map(Number);
  const dayOfWeek = new Date(Date.UTC(year, month - 1, day, 12, 0, 0)).getUTCDay();

  // Find work schedule for this day of week
  const schedule = employee.workSchedules.find(
    ws => ws.dayOfWeek === dayOfWeek && ws.isActive
  );
  if (!schedule) return [];

  // Convert work hours to UTC for comparison
  const workStart = lisboaTimeToUTC(dateStr, schedule.startTime);
  const workEnd = lisboaTimeToUTC(dateStr, schedule.endTime);
  const lunch = lunchWindow(employee, dateStr);

  // Grelha de 15 min: um dia livre mostra 11:30, 11:45, 12:00… e não só
  // horários saltados pela duração do serviço (ex.: cortes de 75 min).
  const SLOT_STEP_MIN = 15;
  const slots = [];
  let current = workStart;

  while (isBefore(current, workEnd)) {
    const slotEnd = addMinutes(current, durationMin);

    // Slot must fit entirely within work hours
    if (isAfter(slotEnd, workEnd)) break;

    const blockedByLunch = lunch
      ? overlaps(current, slotEnd, lunch.start, lunch.end)
      : false;

    // Check if slot is blocked by a time block
    const blockedByTimeBlock = employee.timeBlocks.some(tb =>
      overlaps(current, slotEnd, new Date(tb.startDatetime), new Date(tb.endDatetime))
    );

    // Check if slot is occupied by a non-cancelled appointment
    const blockedByAppointment = employee.appointments.some(apt =>
      apt.status !== 'cancelled' &&
      overlaps(current, slotEnd, new Date(apt.startDatetime), new Date(apt.endDatetime))
    );

    if (!blockedByLunch && !blockedByTimeBlock && !blockedByAppointment) {
      // Format as Lisbon local time "HH:mm"
      const zonedTime = toZonedTime(current, TIMEZONE);
      slots.push(format(zonedTime, 'HH:mm', { timeZone: TIMEZONE }));
    }

    current = addMinutes(current, SLOT_STEP_MIN);
  }

  return slots;
}

module.exports = {
  getAvailableSlots,
  lisboaTimeToUTC,
  isNextDayCutoffClosed,
  publicCutoffNotice,
  lunchWindow,
  overlaps,
};
