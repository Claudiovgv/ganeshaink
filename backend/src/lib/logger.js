const prisma = require('../config/database');

// Fire-and-forget system log — never throws, never blocks the request.
async function logEvent(level, category, message, { ip, userId, meta } = {}) {
  try {
    await prisma.systemLog.create({
      data: { level, category, message, ip, userId, meta },
    });
  } catch (err) {
    console.error('Failed to write system log:', err.message);
  }
}

module.exports = { logEvent };
