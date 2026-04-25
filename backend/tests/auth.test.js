const request = require('supertest');
const app = require('../src/index');
const prisma = require('../src/config/database');
const bcrypt = require('bcryptjs');

describe('POST /v1/auth/login', () => {
  let adminUser;

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'admin@test.com' } });
    adminUser = await prisma.user.create({
      data: {
        name: 'Admin Test',
        email: 'admin@test.com',
        password: await bcrypt.hash('password123', 10),
        role: 'admin',
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'admin@test.com' } });
  });

  it('returns 200 and token with valid credentials', async () => {
    const res = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'admin@test.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('admin@test.com');
    expect(res.body.user.role).toBe('admin');
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('returns 401 with wrong password', async () => {
    const res = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'admin@test.com', password: 'wrong' });
    expect(res.status).toBe(401);
  });

  it('returns 401 with unknown email', async () => {
    const res = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'nobody@test.com', password: 'password123' });
    expect(res.status).toBe(401);
  });
});

describe('GET /v1/auth/me', () => {
  let token;
  let user;

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'me@test.com' } });
    user = await prisma.user.create({
      data: {
        name: 'Me Test',
        email: 'me@test.com',
        password: await bcrypt.hash('password123', 10),
        role: 'employee',
      },
    });
    const res = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'me@test.com', password: 'password123' });
    token = res.body.token;
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'me@test.com' } });
  });

  it('returns user data with valid token', async () => {
    const res = await request(app)
      .get('/v1/auth/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe('me@test.com');
  });

  it('returns 401 without token', async () => {
    const res = await request(app).get('/v1/auth/me');
    expect(res.status).toBe(401);
  });
});
