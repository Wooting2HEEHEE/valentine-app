'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      className="btn btn-secondary"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          await fetch('/api/logout', { method: 'POST' });
          router.push('/login');
          router.refresh();
        });
      }}
    >
      {pending ? 'Logging out…' : 'Logout'}
    </button>
  );
}
