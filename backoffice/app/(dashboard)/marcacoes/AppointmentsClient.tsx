'use client';
import { useMemo, useState, useTransition, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Appointment, Client, Employee, Partnership, Service } from '@/lib/types';
import DataTable from '@/components/DataTable';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import NovaMarcacaoModal from '@/components/NovasMarcacaoModal';
import EditAppointmentModal from '@/components/EditAppointmentModal';
import { updateAppointmentStatusAction, deleteAppointmentAction } from '@/lib/actions';
import { formatLisbon } from '@/lib/timezone';

interface Props {
  initial: Appointment[];
  employees: Employee[];
  services: Service[];
  clients: Client[];
  partnerships: Partnership[];
}

function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

const PAGE_SIZE = 10;
const STATUS_OPTIONS: { value: Appointment['status'] | ''; label: string }[] = [
  { value: '', label: 'Todos os estados' },
  { value: 'pending', label: 'Pendente' },
  { value: 'confirmed', label: 'Confirmada' },
  { value: 'completed', label: 'Concluída' },
  { value: 'cancelled', label: 'Cancelada' },
];

export default function AppointmentsClient({ initial, employees, services, clients, partnerships }: Props) {
  const [appointments, setAppointments] = useState(initial);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Appointment | null>(null);
  const [search, setSearch] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
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

  function handleDelete(a: Appointment) {
    if (!confirm(`Apagar a marcação de ${a.clientName} (${formatLisbon(a.startDatetime, 'dd/MM/yyyy HH:mm')})? Esta ação não pode ser desfeita.`)) return;
    setStatusError('');
    startTransition(async () => {
      try {
        await deleteAppointmentAction(a.id);
        setAppointments((prev) => prev.filter((x) => x.id !== a.id));
      } catch (err) {
        setStatusError((err as Error).message);
      }
    });
  }

  function handleCreated(appt: Appointment) {
    setAppointments((prev) => [...prev, appt].sort((a, b) => a.startDatetime.localeCompare(b.startDatetime)));
  }

  function handleUpdated(appt: Appointment) {
    setAppointments((prev) => prev.map((a) => (a.id === appt.id ? appt : a)));
  }

  const filtered = useMemo(() => {
    const q = normalize(search.trim());
    return appointments.filter((a) => {
      if (employeeFilter && String(a.employee.id) !== employeeFilter) return false;
      if (statusFilter && a.status !== statusFilter) return false;
      if (!q) return true;
      const haystack = normalize(`${a.clientName} ${a.clientPhone} ${a.service.name} ${a.employee.name} ${a.partnership?.name ?? ''}`);
      return haystack.includes(q);
    });
  }, [appointments, search, employeeFilter, statusFilter]);

  // Mais recentes primeiro.
  const sorted = useMemo(
    () => [...filtered].sort((a, b) => b.startDatetime.localeCompare(a.startDatetime)),
    [filtered]
  );

  // Volta à página 1 sempre que os filtros mudam.
  useEffect(() => { setPage(1); }, [search, employeeFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const page_ = Math.min(page, totalPages);
  const paginated = sorted.slice((page_ - 1) * PAGE_SIZE, page_ * PAGE_SIZE);

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
          {a.partnership && (
            <p className="text-xs text-text-secondary mt-0.5">{a.partnership.name}{a.extraFieldValue ? ` · ${a.extraFieldValue}` : ''}</p>
          )}
        </div>
      ),
    },
    { key: 'status', label: 'Estado', render: (a: Appointment) => <Badge status={a.status} /> },
    {
      key: 'actions',
      label: 'Ações',
      render: (a: Appointment) => (
        <div className="flex items-center gap-2 flex-wrap">
          {a.status === 'pending' && (
            <>
              <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleStatus(a.id, 'confirmed'); }} disabled={isPending}>Confirmar</Button>
              <Button size="sm" variant="danger" onClick={(e) => { e.stopPropagation(); handleStatus(a.id, 'cancelled'); }} disabled={isPending}>Cancelar</Button>
            </>
          )}
          {a.status === 'confirmed' && (
            <>
              <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleStatus(a.id, 'completed'); }} disabled={isPending}>Concluir</Button>
              <Button size="sm" variant="danger" onClick={(e) => { e.stopPropagation(); handleStatus(a.id, 'cancelled'); }} disabled={isPending}>Cancelar</Button>
            </>
          )}
          <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setEditing(a); }}>Editar</Button>
          <Button size="sm" variant="danger" onClick={(e) => { e.stopPropagation(); handleDelete(a); }} disabled={isPending}>Apagar</Button>
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

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
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
        <select
          value={employeeFilter}
          onChange={(e) => setEmployeeFilter(e.target.value)}
          className="bg-bg-card border border-gold-border rounded px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-gold"
        >
          <option value="">Todos os artistas</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-bg-card border border-gold-border rounded px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-gold"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {statusError && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded px-3 py-2 mb-4">{statusError}</p>
      )}

      <DataTable columns={columns} data={paginated} emptyMessage={search || employeeFilter || statusFilter ? 'Sem resultados para esses filtros.' : 'Sem marcações.'} />

      {sorted.length > 0 && (
        <div className="flex items-center justify-center gap-3 mt-4">
          <Button size="sm" variant="ghost" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page_ === 1}>
            ‹ Anterior
          </Button>
          <span className="text-text-secondary text-sm">Página {page_} de {totalPages}</span>
          <Button size="sm" variant="ghost" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page_ === totalPages}>
            Seguinte ›
          </Button>
        </div>
      )}

      {showModal && (
        <NovaMarcacaoModal
          employees={employees}
          services={services}
          clients={clients}
          partnerships={partnerships}
          prefill={prefill.clientName ? prefill : undefined}
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}

      {editing && (
        <EditAppointmentModal
          appointment={editing}
          partnerships={partnerships}
          onClose={() => setEditing(null)}
          onUpdated={handleUpdated}
        />
      )}
    </>
  );
}
