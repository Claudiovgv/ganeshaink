const router = require('express').Router();
const { authenticate, requireSuperadmin } = require('../../middleware/auth');
const { ROLE_PERMISSION_KEYS, getPermissions, setPermissions } = require('../../lib/permissions');
const { logEvent } = require('../../lib/logger');

router.use(authenticate, requireSuperadmin);

router.get('/', async (req, res) => {
  try {
    const [admin, employee] = await Promise.all([getPermissions('admin'), getPermissions('employee')]);
    res.json({ keys: ROLE_PERMISSION_KEYS, permissions: { admin, employee } });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/', async (req, res) => {
  try {
    const { role, permissions } = req.body;
    if (!ROLE_PERMISSION_KEYS[role]) return res.status(400).json({ error: 'Papel inválido' });

    const saved = await setPermissions(role, permissions || {});
    logEvent('info', 'roles', `Permissões do papel ${role} atualizadas`, { userId: req.user.id, ip: req.ip, meta: saved });
    res.json({ role, permissions: saved });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
