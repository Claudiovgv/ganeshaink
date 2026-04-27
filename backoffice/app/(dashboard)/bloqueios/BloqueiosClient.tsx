'use client';
import { useState, useTransition } from 'react';
import type { TimeBlock } from '@/lib/types';
import Button from '@/components/Button';
import { createTimeBlockAction, deleteTimeBlockAction } from '@/lib/actions';

const emptyForm = { type: 'holiday' as 'holiday' | 'unavailable', reason: '', startDatetime: '', endDatetime: '' };

export default function BloqueiosClient({ initial }: { initial: TimeBlock[] }) {
  const [blocks, setBlocks] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [isPending, startTransition] = useTransition();

  function handleCreate() {
    startTransition(async () => {
      const created = await createTimeBlockAction(form) as TimeBlock;
      setBlocks((prev) => [...prev, created]);
      setShowForm(false);
      setForm(emptyForm);
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      await deleteTimeBlockAction(id);
      setBlocks((prev) => prev.filter((b) => b.id !== id));
    });
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setShowForm(true)}>Novo Bloqueio</Button>
      </div>

      {blocks.length === 0 ? (
        <p className="text-text-secondary text-sm text-center py-8">Sem bloqueios registados.</p>
      ) : (
        <div className="space-y-3">
          {blocks.map((b) => (
            <div key={b.id} className="flex items-center justify-between bg-bg-card border border-gold-border/30 rounded-lg px-4 py-3">
              <div>
                <p className="text-sm font-medium text-text-primary">{b.reason ?? (b.type === 'holiday' ? 'Férias' : 'Indisponível')}</p>
                <p className="text-xs text-text-secondary">
                  {new Date(b.startDatetime).toLocaleString('pt-PT', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  {' — '}
                  {new Date(b.endDatetime).toLocaleString('pt-PT', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <Button size="sm" variant="danger" onClick={() => handleDelete(b.id)} disabled={isPending}>Eliminar</Button>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-bg-card border border-gold-border rounded-lg p-6 w-full max-w-sm mx-4 space-y-4">
            <h2 className="font-display text-lg font-bold">Novo Bloqueio</h2>
            <div className="space-y-3">
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as 'holiday' | 'unavailable' })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm">
                <option value="holiday">Férias</option>
                <option value="unavailable">Indisponível</option>
              </select>
              <input placeholder="Razão (opcional)" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted" />
              <div>
                <label className="text-xs text-text-secondary mb-1 block">Início</label>
                <input type="datetime-local" value={form.startDatetime} onChange={(e) => setForm({ ...form, startDatetime: e.target.value })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm" />
              </div>
              <div>
                <label className="text-xs text-text-secondary mb-1 block">Fim</label>
                <input type="datetime-local" value={form.endDatetime} onChange={(e) => setForm({ ...form, endDatetime: e.target.value })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm" />
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={handleCreate} disabled={!form.startDatetime || !form.endDatetime || isPending} loading={isPending}>Criar</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
