'use client';
import { useMemo, useState, useTransition, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Appointment, Client, Employee, Service } from '@/lib/types';
import DataTable from '@/components/DataTable';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import NovaMarcacaoModal from '@/components/NovasMarcacaoModal';
import { updateAppointmentStatusAction } from '@/lib/actions';
import { formatLisbon } from '@/lib/timezone';

interface Props {
  initial: Appointment[];
  employees: Employee[];
  services: Service[];
  clients: Client[];
}

function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export default function AppointmentsClient({ initial, employees, services, clients }: Props) {
  const [appointments, setAppointments] = useState(initial);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusError, setStatusError] = useState('');
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  // Pré-preencher quando vem da página Clientes via "Nova Marcação"
  const prefill = {
    clientName: searchParams.get('clientName') ?? undefined,
    clientEmail: searchParams.get('clientEmail') ?? undefined,
    clientPhone: searchParams.get('clientPhone') ?? undefined,
  };

  useEffect(() => {
    if (prefill.clientName) setShowModal(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleStatus(id: number, status: string) {
    setStatusError('');
    startTransition(async () => {
      try {
        await updateAppointmentStatusAction(id, status);
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: status as Appointment['status'] } : a))
        );
      } catch (err) {
        setStatusError((err as Error).message);
      }
    });
  }

  function handleCreated(appt: Appointment) {
    setAppointments((prev) => [...prev, appt].sort((a, b) => a.startDatetime.localeCompare(b.startDatetime)));
  }

  const filtered = useMemo(() => {
    const q = normalize(search.trim());
    if (!q) return appointments;
    return appointments.filter((a) => {
      const haystack = normalize(`${a.clientName} ${a.clientPhone} ${a.service.name} ${a.employee.name}`);
      return haystack.includes(q);
    });
  }, [appointments, search]);

  // Sempre ordenadas cronologicamente, mesmo depois de atualizações locais.
  const sorted = useMemo(
    () => [...filtered].sort((a, b) => a.startDatetime.localeCompare(b.startDatetime)),
    [filtered]
  );

  const columns = [
    {
      key: 'datetime',
      label: 'Data / Hora',
      mobileMain: true,
      render: (a: Appointment) => (
        <div>
          <p className="text-sm font-medium whitespace-nowrap">{formatLisbon(a.startDatetime, 'dd/MM/yy')}</p>
          <p className="text-xs text-text-secondary whitespace-nowrap">{formatLisbon(a.startDatetime, 'HH:mm')}</p>
        </div>
      ),
    },
    {
      key: 'client',
      label: 'Cliente',
      render: (a: Appointment) => (
        <div>
          <p className="text-sm font-medium">{a.clientName}</p>
          <p className="text-xs text-text-secondary">{a.clientPhone}</p>
        </div>
      ),
    },
    {
      key: 'service',
      label: 'Serviço / Artista',
      render: (a: Appointment) => (
        <div>
          <p className="text-sm">{a.service.name}</p>
          <span className="inline-block mt-0.5 text-xs text-gold border border-gold-border rounded px-1.5 py-0.5">
            {a.employee.name}
          </span>
        </div>
      ),
    },
    { key: 'status', label: 'Estado', render: (a: Appointment) => <Badge status={a.status} /> },
    {
      key: 'actions',
      label: 'Ações',
      render: (a: Appointment) => (
        <div className="flex items-center gap-2 flex-wrap">
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

  return (
    <>
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <p className="text-text-secondary text-sm whitespace-nowrap">
          {sorted.length} de {appointments.length} marcaç{appointments.length !== 1 ? 'ões' : 'ão'}
        </p>
        <Button onClick={() => setShowModal(true)} size="sm">+ Nova Marcação</Button>
      </div>

      <div className="relative mb-4">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar por cliente, telefone, serviço ou artista..."
          className="w-full bg-bg-card border border-gold-border rounded pl-9 pr-3 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold"
        />
      </div>

      {statusError && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded px-3 py-2 mb-4">{statusError}</p>
      )}

      <DataTable columns={columns} data={sorted} emptyMessage={search ? 'Sem resultados para essa pesquisa.' : 'Sem marcações.'} />

      {showModal && (
        <NovaMarcacaoModal
          employees={employees}
          services={services}
          clients={clients}
          prefill={prefill.clientName ? prefill : undefined}
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
    </>
  );
}
