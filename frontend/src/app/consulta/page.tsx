import type { Metadata } from 'next';
import ConsultaForm from './ConsultaForm';

export const metadata: Metadata = {
  title: 'Pedido de Consulta',
  description: 'Pede uma consulta para tatuagem ou body piercing no Ganesha Ink.',
};

export default function ConsultaPage() {
  return (
    <div className="pt-20">
      <section className="bg-bg-section py-16 px-4 text-center">
        <h1 className="font-display text-4xl font-bold mb-3">
          Pedido de <span className="text-gold-gradient">Consulta</span>
        </h1>
        <p className="text-text-secondary max-w-md mx-auto">
          Para tatuagens e piercings fazemos sempre uma consulta prévia para garantir o melhor resultado.
        </p>
      </section>
      <div className="max-w-xl mx-auto px-4 py-16">
        <ConsultaForm />
      </div>
    </div>
  );
}
