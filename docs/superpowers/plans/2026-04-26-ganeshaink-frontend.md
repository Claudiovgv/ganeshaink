# Ganesha Ink — Frontend Público (Next.js 14) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir o site público ganeshaink.pt em Next.js 14 App Router com identidade visual premium (dourado/preto), sistema de marcações online (wizard 5 passos), formulário de consulta, blog SSR e todas as páginas públicas.

**Architecture:** Next.js 14 App Router com Server Components para páginas de conteúdo (SEO, blog) e Client Components para interações (wizard, formulários). API Express em localhost:3002/v1 (dev) / api.ganeshaink.pt/v1 (prod). Tailwind CSS com tema custom Ganesha.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS v3, next/font/google (Playfair Display + Inter), react-markdown, date-fns, Jest + React Testing Library

---

## Identidade Visual

```
Background:       #0D0D0D
Gold primário:    #C9A84C
Gold claro:       #E8C96A
Texto claro:      #F5F5F5
Texto secundário: #A0A0A0
Cards/secções:    #1A1A1A
Secção alternada: #111111
Border gold:      rgba(201,168,76,0.3)
```

Fontes: **Playfair Display** (títulos) · **Inter** (corpo)

Assets logo: `assets/images/logo/ganesha-logo-gold-white.png`, `ganesha-logo-gold.png`, `ganesha-icon.png`  
Hero image: `assets/images/hero/studio-hero.jpg`

---

## File Map

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  ← root layout, fontes, metadata global
│   │   ├── globals.css                 ← reset, variáveis CSS, classes base
│   │   ├── page.tsx                    ← homepage (Server Component)
│   │   ├── servicos/
│   │   │   └── page.tsx               ← catálogo de serviços (Server Component)
│   │   ├── artistas/
│   │   │   ├── page.tsx               ← grid artistas (Server Component)
│   │   │   └── [id]/
│   │   │       └── page.tsx           ← perfil artista (Server Component)
│   │   ├── galeria/
│   │   │   └── page.tsx               ← galeria estática (Client Component)
│   │   ├── blog/
│   │   │   ├── page.tsx               ← lista posts SSR
│   │   │   └── [slug]/
│   │   │       └── page.tsx           ← post individual SSR
│   │   ├── marcar/
│   │   │   └── page.tsx               ← wrapper Server + BookingWizard Client
│   │   ├── consulta/
│   │   │   └── page.tsx               ← formulário consulta (Client Component)
│   │   └── contacto/
│   │       └── page.tsx               ← contacto (Server Component)
│   ├── components/
│   │   ├── Header/
│   │   │   └── Header.tsx             ← nav + logo + menu mobile
│   │   ├── Footer/
│   │   │   └── Footer.tsx             ← links, contactos, redes sociais
│   │   ├── BookingWizard/
│   │   │   ├── BookingWizard.tsx      ← orquestrador + estado (useReducer)
│   │   │   ├── Step1Category.tsx      ← escolha categoria
│   │   │   ├── Step2Service.tsx       ← escolha serviço
│   │   │   ├── Step3Employee.tsx      ← escolha funcionário
│   │   │   ├── Step4DateTime.tsx      ← data + slot horário
│   │   │   └── Step5PersonalData.tsx  ← dados cliente + submit
│   │   └── ui/
│   │       ├── Button.tsx             ← botão reutilizável (variantes gold/outline/ghost)
│   │       └── LoadingSpinner.tsx     ← spinner gold
│   └── lib/
│       ├── api.ts                     ← cliente API tipado (fetch + error handling)
│       └── utils.ts                   ← formatDate, formatPrice, formatDuration
├── public/
│   └── images/
│       ├── logo/                      ← copiado de assets/images/logo/
│       ├── hero/                      ← copiado de assets/images/hero/
│       └── gallery/                   ← imagens estáticas da galeria
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## Task 1: Scaffold Next.js 14 + Configuração

**Files:**
- Scaffold: `frontend/` (limpar placeholders, criar Next.js 14)
- Create: `frontend/src/app/globals.css`
- Create: `frontend/tailwind.config.ts`
- Create: `frontend/next.config.js`
- Create: `frontend/.env.local`
- Create: `frontend/src/lib/utils.ts`

- [ ] **Step 1: Limpar a pasta frontend e scaffoldar Next.js 14**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new

# Apagar ficheiros placeholder (todos estão vazios)
rm -rf frontend/src frontend/pages frontend/components frontend/styles frontend/utils frontend/public/index.html frontend/package.json

# Scaffoldar Next.js 14 com App Router, TypeScript, Tailwind, src dir
cd frontend
npx create-next-app@14 . --typescript --tailwind --app --src-dir --import-alias "@/*" --no-eslint --no-git
```

Expected: pergunta "Would you like to use Turbopack?" → responder **No**. Projecto criado com sucesso.

- [ ] **Step 2: Copiar assets de logo e hero para /public**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new/frontend

mkdir -p public/images/logo public/images/hero public/images/gallery

cp ../assets/images/logo/ganesha-logo-gold-white.png public/images/logo/
cp ../assets/images/logo/ganesha-logo-gold.png public/images/logo/
cp ../assets/images/logo/ganesha-icon.png public/images/logo/
cp ../assets/images/hero/studio-hero.jpg public/images/hero/
```

Expected: ficheiros presentes em `public/images/`.

- [ ] **Step 3: Instalar dependências extra**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new/frontend
npm install react-markdown date-fns
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom ts-jest
```

- [ ] **Step 4: Configurar Jest para Next.js**

Criar `frontend/jest.config.ts`:

```typescript
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default createJestConfig(config);
```

Criar `frontend/jest.setup.ts`:

```typescript
import '@testing-library/jest-dom';
```

- [ ] **Step 5: Substituir tailwind.config.ts com tema Ganesha**

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0D0D0D',
        'bg-card': '#1A1A1A',
        'bg-section': '#111111',
        'gold': '#C9A84C',
        'gold-light': '#E8C96A',
        'gold-muted': 'rgba(201,168,76,0.15)',
        'gold-border': 'rgba(201,168,76,0.3)',
        'text-primary': '#F5F5F5',
        'text-secondary': '#A0A0A0',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 6: Substituir globals.css**

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: #0D0D0D;
    color: #F5F5F5;
    font-family: var(--font-inter), sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background-color: rgba(201, 168, 76, 0.3);
    color: #E8C96A;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #0D0D0D;
  }
  ::-webkit-scrollbar-thumb {
    background: #C9A84C;
    border-radius: 3px;
  }
}

@layer utilities {
  .text-gold-gradient {
    background: linear-gradient(135deg, #C9A84C, #E8C96A, #C9A84C);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .border-gold-subtle {
    border-color: rgba(201, 168, 76, 0.3);
  }

  .section-padding {
    padding: 5rem 1.5rem;
  }
}
```

- [ ] **Step 7: Criar next.config.js**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
```

- [ ] **Step 8: Criar .env.local**

```
NEXT_PUBLIC_API_URL=http://localhost:3002/v1
```

- [ ] **Step 9: Criar src/lib/utils.ts**

```typescript
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), "d 'de' MMMM 'de' yyyy", { locale: pt });
}

export function formatDateShort(dateStr: string): string {
  return format(parseISO(dateStr), 'dd/MM/yyyy', { locale: pt });
}

export function formatPrice(price: number | string | null): string {
  if (price === null || price === undefined) return 'Sob consulta';
  const n = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(n);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h${m}min`;
}

export const SERVICE_CATEGORIES: Record<string, string> = {
  barbershop: 'Barbearia',
  tattoo: 'Tatuagem',
  piercing: 'Piercing',
  nails: 'Unhas',
};
```

- [ ] **Step 10: Verificar que o projeto arranca**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new/frontend
npm run dev
```

Expected: `▲ Next.js 14.x.x — Local: http://localhost:3000`

- [ ] **Step 11: Commit**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new
git add frontend/
git commit -m "feat: scaffold Next.js 14 frontend com tema Ganesha"
```

---

## Task 2: API Client + Tipos TypeScript

**Files:**
- Create: `frontend/src/lib/api.ts`
- Create: `frontend/src/__tests__/api.test.ts`

- [ ] **Step 1: Escrever testes para o API client**

Criar `frontend/src/__tests__/api.test.ts`:

```typescript
import { formatPrice, formatDuration, formatDate, SERVICE_CATEGORIES } from '@/lib/utils';

describe('utils', () => {
  test('formatPrice formata EUR correctamente', () => {
    expect(formatPrice(15)).toBe('15,00 €');
    expect(formatPrice('25.50')).toBe('25,50 €');
    expect(formatPrice(null)).toBe('Sob consulta');
  });

  test('formatDuration converte minutos', () => {
    expect(formatDuration(30)).toBe('30 min');
    expect(formatDuration(60)).toBe('1h');
    expect(formatDuration(90)).toBe('1h30min');
    expect(formatDuration(120)).toBe('2h');
  });

  test('SERVICE_CATEGORIES tem todas as categorias', () => {
    expect(SERVICE_CATEGORIES.barbershop).toBe('Barbearia');
    expect(SERVICE_CATEGORIES.tattoo).toBe('Tatuagem');
    expect(SERVICE_CATEGORIES.piercing).toBe('Piercing');
    expect(SERVICE_CATEGORIES.nails).toBe('Unhas');
  });
});
```

- [ ] **Step 2: Correr testes (devem passar)**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new/frontend
npx jest src/__tests__/api.test.ts
```

Expected: 3 tests passing

- [ ] **Step 3: Criar src/lib/api.ts**

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/v1';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new ApiError(res.status, body.error || res.statusText);
  }
  return res.json();
}

// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface Employee {
  id: number;
  name: string;
  bio: string | null;
  photoUrl: string | null;
  services: Service[];
}

export interface Service {
  id: number;
  name: string;
  category: 'barbershop' | 'tattoo' | 'piercing' | 'nails';
  description: string | null;
  durationMin: number;
  price: number | null;
  requiresConsultation: boolean;
}

export interface AvailabilityResponse {
  employeeId: number;
  date: string;
  slots: string[];
}

export interface Appointment {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  startDatetime: string;
  endDatetime: string;
  status: string;
  notes: string | null;
  cancelToken?: string;
  employee: { id: number; name: string };
  service: Service;
}

export interface ConsultationRequest {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  description: string;
  status: string;
  service: Service;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  publishedAt: string;
  content?: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

// ─── Endpoints ───────────────────────────────────────────────────────────────

export const api = {
  employees: {
    list: () => apiFetch<Employee[]>('/employees', { next: { revalidate: 300 } }),
    get: (id: number) => apiFetch<Employee>(`/employees/${id}`, { next: { revalidate: 300 } }),
  },
  services: {
    list: (category?: string) =>
      apiFetch<Service[]>(
        category ? `/services?category=${category}` : '/services',
        { next: { revalidate: 300 } },
      ),
  },
  availability: {
    slots: (employeeId: number, date: string, serviceId: number) =>
      apiFetch<AvailabilityResponse>(
        `/availability/${employeeId}?date=${date}&serviceId=${serviceId}`,
        { cache: 'no-store' },
      ),
  },
  appointments: {
    create: (data: {
      clientName: string;
      clientEmail: string;
      clientPhone: string;
      employeeId: number;
      serviceId: number;
      date: string;
      time: string;
      notes?: string;
    }) =>
      apiFetch<Appointment>('/appointments', {
        method: 'POST',
        body: JSON.stringify(data),
        cache: 'no-store',
      }),
  },
  consultations: {
    create: (data: {
      clientName: string;
      clientEmail: string;
      clientPhone: string;
      serviceId: number;
      employeeId?: number;
      description: string;
      referenceImages?: string[];
    }) =>
      apiFetch<ConsultationRequest>('/consultations', {
        method: 'POST',
        body: JSON.stringify(data),
        cache: 'no-store',
      }),
  },
  blog: {
    list: () => apiFetch<BlogPost[]>('/blog', { next: { revalidate: 600 } }),
    get: (slug: string) => apiFetch<BlogPost>(`/blog/${slug}`, { next: { revalidate: 600 } }),
  },
};
```

- [ ] **Step 4: Commit**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new
git add frontend/src/lib/ frontend/src/__tests__/
git commit -m "feat: API client tipado + tipos TypeScript"
```

---

## Task 3: Layout Base (Header + Footer)

**Files:**
- Modify: `frontend/src/app/layout.tsx`
- Create: `frontend/src/components/Header/Header.tsx`
- Create: `frontend/src/components/Footer/Footer.tsx`
- Create: `frontend/src/components/ui/Button.tsx`
- Create: `frontend/src/components/ui/LoadingSpinner.tsx`

- [ ] **Step 1: Substituir src/app/layout.tsx**

```tsx
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Ganesha Ink',
    default: 'Ganesha Ink — Tatuagem, Barbearia & Piercing em Lisboa',
  },
  description:
    'Studio premium de tatuagem, barbearia, body piercing e estética de unhas em Lisboa. Marcações online disponíveis.',
  openGraph: {
    siteName: 'Ganesha Ink',
    locale: 'pt_PT',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-bg-primary text-text-primary font-body min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Criar Header.tsx**

```tsx
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
        {/* Logo */}
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

        {/* Desktop Nav */}
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

        {/* CTA + Hamburger */}
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

      {/* Mobile menu */}
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
```

- [ ] **Step 3: Criar Footer.tsx**

```tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-bg-card border-t border-gold-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-3 mb-4">
            <Image src="/images/logo/ganesha-icon.png" alt="Ganesha Ink" width={32} height={32} />
            <span className="font-display text-gold text-lg">Ganesha Ink</span>
          </Link>
          <p className="text-text-secondary text-sm leading-relaxed">
            Studio premium de tatuagem, barbearia, body piercing e estética de unhas em Lisboa.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-gold font-semibold text-sm tracking-widest uppercase mb-4">
            Navegação
          </h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            {[
              ['/servicos', 'Serviços'],
              ['/artistas', 'Artistas'],
              ['/galeria', 'Galeria'],
              ['/blog', 'Blog'],
              ['/marcar', 'Marcar'],
              ['/consulta', 'Pedido de Consulta'],
              ['/contacto', 'Contacto'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-gold transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-gold font-semibold text-sm tracking-widest uppercase mb-4">
            Contacto
          </h3>
          <address className="not-italic text-sm text-text-secondary space-y-2">
            <p>Lisboa, Portugal</p>
            <p>
              <a href="tel:+351910000000" className="hover:text-gold transition-colors">
                +351 910 000 000
              </a>
            </p>
            <p>
              <a href="mailto:geral@ganeshaink.pt" className="hover:text-gold transition-colors">
                geral@ganeshaink.pt
              </a>
            </p>
          </address>
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.instagram.com/ganeshaink"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gold-border py-4 text-center text-xs text-text-secondary">
        © {new Date().getFullYear()} Ganesha Ink · Todos os direitos reservados
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Criar UI primitivos**

Criar `frontend/src/components/ui/Button.tsx`:

```tsx
import { ButtonHTMLAttributes } from 'react';

type Variant = 'gold' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  gold: 'bg-gold text-bg-primary hover:bg-gold-light font-semibold',
  outline: 'border border-gold text-gold hover:bg-gold-muted',
  ghost: 'text-text-secondary hover:text-gold',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

export default function Button({
  variant = 'gold',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
```

Criar `frontend/src/components/ui/LoadingSpinner.tsx`:

```tsx
export default function LoadingSpinner({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center py-12">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="animate-spin text-gold"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
    </div>
  );
}
```

- [ ] **Step 5: Verificar que compila sem erros**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new/frontend
npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`

- [ ] **Step 6: Commit**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new
git add frontend/src/
git commit -m "feat: layout base — Header, Footer, UI primitivos"
```

---

## Task 4: Homepage

**Files:**
- Modify: `frontend/src/app/page.tsx`

- [ ] **Step 1: Substituir src/app/page.tsx**

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/lib/api';
import { formatPrice } from '@/lib/utils';

export default async function HomePage() {
  const [employees, services] = await Promise.all([
    api.employees.list().catch(() => []),
    api.services.list().catch(() => []),
  ]);

  const barbershopServices = services.filter((s) => s.category === 'barbershop').slice(0, 3);
  const featuredEmployees = employees.slice(0, 3);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero/studio-hero.jpg"
          alt="Ganesha Ink Studio"
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-transparent to-bg-primary" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <Image
            src="/images/logo/ganesha-logo-gold-white.png"
            alt="Ganesha Ink"
            width={120}
            height={120}
            className="mx-auto mb-8 object-contain"
          />
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Arte na <span className="text-gold-gradient">Pele</span>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Studio premium de tatuagem, barbearia, body piercing e estética de unhas em Lisboa.
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
        {/* Scroll indicator */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Barbearia', icon: '✂️', href: '/servicos?categoria=barbershop', desc: 'Cortes, barba e tratamentos premium' },
              { label: 'Tatuagem', icon: '🎨', href: '/consulta', desc: 'Arte personalizada por artistas especializados' },
              { label: 'Piercing', icon: '💎', href: '/consulta', desc: 'Body piercing profissional e seguro' },
              { label: 'Unhas', icon: '✨', href: '/servicos?categoria=nails', desc: 'Manicure, gel e nail art' },
            ].map(({ label, icon, href, desc }) => (
              <Link
                key={label}
                href={href}
                className="bg-bg-card border border-gold-border rounded-lg p-6 hover:border-gold transition-colors group"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-display text-xl font-semibold text-gold mb-2 group-hover:text-gold-light transition-colors">
                  {label}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
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
                    {emp.photoUrl ? (
                      <Image src={emp.photoUrl} alt={emp.name} width={128} height={128} className="object-cover w-full h-full" />
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
```

- [ ] **Step 2: Verificar que arranca sem erros**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new/frontend
# Garantir que API está a correr
cd ../backend && node src/index.js &
sleep 1
cd ../frontend
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -o '<title>[^<]*' | head -1
```

Expected: `<title>Ganesha Ink — Tatuagem, Barbearia & Piercing em Lisboa`

- [ ] **Step 3: Commit**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new
kill $(lsof -ti:3002) 2>/dev/null; kill $(lsof -ti:3000) 2>/dev/null; true
git add frontend/src/app/page.tsx
git commit -m "feat: homepage com hero, categorias e artistas"
```

---

## Task 5: Página de Serviços (/servicos)

**Files:**
- Create: `frontend/src/app/servicos/page.tsx`

- [ ] **Step 1: Criar servicos/page.tsx**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { api, Service } from '@/lib/api';
import { formatPrice, formatDuration, SERVICE_CATEGORIES } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Serviços',
  description: 'Catálogo completo de serviços Ganesha Ink — barbearia, tatuagem, piercing e unhas com preços e durações.',
};

function ServiceCard({ service }: { service: Service }) {
  const isConsultation = service.requiresConsultation;
  return (
    <div className="bg-bg-card border border-gold-border rounded-lg p-6 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-lg font-semibold leading-snug">{service.name}</h3>
        <span className="text-gold font-semibold text-sm whitespace-nowrap">
          {formatPrice(service.price)}
        </span>
      </div>
      {service.description && (
        <p className="text-text-secondary text-sm leading-relaxed">{service.description}</p>
      )}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gold-border">
        <span className="text-text-secondary text-xs">{formatDuration(service.durationMin)}</span>
        {isConsultation ? (
          <Link
            href="/consulta"
            className="text-xs text-gold border border-gold px-3 py-1 rounded hover:bg-gold-muted transition-colors"
          >
            Pedir Consulta
          </Link>
        ) : (
          <Link
            href="/marcar"
            className="text-xs bg-gold text-bg-primary px-3 py-1 rounded hover:bg-gold-light transition-colors font-semibold"
          >
            Marcar
          </Link>
        )}
      </div>
    </div>
  );
}

export default async function ServicosPage() {
  const services = await api.services.list().catch(() => [] as Service[]);

  const grouped = services.reduce(
    (acc, s) => {
      if (!acc[s.category]) acc[s.category] = [];
      acc[s.category].push(s);
      return acc;
    },
    {} as Record<string, Service[]>,
  );

  const categoryOrder = ['barbershop', 'tattoo', 'piercing', 'nails'] as const;

  return (
    <div className="pt-20">
      <section className="bg-bg-section py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display text-5xl font-bold mb-4">
            Os Nossos <span className="text-gold-gradient">Serviços</span>
          </h1>
          <p className="text-text-secondary max-w-lg mx-auto">
            Todos os preços incluem materiais. Tatuagem e piercing requerem consulta prévia.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {categoryOrder.map((cat) => {
          const list = grouped[cat];
          if (!list || list.length === 0) return null;
          return (
            <div key={cat} id={cat}>
              <h2 className="font-display text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="text-gold-gradient">{SERVICE_CATEGORIES[cat]}</span>
                <span className="h-px flex-1 bg-gold-border" />
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((s) => (
                  <ServiceCard key={s.id} service={s} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new
git add frontend/src/app/servicos/
git commit -m "feat: página de serviços com catálogo por categoria"
```

---

## Task 6: Artistas (/artistas + /artistas/[id])

**Files:**
- Create: `frontend/src/app/artistas/page.tsx`
- Create: `frontend/src/app/artistas/[id]/page.tsx`

- [ ] **Step 1: Criar artistas/page.tsx**

```tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { api, Employee } from '@/lib/api';
import { SERVICE_CATEGORIES } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Artistas',
  description: 'Conheça os artistas e especialistas do Ganesha Ink.',
};

function ArtistCard({ employee }: { employee: Employee }) {
  const categories = [...new Set(employee.services.map((s) => s.category))];
  return (
    <Link
      href={`/artistas/${employee.id}`}
      className="group bg-bg-card border border-gold-border rounded-lg overflow-hidden hover:border-gold transition-colors"
    >
      <div className="aspect-square bg-bg-section relative">
        {employee.photoUrl ? (
          <Image src={employee.photoUrl} alt={employee.name} fill className="object-cover" />
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
                key={cat}
                className="text-xs border border-gold-border text-text-secondary px-2 py-0.5 rounded"
              >
                {SERVICE_CATEGORIES[cat]}
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

export default async function ArtistasPage() {
  const employees = await api.employees.list().catch(() => [] as Employee[]);

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
```

- [ ] **Step 2: Criar artistas/[id]/page.tsx**

```tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { formatPrice, formatDuration, SERVICE_CATEGORIES } from '@/lib/utils';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const emp = await api.employees.get(Number(params.id)).catch(() => null);
  if (!emp) return { title: 'Artista não encontrado' };
  return {
    title: emp.name,
    description: emp.bio || `Perfil do artista ${emp.name} no Ganesha Ink.`,
  };
}

export default async function ArtistProfilePage({ params }: Props) {
  const employee = await api.employees.get(Number(params.id)).catch(() => null);
  if (!employee) notFound();

  const categories = [...new Set(employee.services.map((s) => s.category))];

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
                <span key={cat} className="text-xs border border-gold text-gold px-3 py-1 rounded">
                  {SERVICE_CATEGORIES[cat]}
                </span>
              ))}
            </div>
            {employee.bio && (
              <p className="text-text-secondary leading-relaxed max-w-xl">{employee.bio}</p>
            )}
            <Link
              href={`/marcar`}
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
```

- [ ] **Step 3: Commit**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new
git add frontend/src/app/artistas/
git commit -m "feat: páginas de artistas — grid e perfil individual"
```

---

## Task 7: Galeria (/galeria)

**Files:**
- Create: `frontend/src/app/galeria/page.tsx`

> Nota: A galeria é estática. As imagens são colocadas em `public/images/gallery/` organizadas por pasta de categoria. Para já, a página mostra categorias com placeholder visual.

- [ ] **Step 1: Criar galeria/page.tsx**

```tsx
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Galeria',
  description: 'Galeria de trabalhos do Ganesha Ink — tatuagem, barbearia e piercing.',
};

const GALLERY_ITEMS = [
  { category: 'Tatuagem', src: '/images/gallery/tattoo-1.jpg', alt: 'Tatuagem blackwork' },
  { category: 'Tatuagem', src: '/images/gallery/tattoo-2.jpg', alt: 'Tatuagem a cores' },
  { category: 'Barbearia', src: '/images/gallery/barber-1.jpg', alt: 'Corte de cabelo' },
  { category: 'Barbearia', src: '/images/gallery/barber-2.jpg', alt: 'Acabamento de barba' },
  { category: 'Piercing', src: '/images/gallery/piercing-1.jpg', alt: 'Body piercing' },
  { category: 'Unhas', src: '/images/gallery/nails-1.jpg', alt: 'Nail art' },
];

const CATEGORIES = ['Todos', 'Tatuagem', 'Barbearia', 'Piercing', 'Unhas'];

// Client component para filtro interactivo
import GaleriaClient from './GaleriaClient';

export default function GaleriaPage() {
  return (
    <div className="pt-20">
      <section className="bg-bg-section py-16 px-4 text-center">
        <h1 className="font-display text-5xl font-bold mb-4">
          <span className="text-gold-gradient">Galeria</span>
        </h1>
        <p className="text-text-secondary max-w-md mx-auto">
          Uma amostra do trabalho dos nossos artistas.
        </p>
      </section>
      <GaleriaClient items={GALLERY_ITEMS} categories={CATEGORIES} />
    </div>
  );
}
```

Criar `frontend/src/app/galeria/GaleriaClient.tsx`:

```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryItem {
  category: string;
  src: string;
  alt: string;
}

export default function GaleriaClient({
  items,
  categories,
}: {
  items: GalleryItem[];
  categories: string[];
}) {
  const [active, setActive] = useState('Todos');
  const filtered = active === 'Todos' ? items : items.filter((i) => i.category === active);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded text-sm transition-colors ${
              active === cat
                ? 'bg-gold text-bg-primary font-semibold'
                : 'border border-gold-border text-text-secondary hover:border-gold hover:text-gold'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-text-secondary">
          <p className="text-lg mb-2">Sem imagens nesta categoria ainda.</p>
          <p className="text-sm">Adiciona imagens a <code className="text-gold">public/images/gallery/</code></p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div
              key={i}
              className="break-inside-avoid rounded-lg overflow-hidden border border-gold-border bg-bg-card aspect-square relative"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-text-secondary text-sm">
                {item.alt}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new
git add frontend/src/app/galeria/
git commit -m "feat: galeria estática com filtro por categoria"
```

---

## Task 8: Blog SSR (/blog + /blog/[slug])

**Files:**
- Create: `frontend/src/app/blog/page.tsx`
- Create: `frontend/src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Criar blog/page.tsx**

```tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { api, BlogPost } from '@/lib/api';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artigos sobre tatuagem, barbearia, cuidados e tendências do Ganesha Ink.',
};

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-bg-card border border-gold-border rounded-lg overflow-hidden hover:border-gold transition-colors"
    >
      {post.coverImageUrl && (
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6">
        <p className="text-text-secondary text-xs mb-2">{formatDate(post.publishedAt)}</p>
        <h2 className="font-display text-xl font-semibold group-hover:text-gold transition-colors mb-2 leading-snug">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
        )}
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const posts = await api.blog.list().catch(() => [] as BlogPost[]);

  return (
    <div className="pt-20">
      <section className="bg-bg-section py-16 px-4 text-center">
        <h1 className="font-display text-5xl font-bold mb-4">
          <span className="text-gold-gradient">Blog</span>
        </h1>
        <p className="text-text-secondary max-w-md mx-auto">
          Inspiração, técnicas e novidades do mundo da arte na pele.
        </p>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {posts.length === 0 ? (
          <p className="text-center text-text-secondary py-16">Nenhum artigo publicado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Criar blog/[slug]/page.tsx**

```tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await api.blog.get(params.slug).catch(() => null);
  if (!post) return { title: 'Artigo não encontrado' };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || undefined,
    openGraph: post.coverImageUrl
      ? { images: [{ url: post.coverImageUrl }] }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await api.blog.get(params.slug).catch(() => null);
  if (!post) notFound();

  return (
    <div className="pt-20">
      {/* Cover */}
      {post.coverImageUrl && (
        <div className="relative h-64 md:h-96 w-full overflow-hidden">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-primary" />
        </div>
      )}

      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/blog" className="text-text-secondary text-sm hover:text-gold transition-colors mb-8 inline-flex items-center gap-1">
          ← Blog
        </Link>
        <p className="text-text-secondary text-sm mt-4">{formatDate(post.publishedAt)}</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-8 leading-tight">
          {post.title}
        </h1>
        <div className="prose prose-invert prose-gold max-w-none text-text-secondary leading-relaxed
          [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-text-primary [&_h2]:mt-10 [&_h2]:mb-4
          [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-text-primary [&_h3]:mt-8 [&_h3]:mb-3
          [&_p]:mb-5
          [&_a]:text-gold [&_a]:no-underline hover:[&_a]:underline
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5
          [&_li]:mb-1
          [&_blockquote]:border-l-4 [&_blockquote]:border-gold [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-text-secondary
          [&_code]:bg-bg-card [&_code]:text-gold [&_code]:px-1 [&_code]:rounded [&_code]:text-sm
          [&_pre]:bg-bg-card [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-5
        ">
          <ReactMarkdown>{post.content || ''}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new
git add frontend/src/app/blog/
git commit -m "feat: blog SSR com lista e post individual em markdown"
```

---

## Task 9: Wizard de Marcação (/marcar)

**Files:**
- Create: `frontend/src/app/marcar/page.tsx`
- Create: `frontend/src/components/BookingWizard/BookingWizard.tsx`
- Create: `frontend/src/components/BookingWizard/Step1Category.tsx`
- Create: `frontend/src/components/BookingWizard/Step2Service.tsx`
- Create: `frontend/src/components/BookingWizard/Step3Employee.tsx`
- Create: `frontend/src/components/BookingWizard/Step4DateTime.tsx`
- Create: `frontend/src/components/BookingWizard/Step5PersonalData.tsx`
- Create: `frontend/src/__tests__/BookingWizard.test.tsx`

- [ ] **Step 1: Criar src/app/marcar/page.tsx**

```tsx
import type { Metadata } from 'next';
import BookingWizard from '@/components/BookingWizard/BookingWizard';

export const metadata: Metadata = {
  title: 'Marcar',
  description: 'Marca o teu serviço online — barbearia, piercing ou unhas em poucos passos.',
};

export default function MarcarPage() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="bg-bg-section py-12 px-4 text-center">
        <h1 className="font-display text-4xl font-bold mb-3">
          Marcar <span className="text-gold-gradient">Serviço</span>
        </h1>
        <p className="text-text-secondary">Escolhe o serviço, artista, data e hora.</p>
      </section>
      <BookingWizard />
    </div>
  );
}
```

- [ ] **Step 2: Criar BookingWizard.tsx (orquestrador com useReducer)**

```tsx
'use client';

import { useReducer } from 'react';
import Step1Category from './Step1Category';
import Step2Service from './Step2Service';
import Step3Employee from './Step3Employee';
import Step4DateTime from './Step4DateTime';
import Step5PersonalData from './Step5PersonalData';
import { Service, Employee, Appointment } from '@/lib/api';

export type Category = 'barbershop' | 'tattoo' | 'piercing' | 'nails';

export interface BookingState {
  step: 1 | 2 | 3 | 4 | 5 | 'success';
  category: Category | null;
  service: Service | null;
  employee: Employee | null;
  date: string | null;
  time: string | null;
  appointment: Appointment | null;
}

type Action =
  | { type: 'SET_CATEGORY'; payload: Category }
  | { type: 'SET_SERVICE'; payload: Service }
  | { type: 'SET_EMPLOYEE'; payload: Employee }
  | { type: 'SET_DATETIME'; payload: { date: string; time: string } }
  | { type: 'SET_APPOINTMENT'; payload: Appointment }
  | { type: 'BACK' }
  | { type: 'RESET' };

const initialState: BookingState = {
  step: 1,
  category: null,
  service: null,
  employee: null,
  date: null,
  time: null,
  appointment: null,
};

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload, service: null, employee: null, date: null, time: null, step: 2 };
    case 'SET_SERVICE':
      return { ...state, service: action.payload, employee: null, date: null, time: null, step: 3 };
    case 'SET_EMPLOYEE':
      return { ...state, employee: action.payload, date: null, time: null, step: 4 };
    case 'SET_DATETIME':
      return { ...state, date: action.payload.date, time: action.payload.time, step: 5 };
    case 'SET_APPOINTMENT':
      return { ...state, appointment: action.payload, step: 'success' };
    case 'BACK':
      if (state.step === 2) return { ...state, step: 1 };
      if (state.step === 3) return { ...state, step: 2 };
      if (state.step === 4) return { ...state, step: 3 };
      if (state.step === 5) return { ...state, step: 4 };
      return state;
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const STEPS = ['Categoria', 'Serviço', 'Artista', 'Data & Hora', 'Dados'];

export default function BookingWizard() {
  const [state, dispatch] = useReducer(reducer, initialState);

  if (state.step === 'success' && state.appointment) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-6">✅</div>
        <h2 className="font-display text-3xl font-bold mb-3 text-gold">Marcação Confirmada!</h2>
        <p className="text-text-secondary mb-2">
          Receberás um email de confirmação em breve.
        </p>
        <div className="bg-bg-card border border-gold-border rounded-lg p-6 mt-8 text-left space-y-3">
          <p><span className="text-text-secondary text-sm">Serviço:</span> <span className="font-semibold">{state.appointment.service.name}</span></p>
          <p><span className="text-text-secondary text-sm">Artista:</span> <span className="font-semibold">{state.appointment.employee.name}</span></p>
          <p><span className="text-text-secondary text-sm">Data:</span> <span className="font-semibold">{new Date(state.appointment.startDatetime).toLocaleString('pt-PT', { dateStyle: 'full', timeStyle: 'short' })}</span></p>
          <p className="text-xs text-text-secondary border-t border-gold-border pt-3">
            Referência: #{state.appointment.id}
          </p>
        </div>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="mt-8 px-6 py-3 border border-gold text-gold rounded hover:bg-gold-muted transition-colors"
        >
          Nova Marcação
        </button>
      </div>
    );
  }

  const currentStep = state.step as number;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const done = currentStep > stepNum;
          const active = currentStep === stepNum;
          return (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    done ? 'bg-gold text-bg-primary' : active ? 'bg-gold text-bg-primary' : 'bg-bg-card border border-gold-border text-text-secondary'
                  }`}
                >
                  {done ? '✓' : stepNum}
                </div>
                <span className={`text-xs mt-1 hidden sm:block ${active ? 'text-gold' : 'text-text-secondary'}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px flex-1 ${done ? 'bg-gold' : 'bg-gold-border'}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Steps */}
      {state.step === 1 && (
        <Step1Category onSelect={(cat) => dispatch({ type: 'SET_CATEGORY', payload: cat })} />
      )}
      {state.step === 2 && state.category && (
        <Step2Service
          category={state.category}
          onSelect={(s) => dispatch({ type: 'SET_SERVICE', payload: s })}
          onBack={() => dispatch({ type: 'BACK' })}
        />
      )}
      {state.step === 3 && state.service && (
        <Step3Employee
          serviceId={state.service.id}
          onSelect={(e) => dispatch({ type: 'SET_EMPLOYEE', payload: e })}
          onBack={() => dispatch({ type: 'BACK' })}
        />
      )}
      {state.step === 4 && state.employee && state.service && (
        <Step4DateTime
          employeeId={state.employee.id}
          serviceId={state.service.id}
          onSelect={(date, time) => dispatch({ type: 'SET_DATETIME', payload: { date, time } })}
          onBack={() => dispatch({ type: 'BACK' })}
        />
      )}
      {state.step === 5 && state.service && state.employee && state.date && state.time && (
        <Step5PersonalData
          service={state.service}
          employee={state.employee}
          date={state.date}
          time={state.time}
          onSuccess={(appt) => dispatch({ type: 'SET_APPOINTMENT', payload: appt })}
          onBack={() => dispatch({ type: 'BACK' })}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 3: Criar Step1Category.tsx**

```tsx
'use client';

import { Category } from './BookingWizard';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { id: 'barbershop' as Category, label: 'Barbearia', icon: '✂️', desc: 'Cortes, barba, tratamentos', consultation: false },
  { id: 'tattoo' as Category, label: 'Tatuagem', icon: '🎨', desc: 'Arte personalizada — requer consulta', consultation: true },
  { id: 'piercing' as Category, label: 'Piercing', icon: '💎', desc: 'Body piercing — requer consulta', consultation: true },
  { id: 'nails' as Category, label: 'Unhas', icon: '✨', desc: 'Manicure, gel, nail art', consultation: false },
];

export default function Step1Category({ onSelect }: { onSelect: (cat: Category) => void }) {
  const router = useRouter();

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">Escolhe a Categoria</h2>
      <p className="text-text-secondary text-sm mb-8">Selecciona o tipo de serviço que procuras.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map(({ id, label, icon, desc, consultation }) => (
          <button
            key={id}
            onClick={() => {
              if (consultation) {
                router.push('/consulta');
              } else {
                onSelect(id);
              }
            }}
            className="bg-bg-card border border-gold-border rounded-lg p-6 text-left hover:border-gold transition-colors group"
          >
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="font-display text-lg font-semibold mb-1 group-hover:text-gold transition-colors">
              {label}
            </h3>
            <p className="text-text-secondary text-sm">{desc}</p>
            {consultation && (
              <span className="inline-block mt-2 text-xs text-gold border border-gold px-2 py-0.5 rounded">
                Pedido de consulta →
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Criar Step2Service.tsx**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { api, Service } from '@/lib/api';
import { formatPrice, formatDuration, SERVICE_CATEGORIES } from '@/lib/utils';
import { Category } from './BookingWizard';
import LoadingSpinner from '../ui/LoadingSpinner';
import Button from '../ui/Button';

interface Props {
  category: Category;
  onSelect: (service: Service) => void;
  onBack: () => void;
}

export default function Step2Service({ category, onSelect, onBack }: Props) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.services.list(category)
      .then(setServices)
      .catch(() => setError('Erro ao carregar serviços.'))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">Escolhe o Serviço</h2>
      <p className="text-text-secondary text-sm mb-8">{SERVICE_CATEGORIES[category]}</p>

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {!loading && !error && (
        <div className="space-y-3 mb-8">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              className="w-full bg-bg-card border border-gold-border rounded-lg p-5 text-left hover:border-gold transition-colors group flex items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-semibold group-hover:text-gold transition-colors">{s.name}</h3>
                {s.description && <p className="text-text-secondary text-sm mt-1">{s.description}</p>}
                <p className="text-text-secondary text-xs mt-1">{formatDuration(s.durationMin)}</p>
              </div>
              <span className="text-gold font-semibold whitespace-nowrap">{formatPrice(s.price)}</span>
            </button>
          ))}
        </div>
      )}

      <Button variant="ghost" onClick={onBack}>← Voltar</Button>
    </div>
  );
}
```

- [ ] **Step 5: Criar Step3Employee.tsx**

```tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { api, Employee } from '@/lib/api';
import LoadingSpinner from '../ui/LoadingSpinner';
import Button from '../ui/Button';

interface Props {
  serviceId: number;
  onSelect: (employee: Employee) => void;
  onBack: () => void;
}

export default function Step3Employee({ serviceId, onSelect, onBack }: Props) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.employees.list()
      .then((all) => setEmployees(all.filter((e) => e.services.some((s) => s.id === serviceId))))
      .catch(() => setError('Erro ao carregar artistas.'))
      .finally(() => setLoading(false));
  }, [serviceId]);

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">Escolhe o Artista</h2>
      <p className="text-text-secondary text-sm mb-8">Quem queres que te atenda?</p>

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {!loading && !error && employees.length === 0 && (
        <p className="text-text-secondary text-sm">Nenhum artista disponível para este serviço.</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {employees.map((emp) => (
            <button
              key={emp.id}
              onClick={() => onSelect(emp)}
              className="bg-bg-card border border-gold-border rounded-lg p-5 text-left hover:border-gold transition-colors group flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border border-gold-border flex-shrink-0 bg-bg-section">
                {emp.photoUrl ? (
                  <Image src={emp.photoUrl} alt={emp.name} width={56} height={56} className="object-cover w-full h-full" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl font-display text-gold">
                    {emp.name[0]}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-gold transition-colors">{emp.name}</h3>
                {emp.bio && <p className="text-text-secondary text-xs mt-1 line-clamp-2">{emp.bio}</p>}
              </div>
            </button>
          ))}
        </div>
      )}

      <Button variant="ghost" onClick={onBack}>← Voltar</Button>
    </div>
  );
}
```

- [ ] **Step 6: Criar Step4DateTime.tsx**

```tsx
'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';

interface Props {
  employeeId: number;
  serviceId: number;
  onSelect: (date: string, time: string) => void;
  onBack: () => void;
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

function getDateOptions() {
  const options: { value: string; label: string }[] = [];
  for (let i = 1; i <= 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const value = d.toISOString().split('T')[0];
    const label = d.toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' });
    options.push({ value, label });
  }
  return options;
}

export default function Step4DateTime({ employeeId, serviceId, onSelect, onBack }: Props) {
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const dateOptions = getDateOptions();

  async function handleDateChange(d: string) {
    setDate(d);
    setSelectedTime('');
    setSlots([]);
    setSlotsError('');
    setLoadingSlots(true);
    try {
      const res = await api.availability.slots(employeeId, d, serviceId);
      setSlots(res.slots);
      if (res.slots.length === 0) setSlotsError('Sem disponibilidade neste dia. Escolhe outro.');
    } catch {
      setSlotsError('Erro ao carregar disponibilidade.');
    } finally {
      setLoadingSlots(false);
    }
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">Data & Hora</h2>
      <p className="text-text-secondary text-sm mb-8">Quando queres ser atendido?</p>

      {/* Seletor de data */}
      <div className="mb-6">
        <label className="block text-sm text-text-secondary mb-2">Data</label>
        <select
          value={date}
          onChange={(e) => handleDateChange(e.target.value)}
          className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary focus:border-gold focus:outline-none"
        >
          <option value="">Selecciona uma data...</option>
          {dateOptions.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Slots */}
      {loadingSlots && <LoadingSpinner size={24} />}
      {slotsError && <p className="text-text-secondary text-sm mb-6">{slotsError}</p>}

      {slots.length > 0 && (
        <div className="mb-8">
          <label className="block text-sm text-text-secondary mb-3">Hora</label>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {slots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`py-2 rounded text-sm transition-colors ${
                  selectedTime === slot
                    ? 'bg-gold text-bg-primary font-semibold'
                    : 'border border-gold-border text-text-secondary hover:border-gold hover:text-gold'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mt-4">
        <Button variant="ghost" onClick={onBack}>← Voltar</Button>
        {selectedTime && date && (
          <Button onClick={() => onSelect(date, selectedTime)}>
            Continuar →
          </Button>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Criar Step5PersonalData.tsx**

```tsx
'use client';

import { useState, FormEvent } from 'react';
import { api, Service, Employee, Appointment } from '@/lib/api';
import { formatPrice, formatDuration } from '@/lib/utils';
import Button from '../ui/Button';

interface Props {
  service: Service;
  employee: Employee;
  date: string;
  time: string;
  onSuccess: (appointment: Appointment) => void;
  onBack: () => void;
}

export default function Step5PersonalData({ service, employee, date, time, onSuccess, onBack }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formattedDate = new Date(`${date}T${time}`).toLocaleDateString('pt-PT', {
    weekday: 'long', day: 'numeric', month: 'long',
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setError('Preenche todos os campos obrigatórios.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const appt = await api.appointments.create({
        clientName: form.name,
        clientEmail: form.email,
        clientPhone: form.phone,
        employeeId: employee.id,
        serviceId: service.id,
        date,
        time,
        notes: form.notes || undefined,
      });
      onSuccess(appt);
    } catch (err: any) {
      setError(err.message || 'Erro ao criar marcação. Tenta novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">Os Teus Dados</h2>
      <p className="text-text-secondary text-sm mb-6">Último passo!</p>

      {/* Resumo */}
      <div className="bg-bg-card border border-gold-border rounded-lg p-5 mb-8 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">Serviço</span>
          <span>{service.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Artista</span>
          <span>{employee.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Data</span>
          <span className="text-right">{formattedDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Hora</span>
          <span>{time}</span>
        </div>
        <div className="flex justify-between border-t border-gold-border pt-2 mt-2">
          <span className="text-text-secondary">Preço estimado</span>
          <span className="text-gold font-semibold">{formatPrice(service.price)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-text-secondary mb-1">Nome *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="O teu nome"
            className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-text-secondary mb-1">Email *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="o.teu@email.com"
            className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-text-secondary mb-1">Telefone *</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+351 9xx xxx xxx"
            className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-text-secondary mb-1">Notas (opcional)</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Algum pedido especial, alergias ou informação adicional?"
            rows={3}
            className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-gold focus:outline-none resize-none"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex items-center gap-4 pt-2">
          <Button type="button" variant="ghost" onClick={onBack}>← Voltar</Button>
          <Button type="submit" loading={loading} size="lg">
            Confirmar Marcação
          </Button>
        </div>
      </form>
    </div>
  );
}
```

- [ ] **Step 8: Commit**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new
git add frontend/src/app/marcar/ frontend/src/components/BookingWizard/
git commit -m "feat: wizard de marcação em 5 passos com integração API"
```

---

## Task 10: Formulário de Consulta (/consulta)

**Files:**
- Create: `frontend/src/app/consulta/page.tsx`

- [ ] **Step 1: Criar consulta/page.tsx**

```tsx
import type { Metadata } from 'next';
import ConsultaForm from './ConsultaForm';

export const metadata: Metadata = {
  title: 'Pedido de Consulta',
  description: 'Pede uma consulta para tatuagem ou body piercing no Ganesha Ink.',
};

export default function ConsultaPage() {
  return (
    <div className="pt-20">
      <section className="bg-bg-section py-16 px-4 text-center">
        <h1 className="font-display text-4xl font-bold mb-3">
          Pedido de <span className="text-gold-gradient">Consulta</span>
        </h1>
        <p className="text-text-secondary max-w-md mx-auto">
          Para tatuagens e piercings fazemos sempre uma consulta prévia para garantir o melhor resultado.
        </p>
      </section>
      <div className="max-w-xl mx-auto px-4 py-16">
        <ConsultaForm />
      </div>
    </div>
  );
}
```

Criar `frontend/src/app/consulta/ConsultaForm.tsx`:

```tsx
'use client';

import { FormEvent, useEffect, useState } from 'react';
import { api, Service } from '@/lib/api';
import Button from '@/components/ui/Button';

export default function ConsultaForm() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceId: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.services.list('tattoo'), api.services.list('piercing')])
      .then(([t, p]) => setServices([...t, ...p]))
      .catch(() => setError('Erro ao carregar serviços.'));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.clientName || !form.clientEmail || !form.clientPhone || !form.serviceId || !form.description) {
      setError('Preenche todos os campos.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.consultations.create({
        clientName: form.clientName,
        clientEmail: form.clientEmail,
        clientPhone: form.clientPhone,
        serviceId: parseInt(form.serviceId),
        description: form.description,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar pedido.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-6">🎉</div>
        <h2 className="font-display text-2xl font-bold mb-3 text-gold">Pedido Enviado!</h2>
        <p className="text-text-secondary">
          Entraremos em contacto contigo em breve para agendar a consulta.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm text-text-secondary mb-1">Nome *</label>
        <input
          type="text"
          required
          value={form.clientName}
          onChange={(e) => setForm({ ...form, clientName: e.target.value })}
          placeholder="O teu nome"
          className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-gold focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm text-text-secondary mb-1">Email *</label>
        <input
          type="email"
          required
          value={form.clientEmail}
          onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
          placeholder="o.teu@email.com"
          className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-gold focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm text-text-secondary mb-1">Telefone *</label>
        <input
          type="tel"
          required
          value={form.clientPhone}
          onChange={(e) => setForm({ ...form, clientPhone: e.target.value })}
          placeholder="+351 9xx xxx xxx"
          className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-gold focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm text-text-secondary mb-1">Tipo de serviço *</label>
        <select
          required
          value={form.serviceId}
          onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
          className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary focus:border-gold focus:outline-none"
        >
          <option value="">Selecciona...</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-text-secondary mb-1">Descreve o que pretendes *</label>
        <textarea
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Descreve o tamanho, estilo, localização no corpo, referências de inspiração, etc."
          rows={5}
          className="w-full bg-bg-card border border-gold-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-gold focus:outline-none resize-none"
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <Button type="submit" loading={loading} size="lg" className="w-full justify-center">
        Enviar Pedido de Consulta
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new
git add frontend/src/app/consulta/
git commit -m "feat: formulário de pedido de consulta (tattoo/piercing)"
```

---

## Task 11: Contacto + SEO

**Files:**
- Create: `frontend/src/app/contacto/page.tsx`
- Create: `frontend/src/app/sitemap.ts`
- Create: `frontend/src/app/robots.ts`

- [ ] **Step 1: Criar contacto/page.tsx**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacta o Ganesha Ink — localização, horários e redes sociais.',
};

export default function ContactoPage() {
  return (
    <div className="pt-20">
      <section className="bg-bg-section py-16 px-4 text-center">
        <h1 className="font-display text-5xl font-bold mb-4">
          <span className="text-gold-gradient">Contacto</span>
        </h1>
        <p className="text-text-secondary max-w-md mx-auto">
          Estamos em Lisboa. Vem visitar-nos ou fala connosco online.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Info */}
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-3">Morada</h2>
            <address className="not-italic text-text-secondary space-y-1">
              <p>Rua do Ganesha, Nº 123</p>
              <p>1000-000 Lisboa, Portugal</p>
            </address>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-3">Horário</h2>
            <div className="text-text-secondary space-y-1 text-sm">
              {[
                ['Segunda — Sexta', '10:00 — 19:00'],
                ['Sábado', '10:00 — 17:00'],
                ['Domingo', 'Fechado'],
              ].map(([day, hours]) => (
                <div key={day} className="flex justify-between gap-4">
                  <span>{day}</span>
                  <span className={hours === 'Fechado' ? 'text-red-400' : 'text-text-primary'}>{hours}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-gold mb-3">Contactos</h2>
            <div className="text-text-secondary space-y-2 text-sm">
              <p>
                <a href="tel:+351910000000" className="hover:text-gold transition-colors">
                  +351 910 000 000
                </a>
              </p>
              <p>
                <a href="mailto:geral@ganeshaink.pt" className="hover:text-gold transition-colors">
                  geral@ganeshaink.pt
                </a>
              </p>
              <p>
                <a
                  href="https://www.instagram.com/ganeshaink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  @ganeshaink no Instagram
                </a>
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/marcar"
              className="inline-flex px-6 py-3 bg-gold text-bg-primary font-semibold rounded hover:bg-gold-light transition-colors"
            >
              Marcar Agora
            </Link>
          </div>
        </div>

        {/* Mapa placeholder */}
        <div className="bg-bg-card border border-gold-border rounded-lg overflow-hidden flex items-center justify-center min-h-64">
          <div className="text-center text-text-secondary p-8">
            <p className="text-4xl mb-4">📍</p>
            <p className="text-sm">Lisboa, Portugal</p>
            <a
              href="https://maps.google.com/?q=Lisboa+Portugal"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-gold text-sm hover:underline"
            >
              Ver no Google Maps →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Criar sitemap.ts**

```typescript
import { MetadataRoute } from 'next';
import { api } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = 'https://ganeshaink.pt';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/servicos`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/artistas`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/galeria`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/marcar`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/consulta`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contacto`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const posts = await api.blog.list().catch(() => []);
  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
```

- [ ] **Step 3: Criar robots.ts**

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: [] },
    sitemap: 'https://ganeshaink.pt/sitemap.xml',
  };
}
```

- [ ] **Step 4: Build final para verificar sem erros**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new/frontend
npm run build 2>&1 | tail -30
```

Expected: `✓ Compiled successfully` — pode ter warnings de imagens não encontradas (galeria) que são normais.

- [ ] **Step 5: Commit final**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new
git add frontend/src/app/contacto/ frontend/src/app/sitemap.ts frontend/src/app/robots.ts
git commit -m "feat: página de contacto, sitemap e robots.txt"
```

---

## Verificação Final

Depois de todos os tasks, correr com a API activa:

```bash
# Terminal 1 — API
cd /Users/claudiovieira/Desktop/Ganesha-new/backend
node src/index.js

# Terminal 2 — Frontend
cd /Users/claudiovieira/Desktop/Ganesha-new/frontend
npm run dev
```

Abrir http://localhost:3000 e verificar manualmente:

- [ ] Homepage carrega com hero e serviços reais da API
- [ ] `/servicos` mostra 9 serviços agrupados por categoria
- [ ] `/artistas` mostra João Silva
- [ ] `/artistas/1` mostra perfil com serviços
- [ ] `/marcar` → Barbearia → Corte de Cabelo → João Silva → data amanhã → horário disponível → dados → confirmar → ecrã de sucesso
- [ ] `/consulta` → preencher e submeter → ecrã de sucesso
- [ ] `/blog` carrega (vazio mas sem erro)
- [ ] `/contacto` carrega
- [ ] Header navigation funciona em mobile e desktop
- [ ] Cores dourado/preto correctas
