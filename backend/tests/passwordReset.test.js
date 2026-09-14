jest.mock('../src/lib/mailer', () => ({
  sendMail: jest.fn().mockResolvedValue(undefined),
  sendMailOrThrow: jest.fn().mockResolvedValue(undefined),
  sendTestMail: jest.fn(),
  getSmtpConfig: jest.fn(),
}));

const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const prisma = require('../src/config/database');
const { sendMail, sendMailOrThrow } = require('../src/lib/mailer');

const EMAILS = ['reset-sa@test.com', 'reset-admin@test.com', 'vera-login@test.com'];

function tokenFor(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

describe('password recovery', () => {
  let superUser, adminUser, staffUser, employee, superToken, adminToken;

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: { in: EMAILS } } });
    superUser = await prisma.user.create({
      data: { name: 'Reset SA', email: 'reset-sa@test.com', password: await bcrypt.hash('old-pass-1', 10), role: 'superadmin' },
    });
    adminUser = await prisma.user.create({
      data: { name: 'Reset Admin', email: 'reset-admin@test.com', password: await bcrypt.hash('old-pass-1', 10), role: 'admin' },
    });
    staffUser = await prisma.user.create({
      data: {
        name: 'Vera Ferreira',
        email: 'vera-login@test.com',
        notificationEmail: 'vera.ferreira@example.com',
        password: await bcrypt.hash('old-pass-1', 10),
        role: 'employee',
        employee: { create: { name: 'Vera Ferreira', isActive: true } },
      },
      include: { employee: true },
    });
    employee = staffUser.employee;
    superToken = tokenFor(superUser);
    adminToken = tokenFor(adminUser);
  });

  afterAll(async () => {
    if (employee) await prisma.employee.delete({ where: { id: employee.id } }).catch(() => {});
    await prisma.user.deleteMany({ where: { email: { in: EMAILS } } });
  });

  beforeEach(() => {
    sendMail.mockClear();
    sendMailOrThrow.mockClear();
  });

  it('accepts login with the notification mailbox as well as the username', async () => {
    const res = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'vera.ferreira@example.com', password: 'old-pass-1' });
    expect(res.status).toBe(200);
    expect(res.body.requires2FA).toBe(true);
  });

  it('returns the same 200 for forgot-password whether the account exists or not', async () => {
    const known = await request(app)
      .post('/v1/auth/forgot-password')
      .send({ email: 'vera-login@test.com' });
    const unknown = await request(app)
      .post('/v1/auth/forgot-password')
      .send({ email: 'nobody-here@test.com' });
    expect(known.status).toBe(200);
    expect(unknown.status).toBe(200);
    expect(known.body.message).toBe(unknown.body.message);
  });

  it('emails a reset link to the notification mailbox', async () => {
    const res = await request(app)
      .post('/v1/auth/forgot-password')
      .send({ email: 'vera-login@test.com' });
    expect(res.status).toBe(200);
    expect(sendMail).toHaveBeenCalled();
    const payload = sendMail.mock.calls[0][0];
    expect(payload.to).toBe('vera.ferreira@example.com');
    expect(payload.subject).toMatch(/senha/i);
    expect(payload.html).toMatch(/repor-senha\?token=/);
  });

  it('resets the password with a valid token and allows login with the new one', async () => {
    await request(app).post('/v1/auth/forgot-password').send({ email: 'vera-login@test.com' });
    const html = sendMail.mock.calls[0][0].html;
    const token = decodeURIComponent(html.match(/token=([^"&\s]+)/)[1]);

    const reset = await request(app)
      .post('/v1/auth/reset-password')
      .send({ token, password: 'nova-senha-9' });
    expect(reset.status).toBe(200);

    const login = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'vera-login@test.com', password: 'nova-senha-9' });
    expect(login.status).toBe(200);
    expect(login.body.requires2FA).toBe(true);
  });

  it('rejects an expired or bogus reset token', async () => {
    const res = await request(app)
      .post('/v1/auth/reset-password')
      .send({ token: 'nao-e-um-token', password: 'nova-senha-9' });
    expect(res.status).toBe(400);
  });

  it('lets the superadmin set a new password without touching appointments', async () => {
    const res = await request(app)
      .put(`/v1/admin/users/${staffUser.id}`)
      .set('Authorization', `Bearer ${superToken}`)
      .send({ password: 'senha-admin-8' });
    expect(res.status).toBe(200);

    const login = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'vera-login@test.com', password: 'senha-admin-8' });
    expect(login.status).toBe(200);
  });

  it('forbids a regular admin from changing another user password', async () => {
    const res = await request(app)
      .put(`/v1/admin/users/${staffUser.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ password: 'nao-podes-isto' });
    expect(res.status).toBe(403);
  });

  it('lets the superadmin email a reset link from the backoffice', async () => {
    const res = await request(app)
      .post(`/v1/admin/users/${staffUser.id}/reset-email`)
      .set('Authorization', `Bearer ${superToken}`);
    expect(res.status).toBe(200);
    expect(sendMailOrThrow).toHaveBeenCalled();
    expect(sendMailOrThrow.mock.calls[0][0].to).toBe('vera.ferreira@example.com');
  });

  it('lets manage_employees set a staff password on the employee record', async () => {
    const res = await request(app)
      .put(`/v1/admin/employees/${employee.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ password: 'senha-func-8' });
    expect(res.status).toBe(200);

    const login = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'vera-login@test.com', password: 'senha-func-8' });
    expect(login.status).toBe(200);
  });

  it('lets the superadmin clear 2FA so the person can set it up again', async () => {
    await prisma.user.update({
      where: { id: staffUser.id },
      data: { twoFactorEnabled: true, twoFactorSecret: 'ABCDEFGHIJKLMNOP' },
    });
    const res = await request(app)
      .post(`/v1/admin/users/${staffUser.id}/reset-2fa`)
      .set('Authorization', `Bearer ${superToken}`);
    expect(res.status).toBe(200);

    const user = await prisma.user.findUnique({ where: { id: staffUser.id } });
    expect(user.twoFactorEnabled).toBe(false);
    expect(user.twoFactorSecret).toBeNull();
  });
});
