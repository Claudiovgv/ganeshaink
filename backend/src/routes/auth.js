const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticator } = require('otplib');
const QRCode = require('qrcode');
const prisma = require('../config/database');
const { authenticate } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimit');
const { logEvent } = require('../lib/logger');
const { getPermissions } = require('../lib/permissions');

function issueToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      logEvent('security', 'auth', `Failed login: unknown user "${email}"`, { ip: req.ip });
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      logEvent('security', 'auth', `Failed login: wrong password for "${email}"`, { ip: req.ip, userId: user.id });
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Atalho só para desenvolvimento local: salta o 2FA por completo.
    // NUNCA ativar em produção — só funciona se a env var estiver explicitamente
    // definida, e não faz parte de nenhuma configuração de deploy.
    if (process.env.DISABLE_2FA_FOR_LOCAL_DEV === 'true' && process.env.NODE_ENV !== 'test') {
      const { password: _, twoFactorSecret: __, ...safeUser } = user;
      return res.json({ token: issueToken(user), user: safeUser });
    }

    // 2FA is mandatory for every account. First login (no secret yet) triggers setup instead of a code prompt.
    const pendingToken = jwt.sign(
      { id: user.id, pending2FA: true },
      process.env.JWT_SECRET,
      { expiresIn: '10m' }
    );
    return res.json({ requires2FA: true, needsSetup: !user.twoFactorEnabled, pendingToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function verifyPendingToken(pendingToken) {
  try {
    const decoded = jwt.verify(pendingToken, process.env.JWT_SECRET);
    return decoded.pending2FA ? decoded : null;
  } catch {
    return null;
  }
}

// First login only: generate + store the 2FA secret so it can be shown as a QR code before it's confirmed.
router.post('/login/setup-2fa', async (req, res) => {
  try {
    const decoded = verifyPendingToken(req.body.pendingToken);
    if (!decoded) return res.status(401).json({ error: 'Expired or invalid session, please log in again' });

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    if (user.twoFactorEnabled) return res.status(400).json({ error: '2FA already configured, enter your code instead' });

    const secret = authenticator.generateSecret();
    await prisma.user.update({ where: { id: user.id }, data: { twoFactorSecret: secret } });

    const otpauth = authenticator.keyuri(user.email, 'Ganesha Ink', secret);
    const qrCodeDataUrl = await QRCode.toDataURL(otpauth);
    res.json({ secret, qrCodeDataUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login/verify-2fa', authLimiter, async (req, res) => {
  try {
    const { pendingToken, code } = req.body;
    if (!pendingToken || !code) {
      return res.status(400).json({ error: 'pendingToken and code required' });
    }

    const decoded = verifyPendingToken(pendingToken);
    if (!decoded) return res.status(401).json({ error: 'Expired or invalid session, please log in again' });

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user || !user.twoFactorSecret) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = authenticator.check(code, user.twoFactorSecret);
    if (!valid) {
      logEvent('security', 'auth', `Failed 2FA code for "${user.email}"`, { ip: req.ip, userId: user.id });
      return res.status(401).json({ error: 'Invalid authentication code' });
    }

    if (!user.twoFactorEnabled) {
      await prisma.user.update({ where: { id: user.id }, data: { twoFactorEnabled: true } });
      user.twoFactorEnabled = true;
      logEvent('info', 'auth', `2FA configurado: ${user.email}`, { ip: req.ip, userId: user.id });
    }

    logEvent('info', 'auth', `Login (2FA): ${user.email}`, { ip: req.ip, userId: user.id });
    const token = issueToken(user);
    const { password: _, twoFactorSecret: __, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/2fa/setup', authenticate, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const secret = authenticator.generateSecret();
    await prisma.user.update({ where: { id: user.id }, data: { twoFactorSecret: secret, twoFactorEnabled: false } });

    const otpauth = authenticator.keyuri(user.email, 'Ganesha Ink', secret);
    const qrCodeDataUrl = await QRCode.toDataURL(otpauth);

    res.json({ secret, qrCodeDataUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/2fa/enable', authenticate, async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'code required' });

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user || !user.twoFactorSecret) {
      return res.status(400).json({ error: 'Run /2fa/setup first' });
    }

    const valid = authenticator.check(code, user.twoFactorSecret);
    if (!valid) return res.status(401).json({ error: 'Invalid authentication code' });

    await prisma.user.update({ where: { id: user.id }, data: { twoFactorEnabled: true } });
    res.json({ message: '2FA enabled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/2fa/disable', authenticate, async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ error: 'password required' });

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    await prisma.user.update({ where: { id: user.id }, data: { twoFactorEnabled: false, twoFactorSecret: null } });
    res.json({ message: '2FA disabled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true, createdAt: true, twoFactorEnabled: true },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const permissions = await getPermissions(user.role);

    res.json({ ...user, permissions });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/logout', authenticate, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
