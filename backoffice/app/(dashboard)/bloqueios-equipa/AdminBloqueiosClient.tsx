'use client';
import { useState, useTransition } from 'react';
import type { Employee, TimeBlock, TimeBlockConflict, TimeBlockInput, TimeBlockType } from '@/lib/types';
import Button from '@/components/Button';
import { previewAdminBlockAction, createAdminBlockAction, deleteAdminBlockAction } from '@/lib/actions';
import { formatLisbon } from '@/lib/timezone';

const emptyForm = {
  employeeId: 'all' as number | 'all',
  type: 'vacation' as TimeBlockType,
  reason: '',
  startDate: '',
  startTime: '09:00',
  endDate: '',
  endTime: '18:00',
};

const TYPE_LABEL: Record<TimeBlockType, string> = { vacation: 'Férias', break: 'Pausa', custom: 'Indisponível' };

export default function AdminBloqueiosClient({ initial, employees }: { initial: TimeBlock[]; employees: Employee[] }) {
  const [blocks, setBlocks] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [conflicts, setConflicts] = useState<TimeBlockConflict[] | null>(null);
  const [cancelIds, setCancelIds] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function toInput(): TimeBlockInput {
    return {
      employeeId: form.employeeId,
      type: form.type,
      reason: form.reason || undefined,
      startDate: form.startDate,
      endDate: form.endDate,
      ...(form.type !== 'vacation' ? { startTime: form.startTime, endTime: form.endTime } : {}),
    };
  }

  function handleCheck() {
    setError(null);
    startTransition(async () => {
      try {
        const res = await previewAdminBlockAction(toInput());
        if (res.conflicts.length > 0) {
          setConflicts(res.conflicts);
          setCancelIds(new Set(res.conflicts.map((c) => c.id)));
        } else {
          await doCreate([]);
        }
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  async function doCreate(ids: number[]) {
    const created = await createAdminBlockAction({ ...toInput(), cancelAppointmentIds: ids }) as TimeBlock[];
    setBlocks((prev) => [...prev, ...created]);
    setShowForm(false);
    setConflicts(null);
    setForm(emptyForm);
  }

  function handleConfirm() {
    setError(null);
    startTransition(async () => {
      try {
        await doCreate(Array.from(cancelIds));
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  function toggleCancel(id: number) {
    setCancelIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      await deleteAdminBlockAction(id);
      setBlocks((prev) => prev.filter((b) => b.id !== id));
    });
  }

  return (
    <>
      <p className="text-text-secondary text-sm mb-4">
        Bloqueia o calendário de um funcionário específico, ou de toda a equipa de uma vez (ex.: loja fechada num feriado).
      </p>
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
                <p className="text-sm font-medium text-text-primary">
                  {b.employee?.name ?? 'Funcionário'} — {b.reason || TYPE_LABEL[b.type]}
                </p>
                <p className="text-xs text-text-secondary">
                  {formatLisbon(b.startDatetime, 'dd/MM/yy HH:mm')}
                  {' — '}
                  {formatLisbon(b.endDatetime, 'dd/MM/yy HH:mm')}
                </p>
              </div>
              <Button size="sm" variant="danger" onClick={() => handleDelete(b.id)} disabled={isPending}>Eliminar</Button>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-bg-card border border-gold-border rounded-lg p-6 w-full max-w-sm space-y-4 max-h-[85vh] overflow-y-auto">
            {!conflicts ? (
              <>
                <h2 className="font-display text-lg font-bold">Novo Bloqueio</h2>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-text-secondary mb-1 block">Funcionário</label>
                    <select
                      value={form.employeeId}
                      onChange={(e) => setForm({ ...form, employeeId: e.target.value === 'all' ? 'all' : Number(e.target.value) })}
                      className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm"
                    >
                      <option value="all">Todos (loja fechada)</option>
                      {employees.map((e) => (
                        <option key={e.id} value={e.id}>{e.name}</option>
                      ))}
                    </select>
                  </div>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as TimeBlockType })}
                    className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm"
                  >
                    <option value="vacation">Férias</option>
                    <option value="custom">Indisponível (dia/hora específicos)</option>
                  </select>
                  <input
                    placeholder="Razão (opcional)"
                    value={form.reason}
                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted"
                  />
                  <div>
                    <label className="text-xs text-text-secondary mb-1 block">Início</label>
                    <div className="flex gap-2">
                      <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="flex-1 bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm" />
                      {form.type !== 'vacation' && (
                        <input type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} className="w-28 bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm" />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-text-secondary mb-1 block">Fim</label>
                    <div className="flex gap-2">
                      <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="flex-1 bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm" />
                      {form.type !== 'vacation' && (
                        <input type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} className="w-28 bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1" onClick={handleCheck} disabled={!form.startDate || !form.endDate || isPending} loading={isPending}>Continuar</Button>
                  <Button variant="outline" onClick={() => { setShowForm(false); setForm(emptyForm); }}>Cancelar</Button>
                </div>
              </>
            ) : (
              <>
                <h2 className="font-display text-lg font-bold">Marcações neste período</h2>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <p className="text-text-secondary text-sm">
                  Há {conflicts.length} marcação{conflicts.length > 1 ? 'ões' : ''} neste intervalo. Escolhe quais cancelar (o cliente recebe um email a avisar) — as que deixares por marcar ficam como estão.
                </p>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {conflicts.map((c) => (
                    <label key={c.id} className="flex items-start gap-3 bg-bg-section border border-gold-border/30 rounded-lg px-3 py-2.5 cursor-pointer">
                      <input type="checkbox" checked={cancelIds.has(c.id)} onChange={() => toggleCancel(c.id)} className="mt-1" />
                      <div className="flex-1 text-sm">
                        <p className="text-text-primary font-medium">{c.clientName} — {c.service.name}</p>
                        <p className="text-text-secondary text-xs">{c.employee.name} · {formatLisbon(c.startDatetime, 'dd/MM/yy HH:mm')}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1" onClick={handleConfirm} disabled={isPending} loading={isPending}>
                    Confirmar bloqueio {cancelIds.size > 0 ? `(cancelar ${cancelIds.size})` : ''}
                  </Button>
                  <Button variant="outline" onClick={() => setConflicts(null)}>Voltar</Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
