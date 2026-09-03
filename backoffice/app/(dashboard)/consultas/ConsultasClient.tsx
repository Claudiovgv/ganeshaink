'use client';
import { useState, useTransition } from 'react';
import type { ConsultationRequest, Employee } from '@/lib/types';
import DataTable from '@/components/DataTable';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import { rejectConsultationAction, scheduleConsultationAction } from '@/lib/actions';

interface Props {
  initial: ConsultationRequest[];
  employees: Employee[];
  emptyMessage?: string;
  scheduleTitle?: string;
  confirmLabel?: string;
}

function serviceName(c: ConsultationRequest) {
  return c.service?.name || c.serviceType || '—';
}

function formatSubmittedAt(iso: string) {
  return new Date(iso).toLocaleString('pt-PT', {
    timeZone: 'Europe/Lisbon',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ConsultasClient({
  initial,
  employees,
  emptyMessage = 'Sem consultas.',
  scheduleTitle = 'Agendar Consulta',
  confirmLabel = 'Agendar',
}: Props) {
  const [consultations, setConsultations] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [scheduling, setScheduling] = useState<ConsultationRequest | null>(null);
  const [form, setForm] = useState({ employeeId: '', date: '', time: '' });

  function handleReject(id: number) {
    startTransition(async () => {
      await rejectConsultationAction(id);
      setConsultations((prev) => prev.map((c) => c.id === id ? { ...c, status: 'rejected' as const } : c));
    });
  }

  function handleSchedule(id: number) {
    startTransition(async () => {
      await scheduleConsultationAction(id, { employeeId: parseInt(form.employeeId), date: form.date, time: form.time });
      setConsultations((prev) => prev.map((c) => c.id === id ? { ...c, status: 'scheduled' as const } : c));
      setScheduling(null);
    });
  }

  const columns = [
    { key: 'client', label: 'Cliente', mobileMain: true, render: (c: ConsultationRequest) => (
      <div>
        <p className="font-medium">{c.clientName}</p>
        <p className="text-text-muted text-xs">{c.clientEmail}</p>
      </div>
    ) },
    { key: 'phone', label: 'Contacto', render: (c: ConsultationRequest) => (
      <span className="text-text-primary font-medium">{c.clientPhone || '—'}</span>
    ) },
    { key: 'submitted', label: 'Pedido em', render: (c: ConsultationRequest) => (
      <span className="text-text-secondary text-xs whitespace-nowrap">{formatSubmittedAt(c.createdAt)}</span>
    ) },
    { key: 'service', label: 'Serviço', render: (c: ConsultationRequest) => <span>{serviceName(c)}</span> },
    { key: 'desc', label: 'Descrição', mobileHide: true, render: (c: ConsultationRequest) => <span className="text-text-secondary text-xs max-w-[200px] truncate block">{c.description ?? '—'}</span> },
    { key: 'status', label: 'Estado', render: (c: ConsultationRequest) => <Badge status={c.status} /> },
    {
      key: 'actions',
      label: 'Acções',
      render: (c: ConsultationRequest) =>
        c.status === 'pending' ? (
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" onClick={() => { setScheduling(c); setForm({ employeeId: '', date: '', time: '' }); }}>{confirmLabel}</Button>
            <Button size="sm" variant="danger" onClick={() => handleReject(c.id)} disabled={isPending}>Rejeitar</Button>
          </div>
        ) : null,
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={consultations} emptyMessage={emptyMessage} />

      {scheduling && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-bg-card border border-gold-border rounded-lg p-6 w-full max-w-sm mx-4 space-y-4">
            <h2 className="font-display text-lg font-bold">{scheduleTitle}</h2>
            <div className="bg-bg-section border border-gold-border/40 rounded px-3 py-2 text-sm space-y-1">
              <p className="text-text-primary font-medium">{scheduling.clientName}</p>
              <p className="text-text-secondary">Contacto: <span className="text-text-primary font-medium">{scheduling.clientPhone || '—'}</span></p>
              <p className="text-text-muted text-xs">Pedido em {formatSubmittedAt(scheduling.createdAt)}</p>
            </div>
            <div className="space-y-3">
              <select value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm">
                <option value="">Escolher artista</option>
                {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm" />
              <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm" />
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => handleSchedule(scheduling.id)} disabled={!form.employeeId || !form.date || !form.time || isPending} loading={isPending}>Confirmar</Button>
              <Button variant="outline" onClick={() => setScheduling(null)}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
