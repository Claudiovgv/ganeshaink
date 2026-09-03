'use client';

import { useState, FormEvent } from 'react';
import { api, Service, Employee, Appointment } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import Button from '../ui/Button';

interface Props {
  service: Service;
  employee: Employee;
  date: string;
  time: string;
  onSuccess: (appointment: Appointment) => void;
  onBack: () => void;
}

export default function Step5PersonalData({ service, employee, date, time, onSuccess, onBack }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formattedDate = new Date(`${date}T${time}`).toLocaleDateString('pt-PT', {
    weekday: 'long', day: 'numeric', month: 'long',
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setError('Preenche todos os campos obrigatórios.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const appt = await api.appointments.create({
        clientName: form.name,
        clientEmail: form.email,
        clientPhone: form.phone,
        employeeId: employee.id,
        serviceId: service.id,
        date,
        time,
        notes: form.notes || undefined,
      });
      onSuccess(appt);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao criar marcação. Tenta novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">Os Teus Dados</h2>
      <p className="text-text-secondary text-sm mb-6">Último passo!</p>

      <div className="bg-bg-card border border-gold-border rounded-lg p-5 mb-8 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">Serviço</span>
          <span>{service.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Artista</span>
          <span>{employee.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Data</span>
          <span className="text-right">{formattedDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Hora</span>
          <span>{time}</span>
        </div>
        <div className="flex justify-between border-t border-gold-border pt-2 mt-2">
          <span className="text-text-secondary">Preço estimado</span>
          <span className="text-gold font-semibold">{formatPrice(service.price)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-text-secondary mb-1">Nome *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="O teu nome"
            className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-text-secondary mb-1">Email *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="o.teu@email.com"
            className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-gold focus:outline-none"
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
            className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-text-secondary mb-1">Notas (opcional)</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Algum pedido especial, alergias ou informação adicional?"
            rows={3}
            className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-gold focus:outline-none resize-none"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex items-center gap-4 pt-2">
          <Button type="button" variant="ghost" onClick={onBack}>← Voltar</Button>
          <Button type="submit" loading={loading} size="lg">
            Confirmar Marcação
          </Button>
        </div>
      </form>
    </div>
  );
}
