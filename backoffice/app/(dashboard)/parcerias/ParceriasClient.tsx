'use client';
import { useState, useTransition } from 'react';
import type { Partnership } from '@/lib/types';
import Button from '@/components/Button';
import { createPartnershipAction, updatePartnershipAction, deletePartnershipAction } from '@/lib/actions';

const emptyForm = { name: '', percent: '', extraFieldLabel: '' };

export default function ParceriasClient({ initial }: { initial: Partnership[] }) {
  const [items, setItems] = useState(initial);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState<Partnership | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function openEdit(p: Partnership) {
    setEditing(p);
    setForm({ name: p.name, percent: String(p.percent), extraFieldLabel: p.extraFieldLabel ?? '' });
    setError(null);
  }

  function handleCreate() {
    setError(null);
    startTransition(async () => {
      try {
        const created = await createPartnershipAction({
          name: form.name,
          percent: Number(form.percent),
          extraFieldLabel: form.extraFieldLabel || null,
        });
        setItems((prev) => [...prev, created]);
        setForm(emptyForm);
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  function handleUpdate() {
    if (!editing) return;
    setError(null);
    startTransition(async () => {
      try {
        const updated = await updatePartnershipAction(editing.id, {
          name: form.name,
          percent: Number(form.percent),
          extraFieldLabel: form.extraFieldLabel || null,
        });
        setItems((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...updated } : p)));
        setEditing(null);
        setForm(emptyForm);
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  function handleToggle(p: Partnership) {
    startTransition(async () => {
      const updated = await updatePartnershipAction(p.id, { isActive: !p.isActive });
      setItems((prev) => prev.map((row) => (row.id === p.id ? { ...row, ...updated } : row)));
    });
  }

  function handleDelete(p: Partnership) {
    if (!confirm(`Apagar "${p.name}"?`)) return;
    startTransition(async () => {
      try {
        await deletePartnershipAction(p.id);
        setItems((prev) => prev.filter((row) => row.id !== p.id));
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  return (
    <div className="space-y-6">
      <p className="text-text-secondary text-sm">
        Catálogo interno: o cliente não vê isto no site. Quando um cliente de parceria aparece, aplica a parceria na marcação (Marcações → Editar) e o valor com desconto entra nas estatísticas. Se preencheres o campo extra, esse dado passa a ser obrigatório.
      </p>
      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="bg-bg-card border border-gold-border rounded-lg p-5 space-y-3 max-w-xl">
        <h2 className="font-display font-bold">{editing ? 'Editar parceria' : 'Nova parceria'}</h2>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Nome (ex.: Clube Desportivo X)"
          className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
        />
        <input
          type="number"
          min="0"
          max="100"
          step="0.01"
          value={form.percent}
          onChange={(e) => setForm({ ...form, percent: e.target.value })}
          placeholder="Desconto %"
          className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
        />
        <input
          value={form.extraFieldLabel}
          onChange={(e) => setForm({ ...form, extraFieldLabel: e.target.value })}
          placeholder="Campo extra (opcional) — ex.: Nº de sócio"
          className="w-full bg-bg-primary border border-gold-border rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
        />
        <div className="flex gap-2">
          {editing ? (
            <>
              <Button onClick={handleUpdate} disabled={isPending || !form.name || form.percent === ''}>Guardar</Button>
              <Button variant="ghost" onClick={() => { setEditing(null); setForm(emptyForm); }}>Cancelar</Button>
            </>
          ) : (
            <Button onClick={handleCreate} disabled={isPending || !form.name || form.percent === ''}>Criar</Button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {items.length === 0 && <p className="text-text-secondary text-sm">Ainda não há parcerias.</p>}
        {items.map((p) => (
          <div key={p.id} className="flex items-center gap-3 bg-bg-card border border-gold-border/30 rounded-lg px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className={`font-medium ${p.isActive === false ? 'text-text-muted line-through' : ''}`}>{p.name}</p>
              <p className="text-xs text-text-secondary">
                {Number(p.percent)}% desconto
                {p.extraFieldLabel ? ` · pede “${p.extraFieldLabel}”` : ''}
                {p._count ? ` · ${p._count.appointments} marcação(ões)` : ''}
              </p>
            </div>
            <Button size="sm" variant="ghost" onClick={() => openEdit(p)}>Editar</Button>
            <Button size="sm" variant="ghost" onClick={() => handleToggle(p)}>
              {p.isActive === false ? 'Activar' : 'Desactivar'}
            </Button>
            <Button size="sm" variant="danger" onClick={() => handleDelete(p)} disabled={isPending}>Apagar</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
