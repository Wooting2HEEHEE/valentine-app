'use client';

import { useEffect, useMemo, useState } from 'react';

type Heart = {
  id: string;
  x: number;
  y: number;
};

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export default function HeartClickGame() {
  const target = 20;
  const [score, setScore] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const [heart, setHeart] = useState<Heart>(() => ({ id: uid(), x: 50, y: 50 }));

  const timeMs = useMemo(() => {
    if (!startedAt) return null;
    const end = finishedAt ?? Date.now();
    return Math.max(0, end - startedAt);
  }, [startedAt, finishedAt]);

  useEffect(() => {
    if (score >= target) setFinishedAt((t) => t ?? Date.now());
  }, [score]);

  function randomPos() {
    const x = Math.floor(Math.random() * 84) + 8;
    const y = Math.floor(Math.random() * 64) + 12;
    setHeart({ id: uid(), x, y });
  }

  function reset() {
    setScore(0);
    setStartedAt(null);
    setFinishedAt(null);
    setHeart({ id: uid(), x: 50, y: 50 });
  }

  const done = score >= target;

  return (
    <div>
      <div className="flex items-center justify-between mb-3 text-white/90">
        <div>
          Score: <span className="font-bold">{score}</span> / {target}
        </div>
        <div>
          Time:{' '}
          <span className="font-bold">
            {timeMs === null ? '—' : `${(timeMs / 1000).toFixed(1)}s`}
          </span>
        </div>
      </div>

      <div className="relative w-full h-56 rounded-xl bg-black/20 border border-white/20 overflow-hidden">
        {!done && (
          <button
            key={heart.id}
            type="button"
            className="absolute text-4xl hover:scale-110 active:scale-95 transition-transform"
            style={{ left: `${heart.x}%`, top: `${heart.y}%`, transform: 'translate(-50%, -50%)' }}
            onClick={() => {
              if (!startedAt) setStartedAt(Date.now());
              setScore((s) => s + 1);
              randomPos();
            }}
          >
            💗
          </button>
        )}

        {done && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="text-2xl font-bold">You win 💘</div>
            <div className="text-white/80 mt-1">Okay… you’re fast.</div>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-3">
        <button type="button" className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
