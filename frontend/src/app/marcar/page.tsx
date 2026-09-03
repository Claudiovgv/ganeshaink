import type { Metadata } from 'next';
import BookingWizard from '@/components/BookingWizard/BookingWizard';
import { api, Service } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Marcar',
  description: 'Marca o teu serviço online — barbearia, piercing ou unhas em poucos passos.',
};

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: { category?: string; service?: string };
}

export default async function MarcarPage({ searchParams }: Props) {
  const serviceId = searchParams.service ? Number(searchParams.service) : undefined;
  const [services, categories] = await Promise.all([
    api.services.list().catch(() => [] as Service[]),
    api.categories.list().catch(() => []),
  ]);
  return (
    <div className="pt-20 min-h-screen">
      <section className="bg-bg-section py-12 px-4 text-center">
        <h1 className="font-display text-4xl font-bold mb-3">
          Marcar <span className="text-gold-gradient">Serviço</span>
        </h1>
        <p className="text-text-secondary">Escolhe o serviço, artista, data e hora.</p>
      </section>
      <BookingWizard
        services={services}
        categories={categories}
        initialCategory={searchParams.category}
        initialServiceId={serviceId}
      />
    </div>
  );
}
