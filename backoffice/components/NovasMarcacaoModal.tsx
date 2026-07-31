'use client';
import { useState, useTransition, useEffect } from 'react';
import type { Appointment, Client, Employee, Service } from '@/lib/types';
import Button from './Button';
import { createAppointmentAction } from '@/lib/actions';

interface Props {
  employees: Employee[];
  services: Service[];
  clients: Client[];
  onClose: () => void;
  onCreated: (appt: Appointment) => void;
  // Pré-preenchido quando vem da página Clientes
  prefill?: { clientName?: string; clientEmail?: string; clientPhone?: string };
}

type ClientMode = 'existing' | 'new';

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
];

export default function NovaMarcacaoModal({ employees, services, clients, onClose, onCreated, prefill }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  // Cliente
  const [clientMode, setClientMode] = useState<ClientMode>(prefill ? 'new' : 'existing');
  const [clientSearch, setClientSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newClient, setNewClient] = useState({
    name: prefill?.clientName ?? '',
    email: prefill?.clientEmail ?? '',
    phone: prefill?.clientPhone ?? '',
  });

  // Marcação
  const [employeeId, setEmployeeId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  // Filtrar serviços pelo funcionário selecionado
  const employeeServices = employeeId
    ? employees
        .find((e) => e.id === Number(employeeId))
        ?.services.map((s) => s.service) ?? services
    : services;

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const clientName = clientMode === 'existing' ? selectedClient?.name ?? '' : newClient.name;
  const clientEmail = clientMode === 'existing' ? selectedClient?.email ?? '' : newClient.email;
  const clientPhone = clientMode === 'existing' ? selectedClient?.phone ?? '' : newClient.phone;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      setError('Dados do cliente em falta.');
      return;
    }
    if (!employeeId || !serviceId || !date || !time) {
      setError('Preenche todos os campos da marcação.');
      return;
    }

    startTransition(async () => {
      try {
        const created = await createAppointmentAction({
          clientName, clientEmail, clientPhone,
          employeeId: Number(employeeId),
          serviceId: Number(serviceId),
          date, time,
          notes: notes || undefined,
        }) as Appointment;
        onCreated(created);
        onClose();
      } catch (err) {
        setError((err as Error).message || 'Erro ao criar marcação. Tenta novamente.');
      }
    });
  }

  // data mínima = hoje
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 overflow-y-auto">
      <div className="bg-bg-card border border-gold-border rounded-xl w-full max-w-lg p-6 my-auto">
        <h2 className="font-display text-xl font-bold mb-5">Nova Marcação</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* ── Cliente ── */}
          <div>
            <p className="text-sm font-medium mb-2">Cliente</p>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setClientMode('existing')}
                className={`flex-1 text-sm py-1.5 rounded border transition-colors ${
                  clientMode === 'existing'
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-gold-border text-text-secondary hover:border-gold/50'
                }`}
              >
                Cliente existente
              </button>
              <button
                type="button"
                onClick={() => setClientMode('new')}
                className={`flex-1 text-sm py-1.5 rounded border transition-colors ${
                  clientMode === 'new'
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-gold-border text-text-secondary hover:border-gold/50'
                }`}
              >
                Novo cliente
              </button>
            </div>

            {clientMode === 'existing' ? (
              <div>
                <input
                  type="text"
                  placeholder="Pesquisar por nome ou email..."
                  value={clientSearch}
                  onChange={(e) => { setClientSearch(e.target.value); setSelectedClient(null); }}
                  className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2 text-sm focus:border-gold focus:outline-none mb-2"
                />
                {clientSearch && (
                  <div className="bg-bg-primary border border-gold-border rounded max-h-36 overflow-y-auto">
                    {filteredClients.length === 0 ? (
                      <p className="text-text-muted text-sm p-3">Nenhum cliente encontrado.</p>
                    ) : (
                      filteredClients.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => { setSelectedClient(c); setClientSearch(c.name); }}
                          className="w-full text-left px-3 py-2 hover:bg-gold/10 transition-colors"
                        >
                          <p className="text-sm font-medium">{c.name}</p>
                          <p className="text-xs text-text-secondary">{c.email} · {c.phone}</p>
                        </button>
                      ))
                    )}
                  </div>
                )}
                {selectedClient && (
                  <div className="bg-gold/5 border border-gold/30 rounded px-3 py-2 text-sm">
                    <p className="font-medium">{selectedClient.name}</p>
                    <p className="text-text-secondary text-xs">{selectedClient.email} · {selectedClient.phone}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Nome *"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2 text-sm focus:border-gold focus:outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Email *"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2 text-sm focus:border-gold focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Telefone *"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2 text-sm focus:border-gold focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* ── Funcionário ── */}
          <div>
            <label className="block text-sm font-medium mb-1">Artista / Funcionário *</label>
            <select
              required
              value={employeeId}
              onChange={(e) => { setEmployeeId(e.target.value); setServiceId(''); }}
              className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
            >
              <option value="">Selecionar...</option>
              {employees.filter((e) => e.isActive).map((e) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
          </div>

          {/* ── Serviço ── */}
          <div>
            <label className="block text-sm font-medium mb-1">Serviço *</label>
            <select
              required
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              disabled={!employeeId}
              className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2.5 text-sm focus:border-gold focus:outline-none disabled:opacity-40"
            >
              <option value="">Selecionar...</option>
              {employeeServices.filter((s) => s.isActive).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — {(s.durationMin / 60).toFixed(0)}h {s.durationMin % 60 > 0 ? `${s.durationMin % 60}min` : ''} · {Number(s.price) === 0 ? 'sob consulta' : `${Number(s.price).toFixed(2)}€`}
                </option>
              ))}
            </select>
          </div>

          {/* ── Data e Hora ── */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Data *</label>
              <input
                type="date"
                required
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hora *</label>
              <select
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
              >
                <option value="">Selecionar...</option>
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Notas ── */}
          <div>
            <label className="block text-sm font-medium mb-1">Notas (opcional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Pedidos especiais, observações..."
              rows={2}
              className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2.5 text-sm focus:border-gold focus:outline-none resize-none"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 pt-1">
            <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" loading={isPending} className="flex-1">
              Criar Marcação
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
