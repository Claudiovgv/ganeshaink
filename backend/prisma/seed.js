// Seeds the database via mysql2 — no Prisma CLI, no WebAssembly
require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

function parseDbUrl(url) {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: parseInt(u.port) || 3306,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.slice(1),
  };
}

async function main() {
  const conn = await mysql.createConnection(parseDbUrl(process.env.DATABASE_URL));
  console.log('Seeding database...');

  const adminHash = await bcrypt.hash('admin123', 10);
  await conn.execute(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id',
    ['Admin', 'admin@ganeshaink.pt', adminHash, 'admin']
  );
  const [[adminRow]] = await conn.execute('SELECT id FROM users WHERE email = ?', ['admin@ganeshaink.pt']);
  console.log('✓ Admin:', adminRow.id);

  const barbHash = await bcrypt.hash('barb123', 10);
  await conn.execute(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id',
    ['João Silva', 'joao@ganeshaink.pt', barbHash, 'employee']
  );
  const [[barbUserRow]] = await conn.execute('SELECT id FROM users WHERE email = ?', ['joao@ganeshaink.pt']);

  await conn.execute(
    'INSERT INTO employees (user_id, name, bio, is_active) VALUES (?, ?, ?, 1) ON DUPLICATE KEY UPDATE id=id',
    [barbUserRow.id, 'João Silva', 'Especialista em cortes modernos e degradê com 5 anos de experiência.']
  );
  const [[empRow]] = await conn.execute('SELECT id FROM employees WHERE user_id = ?', [barbUserRow.id]);
  console.log('✓ Barbeiro:', barbUserRow.id, '/ employee:', empRow.id);

  const services = [
    [1, 'Corte Simples',    'barbershop', 'Corte de cabelo clássico.',         30,  12.00, 0],
    [2, 'Corte Degradê',    'barbershop', 'Corte moderno em degradê.',          45,  15.00, 0],
    [3, 'Barba',            'barbershop', 'Aparar e modelar a barba.',          20,   8.00, 0],
    [4, 'Corte + Barba',    'barbershop', 'Pacote completo cabelo e barba.',    50,  18.00, 0],
    [5, 'Tatuagem Pequena', 'tattoo',     'Tatuagem até 5cm.',                  90,  60.00, 1],
    [6, 'Tatuagem Média',   'tattoo',     'Tatuagem entre 5-15cm.',            180, 120.00, 1],
    [7, 'Piercing Simples', 'piercing',   'Piercing com material incluído.',    30,  25.00, 1],
    [8, 'Gel Completo',     'nails',      'Aplicação completa de gel.',         60,  35.00, 0],
    [9, 'Gel + Decoração',  'nails',      'Gel com nail art incluída.',         90,  45.00, 0],
  ];

  for (const [id, name, category, description, durationMin, price, req] of services) {
    await conn.execute(
      'INSERT INTO services (id, name, category, description, duration_min, price, requires_consultation) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id',
      [id, name, category, description, durationMin, price, req]
    );
  }
  console.log('✓ 9 serviços criados');

  for (const sid of [1, 2, 3, 4]) {
    await conn.execute(
      'INSERT IGNORE INTO employee_services (employee_id, service_id) VALUES (?, ?)',
      [empRow.id, sid]
    );
  }

  await conn.execute('DELETE FROM work_schedules WHERE employee_id = ?', [empRow.id]);
  for (const day of [1, 2, 3, 4, 5]) {
    await conn.execute(
      'INSERT INTO work_schedules (employee_id, day_of_week, start_time, end_time, is_active) VALUES (?, ?, ?, ?, 1)',
      [empRow.id, day, '09:00', '18:00']
    );
  }
  console.log('✓ Horário Seg-Sex 09:00-18:00');

  console.log('\n✅ Seed completo!');
  console.log('Admin: admin@ganeshaink.pt / admin123');
  console.log('Barbeiro: joao@ganeshaink.pt / barb123');

  await conn.end();
}

main().catch(err => { console.error(err.message); process.exit(1); });
