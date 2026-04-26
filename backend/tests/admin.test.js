const request = require('supertest');
const app = require('../src/index');
const prisma = require('../src/config/database');
const bcrypt = require('bcryptjs');

let adminToken, adminUser, empUser, employee, service;

beforeAll(async () => {
  await prisma.user.deleteMany({ where: { email: { in: ['admin-rt@test.com', 'emp-rt@test.com'] } } });

  adminUser = await prisma.user.create({
    data: { name: 'Admin Route Test', email: 'admin-rt@test.com', password: await bcrypt.hash('admin123', 10), role: 'admin' },
  });

  const loginRes = await request(app).post('/v1/auth/login').send({ email: 'admin-rt@test.com', password: 'admin123' });
  adminToken = loginRes.body.token;

  empUser = await prisma.user.create({
    data: {
      name: 'Emp Route Test', email: 'emp-rt@test.com', password: await bcrypt.hash('emp123', 10), role: 'employee',
      employee: { create: { name: 'Emp Route Test', isActive: true } },
    },
    include: { employee: true },
  });
  employee = empUser.employee;

  service = await prisma.service.create({
    data: { name: 'Admin Test Svc', category: 'barbershop', durationMin: 30, price: 10 },
  });
});

afterAll(async () => {
  await prisma.appointment.deleteMany({ where: { employeeId: employee.id } });
  await prisma.consultationRequest.deleteMany({ where: { serviceId: service.id } });
  await prisma.service.delete({ where: { id: service.id } });
  await prisma.employee.delete({ where: { id: employee.id } });
  await prisma.user.deleteMany({ where: { email: { in: ['admin-rt@test.com', 'emp-rt@test.com'] } } });
});

describe('GET /v1/admin/appointments', () => {
  it('returns 401 without token', async () => {
    const res = await request(app).get('/v1/admin/appointments');
    expect(res.status).toBe(401);
  });

  it('returns appointment list for admin', async () => {
    const res = await request(app).get('/v1/admin/appointments').set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /v1/admin/appointments', () => {
  it('admin can create appointment manually', async () => {
    const res = await request(app)
      .post('/v1/admin/appointments')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ clientName: 'Manual Client', clientEmail: 'manual@test.com', clientPhone: '955555555', employeeId: employee.id, serviceId: service.id, date: '2026-05-05', time: '14:00' });
    expect(res.status).toBe(201);
    expect(res.body.clientName).toBe('Manual Client');
    expect(res.body.status).toBe('confirmed');
  });
});

describe('PUT /v1/admin/appointments/:id', () => {
  let apt;
  beforeAll(async () => {
    apt = await prisma.appointment.create({
      data: { clientName: 'Update Test', clientEmail: 'upd@test.com', clientPhone: '966666666', employeeId: employee.id, serviceId: service.id, startDatetime: new Date('2026-05-06T09:00:00Z'), endDatetime: new Date('2026-05-06T09:30:00Z'), status: 'confirmed', cancelToken: 'upd-token-123' },
    });
  });

  it('admin can cancel an appointment', async () => {
    const res = await request(app).put(`/v1/admin/appointments/${apt.id}`).set('Authorization', `Bearer ${adminToken}`).send({ status: 'cancelled' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('cancelled');
  });
});

describe('GET /v1/admin/consultations', () => {
  it('returns consultation list for admin', async () => {
    const res = await request(app).get('/v1/admin/consultations').set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /v1/admin/employees', () => {
  it('admin can create a new employee', async () => {
    const res = await request(app)
      .post('/v1/admin/employees')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'New Emp', email: 'new-emp-admin@test.com', password: 'pass123' });
    expect(res.status).toBe(201);
    expect(res.body.employee).toBeDefined();
    // cleanup
    await prisma.employee.deleteMany({ where: { user: { email: 'new-emp-admin@test.com' } } });
    await prisma.user.deleteMany({ where: { email: 'new-emp-admin@test.com' } });
  });
});

describe('POST /v1/admin/services', () => {
  it('admin can create a service', async () => {
    const res = await request(app)
      .post('/v1/admin/services')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'New Service Test', category: 'nails', durationMin: 60, price: 25 });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('New Service Test');
    await prisma.service.delete({ where: { id: res.body.id } });
  });
});
