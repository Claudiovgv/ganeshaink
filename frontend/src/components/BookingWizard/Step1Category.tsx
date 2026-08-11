'use client';

import { useEffect, useState } from 'react';
import { api, Category as ApiCategory } from '@/lib/api';
import { Category } from './BookingWizard';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../ui/LoadingSpinner';

// Tatuagem e piercing exigem sempre consulta prévia — regra de negócio fixa,
// não algo que se defina ao criar uma categoria nova no backoffice.
// Categorias novas seguem o fluxo normal de marcação por omissão.
const CONSULTATION_ONLY_SLUGS = new Set(['tattoo', 'piercing']);

export default function Step1Category({ onSelect }: { onSelect: (cat: Category) => void }) {
  const router = useRouter();
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.categories.list()
      .then(setCategories)
      .catch(() => setError('Erro ao carregar categorias.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">Escolhe a Categoria</h2>
      <p className="text-text-secondary text-sm mb-8">Selecciona o tipo de serviço que procuras.</p>

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => {
            const consultation = CONSULTATION_ONLY_SLUGS.has(cat.slug);
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (consultation) {
                    router.push('/consulta');
                  } else {
                    onSelect(cat.slug);
                  }
                }}
                className="bg-bg-card border border-gold-border rounded-lg p-6 text-left hover:border-gold transition-colors group"
              >
                <h3 className="font-display text-lg font-semibold mb-1 group-hover:text-gold transition-colors">
                  {cat.name}
                </h3>
                {consultation && (
                  <span className="inline-block mt-2 text-xs text-gold border border-gold px-2 py-0.5 rounded">
                    Pedido de consulta →
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
