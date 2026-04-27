'use client';

import { Category } from './BookingWizard';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { id: 'barbershop' as Category, label: 'Barbearia', icon: '✂️', desc: 'Cortes, barba, tratamentos', consultation: false },
  { id: 'tattoo' as Category, label: 'Tatuagem', icon: '🎨', desc: 'Arte personalizada — requer consulta', consultation: true },
  { id: 'piercing' as Category, label: 'Piercing', icon: '💎', desc: 'Body piercing — requer consulta', consultation: true },
  { id: 'nails' as Category, label: 'Unhas', icon: '✨', desc: 'Manicure, gel, nail art', consultation: false },
];

export default function Step1Category({ onSelect }: { onSelect: (cat: Category) => void }) {
  const router = useRouter();

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">Escolhe a Categoria</h2>
      <p className="text-text-secondary text-sm mb-8">Selecciona o tipo de serviço que procuras.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map(({ id, label, icon, desc, consultation }) => (
          <button
            key={id}
            onClick={() => {
              if (consultation) {
                router.push('/consulta');
              } else {
                onSelect(id);
              }
            }}
            className="bg-bg-card border border-gold-border rounded-lg p-6 text-left hover:border-gold transition-colors group"
          >
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="font-display text-lg font-semibold mb-1 group-hover:text-gold transition-colors">
              {label}
            </h3>
            <p className="text-text-secondary text-sm">{desc}</p>
            {consultation && (
              <span className="inline-block mt-2 text-xs text-gold border border-gold px-2 py-0.5 rounded">
                Pedido de consulta →
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
