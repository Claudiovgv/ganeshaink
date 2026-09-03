'use client';

import type { Category, Service } from '@/lib/api';
import ServicosGrid from '@/app/servicos/ServicosGrid';

export default function Step1Category({
  services,
  categories,
  onSelectService,
}: {
  services: Service[];
  categories: Category[];
  onSelectService: (service: Service) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">Escolhe o Serviço</h2>
      <p className="text-text-secondary text-sm mb-8">Selecciona a categoria e depois o serviço que procuras.</p>

      {categories.length === 0 ? (
        <p className="text-red-400 text-sm">Não foi possível carregar as categorias. Tenta outra vez dentro de momentos.</p>
      ) : (
        <ServicosGrid services={services} categories={categories} onBook={onSelectService} />
      )}
    </div>
  );
}
