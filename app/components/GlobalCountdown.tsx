'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GlobalCountdown() {
  const router = useRouter();
  const timeoutMinutes = 5; // 5 minuter

  useEffect(() => {
    let activityTimer: any = null;
    let countdownTimer: any = null;
    let countdownValue = timeoutMinutes * 60;
    let countdownEl: any = null;

    const resetTimer = () => {
      if (activityTimer) clearTimeout(activityTimer);
      if (countdownTimer) clearInterval(countdownTimer);
      countdownValue = timeoutMinutes * 60;
      updateCountdownDisplay();
    };

    const updateCountdownDisplay = () => {
      if (countdownEl) {
        countdownEl.textContent = formatTime(countdownValue);
      }
    };

    const startCountdown = () => {
      countdownTimer = setInterval(() => {
        countdownValue--;
        updateCountdownDisplay();
        
        if (countdownValue <= 0) {
          clearInterval(countdownTimer);
          router.push('/not-found');
        }
      }, 1000);
    };

    const handleActivity = () => {
      resetTimer();
      startCountdown();
    };

    // Skapa countdown element (client-side only)
    if (typeof window !== 'undefined') {
      countdownEl = document.createElement('div');
      countdownEl.id = 'global-countdown';
      countdownEl.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: rgba(239, 68, 68, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 12px;
        font-family: monospace;
        z-index: 9999;
        display: none;
      `;
      document.body.appendChild(countdownEl);
    }

    // Event listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Starta timer
    resetTimer();
    setTimeout(() => {
      startCountdown();
      countdownEl.style.display = 'block';
    }, 1000);

    return () => {
      clearTimeout(activityTimer);
      clearInterval(countdownTimer);
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      if (countdownEl.parentNode) {
        countdownEl.parentNode.removeChild(countdownEl);
      }
    };
  }, [router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return null; // Renderar inget, bara lägger till countdown i DOM
}
