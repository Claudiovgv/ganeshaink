const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/config/database');
const bcrypt = require('bcryptjs');

describe('Appointments (public)', () => {
  let employee, service, user;

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'apttest@test.com' } });
    user = await prisma.user.create({
      data: {
        name: 'Apt Employee',
        email: 'apttest@test.com',
        password: await bcrypt.hash('pass', 10),
        role: 'employee',
        employee: { create: { name: 'Apt Employee', isActive: true } },
      },
      include: { employee: true },
    });
    employee = user.employee;

    service = await prisma.service.create({
      data: { name: 'Test Cut', category: 'barbershop', durationMin: 30, price: 10 },
    });

    await prisma.employeeService.create({
      data: { employeeId: employee.id, serviceId: service.id },
    });

    await prisma.workSchedule.create({
      data: {
        employeeId: employee.id,
        dayOfWeek: 2,
        startTime: '09:00',
        endTime: '18:00',
        isActive: true,
      },
    });
  });

  afterAll(async () => {
    await prisma.appointment.deleteMany({ where: { employeeId: employee.id } });
    await prisma.employeeService.deleteMany({ where: { employeeId: employee.id } });
    await prisma.workSchedule.deleteMany({ where: { employeeId: employee.id } });
    await prisma.service.delete({ where: { id: service.id } });
    await prisma.employee.delete({ where: { id: employee.id } });
    await prisma.user.deleteMany({ where: { email: 'apttest@test.com' } });
  });

  describe('POST /v1/appointments', () => {
    it('creates an appointment and returns it with cancelToken', async () => {
      const res = await request(app)
        .post('/v1/appointments')
        .send({
          clientName: 'Pedro Cliente',
          clientEmail: 'pedro@test.com',
          clientPhone: '912345678',
          employeeId: employee.id,
          serviceId: service.id,
          date: '2026-04-28',
          time: '10:00',
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.clientEmail).toBe('pedro@test.com');
      expect(res.body.status).toBe('confirmed');
      expect(res.body).toHaveProperty('cancelToken');
    });

    it('returns 400 when required fields are missing', async () => {
      const res = await request(app)
        .post('/v1/appointments')
        .send({ clientName: 'Only name' });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /v1/appointments/:id', () => {
    let apt;
    beforeAll(async () => {
      apt = await prisma.appointment.create({
        data: {
          clientName: 'Fetch Test',
          clientEmail: 'fetch@test.com',
          clientPhone: '911111111',
          employeeId: employee.id,
          serviceId: service.id,
          startDatetime: new Date('2026-04-28T10:00:00Z'),
          endDatetime: new Date('2026-04-28T10:30:00Z'),
          status: 'confirmed',
          cancelToken: 'test-cancel-token-abc',
        },
      });
    });
    afterAll(async () => {
      await prisma.appointment.deleteMany({ where: { id: apt.id } });
    });

    it('returns appointment without cancelToken', async () => {
      const res = await request(app).get(`/v1/appointments/${apt.id}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(apt.id);
      expect(res.body).not.toHaveProperty('cancelToken');
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).get('/v1/appointments/99999');
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /v1/appointments/:id (cancel by token)', () => {
    let apt;
    beforeAll(async () => {
      apt = await prisma.appointment.create({
        data: {
          clientName: 'Cancel Test',
          clientEmail: 'cancel@test.com',
          clientPhone: '922222222',
          employeeId: employee.id,
          serviceId: service.id,
          startDatetime: new Date('2026-04-30T09:00:00Z'),
          endDatetime: new Date('2026-04-30T09:30:00Z'),
          status: 'confirmed',
          cancelToken: 'valid-cancel-token-xyz',
        },
      });
    });

    it('cancels appointment with valid token', async () => {
      const res = await request(app)
        .delete(`/v1/appointments/${apt.id}`)
        .send({ cancelToken: 'valid-cancel-token-xyz' });
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('cancelled');
    });

    it('returns 403 with invalid token', async () => {
      const res = await request(app)
        .delete(`/v1/appointments/${apt.id}`)
        .send({ cancelToken: 'wrong-token' });
      expect(res.status).toBe(403);
    });
  });
});
