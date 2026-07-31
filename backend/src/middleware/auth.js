const jwt = require('jsonwebtoken');
const { getPermissions } = require('../lib/permissions');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

function requireAdmin(req, res, next) {
  if (!['admin', 'superadmin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

function requireEmployee(req, res, next) {
  if (!['admin', 'superadmin', 'employee'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Employee access required' });
  }
  next();
}

function requireSuperadmin(req, res, next) {
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({ error: 'Superadmin access required' });
  }
  next();
}

// Gate a specific section by permission key, scoped to the caller's own role.
// Superadmin always passes. Admin/employee need the flag set to true in "Papéis".
function requirePermission(key) {
  return async (req, res, next) => {
    if (req.user.role === 'superadmin') return next();
    if (!['admin', 'employee'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Access required' });
    }
    try {
      const permissions = await getPermissions(req.user.role);
      if (!permissions[key]) {
        return res.status(403).json({ error: 'A tua conta não tem permissão para aceder a esta área' });
      }
      next();
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

module.exports = { authenticate, requireAdmin, requireEmployee, requireSuperadmin, requirePermission };
