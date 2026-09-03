const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const prisma = require('../src/config/database');
const { ensureCategory } = require('./helpers/categories');
const { discountedPrice, resolveBookingPartnership } = require('../src/lib/partnerships');

describe('discountedPrice', () => {
  it('applies a 10% discount and rounds to cents', () => {
    expect(discountedPrice(20, 10)).toBe(18);
    expect(discountedPrice('15.00', 10)).toBe(13.5);
  });
});

describe('resolveBookingPartnership', () => {
  let partnership;

  beforeAll(async () => {
    partnership = await prisma.partnership.create({
      data: { name: 'Clube Teste Resolve', percent: 10, extraFieldLabel: 'Nº de sócio', isActive: true },
    });
  });

  afterAll(async () => {
    await prisma.partnership.delete({ where: { id: partnership.id } });
  });

  it('returns empty partnership data when none is selected', async () => {
    const result = await resolveBookingPartnership({ partnershipId: null, servicePrice: 20 });
    expect(result).toEqual({ partnershipId: null, extraFieldValue: null, price: null });
  });

  it('requires the extra field when the partnership has a label', async () => {
    await expect(resolveBookingPartnership({
      partnershipId: partnership.id,
      extraFieldValue: '',
      servicePrice: 20,
    })).rejects.toMatchObject({ status: 400, message: expect.stringMatching(/sócio/i) });
  });

  it('applies the discount when extra field is present', async () => {
    const result = await resolveBookingPartnership({
      partnershipId: partnership.id,
      extraFieldValue: '12345',
      servicePrice: 20,
    });
    expect(result.partnershipId).toBe(partnership.id);
    expect(result.extraFieldValue).toBe('12345');
    expect(result.price).toBe(18);
  });
});

describe('partnerships API', () => {
  let adminToken, employee, service, partnership;

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'partnership-admin@test.com' } });
    const admin = await prisma.user.create({
      data: { name: 'P Admin', email: 'partnership-admin@test.com', password: await bcrypt.hash('admin123', 10), role: 'admin' },
    });
    adminToken = jwt.sign({ id: admin.id, email: admin.email, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const empUser = await prisma.user.create({
      data: {
        name: 'P Emp', email: 'partnership-emp@test.com', password: await bcrypt.hash('pass', 10), role: 'employee',
        employee: { create: { name: 'P Emp', isActive: true } },
      },
      include: { employee: true },
    });
    employee = empUser.employee;
    const category = await ensureCategory('barbershop', 'Barbearia');
    service = await prisma.service.create({
      data: { name: 'P Cut', categoryId: category.id, durationMin: 30, price: 20 },
    });
  });

  afterAll(async () => {
    await prisma.appointment.deleteMany({ where: { employeeId: employee.id } });
    await prisma.partnership.deleteMany({ where: { name: { startsWith: 'Clube API' } } });
    await prisma.service.delete({ where: { id: service.id } });
    await prisma.employee.delete({ where: { id: employee.id } });
    await prisma.user.deleteMany({ where: { email: { in: ['partnership-admin@test.com', 'partnership-emp@test.com'] } } });
  });

  it('admin can create a partnership', async () => {
    const res = await request(app)
      .post('/v1/admin/partnerships')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Clube API Alfa', percent: 15, extraFieldLabel: 'Nº de sócio' });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Clube API Alfa');
    expect(Number(res.body.percent)).toBe(15);
    partnership = res.body;
  });

  it('does not expose partnerships on the public API', async () => {
    const res = await request(app).get('/v1/partnerships');
    expect(res.status).toBe(404);
  });

  it('public booking ignores partnership fields and stores catalog price', async () => {
    const res = await request(app).post('/v1/appointments').send({
      clientName: 'Sócio Teste',
      clientEmail: 'socio@test.com',
      clientPhone: '910000001',
      employeeId: employee.id,
      serviceId: service.id,
      date: '2026-09-15',
      time: '11:00',
      partnershipId: partnership.id,
      extraFieldValue: 'SOC-9',
    });
    expect(res.status).toBe(201);
    expect(res.body.price).toBeNull();
    expect(res.body.partnership).toBeNull();
    expect(res.body.extraFieldValue).toBeNull();
  });

  it('admin can apply a partnership to an existing booking and updates the stored price', async () => {
    const created = await request(app).post('/v1/appointments').send({
      clientName: 'Cliente Parceria',
      clientEmail: 'cliente-parceria@test.com',
      clientPhone: '910000003',
      employeeId: employee.id,
      serviceId: service.id,
      date: '2026-09-15',
      time: '13:00',
    });
    expect(created.status).toBe(201);

    const res = await request(app)
      .put(`/v1/admin/appointments/${created.body.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ partnershipId: partnership.id, extraFieldValue: 'SOC-9' });
    expect(res.status).toBe(200);
    expect(Number(res.body.price)).toBe(17);
    expect(res.body.extraFieldValue).toBe('SOC-9');
    expect(res.body.partnership.name).toBe('Clube API Alfa');
  });

  it('rejects applying a partnership without the required extra field', async () => {
    const created = await request(app).post('/v1/appointments').send({
      clientName: 'Sem Socio',
      clientEmail: 'semsocio@test.com',
      clientPhone: '910000002',
      employeeId: employee.id,
      serviceId: service.id,
      date: '2026-09-15',
      time: '12:00',
    });
    expect(created.status).toBe(201);

    const res = await request(app)
      .put(`/v1/admin/appointments/${created.body.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ partnershipId: partnership.id });
    expect(res.status).toBe(400);
  });
});
