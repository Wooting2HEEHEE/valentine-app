'use client';

import { useState } from 'react';
import AppShell from '@/app/components/AppShell';
import ConfettiBurst from '@/app/components/ConfettiBurst';
import EmojiExplosion from '@/app/components/EmojiExplosion';

export default function FinalSurprisePage() {
  const [open, setOpen] = useState(false);

  return (
    <AppShell>
      <ConfettiBurst active={open} />
      <EmojiExplosion active={open} emojis={['💖', '💝', '💘', '🌹', '✨', '🎊']} />

      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-5xl font-handwriting text-white drop-shadow mb-6">Sista Överraskningen💝</h2>
        <p className="text-white/90 text-lg mb-10">
          En sista knapp, ett litet hejdå
        </p>

        {!open ? (
          <button className="btn btn-primary text-2xl" onClick={() => setOpen(true)}>
            Open it 🎁
          </button>
        ) : (
          <div className="mt-8 bg-white/10 border border-white/20 rounded-2xl p-8">
            <p className="text-white text-2xl leading-relaxed">
              Jag kommer alltid välja och prioritera dig. Jag älskar dig, tack för du kollade på denna sidan.
              <br />
              OCH JAG KOMMER ALLTID VARA DIN VALENTINE 💞
            </p>
            <div className="mt-6 text-white/80">(Vänta tills jag får tag på dig)</div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
