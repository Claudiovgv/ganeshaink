'use client';
import { useState } from 'react';
import type { Category, Service } from '@/lib/types';
import Button from './Button';

interface Props {
  initial?: Partial<Service>;
  categories: Category[];
  defaultCategoryId?: number;
  onSave: (data: { name: string; categoryId: number; description: string; durationMin: number; price: number; requiresConsultation: boolean }) => void;
  onClose: () => void;
  loading?: boolean;
}

export default function ServiceForm({ initial, categories, defaultCategoryId, onSave, onClose, loading }: Props) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    categoryId: initial?.categoryId ?? initial?.category?.id ?? defaultCategoryId ?? categories[0]?.id ?? 0,
    description: initial?.description ?? '',
    durationMin: initial?.durationMin ?? 30,
    price: initial?.price ?? 0,
    requiresConsultation: initial?.requiresConsultation ?? false,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-bg-card border border-gold-border rounded-lg p-6 w-full max-w-md mx-4 space-y-4">
        <h2 className="font-display text-lg font-bold">{initial?.id ? 'Editar Serviço' : 'Novo Serviço'}</h2>
        <div className="space-y-3">
          <input placeholder="Nome do serviço" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted" />
          <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: parseInt(e.target.value) })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm">
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <textarea placeholder="Descrição (opcional)" value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted resize-none" />
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-text-secondary mb-1 block">Duração (min)</label>
              <input type="number" min={5} step={5} value={form.durationMin} onChange={(e) => setForm({ ...form, durationMin: parseInt(e.target.value) })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-text-secondary mb-1 block">Preço (€)</label>
              <input type="number" min={0} step={0.5} value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm" />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.requiresConsultation} onChange={(e) => setForm({ ...form, requiresConsultation: e.target.checked })} className="accent-gold" />
            <span className="text-sm text-text-secondary">Requer consulta prévia</span>
          </label>
        </div>
        <div className="flex gap-3">
          <Button className="flex-1" onClick={() => onSave(form)} disabled={!form.name || !form.categoryId || loading} loading={loading}>Guardar</Button>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
}
