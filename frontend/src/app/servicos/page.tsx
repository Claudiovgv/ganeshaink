import type { Metadata } from 'next';
import Link from 'next/link';
import { api, Service } from '@/lib/api';
import { formatPrice, formatDuration, SERVICE_CATEGORIES } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Serviços',
  description: 'Catálogo completo de serviços Ganesha Ink — barbearia, tatuagem, piercing e unhas com preços e durações.',
};

function ServiceCard({ service }: { service: Service }) {
  const isConsultation = service.requiresConsultation;
  return (
    <div className="bg-bg-card border border-gold-border rounded-lg p-6 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-lg font-semibold leading-snug">{service.name}</h3>
        <span className="text-gold font-semibold text-sm whitespace-nowrap">
          {formatPrice(service.price)}
        </span>
      </div>
      {service.description && (
        <p className="text-text-secondary text-sm leading-relaxed">{service.description}</p>
      )}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gold-border">
        <span className="text-text-secondary text-xs">{formatDuration(service.durationMin)}</span>
        {isConsultation ? (
          <Link
            href="/consulta"
            className="text-xs text-gold border border-gold px-3 py-1 rounded hover:bg-gold-muted transition-colors"
          >
            Pedir Consulta
          </Link>
        ) : (
          <Link
            href="/marcar"
            className="text-xs bg-gold text-bg-primary px-3 py-1 rounded hover:bg-gold-light transition-colors font-semibold"
          >
            Marcar
          </Link>
        )}
      </div>
    </div>
  );
}

export default async function ServicosPage() {
  const services = await api.services.list().catch(() => [] as Service[]);

  const grouped = services.reduce(
    (acc, s) => {
      if (!acc[s.category]) acc[s.category] = [];
      acc[s.category].push(s);
      return acc;
    },
    {} as Record<string, Service[]>,
  );

  const categoryOrder = ['barbershop', 'tattoo', 'piercing', 'nails'] as const;

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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {categoryOrder.map((cat) => {
          const list = grouped[cat];
          if (!list || list.length === 0) return null;
          return (
            <div key={cat} id={cat}>
              <h2 className="font-display text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="text-gold-gradient">{SERVICE_CATEGORIES[cat]}</span>
                <span className="h-px flex-1 bg-gold-border" />
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((s) => (
                  <ServiceCard key={s.id} service={s} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
