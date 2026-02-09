'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function EmojiExplosion({
  active,
  emojis,
}: {
  active: boolean;
  emojis?: string[];
}) {
  const items = useMemo(() => {
    const set = emojis?.length ? emojis : ['💖', '💘', '💝', '🌹', '🎈', '✨', '🎊', '💗', '💞', '❤️'];
    return Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      emoji: set[Math.floor(Math.random() * set.length)],
      x: rand(-380, 380),
      y: rand(-260, 260),
      r: rand(-180, 180),
      s: rand(0.8, 1.8),
      d: rand(0.7, 1.6),
    }));
  }, [emojis]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {items.map((it) => (
        <motion.div
          key={it.id}
          initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.2 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, it.x],
            y: [0, it.y],
            rotate: [0, it.r],
            scale: [0.2, it.s, it.s],
          }}
          transition={{ duration: it.d + 0.9, ease: 'easeOut' }}
          className="absolute text-4xl"
        >
          {it.emoji}
        </motion.div>
      ))}
    </div>
  );
}
