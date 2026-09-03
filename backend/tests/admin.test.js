const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const prisma = require('../src/config/database');
const bcrypt = require('bcryptjs');
const { ensureCategory } = require('./helpers/categories');

let adminToken, adminUser, empUser, employee, service, nailsCategory;

beforeAll(async () => {
  await prisma.user.deleteMany({ where: { email: { in: ['admin-rt@test.com', 'emp-rt@test.com'] } } });

  adminUser = await prisma.user.create({
    data: { name: 'Admin Route Test', email: 'admin-rt@test.com', password: await bcrypt.hash('admin123', 10), role: 'admin' },
  });

  // 2FA is mandatory at login now, so route tests that aren't about auth itself
  // sign a token directly instead of driving the full login + 2FA-setup flow.
  adminToken = jwt.sign({ id: adminUser.id, email: adminUser.email, role: adminUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  empUser = await prisma.user.create({
    data: {
      name: 'Emp Route Test', email: 'emp-rt@test.com', password: await bcrypt.hash('emp123', 10), role: 'employee',
      employee: { create: { name: 'Emp Route Test', isActive: true } },
    },
    include: { employee: true },
  });
  employee = empUser.employee;

  const barbershopCategory = await ensureCategory('barbershop', 'Barbearia');
  nailsCategory = await ensureCategory('nails', 'Unhas');
  service = await prisma.service.create({
    data: { name: 'Admin Test Svc', categoryId: barbershopCategory.id, durationMin: 30, price: 10 },
  });
});

afterAll(async () => {
  await prisma.appointment.deleteMany({ where: { employeeId: employee.id } });
  await prisma.consultationRequest.deleteMany({ where: { serviceId: service.id } });
  await prisma.service.delete({ where: { id: service.id } });
  await prisma.employee.delete({ where: { id: employee.id } });
  await prisma.user.deleteMany({ where: { email: { in: ['admin-rt@test.com', 'emp-rt@test.com'] } } });
});

describe('GET /v1/admin/appointments', () => {
  it('returns 401 without token', async () => {
    const res = await request(app).get('/v1/admin/appointments');
    expect(res.status).toBe(401);
  });

  it('returns appointment list for admin', async () => {
    const res = await request(app).get('/v1/admin/appointments').set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /v1/admin/appointments', () => {
  it('admin can create appointment manually', async () => {
    const res = await request(app)
      .post('/v1/admin/appointments')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ clientName: 'Manual Client', clientEmail: 'manual@test.com', clientPhone: '955555555', employeeId: employee.id, serviceId: service.id, date: '2026-05-05', time: '14:00' });
    expect(res.status).toBe(201);
    expect(res.body.clientName).toBe('Manual Client');
    expect(res.body.status).toBe('confirmed');
  });

  it('creates with a placeholder contact when email/phone are omitted', async () => {
    const res = await request(app)
      .post('/v1/admin/appointments')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ clientName: 'No Contact Yet', employeeId: employee.id, serviceId: service.id, date: '2026-05-05', time: '16:00' });
    expect(res.status).toBe(201);
    expect(res.body.clientEmail).toMatch(/^sem-contacto\+/);
    expect(res.body.clientPhone).toBe('Sem contacto');
  });

  it('warns (409, with conflict details) instead of hard-blocking on overlap', async () => {
    const first = await request(app)
      .post('/v1/admin/appointments')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ clientName: 'First', clientEmail: 'first@test.com', clientPhone: '911111111', employeeId: employee.id, serviceId: service.id, date: '2026-05-07', time: '10:00' });
    expect(first.status).toBe(201);

    const conflicting = await request(app)
      .post('/v1/admin/appointments')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ clientName: 'Second', clientEmail: 'second@test.com', clientPhone: '922222222', employeeId: employee.id, serviceId: service.id, date: '2026-05-07', time: '10:15' });
    expect(conflicting.status).toBe(409);
    expect(conflicting.body.conflict.clientName).toBe('First');

    const forced = await request(app)
      .post('/v1/admin/appointments')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ clientName: 'Second', clientEmail: 'second@test.com', clientPhone: '922222222', employeeId: employee.id, serviceId: service.id, date: '2026-05-07', time: '10:15', force: true });
    expect(forced.status).toBe(201);
  });
});

describe('PUT /v1/admin/appointments/:id', () => {
  let apt;
  beforeAll(async () => {
    apt = await prisma.appointment.create({
      data: { clientName: 'Update Test', clientEmail: 'upd@test.com', clientPhone: '966666666', employeeId: employee.id, serviceId: service.id, startDatetime: new Date('2026-05-06T09:00:00Z'), endDatetime: new Date('2026-05-06T09:30:00Z'), status: 'confirmed', cancelToken: 'upd-token-123' },
    });
  });

  it('admin can cancel an appointment', async () => {
    const res = await request(app).put(`/v1/admin/appointments/${apt.id}`).set('Authorization', `Bearer ${adminToken}`).send({ status: 'cancelled' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('cancelled');
  });

  it('admin can update the client contact details', async () => {
    const res = await request(app)
      .put(`/v1/admin/appointments/${apt.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ clientName: 'Corrected Name', clientEmail: 'real@test.com', clientPhone: '933333333' });
    expect(res.status).toBe(200);
    expect(res.body.clientName).toBe('Corrected Name');
    expect(res.body.clientEmail).toBe('real@test.com');
    expect(res.body.clientPhone).toBe('933333333');
  });

  it('admin can set a custom price, overriding the service catalog price', async () => {
    const res = await request(app)
      .put(`/v1/admin/appointments/${apt.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ price: '7.50' });
    expect(res.status).toBe(200);
    expect(Number(res.body.price)).toBe(7.5);
  });

  it('admin can clear the custom price back to the service default', async () => {
    const res = await request(app)
      .put(`/v1/admin/appointments/${apt.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ price: '' });
    expect(res.status).toBe(200);
    expect(res.body.price).toBeNull();
  });
});

describe('DELETE /v1/admin/appointments/:id', () => {
  it('admin can delete an appointment', async () => {
    const apt = await prisma.appointment.create({
      data: { clientName: 'Delete Test', clientEmail: 'del@test.com', clientPhone: '977777777', employeeId: employee.id, serviceId: service.id, startDatetime: new Date('2026-05-09T09:00:00Z'), endDatetime: new Date('2026-05-09T09:30:00Z'), status: 'confirmed', cancelToken: 'del-token-123' },
    });
    const res = await request(app).delete(`/v1/admin/appointments/${apt.id}`).set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    const stillThere = await prisma.appointment.findUnique({ where: { id: apt.id } });
    expect(stillThere).toBeNull();
  });

  it('unlinks a scheduled consultation instead of failing on the foreign key', async () => {
    const apt = await prisma.appointment.create({
      data: { clientName: 'Delete With Consultation', clientEmail: 'delcons@test.com', clientPhone: '988888888', employeeId: employee.id, serviceId: service.id, startDatetime: new Date('2026-05-10T09:00:00Z'), endDatetime: new Date('2026-05-10T09:30:00Z'), status: 'confirmed', cancelToken: 'del-token-456' },
    });
    const consultation = await prisma.consultationRequest.create({
      data: { clientName: 'Delete With Consultation', clientEmail: 'delcons@test.com', clientPhone: '988888888', serviceId: service.id, description: 'test', status: 'scheduled', scheduledAppointmentId: apt.id },
    });

    const res = await request(app).delete(`/v1/admin/appointments/${apt.id}`).set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);

    const updatedConsultation = await prisma.consultationRequest.findUnique({ where: { id: consultation.id } });
    expect(updatedConsultation.scheduledAppointmentId).toBeNull();
    await prisma.consultationRequest.delete({ where: { id: consultation.id } });
  });

  it('returns 404 for a non-existent appointment', async () => {
    const res = await request(app).delete('/v1/admin/appointments/999999999').set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(404);
  });
});

describe('Appointment price override affects stats revenue', () => {
  it('uses the appointment price instead of the service price when set', async () => {
    // Serviço próprio com preço facilmente identificável, para isolar da
    // receita de outros testes que corram no mesmo mês.
    const category = await ensureCategory('barbershop', 'Barbearia');
    const priceService = await prisma.service.create({
      data: { name: 'Price Override Svc', categoryId: category.id, durationMin: 30, price: 10 },
    });

    const now = new Date();
    const apt = await prisma.appointment.create({
      data: {
        clientName: 'Price Override Test', clientEmail: 'price-ov@test.com', clientPhone: '944444444',
        employeeId: employee.id, serviceId: priceService.id, price: '99.99',
        startDatetime: now, endDatetime: new Date(now.getTime() + 30 * 60000),
        status: 'completed', cancelToken: 'price-ov-token',
      },
    });

    const res = await request(app)
      .get('/v1/admin/stats')
      .set('Authorization', `Bearer ${adminToken}`)
      .query({ period: 'month', offset: '0' });

    expect(res.status).toBe(200);
    const entry = res.body.byService.find((s) => s.serviceId === priceService.id);
    expect(entry).toBeDefined();
    expect(entry.revenue).toBe(99.99); // não 10 — confirma que usou o preço da marcação, não o do catálogo

    await prisma.appointment.delete({ where: { id: apt.id } });
    await prisma.service.delete({ where: { id: priceService.id } });
  });
});

describe('GET /v1/admin/stats/barbershop', () => {
  it('computes material cost and barber payout (barber gets the rest after the studio cut) from configured employee values', async () => {
    const category = await ensureCategory('barbershop', 'Barbearia');
    const barberUser = await prisma.user.create({
      data: {
        name: 'Barbershop Stats Test', email: 'barbershop-stats-test@test.com', password: await bcrypt.hash('pass123', 10), role: 'employee',
        employee: { create: { name: 'Barbershop Stats Test', isActive: true, materialCost: '1.00', studioPercent: '30' } },
      },
      include: { employee: true },
    });
    const barber = barberUser.employee;
    const svc = await prisma.service.create({ data: { name: 'Barbershop Stats Svc', categoryId: category.id, durationMin: 30, price: 20 } });

    const now = new Date();
    const apt1 = await prisma.appointment.create({
      data: { clientName: 'BS Test 1', clientEmail: 'bs1@test.com', clientPhone: '911111111', employeeId: barber.id, serviceId: svc.id, startDatetime: now, endDatetime: new Date(now.getTime() + 30 * 60000), status: 'completed', cancelToken: 'bs-token-1' },
    });
    const apt2 = await prisma.appointment.create({
      data: { clientName: 'BS Test 2', clientEmail: 'bs2@test.com', clientPhone: '922222222', employeeId: barber.id, serviceId: svc.id, startDatetime: new Date(now.getTime() + 60000), endDatetime: new Date(now.getTime() + 30 * 60000 + 60000), status: 'completed', cancelToken: 'bs-token-2' },
    });

    const res = await request(app)
      .get('/v1/admin/stats/barbershop')
      .set('Authorization', `Bearer ${adminToken}`)
      .query({ period: 'month', offset: '0' });

    expect(res.status).toBe(200);
    const entry = res.body.barbers.find((b) => b.employeeId === barber.id);
    expect(entry).toBeDefined();
    expect(entry.count).toBe(2);
    expect(entry.revenue).toBe(40);
    expect(entry.materialCost).toBe(2);
    expect(entry.netRevenue).toBe(38);
    expect(entry.studioAmount).toBeCloseTo(11.4); // 38 x 30% fica para o estúdio
    expect(entry.barberAmount).toBeCloseTo(26.6); // resto vai para o barbeiro
    expect(entry.hasConfig).toBe(true);

    await prisma.appointment.deleteMany({ where: { id: { in: [apt1.id, apt2.id] } } });
    await prisma.service.delete({ where: { id: svc.id } });
    await prisma.employee.delete({ where: { id: barber.id } });
    await prisma.user.delete({ where: { id: barberUser.id } });
  });

  it('marks a barber without configured material/percent as hasConfig=false and zero cost', async () => {
    const category = await ensureCategory('barbershop', 'Barbearia');
    const barberUser = await prisma.user.create({
      data: {
        name: 'Barbershop No Config Test', email: 'barbershop-noconfig-test@test.com', password: await bcrypt.hash('pass123', 10), role: 'employee',
        employee: { create: { name: 'Barbershop No Config Test', isActive: true } },
      },
      include: { employee: true },
    });
    const barber = barberUser.employee;
    const svc = await prisma.service.create({ data: { name: 'Barbershop No Config Svc', categoryId: category.id, durationMin: 30, price: 15 } });
    const now = new Date();
    const apt = await prisma.appointment.create({
      data: { clientName: 'BS NoConfig', clientEmail: 'bsnc@test.com', clientPhone: '933333333', employeeId: barber.id, serviceId: svc.id, startDatetime: now, endDatetime: new Date(now.getTime() + 30 * 60000), status: 'completed', cancelToken: 'bs-token-3' },
    });

    const res = await request(app)
      .get('/v1/admin/stats/barbershop')
      .set('Authorization', `Bearer ${adminToken}`)
      .query({ period: 'month', offset: '0' });

    expect(res.status).toBe(200);
    const entry = res.body.barbers.find((b) => b.employeeId === barber.id);
    expect(entry).toBeDefined();
    expect(entry.hasConfig).toBe(false);
    expect(entry.materialCost).toBe(0);
    expect(entry.studioAmount).toBe(0);
    expect(entry.barberAmount).toBe(0);

    await prisma.appointment.delete({ where: { id: apt.id } });
    await prisma.service.delete({ where: { id: svc.id } });
    await prisma.employee.delete({ where: { id: barber.id } });
    await prisma.user.delete({ where: { id: barberUser.id } });
  });
});

describe('GET /v1/admin/consultations', () => {
  it('returns consultation list for admin', async () => {
    const res = await request(app).get('/v1/admin/consultations').set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /v1/admin/employees', () => {
  it('admin can create a new employee', async () => {
    const res = await request(app)
      .post('/v1/admin/employees')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'New Emp', email: 'new-emp-admin@test.com', password: 'pass123' });
    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe('new-emp-admin@test.com');
    expect(res.body.name).toBe('New Emp');
    // cleanup
    await prisma.employee.deleteMany({ where: { user: { email: 'new-emp-admin@test.com' } } });
    await prisma.user.deleteMany({ where: { email: 'new-emp-admin@test.com' } });
  });
});

describe('PUT /v1/admin/employees/:id (config Barbearia)', () => {
  it('admin can set and clear materialCost and studioPercent', async () => {
    const res = await request(app)
      .put(`/v1/admin/employees/${employee.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ materialCost: '1.50', studioPercent: '35' });
    expect(res.status).toBe(200);
    expect(Number(res.body.materialCost)).toBe(1.5);
    expect(Number(res.body.studioPercent)).toBe(35);

    const cleared = await request(app)
      .put(`/v1/admin/employees/${employee.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ materialCost: '', studioPercent: '' });
    expect(cleared.status).toBe(200);
    expect(cleared.body.materialCost).toBeNull();
    expect(cleared.body.studioPercent).toBeNull();
  });
});

describe('POST /v1/admin/services', () => {
  it('admin can create a service', async () => {
    const res = await request(app)
      .post('/v1/admin/services')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'New Service Test', categoryId: nailsCategory.id, durationMin: 60, price: 25 });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('New Service Test');
    await prisma.service.delete({ where: { id: res.body.id } });
  });
});

describe('PUT /v1/admin/services/reorder', () => {
  it('saves catalog order instead of treating "reorder" as a service id', async () => {
    const res = await request(app)
      .put('/v1/admin/services/reorder')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ serviceIds: [service.id] });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('DELETE /v1/admin/services/:id', () => {
  it('deletes a service with no history', async () => {
    const created = await prisma.service.create({
      data: { name: 'Delete Me Test', categoryId: nailsCategory.id, durationMin: 30, price: 10 },
    });
    const res = await request(app)
      .delete(`/v1/admin/services/${created.id}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    const stillThere = await prisma.service.findUnique({ where: { id: created.id } });
    expect(stillThere).toBeNull();
  });

  it('refuses to delete a service with an appointment, suggesting deactivation instead', async () => {
    const res = await request(app)
      .delete(`/v1/admin/services/${service.id}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/Desative/);
    const stillThere = await prisma.service.findUnique({ where: { id: service.id } });
    expect(stillThere).not.toBeNull();
  });
});

describe('GET/PUT /v1/admin/settings/notifications', () => {
  it('returns the event list and users with default-off preferences', async () => {
    const res = await request(app).get('/v1/admin/settings/notifications').set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.events.map((e) => e.id)).toContain('new_appointment');
    expect(res.body.events.map((e) => e.id)).toContain('reminder_24h');
    const row = res.body.users.find((u) => u.id === adminUser.id);
    expect(row).toBeTruthy();
    expect(row.preferences.new_appointment).toBe(false);
  });

  it('saves a preference and reads it back', async () => {
    const put = await request(app)
      .put('/v1/admin/settings/notifications')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ preferences: [{ userId: adminUser.id, eventType: 'reminder_24h', enabled: true }] });
    expect(put.status).toBe(200);
    expect(put.body.users.find((u) => u.id === adminUser.id).preferences.reminder_24h).toBe(true);
    await prisma.notificationPreference.deleteMany({ where: { userId: adminUser.id } });
  });
});
