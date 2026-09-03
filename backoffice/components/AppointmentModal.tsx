'use client';
import { Appointment } from '@/lib/types';
import Badge from './Badge';
import Button from './Button';
import { formatLisbon } from '@/lib/timezone';

interface Props {
  appointment: Appointment;
  onClose: () => void;
}

export default function AppointmentModal({ appointment: apt, onClose }: Props) {
  const fmt = (d: string) => formatLisbon(d, 'HH:mm');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="bg-bg-card border border-gold-border rounded-lg p-6 w-full max-w-sm mx-4 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 className="font-display text-lg font-bold">{apt.service.name}</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary text-xl leading-none">×</button>
        </div>
        <div className="space-y-2 text-sm">
          <Row label="Cliente" value={apt.clientName} />
          <Row label="Email" value={apt.clientEmail} />
          <Row label="Telefone" value={apt.clientPhone} />
          <Row label="Artista" value={apt.employee.name} />
          <Row label="Horário" value={`${fmt(apt.startDatetime)} — ${fmt(apt.endDatetime)}`} />
          <Row label="Duração" value={`${apt.service.durationMin} min`} />
          {apt.partnership && (
            <Row label="Parceria" value={`${apt.partnership.name}${apt.extraFieldValue ? ` · ${apt.extraFieldValue}` : ''}`} />
          )}
          {apt.price != null && <Row label="Valor" value={`${Number(apt.price).toFixed(2)}€`} />}
          <div className="flex items-center justify-between py-1">
            <span className="text-text-secondary">Estado</span>
            <Badge status={apt.status} />
          </div>
          {apt.notes && <Row label="Notas" value={apt.notes} />}
        </div>
        <Button variant="outline" size="sm" className="w-full" onClick={onClose}>
          Fechar
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-gold-border/20 last:border-0">
      <span className="text-text-secondary">{label}</span>
      <span className="text-text-primary text-right max-w-[60%] truncate">{value}</span>
    </div>
  );
}
