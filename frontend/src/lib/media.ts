const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/v1';

export function resolvePhotoUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads')) return `${API_URL.replace(/\/v1\/?$/, '')}${url}`;
  return url;
}
