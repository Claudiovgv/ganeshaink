'use client';
import { useState, useTransition } from 'react';
import type { User } from '@/lib/types';
import DataTable from '@/components/DataTable';
import Button from '@/components/Button';
import { createUserAction, updateUserAction, deleteUserAction, sendUserResetEmailAction, resetUser2FAAction } from '@/lib/actions';

const ROLE_LABELS: Record<string, string> = { superadmin: 'Superadmin', admin: 'Admin', employee: 'Funcionário' };
const ROLE_STYLE: Record<string, string> = {
  superadmin: 'text-gold border-gold/40 bg-gold-muted',
  admin: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  employee: 'text-text-secondary border-gold-border',
};

const emptyForm = { name: '', email: '', password: '', role: 'admin', notificationEmail: '' };

function initials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase();
}

export default function UtilizadoresClient({ initial, currentUserId }: { initial: User[]; currentUserId: number }) {
  const [users, setUsers] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleting, setDeleting] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function openCreate() {
    setForm(emptyForm);
    setError(null);
    setInfo(null);
    setShowForm(true);
  }

  function openEdit(u: User) {
    setEditing(u);
    setForm({ name: u.name, email: u.email, password: '', role: u.role, notificationEmail: u.notificationEmail ?? '' });
    setError(null);
    setInfo(null);
  }

  function handleCreate() {
    setError(null);
    startTransition(async () => {
      try {
        const created = await createUserAction(form);
        setUsers((prev) => [...prev, created]);
        setShowForm(false);
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  function handleUpdate() {
    if (!editing) return;
    setError(null);
    setInfo(null);
    startTransition(async () => {
      try {
        const payload: { name: string; role: string; notificationEmail: string | null; password?: string } = {
          name: form.name,
          role: form.role,
          notificationEmail: form.notificationEmail || null,
        };
        if (form.password) payload.password = form.password;
        const updated = await updateUserAction(editing.id, payload);
        setUsers((prev) => prev.map((u) => u.id === editing.id ? { ...u, ...updated } : u));
        setEditing(null);
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  function handleSendReset() {
    if (!editing) return;
    setError(null);
    setInfo(null);
    startTransition(async () => {
      try {
        const res = await sendUserResetEmailAction(editing.id);
        setInfo(res.message);
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  function handleReset2FA() {
    if (!editing) return;
    setError(null);
    setInfo(null);
    startTransition(async () => {
      try {
        const res = await resetUser2FAAction(editing.id);
        setUsers((prev) => prev.map((u) => u.id === editing.id ? { ...u, twoFactorEnabled: false } : u));
        setInfo(res.message);
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  function handleDelete() {
    if (!deleting) return;
    setError(null);
    startTransition(async () => {
      try {
        await deleteUserAction(deleting.id);
        setUsers((prev) => prev.filter((u) => u.id !== deleting.id));
        setDeleting(null);
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  const columns = [
    {
      key: 'name',
      label: 'Utilizador',
      mobileMain: true,
      render: (u: User) => (
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 shrink-0 rounded-full bg-gold-muted text-gold flex items-center justify-center text-xs font-semibold">
            {initials(u.name)}
          </div>
          <div className="min-w-0">
            <p className="font-medium truncate">{u.name}{u.id === currentUserId && <span className="text-text-muted font-normal"> (tu)</span>}</p>
            <p className="text-text-muted text-xs truncate">login: {u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Papel',
      render: (u: User) => (
        <span className={`text-xs font-medium px-2 py-0.5 rounded border whitespace-nowrap ${ROLE_STYLE[u.role]}`}>
          {ROLE_LABELS[u.role]}
        </span>
      ),
    },
    {
      key: '2fa',
      label: '2FA',
      render: (u: User) => (
        <span className={`text-xs whitespace-nowrap ${u.twoFactorEnabled ? 'text-emerald-400' : 'text-text-muted'}`}>
          {u.twoFactorEnabled ? 'Configurado' : 'Pendente'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Ações',
      render: (u: User) => (
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant="outline" onClick={() => openEdit(u)} disabled={isPending}>Editar</Button>
          <Button size="sm" variant="danger" onClick={() => { setDeleting(u); setError(null); }} disabled={isPending || u.id === currentUserId}>
            Apagar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-4 gap-3">
        <p className="text-text-secondary text-sm">Contas que acedem ao backoffice e o papel de cada uma.</p>
        <Button onClick={openCreate}>+ Novo Utilizador</Button>
      </div>
      <DataTable columns={columns} data={users} emptyMessage="Sem utilizadores." />

      {(showForm || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-bg-card border border-gold-border rounded-lg p-6 w-full max-w-sm space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="font-display text-lg font-bold">{editing ? `Editar ${editing.name}` : 'Novo Utilizador'}</h2>
            {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded px-3 py-2">{error}</p>}
            {info && <p className="text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/30 rounded px-3 py-2">{info}</p>}
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1">Nome</label>
                <input
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
                      placeholder="ex: maria ou maria@ganeshaink.pt"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted"
                    />
                  </div>
                </>
              )}
              {editing && (
                <div>
                  <label className="block text-xs text-text-secondary mb-1">Utilizador de login</label>
                  <p className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm">
                    {editing.email}
                  </p>
                  <p className="text-text-muted text-[11px] mt-1">É isto que se escreve no login, não o nome completo.</p>
                </div>
              )}
              <div>
                <label className="block text-xs text-text-secondary mb-1">{editing ? 'Nova senha (opcional)' : 'Password'}</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted"
                  placeholder={editing ? 'Deixa em branco para não alterar' : ''}
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">Email para notificações</label>
                <input
                  type="email"
                  placeholder="ex: webdev@ganeshaink.pt"
                  value={form.notificationEmail}
                  onChange={(e) => setForm({ ...form, notificationEmail: e.target.value })}
                  className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted"
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">Papel</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  disabled={editing?.id === currentUserId}
                  className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm disabled:opacity-50"
                >
                  <option value="superadmin">Superadmin — acesso total, gere utilizadores e papéis</option>
                  <option value="admin">Admin — gere o backoffice (secções definidas em Papéis)</option>
                  <option value="employee">Funcionário — só vê a sua agenda</option>
                </select>
                {editing?.id === currentUserId && (
                  <p className="text-text-muted text-xs mt-1">Não podes alterar o teu próprio papel.</p>
                )}
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
            {editing && (
              <div className="flex flex-col gap-2 pt-1">
                <Button size="sm" variant="outline" onClick={handleSendReset} disabled={isPending}>
                  Enviar reposição por email
                </Button>
                <Button size="sm" variant="outline" onClick={handleReset2FA} disabled={isPending}>
                  Repor 2FA
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-bg-card border border-gold-border rounded-lg p-6 w-full max-w-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-red-400">Apagar utilizador</h2>
            <p className="text-text-secondary text-sm">
              Tens a certeza que queres apagar <span className="text-text-primary font-medium">{deleting.name}</span>?
              Esta ação não pode ser desfeita.
            </p>
            {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded px-3 py-2">{error}</p>}
            <div className="flex gap-3">
              <Button className="flex-1" variant="danger" onClick={handleDelete} disabled={isPending} loading={isPending}>Sim, apagar</Button>
              <Button variant="outline" onClick={() => { setDeleting(null); setError(null); }} disabled={isPending}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
