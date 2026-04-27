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
}

export default function ConsultasClient({ initial, employees }: Props) {
  const [consultations, setConsultations] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [scheduling, setScheduling] = useState<number | null>(null);
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
    { key: 'client', label: 'Cliente', render: (c: ConsultationRequest) => <span>{c.clientName}</span> },
    { key: 'email', label: 'Email', render: (c: ConsultationRequest) => <span className="text-text-secondary text-xs">{c.clientEmail}</span> },
    { key: 'service', label: 'Serviço', render: (c: ConsultationRequest) => <span>{c.serviceType}</span> },
    { key: 'desc', label: 'Descrição', render: (c: ConsultationRequest) => <span className="text-text-secondary text-xs max-w-[200px] truncate block">{c.description ?? '—'}</span> },
    { key: 'status', label: 'Estado', render: (c: ConsultationRequest) => <Badge status={c.status} /> },
    {
      key: 'actions',
      label: 'Acções',
      render: (c: ConsultationRequest) =>
        c.status === 'pending' ? (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setScheduling(c.id)}>Agendar</Button>
            <Button size="sm" variant="danger" onClick={() => handleReject(c.id)} disabled={isPending}>Rejeitar</Button>
          </div>
        ) : null,
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={consultations} emptyMessage="Sem consultas." />

      {scheduling !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-bg-card border border-gold-border rounded-lg p-6 w-full max-w-sm mx-4 space-y-4">
            <h2 className="font-display text-lg font-bold">Agendar Consulta</h2>
            <div className="space-y-3">
              <select value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm">
                <option value="">Escolher artista</option>
                {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm" />
              <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm" />
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => handleSchedule(scheduling)} disabled={!form.employeeId || !form.date || !form.time || isPending} loading={isPending}>Confirmar</Button>
              <Button variant="outline" onClick={() => setScheduling(null)}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
