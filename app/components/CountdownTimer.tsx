'use client';

import { useEffect, useMemo, useState } from 'react';

function getNextValentines() {
  const now = new Date();
  const year = now.getMonth() > 1 || (now.getMonth() === 1 && now.getDate() > 14) ? now.getFullYear() + 1 : now.getFullYear();
  return new Date(year, 1, 14, 0, 0, 0, 0);
}

export default function CountdownTimer() {
  const target = useMemo(() => getNextValentines(), []);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, target.getTime() - now);
  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const ended = diff === 0;

  return (
    <div className="mx-auto max-w-xl">
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Days', value: days },
          { label: 'Hours', value: hours },
          { label: 'Min', value: minutes },
          { label: 'Sec', value: seconds },
        ].map((b) => (
          <div key={b.label} className="rounded-2xl bg-white/10 border border-white/20 p-4">
            <div className="text-3xl font-bold text-white">{b.value}</div>
            <div className="text-white/70 text-sm">{b.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-white/10 border border-white/20 p-5 text-white">
        {ended ? (
          <div className="text-2xl font-bold">It’s Valentine’s Day 💘</div>
        ) : (
          <div>
            <div className="text-white/80">Counting down to</div>
            <div className="text-2xl font-bold">Feb 14</div>
          </div>
        )}
      </div>
    </div>
  );
}
