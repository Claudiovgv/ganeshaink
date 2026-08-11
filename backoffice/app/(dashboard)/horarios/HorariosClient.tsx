'use client';
import { useState, useTransition } from 'react';
import type { EmployeeSchedules, WeeklyScheduleDay } from '@/lib/types';
import Button from '@/components/Button';
import { updateEmployeeScheduleAction } from '@/lib/actions';
import { toFullWeek } from '../horario/HorarioClient';

const DAY_NAMES = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

function resumo(week: WeeklyScheduleDay[]) {
  const abertos = week.filter((d) => d.isActive);
  if (abertos.length === 0) return 'Sem dias de trabalho definidos';
  return `${abertos.length} dia${abertos.length > 1 ? 's' : ''} por semana`;
}

function EmployeeCard({ employee }: { employee: EmployeeSchedules }) {
  const [week, setWeek] = useState<WeeklyScheduleDay[]>(toFullWeek(employee.workSchedules));
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const [error, setError] = useState('');

  function updateDay(dayOfWeek: number, patch: Partial<WeeklyScheduleDay>) {
    setWeek((prev) => prev.map((d) => (d.dayOfWeek === dayOfWeek ? { ...d, ...patch } : d)));
    setStatus('idle');
  }

  function handleSave() {
    startTransition(async () => {
      try {
        await updateEmployeeScheduleAction(employee.id, week);
        setStatus('saved');
        setTimeout(() => setStatus('idle'), 2500);
      } catch (err) {
        setError((err as Error).message);
        setStatus('error');
      }
    });
  }

  return (
    <div className="bg-bg-card border border-gold-border/30 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-bg-section/50 transition-colors"
      >
        <span className="text-text-primary font-medium">{employee.name}</span>
        <span className="flex items-center gap-3">
          <span className="text-text-muted text-xs">{resumo(week)}</span>
          <span className="text-gold text-xs">{open ? 'Fechar' : 'Alterar'}</span>
        </span>
      </button>

      {open && (
        <div className="border-t border-gold-border/20 p-4 space-y-3">
          {week.map((day) => (
            <div key={day.dayOfWeek} className="flex items-center gap-4">
              <label className="flex items-center gap-2 w-28 cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  checked={day.isActive}
                  onChange={(e) => updateDay(day.dayOfWeek, { isActive: e.target.checked })}
                  className="accent-gold"
                />
                <span className={`text-sm ${day.isActive ? 'text-text-primary' : 'text-text-muted'}`}>
                  {DAY_NAMES[day.dayOfWeek]}
                </span>
              </label>
              <input
                type="time"
                value={day.startTime}
                disabled={!day.isActive}
                onChange={(e) => updateDay(day.dayOfWeek, { startTime: e.target.value })}
                className="bg-bg-section border border-gold-border/30 rounded px-2 py-1 text-sm text-text-primary disabled:opacity-40"
              />
              <span className="text-text-muted text-xs">—</span>
              <input
                type="time"
                value={day.endTime}
                disabled={!day.isActive}
                onChange={(e) => updateDay(day.dayOfWeek, { endTime: e.target.value })}
                className="bg-bg-section border border-gold-border/30 rounded px-2 py-1 text-sm text-text-primary disabled:opacity-40"
              />
            </div>
          ))}

          <p className="text-text-muted text-xs">
            Os dias desligados ficam fechados a marcações no site.
          </p>

          <div className="flex items-center gap-3 pt-1">
            <Button onClick={handleSave} loading={isPending}>
              {status === 'saved' ? 'Guardado!' : 'Guardar'}
            </Button>
            {status === 'error' && <span className="text-red-400 text-xs">{error}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

export default function HorariosClient({ employees }: { employees: EmployeeSchedules[] }) {
  if (employees.length === 0) {
    return <p className="text-text-muted text-sm">Não há funcionários activos.</p>;
  }

  return (
    <div className="space-y-3 max-w-2xl">
      <p className="text-text-secondary text-sm mb-4">
        Horário semanal de cada funcionário. Cada pessoa também pode alterar o seu em
        «Horário» — aqui podes fazê-lo por ela.
      </p>
      {employees.map((e) => (
        <EmployeeCard key={e.id} employee={e} />
      ))}
    </div>
  );
}
