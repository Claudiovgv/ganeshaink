import type { Metadata } from 'next';
import BarberHero from '@/components/Barbearia/BarberHero';
import BarberStory from '@/components/Barbearia/BarberStory';
import BarberArtist from '@/components/Barbearia/BarberArtist';
import BarberCord from '@/components/Barbearia/BarberCord';

export const metadata: Metadata = {
  title: 'Barbearia em Vale de Cambra',
  description: 'Barbearia Ganesha Ink em Vale de Cambra — cortes, barba e degradê. Marca a hora com o Eduardo.',
  alternates: {
    canonical: 'https://ganeshaink.pt/barbearia',
  },
  openGraph: {
    title: 'Barbearia em Vale de Cambra — Ganesha Ink',
    description: 'Cortes, barba e o detalhe certo no mesmo estúdio da tinta.',
    url: 'https://ganeshaink.pt/barbearia',
    locale: 'pt_PT',
    type: 'website',
  },
};

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
