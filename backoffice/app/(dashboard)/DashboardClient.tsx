'use client';
import { useMemo, useState } from 'react';
import type { Appointment, Employee } from '@/lib/types';
import CalendarWeek from '@/components/CalendarWeek';

const COLORS = ['#C9A84C', '#4C9AC9', '#9A4CC9', '#4CC97A', '#C94C4C', '#C97A4C'];

interface Props {
  appointments: Appointment[];
  employees: Employee[];
}

export default function DashboardClient({ appointments, employees }: Props) {
  const [employeeFilter, setEmployeeFilter] = useState<'all' | number>('all');

  const employeeColorMap = useMemo(() => {
    const map: Record<number, string> = {};
    employees.forEach((e, i) => { map[e.id] = COLORS[i % COLORS.length]; });
    return map;
  }, [employees]);

  const filtered = useMemo(
    () => employeeFilter === 'all' ? appointments : appointments.filter((a) => a.employee.id === employeeFilter),
    [appointments, employeeFilter]
  );

  return (
    <div className="flex flex-col h-full">
      {/* Filtro por profissional */}
      <div className="flex items-center gap-2 px-4 md:px-6 py-3 border-b border-gold-border/20 overflow-x-auto">
        <button
          onClick={() => setEmployeeFilter('all')}
          className={`shrink-0 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
            employeeFilter === 'all' ? 'bg-gold text-bg-primary' : 'border border-gold-border text-text-secondary hover:border-gold hover:text-gold'
          }`}
        >
          Todos
        </button>
        {employees.map((e) => (
          <button
            key={e.id}
            onClick={() => setEmployeeFilter(e.id)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
              employeeFilter === e.id ? 'text-bg-primary border-transparent' : 'border-gold-border text-text-secondary hover:text-text-primary'
            }`}
            style={employeeFilter === e.id ? { backgroundColor: employeeColorMap[e.id] } : undefined}
          >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: employeeColorMap[e.id] }} />
            {e.name}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">
        <CalendarWeek appointments={filtered} employeeColorMap={employeeColorMap} />
      </div>
    </div>
  );
}
