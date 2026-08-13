const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const prisma = require('../src/config/database');
const bcrypt = require('bcryptjs');
const { ensureCategory } = require('./helpers/categories');

let adminToken, empToken, empUser, employee, empUser2, employee2, service;

beforeAll(async () => {
  await prisma.user.deleteMany({ where: { email: { in: ['admin-blk@test.com', 'emp-blk@test.com', 'emp-blk2@test.com'] } } });

  const adminUser = await prisma.user.create({
    data: { name: 'Admin Blocks Test', email: 'admin-blk@test.com', password: await bcrypt.hash('admin123', 10), role: 'admin' },
  });
  adminToken = jwt.sign({ id: adminUser.id, email: adminUser.email, role: adminUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  empUser = await prisma.user.create({
    data: {
      name: 'Emp Blocks Test', email: 'emp-blk@test.com', password: await bcrypt.hash('emp123', 10), role: 'employee',
      employee: { create: { name: 'Emp Blocks Test', isActive: true } },
    },
    include: { employee: true },
  });
  employee = empUser.employee;
  empToken = jwt.sign({ id: empUser.id, email: empUser.email, role: empUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  empUser2 = await prisma.user.create({
    data: {
      name: 'Emp Blocks Test 2', email: 'emp-blk2@test.com', password: await bcrypt.hash('emp123', 10), role: 'employee',
      employee: { create: { name: 'Emp Blocks Test 2', isActive: true } },
    },
    include: { employee: true },
  });
  employee2 = empUser2.employee;

  const category = await ensureCategory('barbershop', 'Barbearia');
  service = await prisma.service.create({
    data: { name: 'Blocks Test Svc', categoryId: category.id, durationMin: 30, price: 10 },
  });
});

afterAll(async () => {
  await prisma.appointment.deleteMany({ where: { employeeId: { in: [employee.id, employee2.id] } } });
  await prisma.timeBlock.deleteMany({ where: { employeeId: { in: [employee.id, employee2.id] } } });
  await prisma.service.delete({ where: { id: service.id } });
  await prisma.employee.deleteMany({ where: { id: { in: [employee.id, employee2.id] } } });
  await prisma.user.deleteMany({ where: { email: { in: ['admin-blk@test.com', 'emp-blk@test.com', 'emp-blk2@test.com'] } } });
});

afterEach(async () => {
  await prisma.timeBlock.deleteMany({ where: { employeeId: { in: [employee.id, employee2.id] } } });
});

describe('POST /v1/employee/time-blocks (self-service)', () => {
  it('creates a vacation block with no conflicts', async () => {
    const res = await request(app)
      .post('/v1/employee/time-blocks')
      .set('Authorization', `Bearer ${empToken}`)
      .send({ type: 'vacation', reason: 'Férias', startDate: '2026-09-01', endDate: '2026-09-07' });

    expect(res.status).toBe(201);
    expect(res.body.type).toBe('vacation');
  });

  it('preview reports conflicting appointments without creating the block', async () => {
    const apt = await prisma.appointment.create({
      data: {
        clientName: 'Conflict Client', clientEmail: 'conflict@test.com', clientPhone: '911111111',
        employeeId: employee.id, serviceId: service.id,
        startDatetime: new Date('2026-09-10T10:00:00Z'), endDatetime: new Date('2026-09-10T10:30:00Z'),
        status: 'confirmed', cancelToken: 'blk-conflict-1',
      },
    });

    const res = await request(app)
      .post('/v1/employee/time-blocks/preview')
      .set('Authorization', `Bearer ${empToken}`)
      .send({ type: 'vacation', startDate: '2026-09-09', endDate: '2026-09-11' });

    expect(res.status).toBe(200);
    expect(res.body.conflicts).toHaveLength(1);
    expect(res.body.conflicts[0].id).toBe(apt.id);

    const blocksAfter = await prisma.timeBlock.findMany({ where: { employeeId: employee.id } });
    expect(blocksAfter).toHaveLength(0);

    await prisma.appointment.delete({ where: { id: apt.id } });
  });

  it('cancels the chosen conflicting appointments when creating the block', async () => {
    const apt = await prisma.appointment.create({
      data: {
        clientName: 'Cancel Me', clientEmail: 'cancelme@test.com', clientPhone: '922222222',
        employeeId: employee.id, serviceId: service.id,
        startDatetime: new Date('2026-09-15T10:00:00Z'), endDatetime: new Date('2026-09-15T10:30:00Z'),
        status: 'confirmed', cancelToken: 'blk-conflict-2',
      },
    });

    const res = await request(app)
      .post('/v1/employee/time-blocks')
      .set('Authorization', `Bearer ${empToken}`)
      .send({ type: 'vacation', startDate: '2026-09-14', endDate: '2026-09-16', cancelAppointmentIds: [apt.id] });

    expect(res.status).toBe(201);

    const updated = await prisma.appointment.findUnique({ where: { id: apt.id } });
    expect(updated.status).toBe('cancelled');

    await prisma.appointment.delete({ where: { id: apt.id } });
  });
});

describe('Admin blocks', () => {
  it('rejects employees from using the admin route', async () => {
    const res = await request(app)
      .post('/v1/admin/blocks')
      .set('Authorization', `Bearer ${empToken}`)
      .send({ employeeId: employee.id, type: 'vacation', startDate: '2026-10-01', endDate: '2026-10-02' });

    expect(res.status).toBe(403);
  });

  it('lets an admin create a block for a specific employee', async () => {
    const res = await request(app)
      .post('/v1/admin/blocks')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ employeeId: employee.id, type: 'vacation', reason: 'Doença', startDate: '2026-10-01', endDate: '2026-10-02' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].employeeId).toBe(employee.id);
  });

  it('lets an admin create a block for every active employee at once', async () => {
    const res = await request(app)
      .post('/v1/admin/blocks')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ employeeId: 'all', type: 'vacation', reason: 'Loja fechada', startDate: '2026-12-25', endDate: '2026-12-25' });

    expect(res.status).toBe(201);
    const employeeIds = res.body.map((b) => b.employeeId).sort();
    expect(employeeIds).toEqual([employee.id, employee2.id].sort());
  });

  it('preview reports conflicts across all employees when employeeId is "all"', async () => {
    const apt1 = await prisma.appointment.create({
      data: {
        clientName: 'All Conflict 1', clientEmail: 'allc1@test.com', clientPhone: '933333333',
        employeeId: employee.id, serviceId: service.id,
        startDatetime: new Date('2026-11-01T10:00:00Z'), endDatetime: new Date('2026-11-01T10:30:00Z'),
        status: 'confirmed', cancelToken: 'blk-conflict-3',
      },
    });
    const apt2 = await prisma.appointment.create({
      data: {
        clientName: 'All Conflict 2', clientEmail: 'allc2@test.com', clientPhone: '944444444',
        employeeId: employee2.id, serviceId: service.id,
        startDatetime: new Date('2026-11-01T11:00:00Z'), endDatetime: new Date('2026-11-01T11:30:00Z'),
        status: 'confirmed', cancelToken: 'blk-conflict-4',
      },
    });

    const res = await request(app)
      .post('/v1/admin/blocks/preview')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ employeeId: 'all', type: 'vacation', startDate: '2026-11-01', endDate: '2026-11-01' });

    expect(res.status).toBe(200);
    expect(res.body.conflicts.map((c) => c.id).sort()).toEqual([apt1.id, apt2.id].sort());

    await prisma.appointment.deleteMany({ where: { id: { in: [apt1.id, apt2.id] } } });
  });
});
