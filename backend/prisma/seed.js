// Seeds the database via mysql2 — no Prisma CLI, no WebAssembly.
// Safe to re-run: resets services/team/schedules to this known-good state.
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

// Serviços reais (nome, categoria, descrição, duração em min, preço, requer consulta)
// Preço 0.00 = "sob consulta" (aparece como "—" no site, fica em aberto para a equipa definir)
const SERVICES = [
  // Barbearia
  ['Barba Raspada', 'barbershop', '', 30, 5.00, false],
  ['Barba Detalhada', 'barbershop', 'Barba, volume e contornos', 40, 6.00, false],
  ['Pack Premium', 'barbershop', 'Corte de Cabelo + Barba + Trimer + Extra Care', 105, 25.00, false],
  ['Corte de Cabelo e Barba', 'barbershop', '', 30, 12.00, false],
  ['Degradê + Barba Detalhada', 'barbershop', 'Degradê + Barba volume e contornos', 75, 18.00, false],
  ['Tesoura + Barba Detalhada', 'barbershop', 'Corte todo na tesoura + Barba volume e contornos', 75, 18.00, false],
  ['Corte Social + Barba Detalhada', 'barbershop', 'Corte com 1 só pente nas laterais + Barba volume e contornos', 60, 17.00, false],
  ['Corte Raspado + Barba Detalhada', 'barbershop', 'Corte raspado de 1 só pente + Barba volume e contornos', 60, 15.00, false],
  ['Corte Degradê + Barba Raspada', 'barbershop', 'Degradê e barba', 75, 17.00, false],
  ['Corte a Tesoura + Barba Raspada', 'barbershop', 'Corte só com tesoura e barba raspada', 60, 17.00, false],
  ['Corte Social + Barba Raspada', 'barbershop', 'Corte social (laterais 1 só pente) e barba raspada', 60, 16.00, false],
  ['Corte Rapado + Barba Raspada', 'barbershop', 'Cabelo rapado só com 1 pente e barba raspada', 50, 14.00, false],
  ['Degradê', 'barbershop', 'Corte de degradê', 45, 13.00, false],
  ['Corte a Tesoura', 'barbershop', 'Corte só a tesoura', 45, 13.00, false],
  ['Corte Social / Clássico', 'barbershop', 'Corte estilo clássico', 45, 12.00, false],
  ['Corte Rapado', 'barbershop', 'Rapar o cabelo só com 1 pente', 30, 10.00, false],
  // Tatuagem — preço sob consulta
  ['Tatuagem Pequena', 'tattoo', 'Tatuagem de pequena dimensão.', 90, 0.00, true],
  ['Tatuagem Média', 'tattoo', 'Tatuagem de dimensão média.', 180, 0.00, true],
  // Piercing
  ['Piercing', 'piercing', 'Furação inicial com jóia', 30, 40.00, false],
  ['Pack Piercing + Cicatrizante', 'piercing', 'Furação + jóia + cicatrizante', 30, 45.00, false],
  // Unhas
  ['Unhas Verniz Gel', 'nails', 'Manicure simples com verniz gel (uma/duas cores, sem desenhos, francesa ou pedras)', 60, 15.00, false],
  ['Unhas de Gel — 1ª Colocação s/ Extensão', 'nails', 'Pintura em apenas uma/duas cores, sem desenhos, pedras ou francesa', 90, 21.00, false],
  ['Unhas de Gel — 1ª Colocação c/ Extensão', 'nails', 'Pintura em apenas uma/duas cores, sem desenhos, pedras ou francesa', 95, 24.00, false],
  ['Unhas de Gel — Manutenção', 'nails', 'Sem desenhos, pedras ou francesa. Unhas partidas têm custo extra.', 80, 18.00, false],
  ['Remoção Verniz Gel / Gel', 'nails', '', 20, 7.00, false],
  ['Pedicure Simples S/ Verniz', 'nails', 'Ligeira esfoliação + corte de unhas, sem aplicação de verniz', 45, 13.00, false],
  ['Pedicure Simples C/ Verniz Gel', 'nails', 'Ligeira esfoliação + corte de unhas, com verniz gel', 60, 21.00, false],
  ['Pedicure Complexa S/ Verniz', 'nails', 'Esfoliação + hidratante', 60, 19.00, false],
  ['Pedicure Complexa C/ Verniz Gel', 'nails', 'Esfoliação + hidratante + verniz gel', 90, 26.00, false],
];

async function main() {
  const conn = await mysql.createConnection(parseDbUrl(process.env.DATABASE_URL));
  console.log('Seeding database...');

  // Superadmin
  const superadminHash = await bcrypt.hash('admin123', 10);
  await conn.execute(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id',
    ['Admin', 'admin@ganeshaink.pt', superadminHash, 'admin']
  );
  console.log('✓ Admin de fallback: admin@ganeshaink.pt / admin123');

  // Serviços — reset limpo (dev/local só tem dados de teste)
  await conn.execute('DELETE FROM appointments');
  await conn.execute('DELETE FROM consultation_requests');
  await conn.execute('DELETE FROM employee_services');
  await conn.execute('DELETE FROM services');
  await conn.execute('ALTER TABLE services AUTO_INCREMENT = 1');

  const serviceIdsByCategory = { barbershop: [], tattoo: [], piercing: [], nails: [] };
  for (const [name, category, description, durationMin, price, requiresConsultation] of SERVICES) {
    const [result] = await conn.execute(
      'INSERT INTO services (name, category, description, duration_min, price, requires_consultation) VALUES (?, ?, ?, ?, ?, ?)',
      [name, category, description, durationMin, price, requiresConsultation]
    );
    serviceIdsByCategory[category].push(result.insertId);
  }
  console.log(`✓ ${SERVICES.length} serviços criados`);

  console.log('\n✅ Seed completo!');
  console.log('Admin de fallback: admin@ganeshaink.pt / admin123 (muda esta password em produção)');
  console.log('Para criar a equipa real (nomes/passwords), corre separadamente: node prisma/seed-team.js');
  console.log('  (esse script não é commitado — contém credenciais reais, ver .gitignore)');
  await conn.end();
}

main().catch((err) => { console.error(err.message); process.exit(1); });
