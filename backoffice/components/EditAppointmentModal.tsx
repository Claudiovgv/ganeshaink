'use client';
import { useState, useTransition } from 'react';
import type { Appointment } from '@/lib/types';
import Button from './Button';
import { updateAppointmentClientAction } from '@/lib/actions';
import { formatLisbon } from '@/lib/timezone';

interface Props {
  appointment: Appointment;
  onClose: () => void;
  onUpdated: (appt: Appointment) => void;
}

export default function EditAppointmentModal({ appointment, onClose, onUpdated }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const [clientName, setClientName] = useState(appointment.clientName);
  const [clientEmail, setClientEmail] = useState(
    appointment.clientEmail.startsWith('sem-contacto+') ? '' : appointment.clientEmail
  );
  const [clientPhone, setClientPhone] = useState(
    appointment.clientPhone === 'Sem contacto' ? '' : appointment.clientPhone
  );
  const [price, setPrice] = useState(appointment.price != null ? String(appointment.price) : '');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!clientName) {
      setError('O nome do cliente é obrigatório.');
      return;
    }
    startTransition(async () => {
      try {
        const result = await updateAppointmentClientAction(appointment.id, {
          clientName,
          clientEmail: clientEmail || undefined,
          clientPhone: clientPhone || undefined,
          price: price === '' ? null : price,
        });
        onUpdated(result);
        onClose();
      } catch (err) {
        setError((err as Error).message || 'Erro ao atualizar marcação. Tenta novamente.');
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 overflow-y-auto">
      <div className="bg-bg-card border border-gold-border rounded-xl w-full max-w-lg p-6 my-auto">
        <h2 className="font-display text-xl font-bold mb-1">Editar Marcação</h2>
        <p className="text-text-secondary text-sm mb-5">
          {appointment.service.name} — {appointment.employee.name}
          <br />
          {formatLisbon(appointment.startDatetime, 'dd/MM/yyyy')} às {formatLisbon(appointment.startDatetime, 'HH:mm')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome do cliente *</label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2 text-sm focus:border-gold focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="Sem contacto"
                className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telefone</label>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="Sem contacto"
                className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2 text-sm focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Valor (€)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={`Preço do serviço: ${Number(appointment.service.price).toFixed(2)}€`}
              className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2 text-sm focus:border-gold focus:outline-none"
            />
            <p className="text-text-muted text-xs mt-1">Deixa em branco para usar o preço de catálogo do serviço.</p>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 pt-1">
            <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" loading={isPending} className="flex-1">
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
