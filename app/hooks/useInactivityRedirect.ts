'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function useInactivityRedirect(timeoutMinutes: number = 0.083) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(timeoutMinutes * 60);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const countdownRef = useRef(timeoutMinutes * 60);

  useEffect(() => {
    let activityTimer: NodeJS.Timeout;
    let countdownTimer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(activityTimer);
      clearInterval(countdownTimer);
      setIsCountingDown(false);
      countdownRef.current = timeoutMinutes * 60;
      setCountdown(timeoutMinutes * 60);

      // Starta ny timer
      activityTimer = setTimeout(() => {
        setIsCountingDown(true);
        
        // Börja countdown
        countdownTimer = setInterval(() => {
          countdownRef.current = countdownRef.current - 1;
          setCountdown(countdownRef.current);
          
          if (countdownRef.current <= 0) {
            // Redirect till 404
            router.push('/gate');
            clearInterval(countdownTimer);
            return;
          }
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
