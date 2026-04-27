import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import HorarioClient from './HorarioClient';

export const metadata = { title: 'Horário' };

export default async function HorarioPage() {
  const schedule = await api.schedule.get().catch(() => []);
  return (
    <div>
      <TopBar title="Horário Semanal" />
      <div className="p-6 max-w-lg">
        <HorarioClient initial={schedule} />
      </div>
    </div>
  );
}
