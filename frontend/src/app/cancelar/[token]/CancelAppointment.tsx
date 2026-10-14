'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { ApiError, api, Appointment } from '@/lib/api';
import Button from '@/components/ui/Button';

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString('pt-PT', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Lisbon',
  });
}

export default function CancelAppointment({ token }: { token: string }) {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    api.appointments
      .getByCancelToken(token)
      .then((apt) => {
        if (!alive) return;
        setAppointment(apt);
        if (apt.status === 'cancelled') {
          setDone(true);
        }
      })
      .catch((err: unknown) => {
        if (!alive) return;
        setError(err instanceof ApiError && err.status === 404
          ? 'Este link de cancelamento já não é válido.'
          : 'Não foi possível abrir a marcação.');
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [token]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!reason.trim()) {
      setError('Indica o motivo do cancelamento.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const updated = await api.appointments.cancelByToken(token, reason.trim());
      setAppointment(updated);
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao cancelar a marcação.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <p className="text-text-secondary text-center">A abrir a marcação…</p>;
  }

  if (!appointment) {
    return (
      <div className="text-center space-y-4">
        <h1 className="font-display text-3xl font-bold text-gold">Cancelar marcação</h1>
        <p className="text-text-secondary">{error || 'Link inválido.'}</p>
        <Link href="/marcar" className="text-gold text-sm hover:underline">
          Marcar outra hora
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="text-center space-y-4">
        <h1 className="font-display text-3xl font-bold text-gold">Marcação cancelada</h1>
        <p className="text-text-secondary">
          A tua marcação foi cancelada. Se quiseres outra hora, podes marcar de novo no site.
        </p>
        <Link
          href="/marcar"
          className="inline-flex items-center px-6 py-3 bg-gold text-bg-primary font-semibold rounded hover:bg-gold-light transition-colors"
        >
          Marcar outra hora
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-center mb-2">
        <span className="text-gold-gradient">Cancelar marcação</span>
      </h1>
      <p className="text-text-secondary text-center mb-8">
        Diz-nos o motivo e confirma o cancelamento da tua hora.
      </p>

      <div className="bg-bg-card border border-gold-border rounded-lg p-5 mb-6 space-y-2 text-sm">
        <p className="text-text-primary font-medium">{appointment.service.name}</p>
        <p className="text-text-secondary">{appointment.employee.name}</p>
        <p className="text-text-secondary capitalize">{formatWhen(appointment.startDatetime)}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="reason" className="block text-sm text-text-secondary mb-1">
            Motivo *
          </label>
          <textarea
            id="reason"
            required
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Porque precisas de cancelar?"
            className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2.5 text-sm focus:border-gold focus:outline-none resize-none"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <Button type="submit" loading={submitting} className="w-full">
          Cancelar a tua marcação
        </Button>
      </form>
    </div>
  );
}
