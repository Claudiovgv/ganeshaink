const rateLimit = require('express-rate-limit');
const { logEvent } = require('../lib/logger');

// In-memory store we can list and wipe from the backoffice (superadmin).
class ResettableMemoryStore {
  constructor() {
    this.hits = new Map();
    this.windowMs = 15 * 60 * 1000;
  }

  init(options) {
    if (options?.windowMs) this.windowMs = options.windowMs;
  }

  _prune(now = Date.now()) {
    for (const [key, entry] of this.hits) {
      if (now > entry.resetTime) this.hits.delete(key);
    }
  }

  async increment(key) {
    const now = Date.now();
    this._prune(now);
    let entry = this.hits.get(key);
    if (!entry || now > entry.resetTime) {
      entry = { count: 0, resetTime: now + this.windowMs };
    }
    entry.count += 1;
    this.hits.set(key, entry);
    return { totalHits: entry.count, resetTime: new Date(entry.resetTime) };
  }

  async decrement(key) {
    const entry = this.hits.get(key);
    if (!entry) return;
    entry.count = Math.max(0, entry.count - 1);
  }

  async resetKey(key) {
    this.hits.delete(key);
  }

  async resetAll() {
    this.hits.clear();
  }

  snapshot() {
    const now = Date.now();
    this._prune(now);
    return [...this.hits.entries()].map(([key, entry]) => ({
      key,
      hits: entry.count,
      resetAt: new Date(entry.resetTime).toISOString(),
    }));
  }
}

const authStore = new ResettableMemoryStore();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados pedidos. Tenta outra vez daqui a pouco.' },
});

const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: 'Demasiados pedidos. Tenta outra vez daqui a pouco.' },
});

// Só contam tentativas falhadas. Login + 2FA com sucesso não bloqueiam a conta.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  store: authStore,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  handler(req, res) {
    logEvent('security', 'auth', 'Login bloqueado: demasiadas tentativas', { ip: req.ip });
    res.status(429).json({
      error: 'Demasiadas tentativas de login. Espera uns minutos ou pede ao superadmin para desbloquear em Definições → Log.',
    });
  },
});

const clientErrorLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: 'Too many reports' },
});

function resetAuthLimits() {
  return authStore.resetAll();
}

function listAuthBlocks() {
  return authStore.snapshot();
}

module.exports = {
  apiLimiter,
  publicLimiter,
  authLimiter,
  clientErrorLimiter,
  resetAuthLimits,
  listAuthBlocks,
};
