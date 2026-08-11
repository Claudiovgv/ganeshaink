const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/config/database');
const { ensureCategory } = require('./helpers/categories');

describe('GET /v1/services', () => {
  let service;

  beforeAll(async () => {
    const category = await ensureCategory('barbershop', 'Barbearia');
    service = await prisma.service.create({
      data: {
        name: 'Corte Degradê Test',
        categoryId: category.id,
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
    res.body.forEach(s => expect(s.category.slug).toBe('barbershop'));
  });

  it('returns 200 with empty array for unknown category', async () => {
    const res = await request(app).get('/v1/services?category=unknown');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('filtering by a parent category also returns services from its subcategories', async () => {
    const parent = await ensureCategory('barbershop', 'Barbearia');
    const sub = await prisma.category.upsert({
      where: { slug: 'barba-test' },
      update: {},
      create: { slug: 'barba-test', name: 'Barba (test)', parentId: parent.id },
    });
    const subService = await prisma.service.create({
      data: { name: 'Barba Simples Test', categoryId: sub.id, durationMin: 20, price: 5 },
    });

    try {
      const res = await request(app).get('/v1/services?category=barbershop');
      expect(res.status).toBe(200);
      expect(res.body.some(s => s.id === subService.id)).toBe(true);

      const subRes = await request(app).get('/v1/services?category=barba-test');
      expect(subRes.status).toBe(200);
      expect(subRes.body.map(s => s.id)).toEqual([subService.id]);
    } finally {
      await prisma.service.delete({ where: { id: subService.id } });
      await prisma.category.delete({ where: { id: sub.id } });
    }
  });
});
