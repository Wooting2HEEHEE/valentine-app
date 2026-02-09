'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { login, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS, getFailedAttempts, MAX_FAILED_ATTEMPTS } from '@/app/lib/auth';

export type LoginState = {
  ok: boolean;
  message?: string;
  attemptsRemaining?: number;
};

export async function loginAction(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const password = formData.get('password');
  const redirectTo = formData.get('redirect');

  if (typeof password !== 'string') {
    return { ok: false, message: 'Say the magic word first 🥺', attemptsRemaining: MAX_FAILED_ATTEMPTS - getFailedAttempts() };
  }

  const normalizedPassword = password.trim();
  if (normalizedPassword.length === 0) {
    return { ok: false, message: 'Say the magic word first 🥺', attemptsRemaining: MAX_FAILED_ATTEMPTS - getFailedAttempts() };
  }

  const failedAttemptsBefore = getFailedAttempts();
  const ok = await login(normalizedPassword);
  
  if (!ok) {
    const failedAttemptsAfter = getFailedAttempts();
    const attemptsRemaining = MAX_FAILED_ATTEMPTS - failedAttemptsAfter;
    
    if (attemptsRemaining > 0) {
      const messages = [
        `Nope 😏 try again. (${attemptsRemaining} attempts left)`,
        `Wrong one, cutie 🙈 (${attemptsRemaining} attempts left)`,
        `Hmm… that's not it 🪄 (${attemptsRemaining} attempts left)`,
        `Nice try 😌 (${attemptsRemaining} attempts left)`,
        `Not quite. I'm still locked 🔒 (${attemptsRemaining} attempts left)`,
      ];
      return { ok: false, message: messages[Math.floor(Math.random() * messages.length)], attemptsRemaining };
    } else {
      // Bypass after 3 failed attempts - set cookie and redirect
      cookies().set({
        name: SESSION_COOKIE_NAME,
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: SESSION_MAX_AGE_SECONDS,
        path: '/',
      });
      redirect(typeof redirectTo === 'string' && redirectTo.startsWith('/') ? redirectTo : '/memories');
    }
  }

  // Check if this was a bypass (3 failed attempts then successful)
  if (failedAttemptsBefore >= MAX_FAILED_ATTEMPTS) {
    redirect(typeof redirectTo === 'string' && redirectTo.startsWith('/') ? redirectTo : '/memories');
  }

  cookies().set({
    name: SESSION_COOKIE_NAME,
    value: 'authenticated',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: '/',
  });

  redirect(typeof redirectTo === 'string' && redirectTo.startsWith('/') ? redirectTo : '/memories');

  return { ok: true };
}
