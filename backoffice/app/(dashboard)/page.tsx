import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import CalendarWeek from '@/components/CalendarWeek';
import type { Appointment } from '@/lib/types';

const COLORS = ['#C9A84C', '#4C9AC9', '#9A4CC9', '#4CC97A', '#C94C4C', '#C97A4C'];

export default async function DashboardPage() {
  let appointments: Appointment[] = [];
  try {
    appointments = await api.appointments.list();
  } catch {
    // fallback to empty
  }

  const employeeIds = Array.from(new Set(appointments.map((a) => a.employee.id)));
  const employeeColorMap: Record<number, string> = {};
  employeeIds.forEach((id, i) => { employeeColorMap[id] = COLORS[i % COLORS.length]; });

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar title="Dashboard" />
      <div className="flex-1 overflow-hidden">
        <CalendarWeek appointments={appointments} employeeColorMap={employeeColorMap} />
      </div>
    </div>
  );
}
