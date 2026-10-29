import type { Metadata } from 'next';
import BeautyHero from '@/components/Beauty/BeautyHero';
import BeautyStory from '@/components/Beauty/BeautyStory';
import BeautyArtist from '@/components/Beauty/BeautyArtist';
import { pageMetadata, PATHS } from '@/lib/site';

export const revalidate = 86400;

export const metadata: Metadata = pageMetadata({
  title: 'Salão de Beauty e unhas em Vale de Cambra',
  description:
    'Salão de beauty Ganesha Ink em Vale de Cambra — manicure, pedicure e nail art. Marca a hora com a Vera.',
  path: PATHS.beauty,
  ogTitle: 'Beauty em Vale de Cambra — Ganesha Ink',
});

export default function BeautyPage() {
  return (
    <div className="relative bg-black">
      <BeautyHero />
      <BeautyStory />
      <BeautyArtist />
    </div>
  );
}
