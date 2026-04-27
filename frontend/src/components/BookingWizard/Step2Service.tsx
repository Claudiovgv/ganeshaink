'use client';

import { useEffect, useState } from 'react';
import { api, Service } from '@/lib/api';
import { formatPrice, formatDuration, SERVICE_CATEGORIES } from '@/lib/utils';
import { Category } from './BookingWizard';
import LoadingSpinner from '../ui/LoadingSpinner';
import Button from '../ui/Button';

interface Props {
  category: Category;
  onSelect: (service: Service) => void;
  onBack: () => void;
}

export default function Step2Service({ category, onSelect, onBack }: Props) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.services.list(category)
      .then(setServices)
      .catch(() => setError('Erro ao carregar serviços.'))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">Escolhe o Serviço</h2>
      <p className="text-text-secondary text-sm mb-8">{SERVICE_CATEGORIES[category]}</p>

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {!loading && !error && (
        <div className="space-y-3 mb-8">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              className="w-full bg-bg-card border border-gold-border rounded-lg p-5 text-left hover:border-gold transition-colors group flex items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-semibold group-hover:text-gold transition-colors">{s.name}</h3>
                {s.description && <p className="text-text-secondary text-sm mt-1">{s.description}</p>}
                <p className="text-text-secondary text-xs mt-1">{formatDuration(s.durationMin)}</p>
              </div>
              <span className="text-gold font-semibold whitespace-nowrap">{formatPrice(s.price)}</span>
            </button>
          ))}
        </div>
      )}

      <Button variant="ghost" onClick={onBack}>← Voltar</Button>
    </div>
  );
}
