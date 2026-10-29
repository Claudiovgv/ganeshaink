import type { Metadata } from 'next';
import BookingWizard from '@/components/BookingWizard/BookingWizard';
import { api, Service } from '@/lib/api';

import { pageMetadata, PATHS } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Marcar barbearia ou Beauty',
  description: 'Marca barbearia ou Beauty online na Ganesha Ink em Vale de Cambra. Para tatuagens, fala com o tatuador.',
  path: PATHS.marcar,
});

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: { category?: string; service?: string; area?: string };
}

export default async function MarcarPage({ searchParams }: Props) {
  const serviceId = searchParams.service ? Number(searchParams.service) : undefined;
  const [services, categories] = await Promise.all([
    api.services.list().catch(() => [] as Service[]),
    api.categories.list().catch(() => []),
  ]);
  return (
    <div className="pt-20 min-h-screen">
      <BookingWizard
        services={services}
        categories={categories}
        initialCategory={searchParams.category}
        initialServiceId={serviceId}
        initialArea={searchParams.area}
      />
    </div>
  );
}
