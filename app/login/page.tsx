'use client';

import { Suspense } from 'react';
import LoginForm from '@/app/components/LoginForm';
import { useInactivityRedirect } from '../hooks/useInactivityRedirect';

export default function LoginPage() {
  const { isCountingDown, countdown, formatTime } = useInactivityRedirect(5);

  return (
    <div className="min-h-screen heart-bg flex items-center justify-center px-6 py-12">
      <div className="card w-full max-w-md relative overflow-hidden">
        <div className="absolute -top-10 -right-10 text-7xl opacity-20 animate-pulse-slow">💗</div>
        <div className="absolute -bottom-10 -left-10 text-7xl opacity-20 animate-pulse-slow">🌹</div>
        <Suspense fallback={<div className="p-6 text-white/80">Loading…</div>}>
          <LoginForm />
        </Suspense>
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
