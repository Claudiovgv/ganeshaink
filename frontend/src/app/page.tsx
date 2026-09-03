import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/lib/api';
import ServicosGrid from './servicos/ServicosGrid';
import { resolvePhotoUrl } from '@/lib/media';

export default async function HomePage() {
  const [employees, services, categories] = await Promise.all([
    api.employees.list().catch(() => []),
    api.services.list().catch(() => []),
    api.categories.list().catch(() => []),
  ]);

  const featuredEmployees = employees.slice(0, 3);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero/studio-hero.webp"
          alt="Ganesha Ink Studio"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-transparent to-bg-primary" />
        {/* Logo grande com opacidade — atrás do texto, ligeiramente subido */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <Image
            src="/images/logo/ganesha-logo-gold-white.webp"
            alt=""
            width={640}
            height={640}
            className="object-contain opacity-[0.13] select-none w-[min(80vw,28rem)] h-auto"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Arte na <span className="text-gold-gradient">Pele</span>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Studio premium de tatuagem, barbearia, body piercing e estética de unhas em Vale de Cambra.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marcar"
              className="px-8 py-4 bg-gold text-bg-primary font-semibold rounded hover:bg-gold-light transition-colors text-base"
            >
              Marcar Agora
            </Link>
            <Link
              href="/servicos"
              className="px-8 py-4 border border-gold text-gold rounded hover:bg-gold-muted transition-colors text-base"
            >
              Ver Serviços
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Categorias ── */}
      <section className="bg-bg-section section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold mb-3">
              Os Nossos <span className="text-gold-gradient">Serviços</span>
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto">
              Do corte perfeito à arte permanente — cada visita é uma experiência única.
            </p>
          </div>
          <ServicosGrid services={services} categories={categories} />
        </div>
      </section>

      {/* ── Artistas ── */}
      {featuredEmployees.length > 0 && (
        <section className="section-padding">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <h2 className="font-display text-4xl font-bold mb-3">
                Os Nossos <span className="text-gold-gradient">Artistas</span>
              </h2>
              <p className="text-text-secondary max-w-lg mx-auto">
                Profissionais com anos de experiência e paixão pelo que fazem.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredEmployees.map((emp) => (
                <Link
                  key={emp.id}
                  href={`/artistas/${emp.id}`}
                  className="group text-center"
                >
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gold-border group-hover:border-gold transition-colors bg-bg-card">
                    {resolvePhotoUrl(emp.photoUrl) ? (
                      <Image src={resolvePhotoUrl(emp.photoUrl)!} alt={emp.name} width={128} height={128} sizes="128px" className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl text-gold">
                        {emp.name[0]}
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-semibold group-hover:text-gold transition-colors">
                    {emp.name}
                  </h3>
                  {emp.services.length > 0 && (
                    <p className="text-text-secondary text-sm mt-1">
                      {emp.services.map((s) => s.name).slice(0, 2).join(' · ')}
                    </p>
                  )}
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/artistas"
                className="inline-flex items-center gap-2 text-gold border border-gold px-6 py-3 rounded hover:bg-gold-muted transition-colors"
              >
                Ver todos os artistas →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Marcação ── */}
      <section className="bg-bg-section section-padding">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold mb-4">
            Pronto para <span className="text-gold-gradient">Marcar?</span>
          </h2>
          <p className="text-text-secondary mb-8 text-lg">
            Escolhe o teu serviço, artista e horário — tudo online, em menos de 2 minutos.
          </p>
          <Link
            href="/marcar"
            className="inline-flex items-center px-10 py-4 bg-gold text-bg-primary text-base font-semibold rounded hover:bg-gold-light transition-colors"
          >
            Marcar Agora
          </Link>
        </div>
      </section>
    </>
  );
}
