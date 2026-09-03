import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { api, Employee } from '@/lib/api';
import { MOCK_EMPLOYEES } from '@/lib/mock-employees';
import { resolvePhotoUrl } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Artistas',
  description: 'Conheça os artistas e especialistas do Ganesha Ink.',
};

function ArtistCard({ employee }: { employee: Employee }) {
  const categories = Array.from(new Map(employee.services.map((s) => [s.category.id, s.category])).values());
  return (
    <Link
      href={`/artistas/${employee.id}`}
      className="group bg-bg-card border border-gold-border rounded-lg overflow-hidden hover:border-gold transition-colors"
    >
      <div className="aspect-square bg-bg-section relative">
        {resolvePhotoUrl(employee.photoUrl) ? (
          <Image src={resolvePhotoUrl(employee.photoUrl)!} alt={employee.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-7xl font-display text-gold opacity-30">{employee.name[0]}</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h2 className="font-display text-xl font-semibold group-hover:text-gold transition-colors mb-1">
          {employee.name}
        </h2>
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="text-xs border border-gold-border text-text-secondary px-2 py-0.5 rounded"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}
        {employee.bio && (
          <p className="text-text-secondary text-sm mt-3 leading-relaxed line-clamp-2">
            {employee.bio}
          </p>
        )}
      </div>
    </Link>
  );
}

export const dynamic = 'force-dynamic';

export default async function ArtistasPage() {
  const fetched = await api.employees.list().catch(() => [] as Employee[]);
  const employees = fetched.length > 0 ? fetched : MOCK_EMPLOYEES;

  return (
    <div className="pt-20">
      <section className="bg-bg-section py-16 px-4 text-center">
        <h1 className="font-display text-5xl font-bold mb-4">
          Os Nossos <span className="text-gold-gradient">Artistas</span>
        </h1>
        <p className="text-text-secondary max-w-md mx-auto">
          Profissionais apaixonados com anos de experiência na sua arte.
        </p>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {employees.length === 0 ? (
          <p className="text-center text-text-secondary">Nenhum artista encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {employees.map((emp) => (
              <ArtistCard key={emp.id} employee={emp} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
