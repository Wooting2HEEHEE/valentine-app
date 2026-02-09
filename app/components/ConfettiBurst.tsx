'use client';

import Confetti from 'react-confetti';
import { useWindowSize } from '@/app/hooks/useWindowSize';

export default function ConfettiBurst({ active }: { active: boolean }) {
  const { width, height } = useWindowSize();

  if (!active) return null;

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={600}
      recycle={false}
      gravity={0.25}
      tweenDuration={8000}
    />
  );
}
