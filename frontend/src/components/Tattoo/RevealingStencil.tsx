'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
};

export default function RevealingStencil({ src, alt, className, width, height }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0.08);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh * 0.92;
      const end = vh * 0.28;
      const next = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0.08, next)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const stop = progress * 100;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        WebkitMaskImage: `linear-gradient(to bottom, #000 ${stop}%, transparent ${Math.min(100, stop + 12)}%)`,
        maskImage: `linear-gradient(to bottom, #000 ${stop}%, transparent ${Math.min(100, stop + 12)}%)`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full object-contain mix-blend-screen"
      />
    </div>
  );
}
