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

function startOfToday(): Date {
  const d = toLisbon(new Date());
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function CalendarWeek({ appointments, employeeColorMap }: Props) {
  // O dia de hoje é sempre a primeira coluna visível — não a segunda-feira
  // da semana. É mais fácil ver de imediato "o que tenho hoje e a seguir"
  // sem ter de procurar a coluna certa.
  const [viewStart, setViewStart] = useState(startOfToday);
  const [daysToShow, setDaysToShow] = useState(4); // mobile-first
  const [slotHeight, setSlotHeight] = useState(2.5); // px por minuto — mobile-first
  const [selected, setSelected] = useState<Appointment | null>(null);

  // Detecta tamanho do ecrã após mount (evita problemas de hydration)
  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setDaysToShow(mobile ? 3 : 6);
      setSlotHeight(mobile ? 3.2 : 4);
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
    return Math.max(apt.service.durationMin * slotHeight, 34);
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
          onClick={() => setViewStart(startOfToday())}
          className="text-xs text-gold border border-gold px-3 py-1 rounded hover:bg-gold-muted transition-colors"
        >
          Hoje
        </button>
      </div>

      {/* ── Grelha ── */}
      <div className="flex flex-1 overflow-auto">
        {/* Coluna de horas */}
        <div className="w-14 flex-shrink-0 border-r border-gold-border/20">
          <div className="h-14 border-b border-gold-border/20" />
          {hours.map((h) => (
            <div key={h} style={{ height: 60 * slotHeight }} className="border-b border-gold-border/10 px-1.5 pt-1">
              <span className="text-xs font-medium text-text-secondary">{String(h).padStart(2, '0')}:00</span>
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
            <div
              key={isoDate}
              className={`flex-1 min-w-0 border-r last:border-r-0 ${isToday ? 'border-gold-border/40 bg-gold-muted/40' : 'border-gold-border/10'}`}
            >
              {/* Cabeçalho do dia */}
              <div className={`h-14 border-b flex flex-col items-center justify-center gap-0.5 ${isToday ? 'border-gold bg-gold-muted' : 'border-gold-border/20'}`}>
                {isToday ? (
                  <span className="text-[10px] font-bold text-bg-primary bg-gold px-1.5 py-0.5 rounded-full uppercase tracking-wide leading-none">
                    Hoje
                  </span>
                ) : (
                  <span className="text-[11px] text-text-secondary uppercase tracking-wide font-medium">{DAY_LABELS[dow]}</span>
                )}
                <span className={`text-base font-bold leading-none ${isToday ? 'text-gold' : 'text-text-primary'}`}>
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
                      className="absolute left-0 right-0 border-t-2 border-red-500 z-10 pointer-events-none"
                      style={{ top: nowMin * slotHeight }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 -mt-[5px] -ml-1" />
                    </div>
                  );
                })()}

                {dayApts.map((apt) => {
                  const color = employeeColorMap[apt.employee.id] ?? '#C9A84C';
                  return (
                    <button
                      key={apt.id}
                      onClick={() => setSelected(apt)}
                      className="absolute left-0.5 right-0.5 rounded-md text-left overflow-hidden hover:brightness-110 hover:z-20 transition-all shadow-sm"
                      style={{
                        top: aptTop(apt),
                        height: aptHeight(apt),
                        backgroundColor: `${color}3D`,
                        borderLeft: `4px solid ${color}`,
                      }}
                    >
                      <div className="px-1.5 py-1">
                        <p className="text-[11px] font-bold leading-tight truncate" style={{ color }}>
                          {formatLisbon(apt.startDatetime, 'HH:mm')}
                        </p>
                        <p className="text-[11px] font-semibold leading-tight truncate text-text-primary">{apt.clientName}</p>
                        {apt.service.durationMin >= 30 && (
                          <p className="text-[10px] leading-tight truncate text-text-secondary">{apt.service.name}</p>
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
