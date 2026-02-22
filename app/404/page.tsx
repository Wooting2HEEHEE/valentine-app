'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error404Page() {
  const router = useRouter();

  useEffect(() => {
    // Omdirigera till not-found component
    router.replace('/not-found');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-4xl mb-4">Loading...</h1>
      </div>
    </div>
  );
}
