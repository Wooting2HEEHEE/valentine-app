import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { compare } from 'bcryptjs';

export const SESSION_COOKIE_NAME = 'valentine-session';
export const FAILED_ATTEMPTS_COOKIE_NAME = 'valentine-failed-attempts';
export const MAX_FAILED_ATTEMPTS = 3;

export async function login(password: string): Promise<boolean> {
  const passwordHash = process.env.PASSWORD_HASH || '';
  if (!passwordHash) return false;

  // Check failed attempts
  const failedAttempts = getFailedAttempts();
  if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
    // Bypass authentication after 3 failed attempts
    setSessionCookie();
    clearFailedAttempts();
    return true;
  }

  try {
    const isMatch = await compare(password, passwordHash);
    if (isMatch) {
      setSessionCookie();
      clearFailedAttempts();
      return true;
    } else {
      incrementFailedAttempts();
      return false;
    }
  } catch (error) {
    console.error('Login error:', error);
    incrementFailedAttempts();
    return false;
  }
}

function setSessionCookie() {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, 'authenticated', {
    maxAge: SESSION_MAX_AGE_SECONDS,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export function getFailedAttempts(): number {
  const cookieStore = cookies();
  const failedAttempts = cookieStore.get(FAILED_ATTEMPTS_COOKIE_NAME)?.value;
  return failedAttempts ? parseInt(failedAttempts, 10) : 0;
}

export function incrementFailedAttempts() {
  const cookieStore = cookies();
  const currentAttempts = getFailedAttempts();
  cookieStore.set(FAILED_ATTEMPTS_COOKIE_NAME, (currentAttempts + 1).toString(), {
    maxAge: SESSION_MAX_AGE_SECONDS,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export function clearFailedAttempts() {
  const cookieStore = cookies();
  cookieStore.delete(FAILED_ATTEMPTS_COOKIE_NAME);
}

export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function isAuthenticated(): boolean {
  return !!cookies().get(SESSION_COOKIE_NAME)?.value;
}

export function requireAuth() {
  if (!isAuthenticated()) {
    redirect('/login');
  }
}
