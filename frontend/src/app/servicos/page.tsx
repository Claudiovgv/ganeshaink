import type { Metadata } from 'next';
import { api, Service } from '@/lib/api';
import ServicosGrid from './ServicosGrid';

export const metadata: Metadata = {
  title: 'Serviços',
  description: 'Catálogo completo de serviços Ganesha Ink — barbearia, tatuagem, piercing e unhas com preços e durações.',
};

export const dynamic = 'force-dynamic';

export default async function ServicosPage() {
  const [services, categories] = await Promise.all([
    api.services.list().catch(() => [] as Service[]),
    api.categories.list().catch(() => []),
  ]);

  return (
    <div className="pt-20">
      <section className="bg-bg-section py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display text-5xl font-bold mb-4">
            Os Nossos <span className="text-gold-gradient">Serviços</span>
          </h1>
          <p className="text-text-secondary max-w-lg mx-auto">
            Todos os preços incluem materiais. Tatuagem e piercing requerem consulta prévia.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <ServicosGrid services={services} categories={categories} />
      </section>
    </div>
  );
}
