'use client';
import { useState } from 'react';
import type { Appointment } from '@/lib/types';
import AppointmentModal from './AppointmentModal';

const SLOT_HEIGHT = 4; // px per minute
const START_HOUR = 8;
const END_HOUR = 21;
const TOTAL_MINUTES = (END_HOUR - START_HOUR) * 60;
const DAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const WEEK_DAYS = [1, 2, 3, 4, 5, 6]; // Mon–Sat

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

interface Props {
  appointments: Appointment[];
  employeeColorMap: Record<number, string>;
}

export default function CalendarWeek({ appointments, employeeColorMap }: Props) {
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));
  const [selected, setSelected] = useState<Appointment | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const hours = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);

  function aptTop(apt: Appointment): number {
    const d = new Date(apt.startDatetime);
    return (d.getHours() * 60 + d.getMinutes() - START_HOUR * 60) * SLOT_HEIGHT;
  }

  function aptHeight(apt: Appointment): number {
    return apt.service.durationMin * SLOT_HEIGHT;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 px-6 py-3 border-b border-gold-border/20">
        <button onClick={() => setWeekStart(addDays(weekStart, -7))} className="text-text-secondary hover:text-gold transition-colors px-2">←</button>
        <span className="font-medium text-text-primary text-sm">
          {weekStart.toLocaleDateString('pt-PT', { day: '2-digit', month: 'long' })} —{' '}
          {addDays(weekStart, 5).toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' })}
        </span>
        <button onClick={() => setWeekStart(addDays(weekStart, 7))} className="text-text-secondary hover:text-gold transition-colors px-2">→</button>
        <button onClick={() => setWeekStart(getWeekStart(new Date()))} className="ml-auto text-xs text-gold border border-gold px-3 py-1 rounded hover:bg-gold-muted transition-colors">
          Hoje
        </button>
      </div>

      <div className="flex flex-1 overflow-auto">
        <div className="w-14 flex-shrink-0 border-r border-gold-border/20">
          <div className="h-10 border-b border-gold-border/20" />
          {hours.map((h) => (
            <div key={h} style={{ height: 60 * SLOT_HEIGHT }} className="border-b border-gold-border/10 px-2 pt-1">
              <span className="text-[10px] text-text-muted">{String(h).padStart(2, '0')}:00</span>
            </div>
          ))}
        </div>

        {WEEK_DAYS.map((dayOfWeek, colIdx) => {
          const dayDate = addDays(weekStart, colIdx);
          const isToday = dayDate.getTime() === today.getTime();
          const isoDate = dayDate.toISOString().slice(0, 10);
          const dayApts = appointments.filter(
            (a) => new Date(a.startDatetime).toISOString().slice(0, 10) === isoDate
          );

          return (
            <div key={dayOfWeek} className="flex-1 min-w-0 border-r border-gold-border/10 last:border-r-0">
              <div className={`h-10 border-b border-gold-border/20 flex items-center justify-center gap-1.5 ${isToday ? 'bg-gold-muted' : ''}`}>
                <span className="text-[10px] text-text-secondary uppercase">{DAY_LABELS[dayOfWeek]}</span>
                <span className={`text-sm font-medium ${isToday ? 'text-gold font-bold' : 'text-text-primary'}`}>
                  {dayDate.getDate()}
                </span>
              </div>

              <div className="relative" style={{ height: TOTAL_MINUTES * SLOT_HEIGHT }}>
                {hours.map((h) => (
                  <div
                    key={h}
                    className="absolute left-0 right-0 border-b border-gold-border/10"
                    style={{ top: (h - START_HOUR) * 60 * SLOT_HEIGHT, height: 60 * SLOT_HEIGHT }}
                  />
                ))}

                {dayApts.map((apt) => {
                  const color = employeeColorMap[apt.employee.id] ?? '#C9A84C';
                  return (
                    <button
                      key={apt.id}
                      onClick={() => setSelected(apt)}
                      className="absolute left-1 right-1 rounded text-left overflow-hidden hover:brightness-110 transition-all"
                      style={{
                        top: aptTop(apt),
                        height: Math.max(aptHeight(apt), 20),
                        backgroundColor: `${color}25`,
                        borderLeft: `3px solid ${color}`,
                      }}
                    >
                      <div className="px-1.5 py-0.5">
                        <p className="text-[10px] font-medium leading-tight truncate" style={{ color }}>
                          {new Date(apt.startDatetime).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
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
