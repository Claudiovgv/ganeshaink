jest.mock('../src/lib/mailer', () => ({
  sendMail: jest.fn().mockResolvedValue(undefined),
  sendTestMail: jest.fn().mockResolvedValue(undefined),
  getSmtpConfig: jest.fn(),
}));

const { sendMail } = require('../src/lib/mailer');
const prisma = require('../src/config/database');
const bcrypt = require('bcryptjs');
const { addHours, subHours } = require('date-fns');
const { ensureCategory } = require('./helpers/categories');
const {
  EVENT_TYPES,
  notifyAppointmentCreated,
  notifyAppointmentStatusChanged,
  notifyConsultationCreated,
  sendDueReminders,
} = require('../src/lib/notifications');

describe('staff email notifications', () => {
  let adminUser, empUser, otherEmpUser, employee, otherEmployee, service;

  beforeAll(async () => {
    await prisma.user.deleteMany({
      where: { email: { in: ['notif-admin@test.com', 'notif-emp@test.com', 'notif-emp2@test.com'] } },
    });

    adminUser = await prisma.user.create({
      data: { name: 'Notif Admin', email: 'notif-admin@test.com', password: await bcrypt.hash('pass', 10), role: 'admin' },
    });
    empUser = await prisma.user.create({
      data: {
        name: 'Notif Emp',
        email: 'notif-emp@test.com',
        password: await bcrypt.hash('pass', 10),
        role: 'employee',
        employee: { create: { name: 'Notif Emp', isActive: true } },
      },
      include: { employee: true },
    });
    employee = empUser.employee;

    otherEmpUser = await prisma.user.create({
      data: {
        name: 'Notif Emp 2',
        email: 'notif-emp2@test.com',
        password: await bcrypt.hash('pass', 10),
        role: 'employee',
        employee: { create: { name: 'Notif Emp 2', isActive: true } },
      },
      include: { employee: true },
    });
    otherEmployee = otherEmpUser.employee;

    const category = await ensureCategory('barbershop', 'Barbearia');
    service = await prisma.service.create({
      data: { name: 'Notif Cut', categoryId: category.id, durationMin: 30, price: 10 },
    });
  });

  afterAll(async () => {
    await prisma.appointment.deleteMany({ where: { employeeId: { in: [employee.id, otherEmployee.id] } } });
    await prisma.consultationRequest.deleteMany({ where: { serviceId: service.id } });
    await prisma.notificationPreference.deleteMany({
      where: { userId: { in: [adminUser.id, empUser.id, otherEmpUser.id] } },
    });
    await prisma.service.delete({ where: { id: service.id } });
    await prisma.employee.deleteMany({ where: { id: { in: [employee.id, otherEmployee.id] } } });
    await prisma.user.deleteMany({
      where: { email: { in: ['notif-admin@test.com', 'notif-emp@test.com', 'notif-emp2@test.com'] } },
    });
  });

  beforeEach(async () => {
    sendMail.mockClear();
    await prisma.notificationPreference.deleteMany({
      where: { userId: { in: [adminUser.id, empUser.id, otherEmpUser.id] } },
    });
  });

  async function enable(userId, eventType) {
    await prisma.notificationPreference.create({ data: { userId, eventType, enabled: true } });
  }

  async function makeAppointment(overrides = {}) {
    return prisma.appointment.create({
      data: {
        clientName: 'Ana Cliente',
        clientEmail: 'ana-notif@test.com',
        clientPhone: '910000000',
        employeeId: employee.id,
        serviceId: service.id,
        startDatetime: addHours(new Date(), 48),
        endDatetime: addHours(new Date(), 49),
        status: 'pending',
        ...overrides,
      },
      include: {
        employee: { select: { id: true, name: true, userId: true } },
        service: true,
      },
    });
  }

  it('exposes the six event types', () => {
    expect(EVENT_TYPES).toEqual([
      'new_appointment',
      'appointment_confirmed',
      'appointment_cancelled',
      'appointment_completed',
      'consultation_received',
      'reminder_24h',
    ]);
  });

  it('always emails the client on a new public booking', async () => {
    const apt = await makeAppointment();
    await notifyAppointmentCreated(apt);
    expect(sendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: 'ana-notif@test.com',
      subject: expect.stringMatching(/recebida/i),
    }));
  });

  it('does not email staff when no preference is enabled', async () => {
    const apt = await makeAppointment();
    await notifyAppointmentCreated(apt);
    const staffCalls = sendMail.mock.calls.filter(([arg]) => arg.to !== 'ana-notif@test.com');
    expect(staffCalls).toHaveLength(0);
  });

  it('emails the assigned professional when new_appointment is enabled for them', async () => {
    await enable(empUser.id, 'new_appointment');
    const apt = await makeAppointment();
    await notifyAppointmentCreated(apt);
    expect(sendMail.mock.calls.map(([arg]) => arg.to)).toContain('notif-emp@test.com');
  });

  it('sends staff mail to notificationEmail when login is not a real mailbox', async () => {
    await prisma.user.update({
      where: { id: empUser.id },
      data: { email: 'eduardo', notificationEmail: 'eduardo@ganeshaink.pt' },
    });
    await enable(empUser.id, 'new_appointment');
    const apt = await makeAppointment();
    await notifyAppointmentCreated(apt);
    expect(sendMail.mock.calls.map(([arg]) => arg.to)).toContain('eduardo@ganeshaink.pt');
    expect(sendMail.mock.calls.map(([arg]) => arg.to)).not.toContain('eduardo');
    await prisma.user.update({
      where: { id: empUser.id },
      data: { email: 'notif-emp@test.com', notificationEmail: null },
    });
  });

  it('does not email another professional for someone else\'s booking', async () => {
    await enable(otherEmpUser.id, 'new_appointment');
    const apt = await makeAppointment();
    await notifyAppointmentCreated(apt);
    expect(sendMail.mock.calls.map(([arg]) => arg.to)).not.toContain('notif-emp2@test.com');
  });

  it('emails management for every new booking when enabled', async () => {
    await enable(adminUser.id, 'new_appointment');
    const apt = await makeAppointment();
    await notifyAppointmentCreated(apt);
    expect(sendMail.mock.calls.map(([arg]) => arg.to)).toContain('notif-admin@test.com');
  });

  it('sends a single staff email when the assigned pro is also admin', async () => {
    await prisma.user.update({ where: { id: empUser.id }, data: { role: 'admin' } });
    await enable(empUser.id, 'new_appointment');
    const apt = await makeAppointment();
    await notifyAppointmentCreated(apt);
    const toEmp = sendMail.mock.calls.filter(([arg]) => arg.to === 'notif-emp@test.com');
    expect(toEmp).toHaveLength(1);
    await prisma.user.update({ where: { id: empUser.id }, data: { role: 'employee' } });
  });

  it('skips client email for placeholder contacts', async () => {
    const apt = await makeAppointment({ clientEmail: 'sem-contacto+abc@ganeshaink.pt' });
    await notifyAppointmentCreated(apt);
    expect(sendMail.mock.calls.map(([arg]) => arg.to)).not.toContain('sem-contacto+abc@ganeshaink.pt');
  });

  it('notifies staff of status changes when that event is enabled', async () => {
    await enable(adminUser.id, 'appointment_cancelled');
    const apt = await makeAppointment({ status: 'cancelled' });
    await notifyAppointmentStatusChanged(apt, 'pending');
    expect(sendMail.mock.calls.map(([arg]) => arg.to)).toContain('notif-admin@test.com');
    expect(sendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: 'ana-notif@test.com',
      subject: expect.stringMatching(/cancelada/i),
    }));
  });

  it('notifies staff of consultations when enabled', async () => {
    await enable(adminUser.id, 'consultation_received');
    const consultation = await prisma.consultationRequest.create({
      data: {
        clientName: 'Ana Cliente',
        clientEmail: 'ana-notif@test.com',
        clientPhone: '910000000',
        serviceId: service.id,
        employeeId: employee.id,
        description: 'quero um corte',
      },
      include: { service: true, employee: { select: { id: true, name: true, userId: true } } },
    });
    await notifyConsultationCreated(consultation);
    expect(sendMail.mock.calls.map(([arg]) => arg.to)).toEqual(
      expect.arrayContaining(['ana-notif@test.com', 'notif-admin@test.com']),
    );
  });
});

describe('24h reminder job', () => {
  let empUser, employee, service, adminUser;

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: { in: ['remind-emp@test.com', 'remind-admin@test.com'] } } });
    adminUser = await prisma.user.create({
      data: { name: 'Remind Admin', email: 'remind-admin@test.com', password: await bcrypt.hash('pass', 10), role: 'admin' },
    });
    empUser = await prisma.user.create({
      data: {
        name: 'Remind Emp',
        email: 'remind-emp@test.com',
        password: await bcrypt.hash('pass', 10),
        role: 'employee',
        employee: { create: { name: 'Remind Emp', isActive: true } },
      },
      include: { employee: true },
    });
    employee = empUser.employee;
    const category = await ensureCategory('barbershop', 'Barbearia');
    service = await prisma.service.create({
      data: { name: 'Remind Cut', categoryId: category.id, durationMin: 30, price: 10 },
    });
  });

  afterAll(async () => {
    await prisma.appointment.deleteMany({ where: { employeeId: employee.id } });
    await prisma.notificationPreference.deleteMany({ where: { userId: { in: [empUser.id, adminUser.id] } } });
    await prisma.service.delete({ where: { id: service.id } });
    await prisma.employee.delete({ where: { id: employee.id } });
    await prisma.user.deleteMany({ where: { email: { in: ['remind-emp@test.com', 'remind-admin@test.com'] } } });
  });

  beforeEach(async () => {
    sendMail.mockClear();
    await prisma.appointment.deleteMany({ where: { employeeId: employee.id } });
    await prisma.notificationPreference.deleteMany({ where: { userId: { in: [empUser.id, adminUser.id] } } });
  });

  async function createDueConfirmed() {
    const start = addHours(new Date(), 20);
    return prisma.appointment.create({
      data: {
        clientName: 'Lembra Me',
        clientEmail: 'lembra@test.com',
        clientPhone: '911111111',
        employeeId: employee.id,
        serviceId: service.id,
        startDatetime: start,
        endDatetime: addHours(start, 1),
        status: 'confirmed',
        createdAt: subHours(start, 48),
      },
    });
  }

  it('sends client reminder for confirmed appointments starting within 24h', async () => {
    await createDueConfirmed();
    const sent = await sendDueReminders();
    expect(sent).toBe(1);
    expect(sendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: 'lembra@test.com',
      subject: expect.stringMatching(/lembrete/i),
    }));
  });

  it('does not send twice', async () => {
    await createDueConfirmed();
    await sendDueReminders();
    sendMail.mockClear();
    const sent = await sendDueReminders();
    expect(sent).toBe(0);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('skips pending appointments', async () => {
    const start = addHours(new Date(), 20);
    await prisma.appointment.create({
      data: {
        clientName: 'Pendente',
        clientEmail: 'pendente@test.com',
        clientPhone: '911111111',
        employeeId: employee.id,
        serviceId: service.id,
        startDatetime: start,
        endDatetime: addHours(start, 1),
        status: 'pending',
        createdAt: subHours(start, 48),
      },
    });
    const sent = await sendDueReminders();
    expect(sent).toBe(0);
  });

  it('skips last-minute bookings created less than 24h before start', async () => {
    const start = addHours(new Date(), 20);
    await prisma.appointment.create({
      data: {
        clientName: 'Em cima',
        clientEmail: 'emcima@test.com',
        clientPhone: '911111111',
        employeeId: employee.id,
        serviceId: service.id,
        startDatetime: start,
        endDatetime: addHours(start, 1),
        status: 'confirmed',
        createdAt: subHours(start, 3),
      },
    });
    const sent = await sendDueReminders();
    expect(sent).toBe(0);
  });

  it('emails staff with reminder_24h enabled', async () => {
    await prisma.notificationPreference.create({
      data: { userId: adminUser.id, eventType: 'reminder_24h', enabled: true },
    });
    await createDueConfirmed();
    await sendDueReminders();
    expect(sendMail.mock.calls.map(([arg]) => arg.to)).toContain('remind-admin@test.com');
  });
});
