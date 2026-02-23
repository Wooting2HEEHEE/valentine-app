'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useInactivityRedirect } from './hooks/useInactivityRedirect';

export default function Home() {
  const router = useRouter();
  const { isCountingDown, countdown, formatTime } = useInactivityRedirect(0.17);

  useEffect(() => {
    // Omedelbar redirect till 404-sidan
    router.replace('/not-found');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-light text-gray-600 mb-4">Loading...</h1>
        
        {/* Inaktivitets countdown */}
        {isCountingDown && (
          <div className="fixed bottom-2 right-2 text-gray-300 text-xs">
            {formatTime(countdown)}
          </div>
        )}
      </div>
    </div>
  );
}
