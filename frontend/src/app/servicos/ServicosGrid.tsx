'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Category, Service } from '@/lib/api';
import { formatPrice, formatDuration } from '@/lib/utils';

function ServiceCard({ service }: { service: Service }) {
  const isConsultation = service.requiresConsultation;
  return (
    <div className="bg-bg-section border border-gold-border rounded-lg p-6 flex flex-col gap-3">
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
            href={`/marcar?category=${service.category.slug}&service=${service.id}`}
            className="text-xs bg-gold text-bg-primary px-3 py-1 rounded hover:bg-gold-light transition-colors font-semibold"
          >
            Marcar
          </Link>
        )}
      </div>
    </div>
  );
}

function CategoryCard({ title, subtitle, onClick }: { title: string; subtitle: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-bg-card border border-gold-border rounded-lg p-6 text-left hover:border-gold transition-colors group"
    >
      <h3 className="font-display text-xl font-semibold text-gold mb-2 group-hover:text-gold-light transition-colors">
        {title}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed">{subtitle}</p>
    </button>
  );
}

// Modal genérico: fundo escuro, conteúdo centrado com altura máxima e
// scroll interno próprio — nunca cresce para fora do ecrã.
function Modal({ title, onBack, onClose, children }: { title: string; onBack?: () => void; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="bg-bg-card border border-gold-border rounded-lg w-full max-w-4xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-gold-border flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {onBack && (
              <button
                onClick={onBack}
                aria-label="Voltar"
                className="text-text-secondary hover:text-gold transition-colors flex-shrink-0 text-lg"
              >
                ←
              </button>
            )}
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-gold-gradient truncate">{title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="text-text-secondary hover:text-gold transition-colors text-2xl leading-none flex-shrink-0"
          >
            ×
          </button>
        </div>
        <div className="px-6 sm:px-8 py-8 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

interface CategoryGroup {
  category: Category;
  direct: Service[];
  subgroups: { category: Category; services: Service[] }[];
  total: number;
}

// Estados possíveis do "drill-down": fechado, a ver as subcategorias de uma
// categoria, ou a ver os serviços de uma categoria/subcategoria.
type View = { level: 'closed' } | { level: 'subcategories'; group: CategoryGroup } | { level: 'services'; title: string; direct: Service[]; parent?: CategoryGroup };

export default function ServicosGrid({ services, categories }: { services: Service[]; categories: Category[] }) {
  const [view, setView] = useState<View>({ level: 'closed' });

  const grouped = services.reduce((acc, s) => {
    (acc[s.category.slug] ??= []).push(s);
    return acc;
  }, {} as Record<string, Service[]>);

  const groups: CategoryGroup[] = categories
    .map((cat) => {
      const direct = grouped[cat.slug] ?? [];
      const subgroups = (cat.children ?? [])
        .map((sub) => ({ category: sub, services: grouped[sub.slug] ?? [] }))
        .filter((g) => g.services.length > 0);
      const total = direct.length + subgroups.reduce((n, g) => n + g.services.length, 0);
      return { category: cat, direct, subgroups, total };
    })
    .filter((g) => g.total > 0);

  function openCategory(group: CategoryGroup) {
    if (group.subgroups.length > 0) {
      setView({ level: 'subcategories', group });
    } else {
      setView({ level: 'services', title: group.category.name, direct: group.direct });
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {groups.map((g) => (
          <CategoryCard
            key={g.category.id}
            title={g.category.name}
            subtitle={`${g.total} serviço${g.total !== 1 ? 's' : ''}`}
            onClick={() => openCategory(g)}
          />
        ))}
      </div>

      {view.level === 'subcategories' && (
        <Modal title={view.group.category.name} onClose={() => setView({ level: 'closed' })}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
            {view.group.direct.length > 0 && (
              <CategoryCard
                title={view.group.category.name}
                subtitle={`${view.group.direct.length} serviço${view.group.direct.length !== 1 ? 's' : ''}`}
                onClick={() => setView({ level: 'services', title: view.group.category.name, direct: view.group.direct, parent: view.group })}
              />
            )}
            {view.group.subgroups.map((sub) => (
              <CategoryCard
                key={sub.category.id}
                title={sub.category.name}
                subtitle={`${sub.services.length} serviço${sub.services.length !== 1 ? 's' : ''}`}
                onClick={() => setView({ level: 'services', title: sub.category.name, direct: sub.services, parent: view.group })}
              />
            ))}
          </div>
        </Modal>
      )}

      {view.level === 'services' && (
        <Modal
          title={view.title}
          onClose={() => setView({ level: 'closed' })}
          onBack={view.parent ? () => setView({ level: 'subcategories', group: view.parent! }) : undefined}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {view.direct.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </Modal>
      )}
    </>
  );
}
