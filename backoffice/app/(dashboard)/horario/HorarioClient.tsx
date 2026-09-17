'use client';
import { useState, useTransition } from 'react';
import type { EmployeeSchedulePayload, SchedulePrefs, WeeklyScheduleDay } from '@/lib/types';
import Button from '@/components/Button';
import { updateScheduleAction } from '@/lib/actions';
import SchedulePrefsFields, { EMPTY_PREFS } from '@/components/SchedulePrefsFields';

const DAY_NAMES = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

// Segunda a domingo. O domingo (0) vai para o fim, que é como se lê um calendário.
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];

const DEFAULT_SCHEDULE: WeeklyScheduleDay[] = WEEK_ORDER.map((d) => ({
  dayOfWeek: d, isActive: d >= 1 && d <= 5, startTime: '10:00', endTime: '19:00',
}));

export function prefsFrom(data: Partial<SchedulePrefs> | null | undefined): SchedulePrefs {
  return {
    lunchStart: data?.lunchStart || '',
    lunchEnd: data?.lunchEnd || '',
    nextDayCutoffEnabled: Boolean(data?.nextDayCutoffEnabled),
    nextDayCutoffTime: data?.nextDayCutoffTime || '23:00',
  };
}

// O backend só guarda os dias activos, por isso os dias em falta são dias fechados:
// preenche a semana toda para que todos apareçam no editor.
export function toFullWeek(saved: { dayOfWeek: number; startTime: string; endTime: string }[]): WeeklyScheduleDay[] {
  return WEEK_ORDER.map((d) => {
    const match = saved.find((s) => s.dayOfWeek === d);
    return match
      ? { dayOfWeek: d, isActive: true, startTime: match.startTime, endTime: match.endTime }
      : { dayOfWeek: d, isActive: false, startTime: '10:00', endTime: '19:00' };
  });
}

export default function HorarioClient({ initial }: { initial: EmployeeSchedulePayload | WeeklyScheduleDay[] }) {
  const days = Array.isArray(initial) ? initial : (initial.schedules || []);
  const [schedule, setSchedule] = useState<WeeklyScheduleDay[]>(
    days.length > 0 ? toFullWeek(days) : DEFAULT_SCHEDULE,
  );
  const [prefs, setPrefs] = useState<SchedulePrefs>(
    Array.isArray(initial) ? EMPTY_PREFS : prefsFrom(initial),
  );
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function updateDay(dayOfWeek: number, patch: Partial<WeeklyScheduleDay>) {
    setSchedule((prev) => prev.map((d) => d.dayOfWeek === dayOfWeek ? { ...d, ...patch } : d));
  }

  function handleSave() {
    startTransition(async () => {
      await updateScheduleAction(schedule, prefs);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div className="space-y-3">
      {schedule.map((day) => (
        <div key={day.dayOfWeek} className="flex items-center gap-4 bg-bg-card border border-gold-border/30 rounded-lg px-4 py-3">
          <label className="flex items-center gap-2 w-28 cursor-pointer flex-shrink-0">
            <input type="checkbox" checked={day.isActive} onChange={(e) => updateDay(day.dayOfWeek, { isActive: e.target.checked })} className="accent-gold" />
            <span className={`text-sm ${day.isActive ? 'text-text-primary' : 'text-text-muted'}`}>{DAY_NAMES[day.dayOfWeek]}</span>
          </label>
          <input type="time" value={day.startTime} disabled={!day.isActive} onChange={(e) => updateDay(day.dayOfWeek, { startTime: e.target.value })} className="bg-bg-section border border-gold-border/30 rounded px-2 py-1 text-sm text-text-primary disabled:opacity-40" />
          <span className="text-text-muted text-xs">—</span>
          <input type="time" value={day.endTime} disabled={!day.isActive} onChange={(e) => updateDay(day.dayOfWeek, { endTime: e.target.value })} className="bg-bg-section border border-gold-border/30 rounded px-2 py-1 text-sm text-text-primary disabled:opacity-40" />
        </div>
      ))}
      <SchedulePrefsFields prefs={prefs} onChange={(patch) => setPrefs((p) => ({ ...p, ...patch }))} />
      <Button onClick={handleSave} loading={isPending} className="mt-2">
        {saved ? 'Guardado!' : 'Guardar Horário'}
      </Button>
      <p className="text-text-muted text-xs">
        Este horário é semanal: se a sexta abrir às 8h, todas as sextas abrem às 8h. No backoffice podes marcar a qualquer hora da grelha, mesmo fora do horário do site.
      </p>
    </div>
  );
}
