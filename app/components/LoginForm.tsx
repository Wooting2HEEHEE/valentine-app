'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import type { LoginState } from '@/app/login/actions';
import { loginAction } from '@/app/login/actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full btn btn-primary flex items-center justify-center space-x-2"
    >
      {pending ? 'Unlocking…' : 'Access Memories'}
    </button>
  );
}

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/memories';
  const [state, formAction] = useFormState<LoginState, FormData>(loginAction, { ok: false });
  const passwordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!state.ok) passwordRef.current?.focus();
  }, [state.ok]);

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-handwriting text-valentine-red mb-2">Our Memories</h1>
        <p className="text-pink-200">Enter the password to access our special collection</p>
      </div>
      
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="redirect" value={redirectTo} />
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-pink-100 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            ref={passwordRef}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-pink-200/20 text-white placeholder-pink-200/50 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            placeholder="Enter the magic word..."
          />
        </div>

        {!state.ok && state.message && (
          <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
            {state.message}
          </div>
        )}

        {state.ok && state.message && (
          <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-200 text-sm">
            {state.message}
          </div>
        )}

        {state.attemptsRemaining !== undefined && state.attemptsRemaining > 0 && !state.ok && (
          <div className="text-center text-pink-200 text-sm">
            Attempts remaining: {state.attemptsRemaining}
          </div>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}
