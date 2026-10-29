'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SmokeAtmosphere from './SmokeAtmosphere';

const WORLDS = [
  {
    href: '/tattoo',
    name: 'Tattoostudio',
    line: 'Estúdio de tatuagem',
    image: '/images/gallery/tattoo-1.webp',
    imageAlt: 'Tatuagem no estúdio Ganesha Ink',
  },
  {
    href: '/barbearia',
    name: 'Barbearia',
    line: 'Corte & barba',
    image: '/images/gallery/barber-1.webp',
    imageAlt: 'Barbearia Ganesha Ink',
  },
  {
    href: '/beauty',
    name: 'Beauty',
    line: 'Estética de unhas',
    image: '/images/gallery/nails-1.webp',
    imageAlt: 'Estética de unhas Ganesha Ink',
  },
] as const;

export default function ChoiceGate() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden overscroll-none bg-[#050505] text-text-primary">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/studio-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.12] saturate-50"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_72%)]" />
      </div>

      <SmokeAtmosphere />
      <div className="gate-grain" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden flex-col items-center pt-[max(0.7rem,env(safe-area-inset-top))] md:flex">
        <Image
          src="/images/logo/ganesha-logo-gold-white.webp"
          alt="Ganesha Ink"
          width={420}
          height={220}
          priority
          className="h-auto w-[min(42vw,20rem)] object-contain drop-shadow-[0_0_28px_rgba(201,168,76,0.28)]"
        />
        <p className="mt-1 font-gate text-xs uppercase tracking-[0.42em] text-gold/80">
          Vale de Cambra
        </p>
      </div>

      <nav
        aria-label="Escolher serviço"
        className="relative z-10 flex min-h-0 flex-1 flex-col md:flex-row"
      >
        {WORLDS.map((world, index) => {
          const dimmed = active !== null && active !== world.href;
          return (
            <Link
              key={world.href}
              href={world.href}
              onMouseEnter={() => setActive(world.href)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(world.href)}
              onBlur={() => setActive(null)}
              className={`group relative flex min-h-0 flex-1 overflow-hidden outline-none transition-[flex-grow,filter] duration-700 ease-out ${
                dimmed ? 'md:flex-[0.85] md:brightness-[0.45]' : 'md:flex-1'
              } ${active === world.href ? 'md:flex-[1.28]' : ''}`}
            >
              <Image
                src={world.image}
                alt={world.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 36vw"
                className="object-cover opacity-80 saturate-[0.9] transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(201,168,76,0.28),transparent_55%)]" />
              </div>

              {index > 0 && (
                <span
                  aria-hidden
                  className="absolute left-0 top-[12%] hidden h-[76%] w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent md:block"
                />
              )}

              <span className="relative z-10 mt-auto flex w-full flex-col items-center px-4 pb-5 text-center md:absolute md:inset-x-0 md:bottom-16 md:px-6 md:pb-0">
                <span className="mb-2 h-px w-8 bg-gold/70 transition-all duration-500 group-hover:w-16 md:mb-3 md:w-10" />
                <span className="font-gate text-[1.55rem] font-semibold uppercase tracking-[0.12em] text-gold-light drop-shadow-[0_2px_18px_rgba(0,0,0,0.8)] md:text-4xl md:tracking-[0.18em] lg:text-[2.55rem]">
                  {world.name}
                </span>
                <span className="mt-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/70 md:mt-2 md:text-xs md:tracking-[0.32em]">
                  {world.line}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="pointer-events-none relative z-20 flex shrink-0 items-center justify-center gap-2 border-t border-gold/25 bg-black/90 px-4 py-2.5 md:hidden pb-[max(0.65rem,env(safe-area-inset-bottom))]">
        <Image
          src="/images/logo/ganesha-logo-gold-white.webp"
          alt="Ganesha Ink"
          width={28}
          height={28}
          className="h-7 w-7 object-contain"
        />
        <span className="font-gate text-[0.68rem] uppercase tracking-[0.28em] text-gold">
          Ganesha Ink
        </span>
      </div>
    </div>
  );
}
