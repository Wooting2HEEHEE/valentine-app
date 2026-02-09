import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { hasSessionCookie, SESSION_COOKIE_NAME } from './app/lib/auth-edge';

const publicPaths = ['/login', '/api/login', '/api/logout', '/_next'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public paths and Next internals
  if (
    publicPaths.some(path => pathname.startsWith(path)) ||
    pathname.startsWith('/_next/') ||
    pathname.endsWith('.ico')
  ) {
    return NextResponse.next();
  }

  // Check authentication
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isAuth = hasSessionCookie(session);
  
  // Redirect to login if not authenticated
  if (!isAuth) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
