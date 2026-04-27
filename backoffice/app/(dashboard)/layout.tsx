import { redirect } from 'next/navigation';
import { api } from '@/lib/api';
import { AuthProvider } from '@/components/AuthProvider';
import Sidebar from '@/components/Sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let user;
  try {
    user = await api.auth.me();
  } catch {
    redirect('/login');
  }

  return (
    <AuthProvider user={user}>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0 ml-[180px]">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
