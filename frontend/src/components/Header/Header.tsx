'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/servicos', label: 'Serviços' },
  { href: '/artistas', label: 'Artistas' },
  { href: '/galeria', label: 'Galeria' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/95 backdrop-blur-sm border-b border-gold-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo/ganesha-icon.png"
            alt="Ganesha Ink"
            width={36}
            height={36}
            className="object-contain"
          />
          <span className="font-display text-lg font-semibold text-gold tracking-wide hidden sm:block">
            Ganesha Ink
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm tracking-wide transition-colors ${
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
            href="/marcar"
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
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-text-secondary hover:text-gold transition-colors py-1"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/marcar"
            className="mt-2 inline-flex items-center justify-center px-4 py-2 bg-gold text-bg-primary text-sm font-semibold rounded"
            onClick={() => setMobileOpen(false)}
          >
            Marcar
          </Link>
        </div>
      )}
    </header>
  );
}
