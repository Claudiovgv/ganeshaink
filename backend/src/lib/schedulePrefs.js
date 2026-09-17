function normalizeTime(value) {
  const m = String(value || '').trim().match(/^(\d{1,2}):(\d{2})/);
  if (!m) return '';
  return `${String(parseInt(m[1], 10)).padStart(2, '0')}:${m[2]}`;
}

const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

function parseSchedulePrefs(body) {
  const prefs = {};
  if (body.lunchStart !== undefined || body.lunchEnd !== undefined) {
    const lunchStart = body.lunchStart === '' || body.lunchStart == null ? null : normalizeTime(body.lunchStart);
    const lunchEnd = body.lunchEnd === '' || body.lunchEnd == null ? null : normalizeTime(body.lunchEnd);
    if ((lunchStart && !lunchEnd) || (!lunchStart && lunchEnd)) {
      return { error: 'A hora de almoço precisa de início e fim' };
    }
    if (lunchStart && lunchEnd) {
      if (!TIME_RE.test(lunchStart) || !TIME_RE.test(lunchEnd)) {
        return { error: 'Hora de almoço inválida (formato HH:MM)' };
      }
      if (lunchStart >= lunchEnd) {
        return { error: 'O fim do almoço tem de ser depois do início' };
      }
    }
    prefs.lunchStart = lunchStart;
    prefs.lunchEnd = lunchEnd;
  }
  if (body.nextDayCutoffEnabled !== undefined) {
    prefs.nextDayCutoffEnabled = Boolean(body.nextDayCutoffEnabled);
  }
  if (body.nextDayCutoffTime !== undefined) {
    const t = normalizeTime(body.nextDayCutoffTime || '23:00');
    if (!TIME_RE.test(t)) return { error: 'Hora de corte inválida (formato HH:MM)' };
    prefs.nextDayCutoffTime = t;
  }
  return { prefs };
}

function selectPrefs(employee) {
  return {
    lunchStart: employee.lunchStart || '',
    lunchEnd: employee.lunchEnd || '',
    nextDayCutoffEnabled: Boolean(employee.nextDayCutoffEnabled),
    nextDayCutoffTime: employee.nextDayCutoffTime || '23:00',
  };
}

module.exports = { TIME_RE, parseSchedulePrefs, selectPrefs, normalizeTime };
