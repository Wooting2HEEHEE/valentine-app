import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
  // Rensa session cookie
  cookies().set({
    name: 'valentine-session',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  // Redirect till 404
  redirect('/gate');
}
