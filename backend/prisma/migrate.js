// Runs SQL migrations directly via mysql2 — no Prisma CLI, no WebAssembly.
// Tracks which migrations already ran so this is safe to run on every deploy.
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

  await conn.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name VARCHAR(191) NOT NULL PRIMARY KEY,
      applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const migrationsDir = path.join(__dirname, 'migrations');
  if (!fs.existsSync(migrationsDir)) {
    console.log('No migrations directory found.');
    await conn.end();
    return;
  }

  const [appliedRows] = await conn.query('SELECT name FROM _migrations');
  const applied = new Set(appliedRows.map((r) => r.name));

  const dirs = fs.readdirSync(migrationsDir)
    .filter(d => fs.statSync(path.join(migrationsDir, d)).isDirectory())
    .sort();

  let ran = 0;
  for (const dir of dirs) {
    if (applied.has(dir)) continue;

    const sqlFile = path.join(migrationsDir, dir, 'migration.sql');
    if (!fs.existsSync(sqlFile)) continue;

    const sql = fs.readFileSync(sqlFile, 'utf8');
    console.log(`Running: ${dir}`);
    await conn.query(sql);
    await conn.query('INSERT INTO _migrations (name) VALUES (?)', [dir]);
    console.log('✓ Done');
    ran++;
  }

  console.log(ran > 0 ? `All migrations applied! (${ran} new)` : 'Nothing to do — already up to date.');
  await conn.end();
}

runMigrations().catch(err => {
  console.error(err.message);
  process.exit(1);
});
