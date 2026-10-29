import type { Metadata } from 'next';
import BarberHero from '@/components/Barbearia/BarberHero';
import BarberStory from '@/components/Barbearia/BarberStory';
import BarberArtist from '@/components/Barbearia/BarberArtist';
import BarberCord from '@/components/Barbearia/BarberCord';
import { pageMetadata, PATHS } from '@/lib/site';

export const revalidate = 86400;

export const metadata: Metadata = pageMetadata({
  title: 'Barbearia em Vale de Cambra',
  description:
    'Barbearia Ganesha Ink em Vale de Cambra — cortes, barba e degradê. Marca a hora com o Eduardo.',
  path: PATHS.barbearia,
  ogTitle: 'Barbearia em Vale de Cambra — Ganesha Ink',
});

export default function BarbeariaPage() {
  return (
    <div className="relative bg-black">
      <BarberCord />
      <BarberHero />
      <BarberStory />
      <BarberArtist />
    </div>
  );
}
