import type { Metadata } from 'next';
import CancelAppointment from './CancelAppointment';

export const metadata: Metadata = {
  title: 'Cancelar marcação',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default function CancelarPage({ params }: { params: { token: string } }) {
  return (
    <div className="pt-20 min-h-screen">
      <section className="max-w-md mx-auto px-4 py-16">
        <CancelAppointment token={params.token} />
      </section>
    </div>
  );
}
