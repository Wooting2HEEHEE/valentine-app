'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const [showSecret, setShowSecret] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 minuter = 300 sekunder
  const [isCountingDown, setIsCountingDown] = useState(false);

  // Inaktivitets timer
  useEffect(() => {
    let activityTimer: NodeJS.Timeout;
    let countdownTimer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(activityTimer);
      clearInterval(countdownTimer);
      setIsCountingDown(false);
      setCountdown(300);

      // Starta ny timer efter 5 minuter inaktivitet
      activityTimer = setTimeout(() => {
        setIsCountingDown(true);
        
        // Börja countdown
        countdownTimer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              // När countdown når 0, redirect till 404
              router.push('/404');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, 5 * 60 * 1000); // 5 minuter
    };

    // Lyssna på all aktivitet
    const handleActivity = () => {
      resetTimer();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    // Starta timer vid mount
    resetTimer();

    return () => {
      clearTimeout(activityTimer);
      clearInterval(countdownTimer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [router]);

  const handleZeroClick = () => {
    setShowSecret(true);
    setTimeout(() => {
      router.push('/login');
    }, 500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        
        {/* 404 ERROR */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-red-500 mb-4 animate-pulse">404</h1>
          <h2 className="text-3xl font-semibold text-white mb-2">Page Not Found</h2>
          <p className="text-gray-300 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Hemlig knapp - nummer 0 */}
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-4">Error code reference:</p>
          <div className="flex justify-center gap-2">
            {[4, 0, 4].map((num, index) => (
              <button
                key={index}
                onClick={() => num === 0 && handleZeroClick()}
                className={`w-16 h-16 rounded-lg font-bold text-2xl transition-all ${
                  num === 0 
                    ? 'bg-red-600 hover:bg-red-500 text-white cursor-pointer hover:scale-110' 
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          {showSecret && (
            <div className="mt-4 text-green-400 animate-pulse">
              ✓ Access granted...
            </div>
          )}
        </div>

        {/* Standard 404 länkar */}
        <div className="space-y-4">
          <a 
            href="https://google.com" 
            className="block bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            ← Go back to previous page
          </a>
          <a 
            href="https://google.com" 
            className="block bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            🏠 Go to homepage
          </a>
        </div>

        {/* Inaktivitets countdown */}
        {isCountingDown && (
          <div className="fixed bottom-4 right-4 bg-red-900/80 text-white px-4 py-2 rounded-lg border border-red-500">
            <p className="text-sm">Inaktivitet - redirect om:</p>
            <p className="font-mono text-lg">{formatTime(countdown)}</p>
          </div>
        )}

        {/* Debug info (bara i dev) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed top-4 left-4 bg-black/50 text-white p-2 rounded text-xs">
            <p>Inaktivitets timer aktiv</p>
            <p>Klicka på 0 för hemlig ingång</p>
          </div>
        )}
      </div>

      {/* Glitch effekt */}
      <style jsx>{`
        @keyframes glitch {
          0%, 100% { text-shadow: 2px 0 red, -2px 0 cyan; }
          25% { text-shadow: -2px 0 red, 2px 0 cyan; }
          50% { text-shadow: 2px 0 cyan, -2px 0 red; }
          75% { text-shadow: -2px 0 cyan, 2px 0 red; }
        }
        
        .animate-pulse {
          animation: glitch 2s infinite;
        }
      `}</style>
    </div>
  );
}
