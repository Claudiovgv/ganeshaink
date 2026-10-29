import Link from 'next/link';
import Image from 'next/image';
import { PATHS, STUDIO_NAV } from '@/lib/site';

const STUDIO_LINKS = [
  ...STUDIO_NAV,
  { href: PATHS.servicos, label: 'Serviços' },
  { href: PATHS.artistas, label: 'Artistas' },
  { href: PATHS.galeria, label: 'Galeria' },
  { href: PATHS.blog, label: 'Blog' },
  { href: PATHS.marcar, label: 'Marcar' },
];

const LEGAL_LINKS = [
  { href: PATHS.contacto, label: 'Contacto' },
  { href: PATHS.privacidade, label: 'Política de Privacidade' },
  { href: PATHS.cookies, label: 'Política de Cookies' },
];

export default function Footer() {
  return (
    <footer className="bg-bg-primary/95 backdrop-blur-sm border-t border-gold-border mt-auto pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10 md:py-12 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <Image
              src="/images/logo/ganesha-logo-gold-white.webp"
              alt="Ganesha Ink"
              width={220}
              height={100}
              className="h-16 w-auto object-contain"
            />
            <span className="font-gate text-sm md:text-base font-semibold uppercase tracking-[0.22em] text-gold">
              Ganesha Ink
            </span>
          </Link>
          <p className="font-gate text-xs uppercase tracking-[0.14em] text-text-secondary leading-relaxed max-w-sm">
            14 anos a transformar estilo em expressão. Na Ganesha Ink, tatuagem, barbearia e beauty
            convivem com arte e atitude em Vale de Cambra.
          </p>
        </div>

        <div>
          <h3 className="font-gate text-xs uppercase tracking-[0.18em] text-gold mb-4">
            O estúdio
          </h3>
          <ul className="space-y-3">
            {STUDIO_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-gate text-xs uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-gate text-xs uppercase tracking-[0.18em] text-gold mb-4">
            Contacto
          </h3>
          <address className="not-italic space-y-3">
            <a
              href="https://maps.google.com/?q=R.+Eng.+Duarte+Pacheco+33,+3730-254+Vale+de+Cambra"
              target="_blank"
              rel="noopener noreferrer"
              className="font-gate text-xs uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary transition-colors block leading-relaxed"
            >
              R. Eng. Duarte Pacheco n.º 33
              <br />
              3730-254 Vale de Cambra
            </a>
            <div>
              <a
                href="tel:+351913570454"
                className="font-gate text-xs uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary transition-colors block"
              >
                +351 913 570 454
              </a>
              <p className="font-gate text-[0.65rem] uppercase tracking-[0.14em] text-text-secondary/70 mt-1">
                Custo de uma chamada para a rede fixa nacional.
              </p>
            </div>
            <a
              href="mailto:ricardo.vieira@ganeshaink.pt"
              className="font-gate text-xs uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary transition-colors block"
            >
              ricardo.vieira@ganeshaink.pt
            </a>
            {LEGAL_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-gate text-xs uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary transition-colors block"
              >
                {item.label}
              </Link>
            ))}
          </address>

          <div className="flex gap-4 mt-5">
            <a
              href="https://www.instagram.com/ganeshaink"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-gold transition-colors"
              aria-label="Instagram Ganesha Ink"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
          <a
            href="https://www.livroreclamacoes.pt/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-gate text-xs uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary transition-colors"
          >
            Livro de Reclamações
          </a>
        </div>
      </div>

      <div className="border-t border-gold-border py-4 text-center font-gate text-xs uppercase tracking-[0.18em] text-text-secondary">
        © {new Date().getFullYear()} Ganesha Ink · Todos os direitos reservados
      </div>
    </footer>
  );
}
