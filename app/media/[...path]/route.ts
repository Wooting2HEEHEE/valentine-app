import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import path from 'path';
import fs from 'fs';
import { SESSION_COOKIE_NAME, hasSessionCookie } from '@/app/lib/auth-edge';

function getMime(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.mp4') return 'video/mp4';
  if (ext === '.webm') return 'video/webm';
  return 'application/octet-stream';
}

export async function GET(_: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!hasSessionCookie(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { path: parts } = await ctx.params;
  const rel = parts.join('/');

  // Prevent path traversal.
  if (rel.includes('..') || rel.includes('\\')) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  const root = path.join(process.cwd(), 'private-media');
  const full = path.join(root, rel);

  if (!full.startsWith(root)) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  if (!fs.existsSync(full) || !fs.statSync(full).isFile()) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  const data = fs.readFileSync(full);
  const res = new NextResponse(data);
  res.headers.set('Content-Type', getMime(full));
  res.headers.set('Cache-Control', 'no-store');
  return res;
}
