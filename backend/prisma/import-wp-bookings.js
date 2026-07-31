// One-off import of existing bookings from the old WordPress site (Pro Appointments plugin),
// so the handover to the new system doesn't lose upcoming appointments already on the books.
// Safe to re-run: skipped by matching on a synthetic cancel_token derived from the WP booking id.
require('dotenv').config();
const mysql = require('mysql2/promise');
const { fromZonedTime } = require('date-fns-tz');

function parseDbUrl(url) {
  const u = new URL(url);
  return {
    host: u.hostname, port: parseInt(u.port) || 3306,
    user: decodeURIComponent(u.username), password: decodeURIComponent(u.password),
    database: u.pathname.slice(1),
    // Store Date objects as true UTC, matching how Prisma reads/writes DateTime columns.
    // Without this, mysql2 converts using the machine's local timezone, causing a 1h drift.
    timezone: 'Z',
  };
}

const EMPLOYEE_BY_NAME = { 'Eduardo Gomes': 'Eduardo Gomes', 'Ricardo Vieira': 'Ricardo Vieira', 'Vera Ferreira': 'Vera Ferreira' };
const STATUS_MAP = { 'Confirmado': 'confirmed', 'Pendente': 'pending', 'Cancelado': 'cancelled', 'Completo': 'completed' };

// [wpId, 'DD/MM/YYYY', 'HH:MM', clientName, phone, email|null, serviceName, employeeName, statusPT]
const BOOKINGS = [
  [598, '02/09/2026', '14:30', 'Sr', '919686765', null, 'Barba Raspada', 'Eduardo Gomes', 'Confirmado'],
  [597, '29/08/2026', '14:00', 'Sr manuel', '919686765', null, 'Barba Raspada', 'Eduardo Gomes', 'Confirmado'],
  [596, '26/08/2026', '14:30', 'Sr manuel', '919686765', null, 'Barba Raspada', 'Eduardo Gomes', 'Confirmado'],
  [595, '22/08/2026', '14:00', 'Sr manuel', '919686765', null, 'Barba Raspada', 'Eduardo Gomes', 'Confirmado'],
  [594, '19/08/2026', '14:30', 'Sr manuel', '919686765', null, 'Barba Raspada', 'Eduardo Gomes', 'Confirmado'],
  [593, '15/08/2026', '14:00', 'Sr manuel', '919686765', null, 'Barba Raspada', 'Eduardo Gomes', 'Confirmado'],
  [586, '14/08/2026', '09:30', 'Ze Gaio', '919686765', null, 'Corte Raspado + Barba Detalhada', 'Eduardo Gomes', 'Confirmado'],
  [592, '12/08/2026', '14:30', 'Sr manuel', '919686765', null, 'Barba Raspada', 'Eduardo Gomes', 'Confirmado'],
  [591, '08/08/2026', '14:00', 'Sr manuel', '919686765', null, 'Barba Raspada', 'Eduardo Gomes', 'Confirmado'],
  [583, '08/08/2026', '10:45', 'Zé Carlos', '916186845', 'zecarlitos.pt@hotmail.com', 'Degradê', 'Eduardo Gomes', 'Confirmado'],
  [562, '08/08/2026', '09:30', 'Fernanda Almeida', '916679171', null, 'Unhas Verniz Gel', 'Vera Ferreira', 'Confirmado'],
  [588, '07/08/2026', '14:00', 'Tavares De Almeida Christophe', '0642625986', 'chris_tavares@hotmail.fr', 'Pack Premium', 'Eduardo Gomes', 'Confirmado'],
  [599, '06/08/2026', '18:00', 'Joao fio da navalha', '919686765', null, 'Corte Raspado + Barba Detalhada', 'Eduardo Gomes', 'Pendente'],
  [590, '05/08/2026', '14:30', 'Sr manuel', '919686765', null, 'Barba Raspada', 'Eduardo Gomes', 'Confirmado'],
  [417, '04/08/2026', '17:00', 'Dorothee', '916679171', null, 'Unhas Verniz Gel', 'Vera Ferreira', 'Confirmado'],
  [575, '01/08/2026', '17:00', 'Ana Senica', '8605180803', 'anasenica@icloud.com', 'Unhas de Gel — Manutenção', 'Vera Ferreira', 'Pendente'],
  [582, '01/08/2026', '14:00', 'Ana Senica', '916679171', null, 'Unhas de Gel — Manutenção', 'Vera Ferreira', 'Pendente'],
  [572, '01/08/2026', '11:30', 'Ze Ferreira', '919686765', null, 'Barba Detalhada', 'Eduardo Gomes', 'Confirmado'],
  [581, '01/08/2026', '11:15', 'Mãe vera', '916679171', null, 'Unhas Verniz Gel', 'Vera Ferreira', 'Confirmado'],
  [589, '01/08/2026', '10:30', 'Nelson', '919686765', null, 'Degradê', 'Eduardo Gomes', 'Confirmado'],
  [569, '01/08/2026', '09:30', 'Lara Beatriz Almeida', '916013917', 'larabeatrizzaa12@gmail.com', 'Unhas de Gel — 1ª Colocação c/ Extensão', 'Vera Ferreira', 'Confirmado'],
  [587, '01/08/2026', '09:30', 'Ricardo Fortuna', '919615770', 'fortunalmeida@gmail.com', 'Corte Raspado + Barba Detalhada', 'Eduardo Gomes', 'Confirmado'],
  [555, '01/08/2026', '09:00', 'Alex furos', '919686765', null, 'Barba Raspada', 'Eduardo Gomes', 'Confirmado'],
  [570, '31/07/2026', '17:30', 'Cliente lux', '919686765', null, 'Corte Raspado + Barba Detalhada', 'Eduardo Gomes', 'Confirmado'],
  [567, '31/07/2026', '17:00', 'Isabel', '913570454', null, 'Unhas Verniz Gel', 'Vera Ferreira', 'Confirmado'],
  [585, '31/07/2026', '11:00', 'Tiago valente', '919686765', null, 'Degradê + Barba Detalhada', 'Eduardo Gomes', 'Confirmado'],
  [551, '31/07/2026', '09:30', 'Ze Gaio', '919686765', null, 'Corte Raspado + Barba Detalhada', 'Eduardo Gomes', 'Confirmado'],
];

function parseDateTime(dateStr, timeStr) {
  const [d, m, y] = dateStr.split('/').map(Number);
  const isoDate = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  // Same conversion the booking form uses: interpret as Europe/Lisbon wall-clock time, store as true UTC.
  return fromZonedTime(new Date(`${isoDate}T${timeStr}:00`), 'Europe/Lisbon');
}

async function main() {
  const conn = await mysql.createConnection(parseDbUrl(process.env.DATABASE_URL));
  console.log('Importing WordPress bookings...');

  const [employeeRows] = await conn.query('SELECT id, name FROM employees');
  const [serviceRows] = await conn.query('SELECT id, name, duration_min FROM services');
  const employeeIdByName = Object.fromEntries(employeeRows.map((e) => [e.name, e.id]));
  const serviceByName = Object.fromEntries(serviceRows.map((s) => [s.name, s]));

  let imported = 0, skipped = 0;
  for (const [wpId, dateStr, timeStr, clientName, phone, email, serviceName, employeeName, statusPT] of BOOKINGS) {
    const cancelToken = `wp-import-${wpId}`;

    const [[existing]] = await conn.query('SELECT id FROM appointments WHERE cancel_token = ?', [cancelToken]);
    if (existing) { skipped++; continue; }

    const employeeId = employeeIdByName[EMPLOYEE_BY_NAME[employeeName]];
    const service = serviceByName[serviceName];
    if (!employeeId || !service) {
      console.warn(`⚠ Sem correspondência para #${wpId}: employee="${employeeName}" service="${serviceName}" — ignorado`);
      skipped++;
      continue;
    }

    const start = parseDateTime(dateStr, timeStr);
    const end = new Date(start.getTime() + service.duration_min * 60000);
    const clientEmail = email || `${phone.replace(/\D/g, '')}@sememail.ganeshaink.pt`;
    const status = STATUS_MAP[statusPT] || 'confirmed';

    await conn.execute(
      `INSERT INTO appointments
        (client_name, client_email, client_phone, employee_id, service_id, start_datetime, end_datetime, status, cancel_token, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [clientName, clientEmail, phone, employeeId, service.id, start, end, status, cancelToken, `Importado do site antigo (WP #${wpId})`]
    );
    imported++;
  }

  console.log(`✓ ${imported} marcações importadas, ${skipped} ignoradas (já existentes ou sem correspondência).`);
  await conn.end();
}

main().catch((err) => { console.error(err.message); process.exit(1); });
