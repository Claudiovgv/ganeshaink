'use client';
import { useState, useTransition } from 'react';
import type { Employee } from '@/lib/types';
import Button from '@/components/Button';
import { updateEmployeeAction } from '@/lib/actions';

interface Row {
  employeeId: number;
  name: string;
  materialCost: string;
  studioPercent: string;
}

export default function ContasBarbeariaClient({ initial }: { initial: Employee[] }) {
  const [rows, setRows] = useState<Row[]>(
    initial.map((e) => ({
      employeeId: e.id,
      name: e.name,
      materialCost: e.materialCost != null ? String(e.materialCost) : '',
      studioPercent: e.studioPercent != null ? String(e.studioPercent) : '',
    }))
  );
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateRow(employeeId: number, field: 'materialCost' | 'studioPercent', value: string) {
    setRows((prev) => prev.map((r) => (r.employeeId === employeeId ? { ...r, [field]: value } : r)));
  }

  function handleSave() {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      try {
        await Promise.all(
          rows.map((r) =>
            updateEmployeeAction(r.employeeId, { materialCost: r.materialCost, studioPercent: r.studioPercent })
          )
        );
        setMessage('Valores guardados.');
      } catch (err) {
        setError((err as Error).message || 'Erro ao guardar. Tenta novamente.');
      }
    });
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {message && <p className="text-green-400 text-sm">{message}</p>}

      <div className="bg-bg-card border border-gold-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold-border/30 bg-bg-section">
              <th className="text-left px-4 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Barbeiro</th>
              <th className="text-left px-4 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Valor material (€)</th>
              <th className="text-left px-4 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">% Estúdio</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.employeeId} className="border-b border-gold-border/10 last:border-0">
                <td className="px-4 py-2.5 text-text-primary">{r.name}</td>
                <td className="px-4 py-2.5">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={r.materialCost}
                    onChange={(e) => updateRow(r.employeeId, 'materialCost', e.target.value)}
                    placeholder="1.00"
                    className="w-28 bg-bg-primary border border-gold-border rounded px-2 py-1.5 text-sm focus:border-gold focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2.5">
                  <input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    value={r.studioPercent}
                    onChange={(e) => updateRow(r.employeeId, 'studioPercent', e.target.value)}
                    placeholder="30"
                    className="w-24 bg-bg-primary border border-gold-border rounded px-2 py-1.5 text-sm focus:border-gold focus:outline-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-text-muted text-xs">
        % Estúdio = a parte da receita líquida (já sem material) que fica retida para o estúdio. O barbeiro recebe o resto.
      </p>

      <Button onClick={handleSave} disabled={isPending} loading={isPending}>Guardar</Button>
    </div>
  );
}
