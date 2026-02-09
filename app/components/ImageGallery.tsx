'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ImageGallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="rounded-xl bg-black/20 border border-white/20 p-6 text-white/80">
        No images found. Add files under <span className="font-mono">private-media/images</span>.
      </div>
    );
  }

  const current = images[active];

  return (
    <div>
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/20 bg-black/30">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      <div className="mt-4 grid grid-cols-6 gap-2">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            className={`relative aspect-square rounded-lg overflow-hidden border ${
              i === active ? 'border-white' : 'border-white/20'
            }`}
          >
            <Image src={img.src} alt={img.alt} fill sizes="120px" style={{ objectFit: 'cover' }} />
          </button>
        ))}
      </div>
    </div>
  );
}
