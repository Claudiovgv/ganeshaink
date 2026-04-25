const request = require('supertest');
const app = require('../src/index');
const prisma = require('../src/config/database');

describe('GET /v1/services', () => {
  let service;

  beforeAll(async () => {
    service = await prisma.service.create({
      data: {
        name: 'Corte Degradê Test',
        category: 'barbershop',
        durationMin: 45,
        price: 15.00,
        isActive: true,
      },
    });
  });

  afterAll(async () => {
    await prisma.service.delete({ where: { id: service.id } });
  });

  it('returns all active services', async () => {
    const res = await request(app).get('/v1/services');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    const found = res.body.find(s => s.id === service.id);
    expect(found).toBeDefined();
    expect(Number(found.price)).toBe(15.00);
  });

  it('filters by category', async () => {
    const res = await request(app).get('/v1/services?category=barbershop');
    expect(res.status).toBe(200);
    res.body.forEach(s => expect(s.category).toBe('barbershop'));
  });

  it('returns 200 with empty array for unknown category', async () => {
    const res = await request(app).get('/v1/services?category=unknown');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
