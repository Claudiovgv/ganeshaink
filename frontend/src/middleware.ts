import { NextRequest, NextResponse } from 'next/server';

const APEX_HOST = 'ganeshaink.pt';
const WWW_HOST = 'www.ganeshaink.pt';

function isStudioHost(host: string) {
  return host === APEX_HOST || host === WWW_HOST;
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = (request.headers.get('host') || '').split(':')[0].toLowerCase();
  const proto = (request.headers.get('x-forwarded-proto') || url.protocol.replace(':', '')).split(',')[0].trim();

  let redirect = false;

  if (host === WWW_HOST) {
    url.hostname = APEX_HOST;
    url.protocol = 'https:';
    redirect = true;
  }

  if (isStudioHost(host) && proto === 'http') {
    url.hostname = APEX_HOST;
    url.protocol = 'https:';
    redirect = true;
  }

  if (url.pathname === '/nails' || url.pathname.startsWith('/nails/')) {
    url.pathname = url.pathname.replace(/^\/nails/, '/beauty');
    if (isStudioHost(host) || host === WWW_HOST) url.protocol = 'https:';
    if (host === WWW_HOST) url.hostname = APEX_HOST;
    redirect = true;
  }

  if (redirect) {
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.(?:ico|png|jpg|jpeg|webp|svg|txt|xml)$).*)'],
};
