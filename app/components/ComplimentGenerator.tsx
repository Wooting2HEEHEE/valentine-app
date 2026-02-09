'use client';

import { useMemo, useState } from 'react';

export default function ComplimentGenerator() {
  const compliments = useMemo(
    () => [
      'Ditt leende är det vackraste jag sett och jag älskar ditt skratt 😊',
      'Du får vanliga dagar bli perfekta utan att ens försöka. ✨',
      'Du fyller min dag och jag kan inte klara mig utan din kärlek. 💗',
      'Du är den kattigaste tulpanen som finns 🌹',
      'Du är jättegullig 😌',
      'Du smakar enormt gott 💘',
      'Du är fin på ett sätt att man känner sig trygg. 🫶',
      'Du är min favorit notis. 📱💖',
      'Jag älskar dig mer än ord kan säga. 💞',
      'Dina kramar får mig bli mer och mer kär i dig. 💝',
    ],
    []
  );

  const [text, setText] = useState<string>('Tryck på knappen 😌');

  return (
    <div>
      <div className="min-h-24 rounded-xl bg-black/20 border border-white/20 p-4 text-white text-lg">
        {text}
      </div>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setText(compliments[Math.floor(Math.random() * compliments.length)])}
        >
          Give me one 💖
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => setText('Press the button 😌')}>
          Reset
        </button>
      </div>
    </div>
  );
}
