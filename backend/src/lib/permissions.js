const prisma = require('../config/database');

// Which menu/section each configurable role can be granted or denied.
// Superadmin always has everything; core sections (Dashboard/Agenda, Segurança,
// Utilizadores, Papéis, Log) are never delegable and are not listed here.
const ROLE_PERMISSION_KEYS = {
  admin: ['manage_appointments', 'manage_employees', 'manage_services', 'manage_clients', 'manage_blog', 'manage_settings', 'view_stats'],
  employee: ['view_services', 'manage_schedule', 'manage_blocks', 'edit_profile'],
};

function settingKeyFor(role) {
  return `${role}_permissions`;
}

function defaultPermissions(role) {
  const keys = ROLE_PERMISSION_KEYS[role] || [];
  return Object.fromEntries(keys.map((k) => [k, true]));
}

async function getPermissions(role) {
  if (!ROLE_PERMISSION_KEYS[role]) return {};
  const row = await prisma.setting.findUnique({ where: { key: settingKeyFor(role) } });
  if (!row || !row.value) return defaultPermissions(role);
  try {
    const stored = JSON.parse(row.value);
    return { ...defaultPermissions(role), ...stored };
  } catch {
    return defaultPermissions(role);
  }
}

async function setPermissions(role, permissions) {
  const keys = ROLE_PERMISSION_KEYS[role];
  if (!keys) throw new Error('Papel inválido');
  const clean = Object.fromEntries(keys.map((k) => [k, Boolean(permissions[k])]));
  await prisma.setting.upsert({
    where: { key: settingKeyFor(role) },
    update: { value: JSON.stringify(clean) },
    create: { key: settingKeyFor(role), value: JSON.stringify(clean) },
  });
  return clean;
}

// Backwards-compatible helpers used by the login route (admin-only).
async function getAdminPermissions() { return getPermissions('admin'); }
function defaultAdminPermissions() { return defaultPermissions('admin'); }

module.exports = {
  ROLE_PERMISSION_KEYS,
  defaultPermissions,
  getPermissions,
  setPermissions,
  getAdminPermissions,
  defaultAdminPermissions,
};
