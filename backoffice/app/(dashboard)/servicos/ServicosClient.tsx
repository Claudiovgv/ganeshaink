'use client';
import { useEffect, useMemo, useState, useTransition } from 'react';
import type { Category, Employee, Service } from '@/lib/types';
import DataTable from '@/components/DataTable';
import ServiceForm from '@/components/ServiceForm';
import Button from '@/components/Button';
import ReorderList from '@/components/ReorderList';
import {
  createServiceAction, updateServiceAction, deleteServiceAction,
  reorderCatalogAction, updateMyServiceOrderAction, reorderEmployeeServicesAction,
} from '@/lib/actions';

interface Props {
  initial: Service[];
  role: 'superadmin' | 'admin' | 'employee';
  myOrder?: Service[];
  employees?: Employee[];
  categories: Category[];
}

function EmployeeServiceOrder({ employee }: { employee: Employee }) {
  const [open, setOpen] = useState(false);
  const items = employee.services.map(({ service }) => ({
    id: service.id,
    label: service.name,
    sub: service.category.name,
  }));

  return (
    <div className="bg-bg-card border border-gold-border/30 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-bg-section/50 transition-colors"
      >
        <span className="text-text-primary font-medium">{employee.name}</span>
        <span className="flex items-center gap-3">
          <span className="text-text-muted text-xs">{items.length} serviço{items.length !== 1 ? 's' : ''}</span>
          <span className="text-gold text-xs">{open ? 'Fechar' : 'Ordenar'}</span>
        </span>
      </button>
      {open && (
        <div className="border-t border-gold-border/20 p-4">
          <ReorderList
            items={items}
            onSave={(ids) => reorderEmployeeServicesAction(employee.id, ids)}
            emptyMessage="Este funcionário ainda não tem serviços atribuídos."
          />
        </div>
      )}
    </div>
  );
}

export default function ServicosClient({ initial, role, myOrder, employees = [], categories }: Props) {
  const [services, setServices] = useState(initial);
  const [categoryId, setCategoryId] = useState<number | undefined>(categories[0]?.id);
  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);
  const [orderingCatalog, setOrderingCatalog] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isAdmin = role === 'admin' || role === 'superadmin';

  // Se as categorias só chegarem depois da primeira renderização, seleciona a primeira.
  useEffect(() => {
    if (categoryId === undefined && categories.length > 0) setCategoryId(categories[0].id);
  }, [categories, categoryId]);

  const counts = useMemo(() => {
    const map: Record<number, number> = {};
    for (const c of categories) map[c.id] = 0;
    for (const s of services) map[s.categoryId] = (map[s.categoryId] ?? 0) + 1;
    return map;
  }, [services, categories]);

  const filtered = useMemo(() => services.filter((s) => s.categoryId === categoryId), [services, categoryId]);
  const currentCategory = categories.find((c) => c.id === categoryId);

  function handleCreate(data: Partial<Service> & { categoryId: number }) {
    startTransition(async () => {
      const created = await createServiceAction(role, data) as Service;
      setServices((prev) => [...prev, created]);
      setCreating(false);
    });
  }

  function handleUpdate(data: Partial<Service> & { categoryId: number }) {
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

  function handleDelete(service: Service) {
    if (!confirm(`Apagar "${service.name}"? Esta ação não se pode desfazer.`)) return;
    startTransition(async () => {
      try {
        await deleteServiceAction(service.id);
        setServices((prev) => prev.filter((s) => s.id !== service.id));
      } catch (err) {
        alert((err as Error).message);
      }
    });
  }

  async function handleReorderCatalog(orderedIds: number[]) {
    await reorderCatalogAction(orderedIds);
    setServices((prev) => {
      const rest = prev.filter((s) => s.categoryId !== categoryId);
      const reordered = orderedIds
        .map((id) => prev.find((s) => s.id === id))
        .filter((s): s is Service => !!s);
      return [...rest, ...reordered];
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
          {isAdmin && <Button size="sm" variant="danger" onClick={() => handleDelete(s)} disabled={isPending}>Apagar</Button>}
        </div>
      ),
    },
  ];

  if (categories.length === 0) {
    return (
      <p className="text-text-muted text-sm">
        Ainda não há categorias criadas. Vai a <strong>Categorias</strong> para criar a primeira.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => { setCategoryId(c.id); setOrderingCatalog(false); }}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  categoryId === c.id ? 'bg-gold text-bg-primary' : 'border border-gold-border text-text-secondary hover:border-gold hover:text-gold'
                }`}
              >
                {c.name} <span className="opacity-60">({counts[c.id] ?? 0})</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {isAdmin && (
              <Button variant="outline" onClick={() => setOrderingCatalog((o) => !o)}>
                {orderingCatalog ? 'Ver tabela' : 'Ordenar catálogo'}
              </Button>
            )}
            <Button onClick={() => setCreating(true)}>+ Novo em {currentCategory?.name}</Button>
          </div>
        </div>

        {orderingCatalog ? (
          <div className="bg-bg-card border border-gold-border/30 rounded-lg p-4">
            <p className="text-text-secondary text-sm mb-4">
              Ordem em que os serviços de <strong>{currentCategory?.name}</strong> aparecem no catálogo público do site.
            </p>
            <ReorderList
              items={filtered.map((s) => ({ id: s.id, label: s.name }))}
              onSave={handleReorderCatalog}
              emptyMessage={`Sem serviços em ${currentCategory?.name}.`}
            />
          </div>
        ) : (
          <DataTable columns={columns} data={filtered} emptyMessage={`Sem serviços em ${currentCategory?.name}.`} />
        )}
      </div>

      {myOrder !== undefined && (
        <div>
          <h2 className="font-display text-lg font-semibold text-text-primary mb-1">Os Meus Serviços</h2>
          <p className="text-text-secondary text-sm mb-4">
            Ordem em que os teus serviços aparecem na tua página de artista no site.
          </p>
          <div className="bg-bg-card border border-gold-border/30 rounded-lg p-4 max-w-lg">
            <ReorderList
              items={myOrder.map((s) => ({ id: s.id, label: s.name, sub: s.category.name }))}
              onSave={updateMyServiceOrderAction}
              emptyMessage="Ainda não tens serviços atribuídos."
            />
          </div>
        </div>
      )}

      {role === 'superadmin' && employees.length > 0 && (
        <div>
          <h2 className="font-display text-lg font-semibold text-text-primary mb-1">Serviços de Cada Funcionário</h2>
          <p className="text-text-secondary text-sm mb-4">
            Se alguém precisar de ajuda a organizar a própria ordem, podes fazê-lo aqui por ele.
          </p>
          <div className="space-y-3 max-w-lg">
            {employees.map((e) => <EmployeeServiceOrder key={e.id} employee={e} />)}
          </div>
        </div>
      )}

      {creating && (
        <ServiceForm
          categories={categories}
          defaultCategoryId={categoryId}
          onSave={handleCreate}
          onClose={() => setCreating(false)}
          loading={isPending}
        />
      )}
      {editing && (
        <ServiceForm
          initial={editing}
          categories={categories}
          onSave={handleUpdate}
          onClose={() => setEditing(null)}
          loading={isPending}
        />
      )}
    </div>
  );
}
