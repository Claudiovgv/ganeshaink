'use client';

import type { Category, Service } from '@/lib/api';
import { formatDuration, formatPrice } from '@/lib/utils';
import type { BookableTrade } from '@/lib/booking';
import { servicesForTrade } from '@/lib/booking';
import Button from '../ui/Button';

const TRADES: {
  id: BookableTrade | 'tattoo';
  title: string;
  subtitle: string;
}[] = [
  { id: 'barbershop', title: 'Barbearia', subtitle: 'Cortes, barba e marcações no calendário.' },
  { id: 'nails', title: 'Beauty', subtitle: 'Unhas e estética, com hora marcada no site.' },
  { id: 'tattoo', title: 'Tatuagem', subtitle: 'Conversa com o tatuador — sem calendário no site.' },
];

export default function Step1Category({
  services,
  categories,
  trade,
  onSelectTrade,
  onSelectService,
  onBackToTrades,
}: {
  services: Service[];
  categories: Category[];
  trade: BookableTrade | null;
  onSelectTrade: (trade: BookableTrade | 'tattoo') => void;
  onSelectService: (service: Service) => void;
  onBackToTrades: () => void;
}) {
  if (!trade) {
    return (
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold mb-2">O que queres marcar?</h2>
        <p className="text-text-secondary text-sm mb-10">
          Barbearia e Beauty no calendário. Tatuagem — fala com o tatuador.
        </p>
        <div className="mx-auto flex max-w-4xl flex-col items-stretch justify-center gap-4 md:flex-row md:gap-5">
          {TRADES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTrade(item.id)}
              className="w-full md:max-w-[17rem] bg-bg-card border border-gold-border rounded-lg p-7 text-left hover:border-gold transition-colors group"
            >
              <h3 className="font-display text-xl font-semibold text-gold mb-2 group-hover:text-gold-light transition-colors">
                {item.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">{item.subtitle}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const list = servicesForTrade(services, categories, trade);

  return (
    <div>

      {list.length === 0 ? (
        <p className="text-center text-text-secondary text-sm">
          Não foi possível carregar os serviços. Tenta outra vez dentro de momentos.
        </p>
      ) : (
        <div className="mx-auto grid max-w-3xl grid-cols-1 sm:grid-cols-2 gap-4">
          {list.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelectService(service)}
              className="bg-bg-card border border-gold-border rounded-lg p-6 text-left hover:border-gold transition-colors flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-lg font-semibold leading-snug">{service.name}</h3>
                <span className="text-gold font-semibold text-sm whitespace-nowrap">
                  {formatPrice(service.price)}
                </span>
              </div>
              {service.description && (
                <p className="text-text-secondary text-sm leading-relaxed">{service.description}</p>
              )}
              <div className="mt-auto pt-2 border-t border-gold-border flex items-center justify-between">
                <span className="text-text-secondary text-xs">{formatDuration(service.durationMin)}</span>
                <span className="text-xs text-gold font-semibold">Marcar →</span>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Button variant="ghost" onClick={onBackToTrades}>
          ← Voltar
        </Button>
      </div>
    </div>
  );
}
