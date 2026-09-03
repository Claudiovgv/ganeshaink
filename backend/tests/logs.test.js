const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const prisma = require('../src/config/database');

let superToken, adminToken, superUser, adminUser;

beforeAll(async () => {
  await prisma.user.deleteMany({ where: { email: { in: ['logs-sa@test.com', 'logs-admin@test.com'] } } });
  superUser = await prisma.user.create({
    data: { name: 'Logs SA', email: 'logs-sa@test.com', password: await bcrypt.hash('pass123', 10), role: 'superadmin' },
  });
  adminUser = await prisma.user.create({
    data: { name: 'Logs Admin', email: 'logs-admin@test.com', password: await bcrypt.hash('pass123', 10), role: 'admin' },
  });
  superToken = jwt.sign({ id: superUser.id, email: superUser.email, role: 'superadmin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  adminToken = jwt.sign({ id: adminUser.id, email: adminUser.email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
  await prisma.systemLog.deleteMany({ where: { category: { in: ['frontend', 'logs-test'] } } });
  await prisma.user.deleteMany({ where: { email: { in: ['logs-sa@test.com', 'logs-admin@test.com'] } } });
});

describe('POST /v1/client-errors', () => {
  it('records a frontend error in the system log', async () => {
    const res = await request(app)
      .post('/v1/client-errors')
      .send({ message: 'Erro ao carregar categorias', path: '/marcar', source: 'frontend' });
    expect(res.status).toBe(204);

    const row = await prisma.systemLog.findFirst({
      where: { category: 'frontend', message: { contains: 'Erro ao carregar categorias' } },
      orderBy: { createdAt: 'desc' },
    });
    expect(row).toBeTruthy();
    expect(row.level).toBe('error');
  });

  it('rejects an empty message', async () => {
    const res = await request(app).post('/v1/client-errors').send({ message: '' });
    expect(res.status).toBe(400);
  });
});

describe('DELETE /v1/admin/logs', () => {
  it('refuses admin (superadmin only)', async () => {
    const res = await request(app).delete('/v1/admin/logs').set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(403);
  });

  it('clears all logs for superadmin', async () => {
    await prisma.systemLog.create({ data: { level: 'info', category: 'logs-test', message: 'to delete' } });
    const res = await request(app).delete('/v1/admin/logs').set('Authorization', `Bearer ${superToken}`);
    expect(res.status).toBe(200);
    expect(res.body.deleted).toBeGreaterThanOrEqual(1);
    const leftover = await prisma.systemLog.count({ where: { category: 'logs-test' } });
    expect(leftover).toBe(0);
  });
});

describe('DELETE /v1/admin/logs/login-blocks', () => {
  it('lets superadmin unlock logins', async () => {
    const res = await request(app).delete('/v1/admin/logs/login-blocks').set('Authorization', `Bearer ${superToken}`);
    expect(res.status).toBe(200);
  });
});
