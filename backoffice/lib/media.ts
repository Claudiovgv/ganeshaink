const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3002/v1';

export function apiOrigin(): string {
  return API.replace(/\/v1\/?$/, '');
}

export function resolveMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads')) return `${apiOrigin()}${url}`;
  return url;
}
