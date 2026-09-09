import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import HorarioClient from './HorarioClient';

export const metadata = { title: 'Horário' };

export default async function HorarioPage() {
  const data = await api.schedule.get().catch(() => ({
    schedules: [],
    lunchStart: '',
    lunchEnd: '',
    nextDayCutoffEnabled: false,
    nextDayCutoffTime: '23:00',
  }));
  return (
    <div>
      <TopBar title="Horário Semanal" />
      <div className="p-6 max-w-lg">
        <HorarioClient initial={data} />
      </div>
    </div>
  );
}
