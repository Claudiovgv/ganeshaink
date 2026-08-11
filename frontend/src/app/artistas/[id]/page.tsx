import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { formatPrice, formatDuration } from '@/lib/utils';
import { MOCK_EMPLOYEES } from '@/lib/mock-employees';

interface Props {
  params: { id: string };
}

async function getEmployee(id: number) {
  const emp = await api.employees.get(id).catch(() => null);
  return emp ?? MOCK_EMPLOYEES.find((e) => e.id === id) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const emp = await getEmployee(Number(params.id));
  if (!emp) return { title: 'Artista não encontrado' };
  return {
    title: emp.name,
    description: emp.bio || `Perfil do artista ${emp.name} no Ganesha Ink.`,
  };
}

export default async function ArtistProfilePage({ params }: Props) {
  const employee = await getEmployee(Number(params.id));
  if (!employee) notFound();

  const categories = Array.from(new Map(employee.services.map((s) => [s.category.id, s.category])).values());

  return (
    <div className="pt-20">
      <section className="bg-bg-section py-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-gold bg-bg-card flex-shrink-0">
            {employee.photoUrl ? (
              <Image src={employee.photoUrl} alt={employee.name} width={160} height={160} className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl font-display text-gold">
                {employee.name[0]}
              </div>
            )}
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-display text-4xl font-bold mb-3">{employee.name}</h1>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
              {categories.map((cat) => (
                <span key={cat.id} className="text-xs border border-gold text-gold px-3 py-1 rounded">
                  {cat.name}
                </span>
              ))}
            </div>
            {employee.bio && (
              <p className="text-text-secondary leading-relaxed max-w-xl">{employee.bio}</p>
            )}
            <Link
              href="/marcar"
              className="inline-flex mt-6 px-6 py-3 bg-gold text-bg-primary font-semibold rounded hover:bg-gold-light transition-colors"
            >
              Marcar com {employee.name.split(' ')[0]}
            </Link>
          </div>
        </div>
      </section>

      {employee.services.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="font-display text-2xl font-bold mb-8 text-gold">Serviços</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {employee.services.map((s) => (
              <div key={s.id} className="bg-bg-card border border-gold-border rounded-lg p-5">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-semibold">{s.name}</h3>
                  <span className="text-gold text-sm font-semibold whitespace-nowrap">
                    {formatPrice(s.price)}
                  </span>
                </div>
                <p className="text-text-secondary text-xs">{formatDuration(s.durationMin)}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
