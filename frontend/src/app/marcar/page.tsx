import type { Metadata } from 'next';
import BookingWizard from '@/components/BookingWizard/BookingWizard';

export const metadata: Metadata = {
  title: 'Marcar',
  description: 'Marca o teu serviço online — barbearia, piercing ou unhas em poucos passos.',
};

export default function MarcarPage() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="bg-bg-section py-12 px-4 text-center">
        <h1 className="font-display text-4xl font-bold mb-3">
          Marcar <span className="text-gold-gradient">Serviço</span>
        </h1>
        <p className="text-text-secondary">Escolhe o serviço, artista, data e hora.</p>
      </section>
      <BookingWizard />
    </div>
  );
}
