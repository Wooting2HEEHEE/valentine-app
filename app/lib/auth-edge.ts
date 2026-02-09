export const SESSION_COOKIE_NAME = 'valentine-session';

export function hasSessionCookie(cookieValue: string | undefined): boolean {
  return cookieValue === 'authenticated';
}
