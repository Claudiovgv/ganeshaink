'use client';
import { useState, useTransition } from 'react';
import Button from './Button';

interface ReorderItem { id: number; label: string; sub?: string; }

interface Props {
  items: ReorderItem[];
  onSave: (orderedIds: number[]) => Promise<unknown>;
  emptyMessage?: string;
}

// Lista simples de "para cima / para baixo" para ordenar itens — funciona bem
// em ecrãs pequenos e não precisa de arrastar, ao contrário de drag-and-drop.
export default function ReorderList({ items, onSave, emptyMessage = 'Sem itens.' }: Props) {
  const [order, setOrder] = useState(items);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const [error, setError] = useState('');

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= order.length) return;
    const next = [...order];
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
    setStatus('idle');
  }

  function handleSave() {
    startTransition(async () => {
      try {
        const result = await onSave(order.map((i) => i.id));
        if (result && typeof result === 'object' && 'ok' in result && (result as { ok: boolean }).ok === false) {
          throw new Error((result as { error?: string }).error || 'Não foi possível guardar a ordem.');
        }
        setStatus('saved');
        setTimeout(() => setStatus('idle'), 2500);
      } catch (err) {
        setError((err as Error).message);
        setStatus('error');
      }
    });
  }

  if (items.length === 0) {
    return <p className="text-text-muted text-sm">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-2">
      {order.map((item, i) => (
        <div
          key={item.id}
          className="flex items-center gap-3 bg-bg-section border border-gold-border/20 rounded-lg px-3 py-2"
        >
          <span className="text-text-muted text-xs w-5 flex-shrink-0">{i + 1}º</span>
          <div className="flex-1 min-w-0">
            <p className="text-text-primary text-sm truncate">{item.label}</p>
            {item.sub && <p className="text-text-muted text-xs truncate">{item.sub}</p>}
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <button
              type="button"
              onClick={() => move(i, -1)}
              disabled={i === 0}
              aria-label="Mover para cima"
              className="w-8 h-8 flex items-center justify-center rounded border border-gold-border/30 text-gold disabled:opacity-25 disabled:cursor-not-allowed hover:bg-gold-muted transition-colors"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => move(i, 1)}
              disabled={i === order.length - 1}
              aria-label="Mover para baixo"
              className="w-8 h-8 flex items-center justify-center rounded border border-gold-border/30 text-gold disabled:opacity-25 disabled:cursor-not-allowed hover:bg-gold-muted transition-colors"
            >
              ↓
            </button>
          </div>
        </div>
      ))}

      <div className="flex items-center gap-3 pt-1">
        <Button onClick={handleSave} loading={isPending}>
          {status === 'saved' ? 'Ordem guardada!' : 'Guardar Ordem'}
        </Button>
        {status === 'error' && <span className="text-red-400 text-xs">{error}</span>}
      </div>
    </div>
  );
}
