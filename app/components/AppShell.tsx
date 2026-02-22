'use client';

import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { useInactivityRedirect } from '../hooks/useInactivityRedirect';

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCountingDown, countdown, formatTime } = useInactivityRedirect(5);

  return (
    <div className="min-h-screen heart-bg">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <header className="mb-10 flex items-center justify-between">
          <Link href="/memories" className="text-3xl font-handwriting text-white drop-shadow">
            Mazbuli 💭
          </Link>
          <LogoutButton />
        </header>
        <div className="card">{children}</div>
      </div>

      {/* Inaktivitets countdown */}
      {isCountingDown && (
        <div className="fixed bottom-4 right-4 bg-red-900/80 text-white px-4 py-2 rounded-lg border border-red-500 shadow-lg animate-pulse">
          <p className="text-xs">Inaktivitet - redirect om:</p>
          <p className="font-mono text-lg">{formatTime(countdown)}</p>
        </div>
      )}
    </div>
  );
}
