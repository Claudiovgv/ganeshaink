import type { Metadata } from 'next';
import BeautyHero from '@/components/Beauty/BeautyHero';
import BeautyStory from '@/components/Beauty/BeautyStory';
import BeautyArtist from '@/components/Beauty/BeautyArtist';

export const metadata: Metadata = {
  title: 'Beauty em Vale de Cambra',
  description: 'Estética de unhas Ganesha Ink em Vale de Cambra — manicure, pedicure e nail art. Marca a hora com a Vera.',
  alternates: {
    canonical: 'https://ganeshaink.pt/nails',
  },
  openGraph: {
    title: 'Beauty em Vale de Cambra — Ganesha Ink',
    description: 'Estética de unhas no mesmo estúdio da tinta.',
    url: 'https://ganeshaink.pt/nails',
    locale: 'pt_PT',
    type: 'website',
  },
};

export default function BeautyPage() {
  return (
    <div className="relative bg-black">
      <BeautyHero />
      <BeautyStory />
      <BeautyArtist />
    </div>
  );
}
