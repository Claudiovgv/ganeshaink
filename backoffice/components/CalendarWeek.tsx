'use client';
import { useState, useEffect } from 'react';
import type { Appointment } from '@/lib/types';
import AppointmentModal from './AppointmentModal';
import { format } from 'date-fns';
import { toLisbon, formatLisbon, lisbonDateKey } from '@/lib/timezone';

const SLOT_HEIGHT = 4; // px per minute
const START_HOUR = 8;
const END_HOUR = 21;
const TOTAL_MINUTES = (END_HOUR - START_HOUR) * 60;
const DAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function fmtDay(d: Date) {
  return formatLisbon(d, 'dd MMM');
}

interface Props {
  appointments: Appointment[];
  employeeColorMap: Record<number, string>;
}

export default function CalendarWeek({ appointments, employeeColorMap }: Props) {
  // Ancorado à data/hora de Lisboa, não à do dispositivo — evita desalinhos perto da meia-noite
  // ou quando o backoffice é usado fora de Portugal.
  const [viewStart, setViewStart] = useState(() => getWeekStart(toLisbon(new Date())));
  const [daysToShow, setDaysToShow] = useState(4); // mobile-first
  const [slotHeight, setSlotHeight] = useState(2.5); // px por minuto — mobile-first
  const [selected, setSelected] = useState<Appointment | null>(null);

  // Detecta tamanho do ecrã após mount (evita problemas de hydration)
  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setDaysToShow(mobile ? 4 : 6);
      setSlotHeight(mobile ? 2.5 : 4);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const today = toLisbon(new Date());
  today.setHours(0, 0, 0, 0);

  const hours = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);
  const totalHeight = TOTAL_MINUTES * slotHeight;
  const step = daysToShow;

  const days = Array.from({ length: daysToShow }, (_, i) => addDays(viewStart, i));
  const rangeLabel = daysToShow === 1
    ? fmtDay(days[0])
    : `${fmtDay(days[0])} — ${fmtDay(days[days.length - 1])}`;

  function aptTop(apt: Appointment): number {
    const d = toLisbon(apt.startDatetime);
    return (d.getHours() * 60 + d.getMinutes() - START_HOUR * 60) * slotHeight;
  }

  function aptHeight(apt: Appointment): number {
    return Math.max(apt.service.durationMin * slotHeight, 24);
  }

  return (
    <div className="flex flex-col h-full">

      {/* ── Navegação ── */}
      <div className="flex items-center gap-3 px-4 md:px-6 py-3 border-b border-gold-border/20">
        <button
          onClick={() => setViewStart(addDays(viewStart, -step))}
          className="w-8 h-8 flex items-center justify-center rounded border border-gold-border text-text-secondary hover:text-gold hover:border-gold transition-colors text-lg"
        >
          ‹
        </button>

        <span className="flex-1 text-center font-medium text-text-primary text-sm">
          {rangeLabel}
        </span>

        <button
          onClick={() => setViewStart(addDays(viewStart, step))}
          className="w-8 h-8 flex items-center justify-center rounded border border-gold-border text-text-secondary hover:text-gold hover:border-gold transition-colors text-lg"
        >
          ›
        </button>

        <button
          onClick={() => {
            const start = getWeekStart(toLisbon(new Date()));
            // No mobile, começa no dia de hoje em vez da segunda
            setViewStart(daysToShow < 6 ? (() => { const d = toLisbon(new Date()); d.setHours(0,0,0,0); return d; })() : start);
          }}
          className="text-xs text-gold border border-gold px-3 py-1 rounded hover:bg-gold-muted transition-colors"
        >
          Hoje
        </button>
      </div>

      {/* ── Grelha ── */}
      <div className="flex flex-1 overflow-auto">
        {/* Coluna de horas */}
        <div className="w-12 flex-shrink-0 border-r border-gold-border/20">
          <div className="h-10 border-b border-gold-border/20" />
          {hours.map((h) => (
            <div key={h} style={{ height: 60 * slotHeight }} className="border-b border-gold-border/10 px-1 pt-1">
              <span className="text-[10px] text-text-muted">{String(h).padStart(2, '0')}:00</span>
            </div>
          ))}
        </div>

        {/* Colunas dos dias */}
        {days.map((dayDate) => {
          const isToday = dayDate.getTime() === today.getTime();
          // dayDate já está "à hora de Lisboa" (herdado do viewStart); os startDatetime das marcações
          // vêm em UTC da API e são convertidos para Lisboa aqui antes de comparar.
          const isoDate = format(dayDate, 'yyyy-MM-dd');
          const dayApts = appointments.filter((a) => lisbonDateKey(a.startDatetime) === isoDate);
          const dow = dayDate.getDay();

          return (
            <div key={isoDate} className="flex-1 min-w-0 border-r border-gold-border/10 last:border-r-0">
              {/* Cabeçalho do dia */}
              <div className={`h-10 border-b border-gold-border/20 flex flex-col items-center justify-center ${isToday ? 'bg-gold-muted' : ''}`}>
                <span className="text-[9px] text-text-muted uppercase tracking-wide">{DAY_LABELS[dow]}</span>
                <span className={`text-sm font-semibold leading-none ${isToday ? 'text-gold' : 'text-text-primary'}`}>
                  {dayDate.getDate()}
                </span>
              </div>

              {/* Slots */}
              <div className="relative" style={{ height: totalHeight }}>
                {hours.map((h) => (
                  <div
                    key={h}
                    className="absolute left-0 right-0 border-b border-gold-border/10"
                    style={{ top: (h - START_HOUR) * 60 * slotHeight, height: 60 * slotHeight }}
                  />
                ))}

                {/* Linha do "agora" se for hoje */}
                {isToday && (() => {
                  const now = toLisbon(new Date());
                  const nowMin = now.getHours() * 60 + now.getMinutes() - START_HOUR * 60;
                  if (nowMin < 0 || nowMin > TOTAL_MINUTES) return null;
                  return (
                    <div
                      className="absolute left-0 right-0 border-t-2 border-gold z-10 pointer-events-none"
                      style={{ top: nowMin * slotHeight }}
                    >
                      <div className="w-2 h-2 rounded-full bg-gold -mt-1 -ml-1" />
                    </div>
                  );
                })()}

                {dayApts.map((apt) => {
                  const color = employeeColorMap[apt.employee.id] ?? '#C9A84C';
                  return (
                    <button
                      key={apt.id}
                      onClick={() => setSelected(apt)}
                      className="absolute left-0.5 right-0.5 rounded text-left overflow-hidden hover:brightness-110 transition-all"
                      style={{
                        top: aptTop(apt),
                        height: aptHeight(apt),
                        backgroundColor: `${color}22`,
                        borderLeft: `3px solid ${color}`,
                      }}
                    >
                      <div className="px-1 py-0.5">
                        <p className="text-[10px] font-semibold leading-tight truncate" style={{ color }}>
                          {formatLisbon(apt.startDatetime, 'HH:mm')}
                        </p>
                        <p className="text-[10px] leading-tight truncate text-text-primary">{apt.clientName}</p>
                        {apt.service.durationMin >= 30 && (
                          <p className="text-[9px] leading-tight truncate text-text-secondary">{apt.service.name}</p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {selected && <AppointmentModal appointment={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
