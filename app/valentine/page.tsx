'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/app/components/AppShell';
import ConfettiBurst from '@/app/components/ConfettiBurst';
import EmojiExplosion from '@/app/components/EmojiExplosion';

export default function ValentinePage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const teasing = useMemo(
    () => [
      'Are you sure? 🤨',
      'Hmm… suspicious 😌',
      'Don’t make me beg 🥺',
      'That button is getting shy…',
      'Okay okay I know what you’re doing 😏',
      'NO is not really an option here 😌',
      'Last chance…',
      'Be niceeee 🌹',
      'I’m gonna cry (tiny tears) 😭',
      'Alright. Enough. YES please 💘',
    ],
    []
  );

  const [noClicks, setNoClicks] = useState(0);
  const [noHidden, setNoHidden] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  const [boom, setBoom] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1200);
    return () => clearTimeout(t);
  }, [toast]);

  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  function moveNo() {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const pad = 18;

    const x = Math.max(pad, Math.floor(Math.random() * (rect.width - 140 - pad)));
    const y = Math.max(pad, Math.floor(Math.random() * (rect.height - 60 - pad)));

    setNoPos({ x, y });

    setNoClicks((c) => {
      const next = c + 1;
      setYesScale((s) => Math.min(2.6, s + 0.18));
      setToast(teasing[next % teasing.length]);
      if (next >= 9) setNoHidden(true);
      return next;
    });
  }

  async function onYes() {
    setBoom(true);
    setTimeout(() => {
      router.push('/story/1');
      router.refresh();
    }, 1800);
  }

  return (
    <AppShell>
      <ConfettiBurst active={boom} />
      <EmojiExplosion active={boom} />

      <div className="text-center">
        <h2 className="text-4xl font-handwriting text-white drop-shadow mb-4">Hey Muzhda Jan 💖</h2>
        <p className="text-white/90 text-xl mb-6">I have a very important question…</p>

        <div
          ref={containerRef}
          className="relative mx-auto mt-8 max-w-3xl rounded-2xl bg-white/10 border border-white/20 shadow-xl backdrop-blur-md p-10 overflow-hidden"
          style={{ minHeight: 340 }}
        >
          <div className="absolute -top-6 -left-6 text-6xl opacity-20 animate-float">💗</div>
          <div className="absolute -bottom-6 -right-6 text-6xl opacity-20 animate-float">🌹</div>

          <p className="text-3xl font-bold text-white mb-10">Will you be my Valentine? 🥺🌹</p>

          <div className="flex items-center justify-center gap-6">
            <button
              type="button"
              className="btn btn-primary text-xl"
              style={{ transform: `scale(${yesScale})` }}
              onClick={onYes}
            >
              YES 💝
            </button>

            {!noHidden && (
              <button
                type="button"
                className="btn bg-white/20 text-white hover:bg-white/30 text-xl"
                onMouseEnter={moveNo}
                onMouseMove={moveNo}
                onClick={moveNo}
                style={{
                  position: 'absolute',
                  left: noPos.x,
                  top: noPos.y,
                  transition: 'left 120ms ease-out, top 120ms ease-out, transform 120ms ease-out',
                  transform: `scale(${Math.max(0.55, 1 - noClicks * 0.06)})`,
                }}
              >
                NO
              </button>
            )}
          </div>

          {toast && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/30 text-white border border-white/20">
              {toast}
            </div>
          )}

          {noHidden && (
            <div className="mt-10 text-white/90 text-lg">
              I’ll take that as a YES 😌💘
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
