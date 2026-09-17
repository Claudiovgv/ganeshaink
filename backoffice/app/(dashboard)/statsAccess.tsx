import TopBar from '@/components/TopBar';
import type { User } from '@/lib/types';

export function canSeeGeneralStats(user: User | null) {
  return Boolean(user?.canViewGeneralStats);
}

export function canSeeTradeStats(user: User | null, slug: string) {
  return Boolean(user && (user.canViewGeneralStats || user.statsCategories?.includes(slug)));
}

export function StatsForbidden({ title }: { title: string }) {
  return (
    <div>
      <TopBar title={title} />
      <div className="p-6 text-text-secondary">Não tens permissão para aceder a esta área.</div>
    </div>
  );
}
