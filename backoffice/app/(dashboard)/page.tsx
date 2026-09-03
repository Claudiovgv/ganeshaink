import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import DashboardClient from './DashboardClient';
import type { Appointment, Employee } from '@/lib/types';

export default async function DashboardPage() {
  let appointments: Appointment[] = [];
  let employees: Employee[] = [];
  try {
    [appointments, employees] = await Promise.all([api.appointments.list(), api.employees.list()]);
  } catch {
    // fallback to empty
  }

  const activeEmployees = employees.filter((e) => e.isActive);
  const visibleAppointments = appointments.filter((a) => a.status !== 'cancelled');

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar title="Dashboard" />
      <div className="flex-1 overflow-hidden">
        <DashboardClient appointments={visibleAppointments} employees={activeEmployees} />
      </div>
    </div>
  );
}
