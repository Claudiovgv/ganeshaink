'use client';
import { useState, useTransition } from 'react';
import type { Appointment } from '@/lib/types';
import DataTable from '@/components/DataTable';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import { updateAppointmentStatusAction } from '@/lib/actions';

export default function AppointmentsClient({ initial }: { initial: Appointment[] }) {
  const [appointments, setAppointments] = useState(initial);
  const [isPending, startTransition] = useTransition();

  function handleStatus(id: number, status: string) {
    startTransition(async () => {
      await updateAppointmentStatusAction(id, status);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: status as Appointment['status'] } : a))
      );
    });
  }

  const columns = [
    {
      key: 'datetime',
      label: 'Data / Hora',
      render: (a: Appointment) => (
        <span className="whitespace-nowrap text-sm">
          {new Date(a.startDatetime).toLocaleString('pt-PT', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
        </span>
      ),
    },
    { key: 'client', label: 'Cliente', render: (a: Appointment) => <span>{a.clientName}</span> },
    { key: 'service', label: 'Serviço', render: (a: Appointment) => <span>{a.service.name}</span> },
    { key: 'employee', label: 'Artista', render: (a: Appointment) => <span>{a.employee.name}</span> },
    { key: 'status', label: 'Estado', render: (a: Appointment) => <Badge status={a.status} /> },
    {
      key: 'actions',
      label: 'Acções',
      render: (a: Appointment) => (
        <div className="flex items-center gap-2">
          {a.status === 'confirmed' && (
            <>
              <Button size="sm" variant="ghost" onClick={() => handleStatus(a.id, 'completed')} disabled={isPending}>Concluir</Button>
              <Button size="sm" variant="danger" onClick={() => handleStatus(a.id, 'cancelled')} disabled={isPending}>Cancelar</Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={appointments} emptyMessage="Sem marcações." />;
}
