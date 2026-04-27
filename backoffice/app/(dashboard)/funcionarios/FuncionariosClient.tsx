'use client';
import { useState, useTransition } from 'react';
import type { Employee } from '@/lib/types';
import DataTable from '@/components/DataTable';
import Button from '@/components/Button';
import { createEmployeeAction, updateEmployeeAction } from '@/lib/actions';

const emptyForm = { name: '', email: '', password: '', bio: '', role: 'employee' };

export default function FuncionariosClient({ initial }: { initial: Employee[] }) {
  const [employees, setEmployees] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [isPending, startTransition] = useTransition();

  function handleCreate() {
    startTransition(async () => {
      const created = await createEmployeeAction(form) as Employee;
      setEmployees((prev) => [...prev, created]);
      setShowForm(false);
      setForm(emptyForm);
    });
  }

  function handleToggleActive(emp: Employee) {
    startTransition(async () => {
      await updateEmployeeAction(emp.id, { isActive: !emp.isActive });
      setEmployees((prev) => prev.map((e) => e.id === emp.id ? { ...e, isActive: !e.isActive } : e));
    });
  }

  const columns = [
    { key: 'name', label: 'Nome', render: (e: Employee) => <span className="font-medium">{e.name}</span> },
    { key: 'email', label: 'Email', render: (e: Employee) => <span className="text-text-secondary text-xs">{e.user.email}</span> },
    { key: 'services', label: 'Serviços', render: (e: Employee) => <span className="text-text-secondary text-xs">{e.services.map((s) => s.service.name).join(', ') || '—'}</span> },
    { key: 'status', label: 'Estado', render: (e: Employee) => <span className={`text-xs font-medium ${e.isActive ? 'text-emerald-400' : 'text-text-muted'}`}>{e.isActive ? 'Activo' : 'Inactivo'}</span> },
    {
      key: 'actions',
      label: 'Acções',
      render: (e: Employee) => (
        <Button size="sm" variant={e.isActive ? 'danger' : 'outline'} onClick={() => handleToggleActive(e)} disabled={isPending}>
          {e.isActive ? 'Desactivar' : 'Activar'}
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setShowForm(true)}>Novo Funcionário</Button>
      </div>
      <DataTable columns={columns} data={employees} emptyMessage="Sem funcionários." />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-bg-card border border-gold-border rounded-lg p-6 w-full max-w-sm mx-4 space-y-4">
            <h2 className="font-display text-lg font-bold">Novo Funcionário</h2>
            <div className="space-y-3">
              {(['name', 'email', 'password', 'bio'] as const).map((field) => (
                <input
                  key={field}
                  type={field === 'password' ? 'password' : 'text'}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted"
                />
              ))}
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm">
                <option value="employee">Funcionário</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={handleCreate} disabled={!form.name || !form.email || !form.password || isPending} loading={isPending}>Criar</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
