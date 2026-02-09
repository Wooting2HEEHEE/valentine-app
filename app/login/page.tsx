import { Suspense } from 'react';
import LoginForm from '@/app/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen heart-bg flex items-center justify-center px-6 py-12">
      <div className="card w-full max-w-md relative overflow-hidden">
        <div className="absolute -top-10 -right-10 text-7xl opacity-20 animate-pulse-slow">💗</div>
        <div className="absolute -bottom-10 -left-10 text-7xl opacity-20 animate-pulse-slow">🌹</div>
        <Suspense fallback={<div className="p-6 text-white/80">Loading…</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
