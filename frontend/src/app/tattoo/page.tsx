import type { Metadata } from 'next';
import Image from 'next/image';
import TattooStudioStory from '@/components/Tattoo/TattooStudioStory';
import TattooArtist from '@/components/Tattoo/TattooArtist';
import InstagramFeed from '@/components/Tattoo/InstagramFeed';
import StencilField from '@/components/Tattoo/StencilField';
import MobileHeroStencils from '@/components/Tattoo/MobileHeroStencils';
import StencilScrollHint from '@/components/Tattoo/StencilScrollHint';
import DesktopOnly from '@/components/DesktopOnly';

export const metadata: Metadata = {
  title: 'Tatuagem em Vale de Cambra — Tattoostudio',
  description:
    'Estúdio de tatuagem Ganesha Ink em Vale de Cambra. Tatuagens personalizadas, body piercing e consulta no Tattoostudio.',
  alternates: {
    canonical: 'https://ganeshaink.pt/tattoo',
  },
  openGraph: {
    title: 'Tatuagem em Vale de Cambra — Ganesha Ink',
    description:
      'Tattoostudio Ganesha Ink: tatuagem personalizada e body piercing em Vale de Cambra.',
    url: 'https://ganeshaink.pt/tattoo',
    locale: 'pt_PT',
    type: 'website',
  },
};

export default function TattooPage() {
  return (
    <div className="relative overflow-x-hidden bg-black">
      <StencilField />

      <section className="relative z-10 min-h-[100dvh]">
        <h1 className="sr-only">Tattoostudio</h1>
        <MobileHeroStencils />
        <div className="absolute left-1/2 top-1/2 z-10 w-[min(90vw,36rem)] -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/logo/ganesha-logo-gold-white.webp"
            alt="Ganesha Ink"
            width={720}
            height={360}
            className="h-auto w-full object-contain drop-shadow-[0_0_32px_rgba(201,168,76,0.28)]"
          />
        </div>
        <DesktopOnly>
          <div
            className="stencil-floater-inline pointer-events-none absolute left-1/2 top-1/2 z-[1] mt-[calc(min(18vw,9rem)+3.5rem)] w-[min(36vw,15rem)] -translate-x-1/2"
            aria-hidden
          >
            <div className="stencil-piece stencil-piece-light w-full">
              <Image
                src="/images/stencils/stencil-viking-woman.webp"
                alt=""
                width={420}
                height={560}
                className="h-auto w-full"
              />
            </div>
          </div>
        </DesktopOnly>
        <StencilScrollHint />
      </section>

      <TattooStudioStory />
      <TattooArtist />
      <InstagramFeed />
    </div>
  );
}
