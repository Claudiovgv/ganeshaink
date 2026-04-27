import type { Metadata } from 'next';
import GaleriaClient from './GaleriaClient';

export const metadata: Metadata = {
  title: 'Galeria',
  description: 'Galeria de trabalhos do Ganesha Ink — tatuagem, barbearia e piercing.',
};

const GALLERY_ITEMS = [
  { category: 'Tatuagem', src: '/images/gallery/tattoo-1.jpg', alt: 'Tatuagem blackwork' },
  { category: 'Tatuagem', src: '/images/gallery/tattoo-2.jpg', alt: 'Tatuagem a cores' },
  { category: 'Barbearia', src: '/images/gallery/barber-1.jpg', alt: 'Corte de cabelo' },
  { category: 'Barbearia', src: '/images/gallery/barber-2.jpg', alt: 'Acabamento de barba' },
  { category: 'Piercing', src: '/images/gallery/piercing-1.jpg', alt: 'Body piercing' },
  { category: 'Unhas', src: '/images/gallery/nails-1.jpg', alt: 'Nail art' },
];

const CATEGORIES = ['Todos', 'Tatuagem', 'Barbearia', 'Piercing', 'Unhas'];

export default function GaleriaPage() {
  return (
    <div className="pt-20">
      <section className="bg-bg-section py-16 px-4 text-center">
        <h1 className="font-display text-5xl font-bold mb-4">
          <span className="text-gold-gradient">Galeria</span>
        </h1>
        <p className="text-text-secondary max-w-md mx-auto">
          Uma amostra do trabalho dos nossos artistas.
        </p>
      </section>
      <GaleriaClient items={GALLERY_ITEMS} categories={CATEGORIES} />
    </div>
  );
}
