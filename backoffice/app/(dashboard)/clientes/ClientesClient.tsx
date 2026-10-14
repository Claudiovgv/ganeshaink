'use client';
import { useState, useTransition } from 'react';
import type { Client } from '@/lib/types';
import DataTable from '@/components/DataTable';
import Button from '@/components/Button';
import { updateClientAction } from '@/lib/actions';

interface Props {
  initial: Client[];
  onNewAppointment?: (client: Client) => void;
}

interface ClientForm {
  name: string;
  nickname: string;
  email: string;
  phone: string;
  notes: string;
}

const EMPTY: ClientForm = { name: '', nickname: '', email: '', phone: '', notes: '' };

function formFromClient(client: Client): ClientForm {
  return {
    name: client.name,
    nickname: client.nickname ?? '',
    email: client.email.startsWith('sem-contacto+') ? '' : client.email,
    phone: client.phone === 'Sem contacto' ? '' : client.phone,
    notes: '',
  };
}

export default function ClientesClient({ initial }: Props) {
  const [clients, setClients] = useState(initial);
  const [editing, setEditing] = useState<Client | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<ClientForm>(EMPTY);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  function openCreate() {
    setEditing(null);
    setCreating(true);
    setForm(EMPTY);
    setError('');
  }

  function openEdit(client: Client) {
    setCreating(false);
    setEditing(client);
    setForm(formFromClient(client));
    setError('');
  }

  function closeModal() {
    setCreating(false);
    setEditing(null);
    setError('');
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setError('Nome, email e telefone são obrigatórios.');
      return;
    }
    startTransition(async () => {
      try {
        const mockClient: Client = {
          id: Date.now(),
          name: form.name,
          email: form.email,
          phone: form.phone,
          nickname: form.nickname.trim() || null,
          appointmentCount: 0,
        };
        setClients((prev) => [mockClient, ...prev]);
        closeModal();
        setForm(EMPTY);
      } catch {
        setError('Erro ao criar cliente. Tenta novamente.');
      }
    });
  }

  function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Nome, email e telefone são obrigatórios.');
      return;
    }
    const currentEmail = editing.email;
    startTransition(async () => {
      try {
        const saved = await updateClientAction(currentEmail, {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          nickname: form.nickname.trim(),
        });
        setClients((prev) =>
          prev.map((c) =>
            c.email === currentEmail
              ? { ...c, name: saved.name, email: saved.email, phone: saved.phone, nickname: saved.nickname }
              : c,
          ),
        );
        closeModal();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao guardar o cliente.');
      }
    });
  }

  const columns = [
    { key: 'name', label: 'Nome', render: (c: Client) => <span className="font-medium">{c.name}</span> },
    {
      key: 'nickname',
      label: 'Alcunha',
      render: (c: Client) => <span className="text-text-secondary text-sm">{c.nickname || '—'}</span>,
    },
    { key: 'email', label: 'Email', render: (c: Client) => <span className="text-text-secondary text-sm">{c.email}</span> },
    { key: 'phone', label: 'Telefone', render: (c: Client) => <span className="text-text-secondary text-sm">{c.phone}</span> },
    {
      key: 'count',
      label: 'Marcações',
      render: (c: Client) => <span className="text-gold font-medium">{c.appointmentCount}</span>,
    },
    {
      key: 'partnership',
      label: 'Parceria',
      render: (c: Client) => <span className="text-text-secondary text-sm">{c.lastPartnership || '—'}</span>,
    },
    {
      key: 'actions',
      label: '',
      render: (c: Client) => (
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => openEdit(c)}
            className="text-xs text-gold border border-gold px-3 py-1 rounded hover:bg-gold/10 transition-colors whitespace-nowrap"
          >
            Editar
          </button>
          <a
            href={`/marcacoes?clientName=${encodeURIComponent(c.name)}&clientEmail=${encodeURIComponent(c.email)}&clientPhone=${encodeURIComponent(c.phone)}`}
            className="text-xs text-gold border border-gold px-3 py-1 rounded hover:bg-gold/10 transition-colors whitespace-nowrap"
          >
            Nova Marcação
          </a>
        </div>
      ),
    },
  ];

  const modalOpen = creating || Boolean(editing);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="text-text-secondary text-sm">{clients.length} cliente{clients.length !== 1 ? 's' : ''}</p>
        <Button onClick={openCreate} size="sm">+ Nova Ficha</Button>
      </div>

      <DataTable columns={columns} data={clients} emptyMessage="Sem clientes registados." />

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-bg-card border border-gold-border rounded-xl w-full max-w-md p-6">
            <h2 className="font-display text-xl font-bold mb-5">
              {editing ? 'Editar cliente' : 'Nova Ficha de Cliente'}
            </h2>

            <form onSubmit={editing ? handleEdit : handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">Nome *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nome completo"
                  className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1">Alcunha</label>
                <input
                  type="text"
                  value={form.nickname}
                  onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                  placeholder="Só visível no backoffice"
                  className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@exemplo.com"
                  className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1">Telefone *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+351 9xx xxx xxx"
                  className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
                />
              </div>

              {creating && (
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Notas (opcional)</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Alergias, preferências, histórico..."
                    rows={3}
                    className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2.5 text-sm focus:border-gold focus:outline-none resize-none"
                  />
                </div>
              )}

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="ghost" onClick={closeModal} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" loading={isPending} className="flex-1">
                  {editing ? 'Guardar' : 'Criar Ficha'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
