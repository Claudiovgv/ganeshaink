import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { api } from '@/lib/api';
import { AuthProvider } from '@/components/AuthProvider';
import Sidebar from '@/components/Sidebar';

const DEV_USER = {
  id: 0, name: 'Admin Dev', email: 'admin@ganeshaink.pt', role: 'admin' as const,
  permissions: { manage_appointments: true, manage_employees: true, manage_services: true, manage_clients: true, manage_blog: true, manage_settings: true, view_stats: true },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('ganesha_token')?.value;

  let user;
  if (token === 'dev-mock-token') {
    user = DEV_USER;
  } else {
    try {
      user = await api.auth.me();
    } catch {
      redirect('/login');
    }
  }

  return (
    <AuthProvider user={user}>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0 mt-14 md:mt-0 md:ml-[180px] pb-16 md:pb-0">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
