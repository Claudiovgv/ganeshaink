const jwt = require('jsonwebtoken');
const prisma = require('../config/database');
const { isDeliverableEmail } = require('./notifications');

const PURPOSE = 'password-reset';
const MIN_LENGTH = 8;

function resetSecret() {
  return `${process.env.JWT_SECRET}::password-reset`;
}

function findUserByIdentifier(identifier) {
  const raw = String(identifier || '').trim();
  if (!raw) return Promise.resolve(null);
  return prisma.user.findFirst({
    where: {
      OR: [
        { email: raw },
        { notificationEmail: raw },
      ],
    },
  });
}

function destinationMailbox(user) {
  if (!user) return null;
  if (isDeliverableEmail(user.notificationEmail)) return user.notificationEmail.trim();
  if (isDeliverableEmail(user.email)) return user.email.trim();
  return null;
}

function createPasswordResetToken(user) {
  return jwt.sign({ id: user.id, purpose: PURPOSE }, resetSecret(), { expiresIn: '1h' });
}

function verifyPasswordResetToken(token) {
  try {
    const decoded = jwt.verify(String(token || ''), resetSecret());
    if (decoded.purpose !== PURPOSE || !decoded.id) return null;
    return decoded;
  } catch {
    return null;
  }
}

function resetLink(token) {
  const base = (process.env.BACKOFFICE_URL || 'https://admin.ganeshaink.pt').replace(/\/$/, '');
  return `${base}/repor-senha?token=${encodeURIComponent(token)}`;
}

function assertPassword(password) {
  if (typeof password !== 'string' || password.length < MIN_LENGTH) {
    const err = new Error(`A senha tem de ter pelo menos ${MIN_LENGTH} caracteres`);
    err.status = 400;
    throw err;
  }
}

module.exports = {
  findUserByIdentifier,
  destinationMailbox,
  createPasswordResetToken,
  verifyPasswordResetToken,
  resetLink,
  assertPassword,
  MIN_LENGTH,
};
