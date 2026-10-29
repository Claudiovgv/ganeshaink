'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { marcarHrefForPath } from '@/lib/booking';

const NAV_LINKS = [
  { href: '/tattoo', label: 'Tattoostudio' },
  { href: '/barbearia', label: 'Barbearia' },
  { href: '/beauty', label: 'Beauty' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/contacto', label: 'Contacto' },
];

const MORE_NAV_LINKS = [
  { href: '/artistas', label: 'Artistas' },
  { href: '/galeria', label: 'Galeria' },
  { href: '/blog', label: 'Blog' },
];

function headerTitle(pathname: string) {
  if (pathname.startsWith('/tattoo')) return 'Tattoostudio';
  if (pathname.startsWith('/barbearia')) return 'Barbearia';
  if (pathname.startsWith('/beauty') || pathname.startsWith('/nails')) return 'Beauty';
  return 'Ganesha Ink';
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const title = headerTitle(pathname);
  const marcarHref = marcarHrefForPath(pathname);

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/95 backdrop-blur-sm border-b border-gold-border pt-[env(safe-area-inset-top)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-24">
        <Link href="/" className="flex items-center gap-2.5 md:gap-3 min-w-0">
          <Image
            src="/images/logo/ganesha-logo-gold-white.webp"
            alt="Ganesha Ink"
            width={220}
            height={100}
            className="h-10 w-auto object-contain md:h-[4.5rem]"
            priority
          />
          <span className="font-gate text-[0.7rem] md:text-base font-semibold uppercase tracking-[0.18em] md:tracking-[0.22em] text-gold truncate">
            {title}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-5 lg:gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-gate text-xs uppercase tracking-[0.18em] transition-colors ${
                pathname === href
                  ? 'text-gold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden md:inline-flex items-center px-4 py-2 border border-gold/70 text-gold font-gate text-xs font-semibold uppercase tracking-[0.18em] rounded hover:bg-gold/10 transition-colors"
          >
            Voltar
          </Link>
          <Link
            href={marcarHref}
            className="hidden md:inline-flex items-center px-4 py-2 bg-gold text-bg-primary text-sm font-semibold rounded hover:bg-gold-light transition-colors"
          >
            Marcar
          </Link>
          <button
            className="md:hidden text-text-secondary hover:text-gold p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-bg-card border-t border-gold-border px-4 py-4 flex flex-col gap-4">
          {[...NAV_LINKS, ...MORE_NAV_LINKS].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-gate text-sm uppercase tracking-[0.18em] text-text-secondary hover:text-gold transition-colors py-1"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href={marcarHref}
            className="mt-2 inline-flex items-center justify-center px-4 py-3 bg-gold text-bg-primary text-sm font-semibold rounded"
            onClick={() => setMobileOpen(false)}
          >
            Marcar
          </Link>
        </div>
      )}

    </header>
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-gold-border bg-bg-primary/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]">
      <div className="mx-4 my-2.5 grid grid-cols-2 gap-2.5">
        <Link
          href="/"
          className="flex items-center justify-center py-3 border border-gold/70 text-gold font-gate text-xs font-semibold uppercase tracking-[0.2em] rounded"
        >
          Voltar
        </Link>
        <Link
          href={marcarHref}
          className="flex items-center justify-center py-3 bg-gold text-bg-primary font-gate text-xs font-semibold uppercase tracking-[0.2em] rounded"
        >
          Marcar
        </Link>
      </div>
    </div>
    </>
  );
}
