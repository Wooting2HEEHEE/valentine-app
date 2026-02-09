import type { NextRequest } from 'next/server';
import { hasSessionCookie, SESSION_COOKIE_NAME } from './auth-edge';

export function isRequestAuthenticated(request: NextRequest): boolean {
  const value = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  return hasSessionCookie(value);
}
