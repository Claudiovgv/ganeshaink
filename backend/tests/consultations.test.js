const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/config/database');

describe('Consultations (public)', () => {
  let service;

  beforeAll(async () => {
    service = await prisma.service.create({
      data: {
        name: 'Tattoo Pequena Test',
        category: 'tattoo',
        durationMin: 120,
        price: 80,
        requiresConsultation: true,
      },
    });
  });

  afterAll(async () => {
    await prisma.consultationRequest.deleteMany({ where: { serviceId: service.id } });
    await prisma.service.delete({ where: { id: service.id } });
  });

  it('POST /v1/consultations creates a consultation request', async () => {
    const res = await request(app)
      .post('/v1/consultations')
      .send({
        clientName: 'Ana Tatuagem',
        clientEmail: 'ana@test.com',
        clientPhone: '933333333',
        serviceId: service.id,
        description: 'Quero uma rosa no pulso, pequena',
      });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('pending');
    expect(res.body.clientEmail).toBe('ana@test.com');
    expect(res.body).toHaveProperty('id');
  });

  it('POST /v1/consultations returns 400 when fields are missing', async () => {
    const res = await request(app)
      .post('/v1/consultations')
      .send({ clientName: 'Só nome' });
    expect(res.status).toBe(400);
  });

  it('GET /v1/consultations/:id returns consultation', async () => {
    const consultation = await prisma.consultationRequest.create({
      data: {
        clientName: 'Fetch Consult',
        clientEmail: 'fetchc@test.com',
        clientPhone: '944444444',
        serviceId: service.id,
        description: 'Teste de fetch',
        status: 'pending',
      },
    });

    const res = await request(app).get(`/v1/consultations/${consultation.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(consultation.id);
    expect(res.body).toHaveProperty('service');
  });

  it('GET /v1/consultations/:id returns 404 for unknown id', async () => {
    const res = await request(app).get('/v1/consultations/99999');
    expect(res.status).toBe(404);
  });
});
