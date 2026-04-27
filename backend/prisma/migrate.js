// Runs migrations without the Prisma CLI (avoids WebAssembly OOM on CloudLinux)
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('../src/generated/client');

const prisma = new PrismaClient();

async function runMigrations() {
  const migrationsDir = path.join(__dirname, 'migrations');

  if (!fs.existsSync(migrationsDir)) {
    console.log('No migrations directory found.');
    return;
  }

  const dirs = fs.readdirSync(migrationsDir)
    .filter(d => fs.statSync(path.join(migrationsDir, d)).isDirectory())
    .sort();

  for (const dir of dirs) {
    const sqlFile = path.join(migrationsDir, dir, 'migration.sql');
    if (!fs.existsSync(sqlFile)) continue;

    const sql = fs.readFileSync(sqlFile, 'utf8');
    const statements = sql
      .split(';')
      .map(s => s.replace(/--[^\n]*/g, '').trim())
      .filter(s => s.length > 0);

    console.log(`Running: ${dir}`);
    for (const stmt of statements) {
      await prisma.$executeRawUnsafe(stmt);
    }
    console.log(`✓ Done`);
  }

  console.log('All migrations applied!');
  await prisma.$disconnect();
}

runMigrations().catch(err => {
  console.error(err.message);
  process.exit(1);
});
