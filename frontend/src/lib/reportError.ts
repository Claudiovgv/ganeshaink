const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/v1';

export function reportClientError(payload: {
  message: string;
  path?: string;
  status?: number;
  detail?: string;
}) {
  const message = payload.message?.trim();
  if (!message) return;

  const key = `${message}|${payload.path || ''}`;
  try {
    if (typeof sessionStorage !== 'undefined') {
      const prev = sessionStorage.getItem('ganesha:last-error');
      const now = Date.now();
      if (prev) {
        const parsed = JSON.parse(prev) as { key: string; at: number };
        if (parsed.key === key && now - parsed.at < 60_000) return;
      }
      sessionStorage.setItem('ganesha:last-error', JSON.stringify({ key, at: Date.now() }));
    }
  } catch {
    /* ignore quota / SSR */
  }

  fetch(`${API_URL}/client-errors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      path: payload.path,
      status: payload.status,
      detail: payload.detail,
      source: 'frontend',
    }),
    keepalive: true,
  }).catch(() => {});
}
