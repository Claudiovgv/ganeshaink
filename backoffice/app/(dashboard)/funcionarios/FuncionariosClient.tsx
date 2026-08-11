'use client';
import { useState, useTransition } from 'react';
import type { Employee, Service } from '@/lib/types';
import DataTable from '@/components/DataTable';
import Button from '@/components/Button';
import ReorderList from '@/components/ReorderList';
import { createEmployeeAction, updateEmployeeAction, deleteEmployeeAction, reorderEmployeesAction } from '@/lib/actions';

const emptyForm = { name: '', email: '', password: '', bio: '', role: 'employee', serviceIds: [] as number[] };
type FormState = typeof emptyForm;

function initials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase();
}

function ServicePicker({ services, selected, onChange }: { services: Service[]; selected: number[]; onChange: (ids: number[]) => void }) {
  const categories = Array.from(new Map(services.map((s) => [s.category.id, s.category])).values())
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const grouped = categories
    .map((cat) => ({ cat, items: services.filter((s) => s.categoryId === cat.id) }))
    .filter((g) => g.items.length > 0);

  function toggle(id: number) {
    onChange(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  }

  return (
    <div className="space-y-3 max-h-56 overflow-y-auto border border-gold-border rounded px-3 py-2 bg-bg-section">
      {grouped.map(({ cat, items }) => (
        <div key={cat.id}>
          <p className="text-text-muted text-[10px] uppercase tracking-wider mb-1">{cat.name}</p>
          <div className="flex flex-wrap gap-1.5">
            {items.map((s) => (
              <button
                type="button"
                key={s.id}
                onClick={() => toggle(s.id)}
                className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                  selected.includes(s.id)
                    ? 'bg-gold text-bg-primary border-gold font-medium'
                    : 'border-gold-border text-text-secondary hover:border-gold hover:text-gold'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FuncionariosClient({ initial, services }: { initial: Employee[]; services: Service[] }) {
  const [employees, setEmployees] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [deleting, setDeleting] = useState<Employee | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [ordering, setOrdering] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleReorder(orderedIds: number[]) {
    await reorderEmployeesAction(orderedIds);
    setEmployees((prev) => {
      const byId = new Map(prev.map((e) => [e.id, e]));
      return orderedIds.map((id) => byId.get(id)!).filter(Boolean);
    });
  }

  function openCreate() {
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(emp: Employee) {
    setEditing(emp);
    setForm({
      name: emp.name,
      email: emp.user.email,
      password: '',
      bio: emp.bio ?? '',
      role: emp.user.role,
      serviceIds: emp.services.map((s) => s.service.id),
    });
  }

  function handleCreate() {
    startTransition(async () => {
      const created = await createEmployeeAction(form) as Employee;
      setEmployees((prev) => [...prev, created]);
      setShowForm(false);
      setForm(emptyForm);
    });
  }

  function handleUpdate() {
    if (!editing) return;
    startTransition(async () => {
      const updated = await updateEmployeeAction(editing.id, {
        name: form.name,
        bio: form.bio,
        serviceIds: form.serviceIds,
      }) as Employee;
      setEmployees((prev) => prev.map((e) => e.id === editing.id
        ? { ...e, name: updated.name, bio: updated.bio, services: form.serviceIds.map((id) => ({ service: services.find((s) => s.id === id)! })) }
        : e));
      setEditing(null);
    });
  }

  function handleToggleActive(emp: Employee) {
    startTransition(async () => {
      await updateEmployeeAction(emp.id, { isActive: !emp.isActive });
      setEmployees((prev) => prev.map((e) => e.id === emp.id ? { ...e, isActive: !e.isActive } : e));
    });
  }

  function handleDelete() {
    if (!deleting) return;
    setDeleteError(null);
    startTransition(async () => {
      try {
        await deleteEmployeeAction(deleting.id);
        setEmployees((prev) => prev.filter((e) => e.id !== deleting.id));
        setDeleting(null);
      } catch (err) {
        setDeleteError((err as Error).message);
      }
    });
  }

  const columns = [
    {
      key: 'name',
      label: 'Funcionário',
      mobileMain: true,
      render: (e: Employee) => (
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 shrink-0 rounded-full bg-gold-muted text-gold flex items-center justify-center text-xs font-semibold">
            {initials(e.name)}
          </div>
          <div className="min-w-0">
            <p className="font-medium truncate">{e.name}</p>
            <p className="text-text-muted text-xs truncate">{e.user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'services',
      label: 'Serviços',
      render: (e: Employee) => (
        <span className="text-xs border border-gold-border text-text-secondary px-2 py-0.5 rounded whitespace-nowrap">
          {e.services.length} serviço{e.services.length === 1 ? '' : 's'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Estado',
      render: (e: Employee) => (
        <span className={`text-xs font-medium px-2 py-0.5 rounded border whitespace-nowrap ${e.isActive ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' : 'text-text-muted border-gold-border'}`}>
          {e.isActive ? 'Ativo' : 'Inativo'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Ações',
      render: (e: Employee) => (
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant="outline" onClick={() => openEdit(e)} disabled={isPending}>Editar</Button>
          <Button size="sm" variant={e.isActive ? 'outline' : 'gold'} onClick={() => handleToggleActive(e)} disabled={isPending}>
            {e.isActive ? 'Desativar' : 'Ativar'}
          </Button>
          <Button size="sm" variant="danger" onClick={() => { setDeleting(e); setDeleteError(null); }} disabled={isPending}>
            Apagar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <p className="text-text-secondary text-sm">Gere a equipa que acede ao backoffice e aparece no site.</p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setOrdering((o) => !o)}>
            {ordering ? 'Ver tabela' : 'Ordenar'}
          </Button>
          <Button onClick={openCreate}>+ Novo Funcionário</Button>
        </div>
      </div>

      {ordering ? (
        <div className="bg-bg-card border border-gold-border/30 rounded-lg p-4 max-w-lg">
          <p className="text-text-secondary text-sm mb-4">
            Ordem em que os artistas aparecem em <strong>/artistas</strong> no site.
          </p>
          <ReorderList
            items={employees.map((e) => ({ id: e.id, label: e.name, sub: e.isActive ? undefined : 'Inativo' }))}
            onSave={handleReorder}
            emptyMessage="Ainda não há funcionários."
          />
        </div>
      ) : (
        <DataTable columns={columns} data={employees} emptyMessage="Ainda não há funcionários. Cria o primeiro com o botão acima." />
      )}

      {(showForm || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-bg-card border border-gold-border rounded-lg p-6 w-full max-w-md space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="font-display text-lg font-bold">{editing ? `Editar ${editing.name}` : 'Novo Funcionário'}</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1">Nome</label>
                <input
                  placeholder="Nome completo"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted"
                />
              </div>
              {!editing && (
                <>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Utilizador (para fazer login)</label>
                    <input
                      placeholder="ex: joao ou joao@ganeshaink.pt"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Permissão</label>
                    <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm">
                      <option value="employee">Funcionário — só vê a sua agenda</option>
                      <option value="admin">Admin — gere tudo no backoffice</option>
                    </select>
                  </div>
                </>
              )}
              <div>
                <label className="block text-xs text-text-secondary mb-1">Bio (opcional, aparece no site)</label>
                <input
                  placeholder="Bio"
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted"
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">Serviços que realiza</label>
                <ServicePicker services={services} selected={form.serviceIds} onChange={(ids) => setForm({ ...form, serviceIds: ids })} />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={editing ? handleUpdate : handleCreate}
                disabled={!form.name || (!editing && (!form.email || !form.password)) || isPending}
                loading={isPending}
              >
                {editing ? 'Guardar alterações' : 'Criar'}
              </Button>
              <Button variant="outline" onClick={() => { setShowForm(false); setEditing(null); }}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}

      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-bg-card border border-gold-border rounded-lg p-6 w-full max-w-sm mx-4 space-y-4">
            <h2 className="font-display text-lg font-bold text-red-400">Apagar funcionário</h2>
            <p className="text-text-secondary text-sm">
              Tens a certeza que queres apagar <span className="text-text-primary font-medium">{deleting.name}</span>?
              Esta ação não pode ser desfeita — o acesso ao backoffice será removido.
            </p>
            {deleteError && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded px-3 py-2">{deleteError}</p>
            )}
            <div className="flex gap-3">
              <Button className="flex-1" variant="danger" onClick={handleDelete} disabled={isPending} loading={isPending}>
                Sim, apagar
              </Button>
              <Button variant="outline" onClick={() => { setDeleting(null); setDeleteError(null); }} disabled={isPending}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
