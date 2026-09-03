const { addHours, subHours } = require('date-fns');
const prisma = require('../config/database');
const { sendMail } = require('./mailer');
const {
  appointmentConfirmedEmail,
  appointmentReceivedEmail,
  appointmentStatusChangedEmail,
  consultationReceivedEmail,
  reminderEmail,
  staffNewAppointmentEmail,
  staffStatusChangedEmail,
  staffConsultationReceivedEmail,
  staffReminderEmail,
} = require('./emailTemplates');

const EVENT_TYPES = [
  'new_appointment',
  'appointment_confirmed',
  'appointment_cancelled',
  'appointment_completed',
  'consultation_received',
  'reminder_24h',
];

const EVENT_LABELS = {
  new_appointment: 'Nova marcação',
  appointment_confirmed: 'Marcação confirmada',
  appointment_cancelled: 'Marcação cancelada',
  appointment_completed: 'Marcação concluída',
  consultation_received: 'Pedido de consulta',
  reminder_24h: 'Lembrete 24h',
};

const STATUS_EVENT = {
  confirmed: 'appointment_confirmed',
  cancelled: 'appointment_cancelled',
  completed: 'appointment_completed',
};

const APPOINTMENT_INCLUDE = {
  employee: { select: { id: true, name: true, userId: true } },
  service: true,
  partnership: { select: { id: true, name: true, percent: true, extraFieldLabel: true } },
};

function isPlaceholderEmail(email) {
  return !email || email.startsWith('sem-contacto+');
}

function isDeliverableEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function staffMailbox(user) {
  if (!user) return null;
  if (isDeliverableEmail(user.notificationEmail)) return user.notificationEmail.trim();
  if (isDeliverableEmail(user.email)) return user.email.trim();
  return null;
}

function sendClient(to, template) {
  if (isPlaceholderEmail(to) || !template) return;
  sendMail({ to, subject: template.subject, html: template.html });
}

function assignedUserId(payload) {
  return payload.employee?.userId || null;
}

async function staffRecipients(eventType, payload) {
  if (!EVENT_TYPES.includes(eventType)) return [];
  const prefs = await prisma.notificationPreference.findMany({
    where: { eventType, enabled: true },
    include: { user: { select: { id: true, email: true, notificationEmail: true, role: true } } },
  });
  const assigned = assignedUserId(payload);
  const emails = new Set();
  for (const pref of prefs) {
    const { user } = pref;
    const mailbox = staffMailbox(user);
    if (!mailbox) continue;
    const isManagement = user.role === 'admin' || user.role === 'superadmin';
    const isAssignedPro = assigned && user.id === assigned;
    if (isManagement || isAssignedPro) emails.add(mailbox);
  }
  return [...emails];
}

async function sendStaff(eventType, payload, template) {
  if (!template) return;
  const recipients = await staffRecipients(eventType, payload);
  for (const to of recipients) {
    sendMail({ to, subject: template.subject, html: template.html });
  }
}

async function notifyAppointmentCreated(appointment) {
  if (appointment.status === 'confirmed') {
    sendClient(appointment.clientEmail, appointmentConfirmedEmail(appointment));
  } else {
    sendClient(appointment.clientEmail, appointmentReceivedEmail(appointment));
  }
  await sendStaff('new_appointment', appointment, staffNewAppointmentEmail(appointment));
}

async function notifyAppointmentStatusChanged(appointment, previousStatus) {
  if (appointment.status === previousStatus) return;
  sendClient(appointment.clientEmail, appointmentStatusChangedEmail(appointment));
  const eventType = STATUS_EVENT[appointment.status];
  if (eventType) {
    await sendStaff(eventType, appointment, staffStatusChangedEmail(appointment));
  }
}

async function notifyConsultationCreated(consultation) {
  sendClient(consultation.clientEmail, consultationReceivedEmail(consultation));
  await sendStaff('consultation_received', consultation, staffConsultationReceivedEmail(consultation));
}

async function notifyReminder(appointment) {
  sendClient(appointment.clientEmail, reminderEmail(appointment));
  await sendStaff('reminder_24h', appointment, staffReminderEmail(appointment));
}

async function sendDueReminders(now = new Date()) {
  const candidates = await prisma.appointment.findMany({
    where: {
      status: 'confirmed',
      reminderSentAt: null,
      startDatetime: { gt: now, lte: addHours(now, 24) },
    },
    include: APPOINTMENT_INCLUDE,
  });

  let sent = 0;
  for (const apt of candidates) {
    if (apt.createdAt > subHours(apt.startDatetime, 24)) continue;
    await prisma.appointment.update({
      where: { id: apt.id },
      data: { reminderSentAt: now },
    });
    await notifyReminder(apt);
    sent += 1;
  }
  return sent;
}

async function getNotificationMatrix() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      notificationEmail: true,
      role: true,
      notificationPreferences: { select: { eventType: true, enabled: true } },
    },
    orderBy: { name: 'asc' },
  });

  return {
    events: EVENT_TYPES.map((id) => ({ id, label: EVENT_LABELS[id] })),
    users: users.map((u) => {
      const preferences = Object.fromEntries(EVENT_TYPES.map((e) => [e, false]));
      for (const pref of u.notificationPreferences) {
        if (pref.eventType in preferences) preferences[pref.eventType] = pref.enabled;
      }
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        notificationEmail: u.notificationEmail || '',
        mailbox: staffMailbox(u),
        role: u.role,
        preferences,
      };
    }),
  };
}

async function saveNotificationPreferences(rows, mailboxes) {
  if (!Array.isArray(rows)) throw new Error('preferences must be an array');
  for (const row of rows) {
    const userId = Number(row.userId);
    const eventType = row.eventType;
    if (!EVENT_TYPES.includes(eventType) || !userId) continue;
    await prisma.notificationPreference.upsert({
      where: { userId_eventType: { userId, eventType } },
      update: { enabled: Boolean(row.enabled) },
      create: { userId, eventType, enabled: Boolean(row.enabled) },
    });
  }
  if (Array.isArray(mailboxes)) {
    for (const row of mailboxes) {
      const userId = Number(row.userId);
      if (!userId) continue;
      const raw = row.notificationEmail == null ? '' : String(row.notificationEmail).trim();
      if (raw && !isDeliverableEmail(raw)) {
        throw Object.assign(new Error(`Email de notificação inválido: ${raw}`), { status: 400 });
      }
      await prisma.user.update({
        where: { id: userId },
        data: { notificationEmail: raw || null },
      });
    }
  }
  return getNotificationMatrix();
}

module.exports = {
  EVENT_TYPES,
  EVENT_LABELS,
  APPOINTMENT_INCLUDE,
  notifyAppointmentCreated,
  notifyAppointmentStatusChanged,
  notifyConsultationCreated,
  notifyReminder,
  sendDueReminders,
  getNotificationMatrix,
  saveNotificationPreferences,
  isDeliverableEmail,
  staffMailbox,
};
