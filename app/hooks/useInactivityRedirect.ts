'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useInactivityRedirect(timeoutMinutes: number = 5) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);

  useEffect(() => {
    let activityTimer: NodeJS.Timeout;
    let countdownTimer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(activityTimer);
      clearInterval(countdownTimer);
      setIsCountingDown(false);
      setCountdown(timeoutMinutes * 60);

      // Starta ny timer
      activityTimer = setTimeout(() => {
        setIsCountingDown(true);
        
        // Börja countdown
        countdownTimer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              // Redirect till 404
              router.push('/404');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, timeoutMinutes * 60 * 1000);
    };

    // Lyssna på aktivitet
    const handleActivity = () => {
      resetTimer();
    };

    // Event listeners
    const events = [
      'mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'
    ];

    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Starta timer
    resetTimer();

    return () => {
      clearTimeout(activityTimer);
      clearInterval(countdownTimer);
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [router, timeoutMinutes]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    isCountingDown,
    countdown,
    formatTime
  };
}
