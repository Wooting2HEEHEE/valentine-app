'use client';

export default function VideoPlayer({ src }: { src: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/20 bg-black/40">
      <video src={src} controls playsInline className="w-full h-auto" />
    </div>
  );
}
