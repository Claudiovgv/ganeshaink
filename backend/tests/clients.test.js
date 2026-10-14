const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const prisma = require('../src/config/database');
const { ensureCategory } = require('./helpers/categories');

let adminToken;
let employee;
let service;

beforeAll(async () => {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS client_nicknames (
      id INT NOT NULL AUTO_INCREMENT,
      email VARCHAR(191) NOT NULL,
      nickname VARCHAR(191) NOT NULL,
      updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      PRIMARY KEY (id),
      UNIQUE INDEX client_nicknames_email_key (email)
    ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `);
  await prisma.appointment.deleteMany({
    where: { clientEmail: { in: ['ana@test.com', 'ana.nova@test.com', 'bruno@test.com', 'ghost@test.com'] } },
  });
  const leftover = await prisma.user.findMany({
    where: { email: { in: ['admin-clients@test.com', 'emp-clients@test.com'] } },
    include: { employee: true },
  });
  const leftoverEmployeeIds = leftover.map((u) => u.employee?.id).filter(Boolean);
  if (leftoverEmployeeIds.length) {
    await prisma.appointment.deleteMany({ where: { employeeId: { in: leftoverEmployeeIds } } });
    await prisma.employee.deleteMany({ where: { id: { in: leftoverEmployeeIds } } });
  }
  await prisma.user.deleteMany({ where: { email: { in: ['admin-clients@test.com', 'emp-clients@test.com'] } } });

  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin Clients',
      email: 'admin-clients@test.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
    },
  });
  adminToken = jwt.sign(
    { id: adminUser.id, email: adminUser.email, role: adminUser.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  );

  const empUser = await prisma.user.create({
    data: {
      name: 'Emp Clients',
      email: 'emp-clients@test.com',
      password: await bcrypt.hash('emp123', 10),
      role: 'employee',
      employee: { create: { name: 'Emp Clients', isActive: true } },
    },
    include: { employee: true },
  });
  employee = empUser.employee;

  const category = await ensureCategory('barbershop', 'Barbearia');
  service = await prisma.service.create({
    data: { name: 'Clients Test Svc', categoryId: category.id, durationMin: 30, price: 10 },
  });
});

afterAll(async () => {
  await prisma.appointment.deleteMany({ where: { employeeId: employee.id } });
  await prisma.consultationRequest.deleteMany({ where: { serviceId: service.id } });
  await prisma.clientNickname.deleteMany({
    where: { email: { in: ['ana@test.com', 'ana.nova@test.com', 'bruno@test.com', 'ghost@test.com'] } },
  }).catch(() => {});
  await prisma.service.delete({ where: { id: service.id } });
  await prisma.employee.delete({ where: { id: employee.id } });
  await prisma.user.deleteMany({ where: { email: { in: ['admin-clients@test.com', 'emp-clients@test.com'] } } });
});

async function makeAppointment({ name, email, phone, token, start }) {
  return prisma.appointment.create({
    data: {
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      employeeId: employee.id,
      serviceId: service.id,
      startDatetime: start,
      endDatetime: new Date(start.getTime() + 30 * 60000),
      status: 'confirmed',
      cancelToken: token,
    },
  });
}

describe('PUT /v1/admin/clients/:email', () => {
  it('returns 401 without token', async () => {
    const res = await request(app)
      .put(`/v1/admin/clients/${encodeURIComponent('ana@test.com')}`)
      .send({ name: 'Ana', email: 'ana@test.com', phone: '910000001' });
    expect(res.status).toBe(401);
  });

  it('updates name, phone and nickname on every appointment of that client', async () => {
    await makeAppointment({
      name: 'Ana',
      email: 'ana@test.com',
      phone: '910000001',
      token: 'cli-ana-1',
      start: new Date('2026-06-01T09:00:00Z'),
    });
    await makeAppointment({
      name: 'Ana',
      email: 'ana@test.com',
      phone: '910000001',
      token: 'cli-ana-2',
      start: new Date('2026-06-02T09:00:00Z'),
    });

    const res = await request(app)
      .put(`/v1/admin/clients/${encodeURIComponent('ana@test.com')}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Ana Silva', email: 'ana@test.com', phone: '919191919', nickname: 'Silva' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      name: 'Ana Silva',
      email: 'ana@test.com',
      phone: '919191919',
      nickname: 'Silva',
    });

    const apts = await prisma.appointment.findMany({ where: { clientEmail: 'ana@test.com' } });
    expect(apts).toHaveLength(2);
    expect(apts.every((a) => a.clientName === 'Ana Silva')).toBe(true);
    expect(apts.every((a) => a.clientPhone === '919191919')).toBe(true);

    const nick = await prisma.clientNickname.findUnique({ where: { email: 'ana@test.com' } });
    expect(nick.nickname).toBe('Silva');
  });

  it('moves the client to a new email and keeps the nickname', async () => {
    const res = await request(app)
      .put(`/v1/admin/clients/${encodeURIComponent('ana@test.com')}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Ana Silva', email: 'ana.nova@test.com', phone: '919191919', nickname: 'Silva' });

    expect(res.status).toBe(200);
    expect(res.body.email).toBe('ana.nova@test.com');

    const old = await prisma.appointment.count({ where: { clientEmail: 'ana@test.com' } });
    const moved = await prisma.appointment.count({ where: { clientEmail: 'ana.nova@test.com' } });
    expect(old).toBe(0);
    expect(moved).toBe(2);

    const oldNick = await prisma.clientNickname.findUnique({ where: { email: 'ana@test.com' } });
    const newNick = await prisma.clientNickname.findUnique({ where: { email: 'ana.nova@test.com' } });
    expect(oldNick).toBeNull();
    expect(newNick.nickname).toBe('Silva');
  });

  it('rejects an email that already belongs to another client', async () => {
    await makeAppointment({
      name: 'Bruno',
      email: 'bruno@test.com',
      phone: '910000002',
      token: 'cli-bruno-1',
      start: new Date('2026-06-03T09:00:00Z'),
    });

    const res = await request(app)
      .put(`/v1/admin/clients/${encodeURIComponent('ana.nova@test.com')}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Ana Silva', email: 'bruno@test.com', phone: '919191919' });

    expect(res.status).toBe(409);
  });

  it('returns 404 when the client does not exist', async () => {
    const res = await request(app)
      .put(`/v1/admin/clients/${encodeURIComponent('ghost@test.com')}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Fantasma', email: 'ghost@test.com', phone: '910000000' });

    expect(res.status).toBe(404);
  });

  it('returns 400 when name, email or phone is missing', async () => {
    const res = await request(app)
      .put(`/v1/admin/clients/${encodeURIComponent('bruno@test.com')}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Bruno' });

    expect(res.status).toBe(400);
  });
});
