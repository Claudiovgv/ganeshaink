// Runs SQL migrations directly via mysql2 — no Prisma CLI, no WebAssembly
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

function parseDbUrl(url) {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: parseInt(u.port) || 3306,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.slice(1),
    multipleStatements: true,
  };
}

async function runMigrations() {
  const conn = await mysql.createConnection(parseDbUrl(process.env.DATABASE_URL));

  const migrationsDir = path.join(__dirname, 'migrations');
  if (!fs.existsSync(migrationsDir)) {
    console.log('No migrations directory found.');
    await conn.end();
    return;
  }

  const dirs = fs.readdirSync(migrationsDir)
    .filter(d => fs.statSync(path.join(migrationsDir, d)).isDirectory())
    .sort();

  for (const dir of dirs) {
    const sqlFile = path.join(migrationsDir, dir, 'migration.sql');
    if (!fs.existsSync(sqlFile)) continue;

    const sql = fs.readFileSync(sqlFile, 'utf8');
    console.log(`Running: ${dir}`);
    await conn.query(sql);
    console.log('✓ Done');
  }

  console.log('All migrations applied!');
  await conn.end();
}

runMigrations().catch(err => {
  console.error(err.message);
  process.exit(1);
});
