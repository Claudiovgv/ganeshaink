'use client';
import { useState, useTransition } from 'react';
import type { Service, ServiceCategory } from '@/lib/types';
import DataTable from '@/components/DataTable';
import ServiceForm from '@/components/ServiceForm';
import Button from '@/components/Button';
import { createServiceAction, updateServiceAction } from '@/lib/actions';

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  barbershop: 'Barbearia', tattoo: 'Tatuagem', piercing: 'Piercing', nails: 'Unhas',
};

interface Props { initial: Service[]; role: 'admin' | 'employee'; }

export default function ServicosClient({ initial, role }: Props) {
  const [services, setServices] = useState(initial);
  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);
  const [isPending, startTransition] = useTransition();

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
    { key: 'name', label: 'Nome', render: (s: Service) => <span className="font-medium">{s.name}</span> },
    { key: 'category', label: 'Categoria', render: (s: Service) => <span className="text-text-secondary text-xs">{CATEGORY_LABELS[s.category]}</span> },
    { key: 'duration', label: 'Duração', render: (s: Service) => <span className="text-text-secondary">{s.durationMin} min</span> },
    { key: 'price', label: 'Preço', render: (s: Service) => <span>{Number(s.price).toFixed(2)} €</span> },
    { key: 'consultation', label: 'Consulta', render: (s: Service) => <span className={s.requiresConsultation ? 'text-amber-400 text-xs' : 'text-text-muted text-xs'}>{s.requiresConsultation ? 'Sim' : 'Não'}</span> },
    { key: 'status', label: 'Estado', render: (s: Service) => <span className={`text-xs font-medium ${s.isActive ? 'text-emerald-400' : 'text-text-muted'}`}>{s.isActive ? 'Activo' : 'Inactivo'}</span> },
    {
      key: 'actions', label: 'Acções',
      render: (s: Service) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setEditing(s)}>Editar</Button>
          <Button size="sm" variant={s.isActive ? 'danger' : 'ghost'} onClick={() => handleToggleActive(s)} disabled={isPending}>{s.isActive ? 'Desactivar' : 'Activar'}</Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setCreating(true)}>Novo Serviço</Button>
      </div>
      <DataTable columns={columns} data={services} emptyMessage="Sem serviços." />
      {creating && <ServiceForm onSave={handleCreate} onClose={() => setCreating(false)} loading={isPending} />}
      {editing && <ServiceForm initial={editing} onSave={handleUpdate} onClose={() => setEditing(null)} loading={isPending} />}
    </>
  );
}
