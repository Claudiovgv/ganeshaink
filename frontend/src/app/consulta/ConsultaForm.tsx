'use client';

import { FormEvent, useEffect, useState } from 'react';
import { api, Service } from '@/lib/api';
import Button from '@/components/ui/Button';

export default function ConsultaForm() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceId: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.services.list('tattoo'), api.services.list('piercing')])
      .then(([t, p]) => setServices([...t, ...p]))
      .catch(() => setError('Erro ao carregar serviços.'));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.clientName || !form.clientEmail || !form.clientPhone || !form.serviceId || !form.description) {
      setError('Preenche todos os campos.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.consultations.create({
        clientName: form.clientName,
        clientEmail: form.clientEmail,
        clientPhone: form.clientPhone,
        serviceId: parseInt(form.serviceId),
        description: form.description,
      });
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar pedido.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-6">🎉</div>
        <h2 className="font-display text-2xl font-bold mb-3 text-gold">Pedido Enviado!</h2>
        <p className="text-text-secondary">
          Entraremos em contacto contigo em breve para agendar a consulta.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm text-text-secondary mb-1">Nome *</label>
        <input
          type="text"
          required
          value={form.clientName}
          onChange={(e) => setForm({ ...form, clientName: e.target.value })}
          placeholder="O teu nome"
          className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-gold focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm text-text-secondary mb-1">Email *</label>
        <input
          type="email"
          required
          value={form.clientEmail}
          onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
          placeholder="o.teu@email.com"
          className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-gold focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm text-text-secondary mb-1">Telefone *</label>
        <input
          type="tel"
          required
          value={form.clientPhone}
          onChange={(e) => setForm({ ...form, clientPhone: e.target.value })}
          placeholder="+351 9xx xxx xxx"
          className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-gold focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm text-text-secondary mb-1">Tipo de serviço *</label>
        <select
          required
          value={form.serviceId}
          onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
          className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary focus:border-gold focus:outline-none"
        >
          <option value="">Selecciona...</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-text-secondary mb-1">Descreve o que pretendes *</label>
        <textarea
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Descreve o tamanho, estilo, localização no corpo, referências de inspiração, etc."
          rows={5}
          className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-gold focus:outline-none resize-none"
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <Button type="submit" loading={loading} size="lg" className="w-full justify-center">
        Enviar Pedido de Consulta
      </Button>
    </form>
  );
}
