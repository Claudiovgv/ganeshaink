'use client';
import { useMemo, useState, useTransition } from 'react';
import type { Service, ServiceCategory } from '@/lib/types';
import DataTable from '@/components/DataTable';
import ServiceForm from '@/components/ServiceForm';
import Button from '@/components/Button';
import { createServiceAction, updateServiceAction } from '@/lib/actions';

const CATEGORY_ORDER: ServiceCategory[] = ['barbershop', 'tattoo', 'piercing', 'nails'];
const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  barbershop: 'Barbearia', tattoo: 'Tatuagem', piercing: 'Piercing', nails: 'Unhas',
};

interface Props { initial: Service[]; role: 'superadmin' | 'admin' | 'employee'; }

export default function ServicosClient({ initial, role }: Props) {
  const [services, setServices] = useState(initial);
  const [category, setCategory] = useState<ServiceCategory>('barbershop');
  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const counts = useMemo(() => {
    const map = Object.fromEntries(CATEGORY_ORDER.map((c) => [c, 0])) as Record<ServiceCategory, number>;
    for (const s of services) map[s.category] += 1;
    return map;
  }, [services]);

  const filtered = useMemo(() => services.filter((s) => s.category === category), [services, category]);

  function handleCreate(data: Partial<Service>) {
    startTransition(async () => {
      const created = await createServiceAction(role, data) as Service;
      setServices((prev) => [...prev, created]);
      setCreating(false);
    });
  }

  function handleUpdate(data: Partial<Service>) {
    if (!editing) return;
    startTransition(async () => {
      const updated = await updateServiceAction(role, editing.id, data) as Service;
      setServices((prev) => prev.map((s) => s.id === updated.id ? updated : s));
      setEditing(null);
    });
  }

  function handleToggleActive(service: Service) {
    startTransition(async () => {
      const updated = await updateServiceAction(role, service.id, { isActive: !service.isActive }) as Service;
      setServices((prev) => prev.map((s) => s.id === updated.id ? updated : s));
    });
  }

  const columns = [
    { key: 'name', label: 'Nome', mobileMain: true, render: (s: Service) => <span className="font-medium">{s.name}</span> },
    { key: 'duration', label: 'Duração', render: (s: Service) => <span className="text-text-secondary">{s.durationMin} min</span> },
    { key: 'price', label: 'Preço', render: (s: Service) => <span>{Number(s.price) === 0 ? '—' : `${Number(s.price).toFixed(2)} €`}</span> },
    { key: 'consultation', label: 'Consulta', render: (s: Service) => <span className={s.requiresConsultation ? 'text-amber-400 text-xs' : 'text-text-muted text-xs'}>{s.requiresConsultation ? 'Sim' : 'Não'}</span> },
    { key: 'status', label: 'Estado', render: (s: Service) => <span className={`text-xs font-medium ${s.isActive ? 'text-emerald-400' : 'text-text-muted'}`}>{s.isActive ? 'Ativo' : 'Inativo'}</span> },
    {
      key: 'actions', label: 'Ações',
      render: (s: Service) => (
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant="outline" onClick={() => setEditing(s)}>Editar</Button>
          <Button size="sm" variant={s.isActive ? 'danger' : 'gold'} onClick={() => handleToggleActive(s)} disabled={isPending}>{s.isActive ? 'Desativar' : 'Ativar'}</Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {CATEGORY_ORDER.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                category === c ? 'bg-gold text-bg-primary' : 'border border-gold-border text-text-secondary hover:border-gold hover:text-gold'
              }`}
            >
              {CATEGORY_LABELS[c]} <span className="opacity-60">({counts[c]})</span>
            </button>
          ))}
        </div>
        <Button onClick={() => setCreating(true)}>+ Novo em {CATEGORY_LABELS[category]}</Button>
      </div>
      <DataTable columns={columns} data={filtered} emptyMessage={`Sem serviços em ${CATEGORY_LABELS[category]}.`} />
      {creating && <ServiceForm defaultCategory={category} onSave={handleCreate} onClose={() => setCreating(false)} loading={isPending} />}
      {editing && <ServiceForm initial={editing} onSave={handleUpdate} onClose={() => setEditing(null)} loading={isPending} />}
    </>
  );
}
