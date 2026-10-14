'use client';

import { useMemo, useState } from 'react';
import { api } from '@/lib/api';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';

interface Props {
  employeeId: number;
  serviceId: number;
  onSelect: (date: string, time: string) => void;
  onBack: () => void;
}

const WEEKDAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function lisbonNowParts() {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Lisbon',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    hourCycle: 'h23',
  });
  const parts = Object.fromEntries(fmt.formatToParts(new Date()).map((p) => [p.type, p.value]));
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`,
  };
}

function addDaysYmd(ymd: string, n: number) {
  const [y, m, d] = ymd.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return dt.toISOString().slice(0, 10);
}

function selectableDates() {
  const values = new Set<string>();
  const { date: today, time } = lisbonNowParts();
  const start = time >= '08:00' ? 0 : 1;
  for (let i = start; i <= 30; i++) values.add(addDaysYmd(today, i));
  return values;
}

function monthLabel(year: number, month: number) {
  return new Date(Date.UTC(year, month, 1)).toLocaleDateString('pt-PT', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function monthCells(year: number, month: number) {
  const firstWeekday = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const mondayFirst = (firstWeekday + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: (string | null)[] = [];
  for (let i = 0; i < mondayFirst; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(`${year}-${pad(month + 1)}-${pad(day)}`);
  }
  return cells;
}

function splitSlots(slots: string[]) {
  const morning = slots.filter((slot) => slot < '12:00');
  const afternoon = slots.filter((slot) => slot >= '12:00');
  return { morning, afternoon };
}

export default function Step4DateTime({ employeeId, serviceId, onSelect, onBack }: Props) {
  const allowed = useMemo(() => selectableDates(), []);
  const firstAllowed = allowed.values().next().value as string;
  const [cursor, setCursor] = useState(() => {
    const [y, m] = firstAllowed.split('-').map(Number);
    return { year: y, month: m - 1 };
  });
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const cells = monthCells(cursor.year, cursor.month);
  const { morning, afternoon } = splitSlots(slots);

  const hasPrevMonth = Array.from(allowed).some((value) => {
    const [y, m] = value.split('-').map(Number);
    return y < cursor.year || (y === cursor.year && m - 1 < cursor.month);
  });
  const hasNextMonth = Array.from(allowed).some((value) => {
    const [y, m] = value.split('-').map(Number);
    return y > cursor.year || (y === cursor.year && m - 1 > cursor.month);
  });

  async function handleDateChange(d: string) {
    if (!allowed.has(d)) return;
    setDate(d);
    setSelectedTime('');
    setSlots([]);
    setSlotsError('');
    setLoadingSlots(true);
    try {
      const res = await api.availability.slots(employeeId, d, serviceId);
      setSlots(res.slots);
      if (res.notice) {
        setSlotsError(res.notice);
      } else if (res.slots.length === 0) {
        setSlotsError('Sem disponibilidade neste dia. Escolhe outro.');
      }
    } catch {
      setSlotsError('Erro ao carregar disponibilidade.');
    } finally {
      setLoadingSlots(false);
    }
  }

  function TimeGroup({ label, items }: { label: string; items: string[] }) {
    if (items.length === 0) return null;
    return (
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.2em] text-text-secondary mb-2">{label}</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {items.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setSelectedTime(slot)}
              className={`py-2.5 rounded text-sm transition-colors ${
                selectedTime === slot
                  ? 'bg-gold text-bg-primary font-semibold'
                  : 'border border-gold-border text-text-secondary hover:border-gold hover:text-gold'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold mb-2">Data & Hora</h2>
        <p className="text-text-secondary text-sm">Escolhe o dia no calendário e depois a hora.</p>
      </div>

      <div className={`mx-auto grid gap-8 md:items-start ${date ? 'max-w-3xl md:grid-cols-[minmax(0,20rem)_1fr]' : 'max-w-sm'}`}>
        <div className="bg-bg-card border border-gold-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() =>
                setCursor((c) =>
                  c.month === 0 ? { year: c.year - 1, month: 11 } : { year: c.year, month: c.month - 1 },
                )
              }
              disabled={!hasPrevMonth}
              className="px-2 py-1 text-gold disabled:opacity-30"
              aria-label="Mês anterior"
            >
              ←
            </button>
            <p className="font-display text-sm capitalize">{monthLabel(cursor.year, cursor.month)}</p>
            <button
              type="button"
              onClick={() =>
                setCursor((c) =>
                  c.month === 11 ? { year: c.year + 1, month: 0 } : { year: c.year, month: c.month + 1 },
                )
              }
              disabled={!hasNextMonth}
              className="px-2 py-1 text-gold disabled:opacity-30"
              aria-label="Mês seguinte"
            >
              →
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[0.65rem] uppercase tracking-wider text-text-secondary mb-2">
            {WEEKDAYS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((value, i) => {
              if (!value) return <span key={`empty-${i}`} />;
              const day = Number(value.slice(-2));
              const open = allowed.has(value);
              const selected = date === value;
              return (
                <button
                  key={value}
                  type="button"
                  disabled={!open}
                  onClick={() => handleDateChange(value)}
                  className={`aspect-square rounded text-sm transition-colors ${
                    selected
                      ? 'bg-gold text-bg-primary font-semibold'
                      : open
                        ? 'text-text-primary hover:bg-gold/15'
                        : 'text-text-secondary/35 cursor-not-allowed'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-h-[12rem]">
          {!date && (
            <p className="text-text-secondary text-sm md:pt-8">Selecciona um dia no calendário.</p>
          )}
          {loadingSlots && <LoadingSpinner size={24} />}
          {slotsError && <p className="text-text-secondary text-sm mb-4">{slotsError}</p>}
          {slots.length > 0 && (
            <div>
              <TimeGroup label="Manhã" items={morning} />
              <TimeGroup label="Tarde" items={afternoon} />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-10">
        <Button variant="ghost" onClick={onBack}>
          ← Voltar
        </Button>
        {selectedTime && date && (
          <Button onClick={() => onSelect(date, selectedTime)}>Continuar →</Button>
        )}
      </div>
    </div>
  );
}
