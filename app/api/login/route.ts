import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { login, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from '@/app/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const password = body?.password;

    if (typeof password !== 'string' || password.length === 0) {
      return NextResponse.json({ message: 'Password required.' }, { status: 400 });
    }

    const ok = await login(password);
    if (!ok) {
      return NextResponse.json(
        {
          message: [
            'Nope 😏 try again.',
            'Wrong one, cutie 🙈',
            'Hmm… that’s not the secret spell 🪄',
            'Nice try 😌',
            'Not quite. I’m still locked 🔒',
          ][Math.floor(Math.random() * 5)],
        },
        { status: 401 }
      );
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

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}
