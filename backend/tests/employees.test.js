const request = require('supertest');
const app = require('../src/index');
const prisma = require('../src/config/database');
const bcrypt = require('bcryptjs');

describe('GET /v1/employees', () => {
  let employee, user;

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'emp1@test.com' } });
    user = await prisma.user.create({
      data: {
        name: 'João Barbeiro',
        email: 'emp1@test.com',
        password: await bcrypt.hash('pass123', 10),
        role: 'employee',
        employee: {
          create: {
            name: 'João Barbeiro',
            bio: 'Especialista em cortes',
            isActive: true,
          },
        },
      },
      include: { employee: true },
    });
    employee = user.employee;
  });

  afterAll(async () => {
    if (employee) await prisma.employee.delete({ where: { id: employee.id } });
    await prisma.user.deleteMany({ where: { email: 'emp1@test.com' } });
  });

  it('returns list of active employees', async () => {
    const res = await request(app).get('/v1/employees');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    const found = res.body.find(e => e.id === employee.id);
    expect(found).toBeDefined();
    expect(found.name).toBe('João Barbeiro');
    expect(found).toHaveProperty('services');
  });

  it('GET /v1/employees/:id returns employee with services and schedule', async () => {
    const res = await request(app).get(`/v1/employees/${employee.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(employee.id);
    expect(res.body).toHaveProperty('services');
    expect(res.body).toHaveProperty('workSchedules');
  });

  it('GET /v1/employees/:id returns 404 for unknown id', async () => {
    const res = await request(app).get('/v1/employees/99999');
    expect(res.status).toBe(404);
  });
});
