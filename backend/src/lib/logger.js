const prisma = require('../config/database');

async function logEvent(level, category, message, { ip, userId, meta } = {}) {
  try {
    await prisma.systemLog.create({
      data: { level, category, message, ip, userId, meta },
    });
  } catch (err) {
    console.error('Failed to write system log:', err.message);
  }
}

function logRouteError(req, err, category) {
  console.error(err);
  logEvent('error', category, err.message || 'Internal server error', {
    ip: req.ip,
    userId: req.user?.id,
    meta: { path: req.originalUrl || req.path, method: req.method },
  });
}

module.exports = { logEvent, logRouteError };
