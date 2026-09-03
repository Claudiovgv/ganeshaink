const request = require('supertest');
const { authenticator } = require('otplib');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
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

  it('requires 2FA setup on first login with valid credentials', async () => {
    const res = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'admin@test.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.requires2FA).toBe(true);
    expect(res.body.needsSetup).toBe(true);
    expect(res.body).toHaveProperty('pendingToken');
  });

  it('completes 2FA setup and returns a token with a valid code', async () => {
    const loginRes = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'admin@test.com', password: 'password123' });
    const { pendingToken } = loginRes.body;

    const setupRes = await request(app)
      .post('/v1/auth/login/setup-2fa')
      .send({ pendingToken });
    expect(setupRes.status).toBe(200);
    expect(setupRes.body).toHaveProperty('secret');
    expect(setupRes.body).toHaveProperty('qrCodeDataUrl');

    const code = authenticator.generate(setupRes.body.secret);
    const verifyRes = await request(app)
      .post('/v1/auth/login/verify-2fa')
      .send({ pendingToken, code });

    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body).toHaveProperty('token');
    expect(verifyRes.body.user.email).toBe('admin@test.com');
    expect(verifyRes.body.user.role).toBe('admin');
    expect(verifyRes.body.user.twoFactorEnabled).toBe(true);
    expect(verifyRes.body.user).not.toHaveProperty('password');
  });

  it('only asks for the code (no setup) once 2FA is already configured', async () => {
    // Reuses the account enrolled in the previous test.
    const res = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'admin@test.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.requires2FA).toBe(true);
    expect(res.body.needsSetup).toBe(false);
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

  it('does not lock a user out after several successful login attempts', async () => {
    const { resetAuthLimits } = require('../src/middleware/rateLimit');
    await resetAuthLimits();
    for (let i = 0; i < 12; i++) {
      const res = await request(app)
        .post('/v1/auth/login')
        .send({ email: 'admin@test.com', password: 'password123' });
      expect(res.status).toBe(200);
      expect(res.body.requires2FA).toBe(true);
    }
  });
});

describe('GET /v1/auth/me', () => {
  let token;

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'me@test.com' } });
    const user = await prisma.user.create({
      data: {
        name: 'Me Test',
        email: 'me@test.com',
        password: await bcrypt.hash('password123', 10),
        role: 'employee',
      },
    });
    token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
