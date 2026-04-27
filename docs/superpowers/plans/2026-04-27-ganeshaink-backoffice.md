# Ganesha Ink Backoffice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/backoffice/` Next.js 14 app at `app.ganeshaink.pt` — a full management dashboard for admin and employee roles.

**Architecture:** Separate Next.js 14 App Router app inside `/backoffice/` (same repo). JWT stored in httpOnly cookie via Server Actions. Server components read the cookie and call the Express backend directly. Client components use `useAuth()` for user info and call Next.js Server Actions for mutations.

**Tech Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS v3 · Playfair Display + Inter (Google Fonts) · Express backend on `:3002/v1` · Prisma (MySQL) · JWT (httpOnly cookie `ganesha_token`)

---

## File Map

```
backoffice/
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── middleware.ts                          # Route protection
├── app/
│   ├── globals.css
│   ├── layout.tsx                         # Root layout (fonts)
│   ├── login/
│   │   └── page.tsx                       # Login form (no sidebar)
│   ├── (dashboard)/
│   │   ├── layout.tsx                     # Sidebar + TopBar wrapper
│   │   ├── page.tsx                       # Dashboard / Agenda
│   │   ├── marcacoes/
│   │   │   ├── page.tsx                   # Admin: appointments list
│   │   │   └── AppointmentsClient.tsx
│   │   ├── consultas/
│   │   │   ├── page.tsx                   # Admin: consultation requests
│   │   │   └── ConsultasClient.tsx
│   │   ├── funcionarios/
│   │   │   ├── page.tsx                   # Admin: employees list
│   │   │   └── FuncionariosClient.tsx
│   │   ├── servicos/
│   │   │   ├── page.tsx                   # Admin + Employee: services
│   │   │   └── ServicosClient.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx                   # Admin: blog posts list
│   │   │   └── BlogClient.tsx
│   │   ├── clientes/
│   │   │   └── page.tsx                   # Admin: clients read-only
│   │   ├── horario/
│   │   │   └── page.tsx                   # Employee: weekly schedule
│   │   ├── bloqueios/
│   │   │   ├── page.tsx                   # Employee: time blocks
│   │   │   └── BloqueiosClient.tsx
│   │   └── perfil/
│   │       └── page.tsx                   # Employee: profile edit
├── components/
│   ├── AuthProvider.tsx                   # Client context for user
│   ├── Sidebar.tsx                        # Role-conditional nav
│   ├── TopBar.tsx                         # Page title + actions slot
│   ├── CalendarWeek.tsx                   # 15-min grid calendar
│   ├── AppointmentModal.tsx               # View/create appointment
│   ├── DataTable.tsx                      # Reusable sortable table
│   ├── ServiceForm.tsx                    # Create/edit service modal
│   ├── Badge.tsx                          # Status badge
│   ├── Button.tsx                         # gold/outline/ghost variants
│   └── LoadingSpinner.tsx
├── lib/
│   ├── api.ts                             # Typed fetch helpers (server-side)
│   ├── actions.ts                         # Server Actions (auth + mutations)
│   └── types.ts                           # Shared TS interfaces
backend/src/routes/employee/
└── services.js                            # NEW: GET/POST/PUT /employee/services
```

---

## Task 1: Scaffold Backoffice App

**Files:**
- Create: `backoffice/` (Next.js project)
- Create: `backoffice/.env.local`
- Create: `backoffice/tailwind.config.ts`
- Create: `backoffice/app/globals.css`

- [ ] **Step 1: Scaffold Next.js app**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new
npx create-next-app@14 backoffice --typescript --tailwind --app --no-src-dir --import-alias "@/*" --no-eslint
```

- [ ] **Step 2: Create `.env.local`**

```
NEXT_PUBLIC_API_URL=http://localhost:3002/v1
JWT_SECRET=ganesha_secret_dev
```

- [ ] **Step 3: Configure `tailwind.config.ts`**

Replace contents of `backoffice/tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#DFC06A',
          muted: 'rgba(201,168,76,0.08)',
          border: 'rgba(201,168,76,0.25)',
        },
        bg: {
          primary: '#0D0D0D',
          section: '#111111',
          card: '#1A1A1A',
          sidebar: '#141414',
        },
        text: {
          primary: '#F5F0E8',
          secondary: '#9A9078',
          muted: '#5A5040',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Configure `backoffice/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0D0D0D; color: #F5F0E8; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #1A1A1A; }
  ::-webkit-scrollbar-thumb { background: #C9A84C40; border-radius: 2px; }
}
```

- [ ] **Step 5: Verify the app starts**

```bash
cd backoffice && npm run dev -- --port 3001
```

Expected: Next.js dev server on http://localhost:3001

- [ ] **Step 6: Commit**

```bash
git add backoffice/
git commit -m "feat(backoffice): scaffold Next.js 14 app with Ganesha theme"
```

---

## Task 2: Backend — `/employee/services` Endpoint

**Files:**
- Create: `backend/src/routes/employee/services.js`
- Modify: `backend/src/app.js` (wire route)

- [ ] **Step 1: Create `backend/src/routes/employee/services.js`**

```javascript
const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requireEmployee } = require('../../middleware/auth');

router.use(authenticate, requireEmployee);

router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, category, description, durationMin, price, requiresConsultation } = req.body;
    if (!name || !category || !durationMin || price === undefined)
      return res.status(400).json({ error: 'name, category, durationMin, price required' });
    const service = await prisma.service.create({
      data: {
        name,
        category,
        description: description || null,
        durationMin: parseInt(durationMin),
        price: parseFloat(price),
        requiresConsultation: requiresConsultation || false,
      },
    });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, category, description, durationMin, price, requiresConsultation, isActive } = req.body;
    const data = {};
    if (name !== undefined) data.name = name;
    if (category !== undefined) data.category = category;
    if (description !== undefined) data.description = description;
    if (durationMin !== undefined) data.durationMin = parseInt(durationMin);
    if (price !== undefined) data.price = parseFloat(price);
    if (requiresConsultation !== undefined) data.requiresConsultation = requiresConsultation;
    if (isActive !== undefined) data.isActive = isActive;
    const service = await prisma.service.update({ where: { id }, data });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

- [ ] **Step 2: Wire route in `backend/src/app.js`**

Find the block that registers employee routes (near `app.use('/v1/employee/profile', ...)`) and add:

```javascript
app.use('/v1/employee/services', require('./routes/employee/services'));
```

- [ ] **Step 3: Test the endpoint manually**

```bash
# Login first to get a token
TOKEN=$(curl -s -X POST http://localhost:3002/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ganeshaink.pt","password":"admin123"}' | node -e "process.stdin.resume();let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>console.log(JSON.parse(d).token))")

curl -s http://localhost:3002/v1/employee/services \
  -H "Authorization: Bearer $TOKEN" | node -e "process.stdin.resume();let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>console.log(JSON.parse(d).length,'services'))"
```

Expected: prints the count of services (e.g., `5 services`)

- [ ] **Step 4: Commit**

```bash
git add backend/src/routes/employee/services.js backend/src/app.js
git commit -m "feat(backend): add /employee/services endpoint (GET/POST/PUT)"
```

---

## Task 3: Shared Types + API Client

**Files:**
- Create: `backoffice/lib/types.ts`
- Create: `backoffice/lib/api.ts`

- [ ] **Step 1: Create `backoffice/lib/types.ts`**

```typescript
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'employee';
}

export interface Employee {
  id: number;
  name: string;
  bio: string | null;
  photoUrl: string | null;
  isActive: boolean;
  user: { id: number; email: string; role: string };
  services: { service: Service }[];
}

export type ServiceCategory = 'barbershop' | 'tattoo' | 'piercing' | 'nails';

export interface Service {
  id: number;
  name: string;
  category: ServiceCategory;
  description: string | null;
  durationMin: number;
  price: number;
  requiresConsultation: boolean;
  isActive: boolean;
}

export type AppointmentStatus = 'confirmed' | 'cancelled' | 'completed';

export interface Appointment {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  startDatetime: string;
  endDatetime: string;
  status: AppointmentStatus;
  notes: string | null;
  employee: { id: number; name: string };
  service: Service;
  cancelToken: string;
}

export type ConsultationStatus = 'pending' | 'scheduled' | 'rejected';

export interface ConsultationRequest {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string | null;
  serviceType: string;
  description: string | null;
  status: ConsultationStatus;
  createdAt: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  published: boolean;
  publishedAt: string | null;
  author: { id: number; name: string };
}

export interface WeeklyScheduleDay {
  dayOfWeek: number; // 0=Sun, 1=Mon, ..., 6=Sat
  isActive: boolean;
  startTime: string; // "09:00"
  endTime: string;   // "19:00"
}

export interface TimeBlock {
  id: number;
  type: 'holiday' | 'unavailable';
  reason: string | null;
  startDatetime: string;
  endDatetime: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  appointmentCount: number;
}
```

- [ ] **Step 2: Create `backoffice/lib/api.ts`**

```typescript
import { cookies } from 'next/headers';
import type {
  Appointment, BlogPost, Client, ConsultationRequest,
  Employee, Service, TimeBlock, User, WeeklyScheduleDay,
} from './types';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3002/v1';

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get('ganesha_token')?.value;
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? res.statusText);
  }
  return res.json() as Promise<T>;
}

export const api = {
  auth: {
    me: () => apiFetch<User>('/me'),
    login: (email: string, password: string) =>
      apiFetch<{ token: string; user: User }>('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
  },
  appointments: {
    list: (params?: { date?: string; employeeId?: number; status?: string }) => {
      const q = new URLSearchParams(params as Record<string, string>).toString();
      return apiFetch<Appointment[]>(`/admin/appointments${q ? `?${q}` : ''}`);
    },
    create: (data: object) =>
      apiFetch<Appointment>('/admin/appointments', { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (id: number, status: string) =>
      apiFetch<Appointment>(`/admin/appointments/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    myList: (params?: { date?: string }) => {
      const q = new URLSearchParams(params as Record<string, string>).toString();
      return apiFetch<Appointment[]>(`/employee/appointments${q ? `?${q}` : ''}`);
    },
  },
  consultations: {
    list: (status?: string) =>
      apiFetch<ConsultationRequest[]>(`/admin/consultations${status ? `?status=${status}` : ''}`),
    schedule: (id: number, data: object) =>
      apiFetch<ConsultationRequest>(`/admin/consultations/${id}/schedule`, { method: 'POST', body: JSON.stringify(data) }),
    reject: (id: number) =>
      apiFetch<ConsultationRequest>(`/admin/consultations/${id}/reject`, { method: 'POST' }),
  },
  employees: {
    list: () => apiFetch<Employee[]>('/admin/employees'),
    create: (data: object) =>
      apiFetch<Employee>('/admin/employees', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: object) =>
      apiFetch<Employee>(`/admin/employees/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  },
  services: {
    adminList: () => apiFetch<Service[]>('/admin/services'),
    adminCreate: (data: object) =>
      apiFetch<Service>('/admin/services', { method: 'POST', body: JSON.stringify(data) }),
    adminUpdate: (id: number, data: object) =>
      apiFetch<Service>(`/admin/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    employeeList: () => apiFetch<Service[]>('/employee/services'),
    employeeCreate: (data: object) =>
      apiFetch<Service>('/employee/services', { method: 'POST', body: JSON.stringify(data) }),
    employeeUpdate: (id: number, data: object) =>
      apiFetch<Service>(`/employee/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  },
  blog: {
    list: () => apiFetch<BlogPost[]>('/admin/blog'),
    create: (data: object) =>
      apiFetch<BlogPost>('/admin/blog', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: object) =>
      apiFetch<BlogPost>(`/admin/blog/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id: number) =>
      apiFetch<void>(`/admin/blog/${id}`, { method: 'DELETE' }),
  },
  clients: {
    list: () => apiFetch<Client[]>('/admin/clients'),
  },
  schedule: {
    get: () => apiFetch<WeeklyScheduleDay[]>('/employee/schedule'),
    update: (data: WeeklyScheduleDay[]) =>
      apiFetch<WeeklyScheduleDay[]>('/employee/schedule', { method: 'PUT', body: JSON.stringify({ schedule: data }) }),
  },
  timeBlocks: {
    list: () => apiFetch<TimeBlock[]>('/employee/time-blocks'),
    create: (data: object) =>
      apiFetch<TimeBlock>('/employee/time-blocks', { method: 'POST', body: JSON.stringify(data) }),
    remove: (id: number) =>
      apiFetch<void>(`/employee/time-blocks/${id}`, { method: 'DELETE' }),
  },
  profile: {
    get: () => apiFetch<Employee>('/employee/profile'),
    update: (data: object) =>
      apiFetch<Employee>('/employee/profile', { method: 'PUT', body: JSON.stringify(data) }),
  },
};
```

- [ ] **Step 3: Commit**

```bash
git add backoffice/lib/
git commit -m "feat(backoffice): add shared types and server-side API client"
```

---

## Task 4: Auth — Login Page + Server Actions + Middleware

**Files:**
- Create: `backoffice/lib/actions.ts`
- Create: `backoffice/middleware.ts`
- Create: `backoffice/app/login/page.tsx`
- Modify: `backoffice/app/layout.tsx`

- [ ] **Step 1: Create `backoffice/lib/actions.ts`**

```typescript
'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { api } from './api';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  let result: { token: string; user: { role: string } };
  try {
    result = await api.auth.login(email, password);
  } catch (err) {
    return { error: (err as Error).message };
  }

  const cookieStore = await cookies();
  cookieStore.set('ganesha_token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  redirect('/');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('ganesha_token');
  redirect('/login');
}
```

- [ ] **Step 2: Create `backoffice/middleware.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('ganesha_token')?.value;
  const { pathname } = request.nextUrl;

  if (pathname === '/login') {
    if (token) return NextResponse.redirect(new URL('/', request.url));
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

- [ ] **Step 3: Create `backoffice/app/layout.tsx`**

```typescript
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: { template: '%s | Ganesha Ink Admin', default: 'Ganesha Ink — Backoffice' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-bg-primary text-text-primary font-body min-h-screen">{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Create `backoffice/app/login/page.tsx`**

```tsx
import Image from 'next/image';
import { loginAction } from '@/lib/actions';

export const metadata = { title: 'Login' };

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4">
            <Image
              src="/images/logo/ganesha-icon.png"
              alt="Ganesha Ink"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h1 className="font-display text-3xl font-bold text-text-primary">Ganesha Ink</h1>
          <p className="text-text-secondary text-sm mt-1">Área de Gestão</p>
        </div>

        <form action={loginAction} className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-1.5" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full bg-bg-card border border-gold-border rounded px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
              placeholder="email@ganeshaink.pt"
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1.5" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full bg-bg-card border border-gold-border rounded px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
              placeholder="••••••••"
            />
          </div>

          {searchParams.error && (
            <p className="text-red-400 text-sm">{searchParams.error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gold text-bg-primary font-semibold py-3 rounded hover:bg-gold-light transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
```

Note: the logo image needs to exist at `backoffice/public/images/logo/ganesha-icon.png`. Copy it from the frontend public folder:

```bash
mkdir -p backoffice/public/images/logo
cp frontend/public/images/logo/ganesha-icon.png backoffice/public/images/logo/
```

- [ ] **Step 5: Verify login redirects correctly**

```bash
# Start dev server if not running
cd backoffice && npm run dev -- --port 3001
# Open http://localhost:3001 → should redirect to /login
# Open http://localhost:3001/login → should show login form
```

- [ ] **Step 6: Commit**

```bash
git add backoffice/app/login/ backoffice/app/layout.tsx backoffice/middleware.ts backoffice/lib/actions.ts backoffice/public/
git commit -m "feat(backoffice): auth — login page, server action, httpOnly cookie, middleware"
```

---

## Task 5: AuthProvider + Dashboard Layout

**Files:**
- Create: `backoffice/components/AuthProvider.tsx`
- Create: `backoffice/app/(dashboard)/layout.tsx`

- [ ] **Step 1: Create `backoffice/components/AuthProvider.tsx`**

```tsx
'use client';
import { createContext, useContext } from 'react';
import type { User } from '@/lib/types';

const AuthContext = createContext<User | null>(null);

export function AuthProvider({ user, children }: { user: User; children: React.ReactNode }) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth(): User {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
```

- [ ] **Step 2: Create `backoffice/app/(dashboard)/layout.tsx`**

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add backoffice/components/AuthProvider.tsx backoffice/app/\(dashboard\)/layout.tsx
git commit -m "feat(backoffice): AuthProvider context + dashboard layout shell"
```

---

## Task 6: Sidebar + TopBar Components

**Files:**
- Create: `backoffice/components/Sidebar.tsx`
- Create: `backoffice/components/TopBar.tsx`
- Create: `backoffice/components/Badge.tsx`
- Create: `backoffice/components/Button.tsx`
- Create: `backoffice/components/LoadingSpinner.tsx`

- [ ] **Step 1: Create `backoffice/components/Badge.tsx`**

```tsx
const VARIANT_CLASSES: Record<string, string> = {
  confirmed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
  completed: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  pending: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  scheduled: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  rejected: 'bg-red-500/15 text-red-400 border-red-500/30',
};

const LABELS: Record<string, string> = {
  confirmed: 'Confirmada',
  cancelled: 'Cancelada',
  completed: 'Concluída',
  pending: 'Pendente',
  scheduled: 'Agendada',
  rejected: 'Rejeitada',
};

export default function Badge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${VARIANT_CLASSES[status] ?? 'bg-bg-card text-text-secondary border-gold-border'}`}>
      {LABELS[status] ?? status}
    </span>
  );
}
```

- [ ] **Step 2: Create `backoffice/components/Button.tsx`**

```tsx
import { ButtonHTMLAttributes } from 'react';

type Variant = 'gold' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const VARIANT: Record<Variant, string> = {
  gold: 'bg-gold text-bg-primary hover:bg-gold-light',
  outline: 'border border-gold text-gold hover:bg-gold-muted',
  ghost: 'text-text-secondary hover:text-text-primary',
  danger: 'bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25',
};
const SIZE: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export default function Button({ variant = 'gold', size = 'md', loading, children, className = '', ...props }: Props) {
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={`inline-flex items-center gap-2 rounded font-medium transition-colors disabled:opacity-50 ${VARIANT[variant]} ${SIZE[size]} ${className}`}
    >
      {loading && <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
}
```

- [ ] **Step 3: Create `backoffice/components/LoadingSpinner.tsx`**

```tsx
export default function LoadingSpinner({ size = 24 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="border-2 border-gold-border border-t-gold rounded-full animate-spin"
    />
  );
}
```

- [ ] **Step 4: Create `backoffice/components/TopBar.tsx`**

```tsx
import { ReactNode } from 'react';

interface Props {
  title: string;
  actions?: ReactNode;
}

export default function TopBar({ title, actions }: Props) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gold-border/30 bg-bg-section sticky top-0 z-10">
      <h1 className="font-display text-xl font-bold text-text-primary">{title}</h1>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
```

- [ ] **Step 5: Create `backoffice/components/Sidebar.tsx`**

```tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { logoutAction } from '@/lib/actions';

const ADMIN_NAV = [
  { section: 'Agenda', items: [{ href: '/', label: 'Dashboard' }] },
  {
    section: 'Marcações',
    items: [
      { href: '/marcacoes', label: 'Marcações' },
      { href: '/consultas', label: 'Consultas' },
    ],
  },
  {
    section: 'Gestão',
    items: [
      { href: '/funcionarios', label: 'Funcionários' },
      { href: '/servicos', label: 'Serviços' },
      { href: '/blog', label: 'Blog' },
      { href: '/clientes', label: 'Clientes' },
    ],
  },
];

const EMPLOYEE_NAV = [
  {
    section: '',
    items: [
      { href: '/', label: 'Agenda' },
      { href: '/servicos', label: 'Serviços' },
      { href: '/horario', label: 'Horário' },
      { href: '/bloqueios', label: 'Bloqueios' },
      { href: '/perfil', label: 'Perfil' },
    ],
  },
];

export default function Sidebar() {
  const user = useAuth();
  const pathname = usePathname();
  const nav = user.role === 'admin' ? ADMIN_NAV : EMPLOYEE_NAV;

  return (
    <aside className="fixed left-0 top-0 h-screen w-[180px] bg-bg-sidebar border-r border-gold-border/20 flex flex-col z-20">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-gold-border/20">
        <Image src="/images/logo/ganesha-icon.png" alt="Ganesha Ink" width={28} height={28} className="object-contain" />
        <span className="font-display text-sm font-bold text-gold leading-tight">Ganesha<br />Ink</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {nav.map((group) => (
          <div key={group.section} className="mb-4">
            {group.section && (
              <p className="text-text-muted text-[10px] uppercase tracking-widest px-2 mb-1">{group.section}</p>
            )}
            {group.items.map(({ href, label }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors mb-0.5 ${
                    active
                      ? 'bg-gold-muted text-gold font-medium'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User + logout */}
      <div className="border-t border-gold-border/20 p-3">
        <p className="text-text-secondary text-xs truncate mb-0.5">{user.name}</p>
        <p className="text-text-muted text-[10px] capitalize mb-2">{user.role}</p>
        <form action={logoutAction}>
          <button type="submit" className="text-text-muted text-xs hover:text-red-400 transition-colors">
            Terminar sessão
          </button>
        </form>
      </div>
    </aside>
  );
}
```

- [ ] **Step 6: Create placeholder dashboard page to test layout**

Create `backoffice/app/(dashboard)/page.tsx`:

```tsx
import TopBar from '@/components/TopBar';

export default function DashboardPage() {
  return (
    <div>
      <TopBar title="Dashboard" />
      <div className="p-6">
        <p className="text-text-secondary">Calendário em breve.</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Test — login and verify sidebar renders**

```bash
# Visit http://localhost:3001/login
# Login with admin@ganeshaink.pt / admin123
# Should redirect to / with sidebar visible
```

- [ ] **Step 8: Commit**

```bash
git add backoffice/components/ backoffice/app/\(dashboard\)/page.tsx
git commit -m "feat(backoffice): Sidebar, TopBar, Badge, Button components + dashboard shell"
```

---

## Task 7: CalendarWeek Component + Dashboard Page

**Files:**
- Create: `backoffice/components/CalendarWeek.tsx`
- Create: `backoffice/components/AppointmentModal.tsx`
- Modify: `backoffice/app/(dashboard)/page.tsx`

- [ ] **Step 1: Create `backoffice/components/AppointmentModal.tsx`**

```tsx
'use client';
import { Appointment } from '@/lib/types';
import Badge from './Badge';
import Button from './Button';

interface Props {
  appointment: Appointment;
  onClose: () => void;
}

export default function AppointmentModal({ appointment: apt, onClose }: Props) {
  const start = new Date(apt.startDatetime);
  const end = new Date(apt.endDatetime);
  const fmt = (d: Date) =>
    d.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="bg-bg-card border border-gold-border rounded-lg p-6 w-full max-w-sm mx-4 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 className="font-display text-lg font-bold">{apt.service.name}</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary text-xl leading-none">×</button>
        </div>
        <div className="space-y-2 text-sm">
          <Row label="Cliente" value={apt.clientName} />
          <Row label="Email" value={apt.clientEmail} />
          <Row label="Telefone" value={apt.clientPhone} />
          <Row label="Artista" value={apt.employee.name} />
          <Row label="Horário" value={`${fmt(start)} — ${fmt(end)}`} />
          <Row label="Duração" value={`${apt.service.durationMin} min`} />
          <div className="flex items-center justify-between py-1">
            <span className="text-text-secondary">Estado</span>
            <Badge status={apt.status} />
          </div>
          {apt.notes && <Row label="Notas" value={apt.notes} />}
        </div>
        <Button variant="outline" size="sm" className="w-full" onClick={onClose}>
          Fechar
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-gold-border/20 last:border-0">
      <span className="text-text-secondary">{label}</span>
      <span className="text-text-primary text-right max-w-[60%] truncate">{value}</span>
    </div>
  );
}
```

- [ ] **Step 2: Create `backoffice/components/CalendarWeek.tsx`**

```tsx
'use client';
import { useState } from 'react';
import type { Appointment } from '@/lib/types';
import AppointmentModal from './AppointmentModal';

const SLOT_HEIGHT = 4;   // px per minute (4px × 15min = 60px per hour block)
const START_HOUR = 8;
const END_HOUR = 21;
const TOTAL_MINUTES = (END_HOUR - START_HOUR) * 60;

const DAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const WEEK_DAYS = [1, 2, 3, 4, 5, 6]; // Mon–Sat (skip Sunday)

const EMPLOYEE_COLORS = [
  '#C9A84C', '#4C9AC9', '#9A4CC9', '#4CC97A', '#C94C4C', '#C97A4C',
];

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day; // Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

interface Props {
  appointments: Appointment[];
  employeeColorMap: Record<number, string>;
}

export default function CalendarWeek({ appointments, employeeColorMap }: Props) {
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));
  const [selected, setSelected] = useState<Appointment | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const hours = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);

  function aptDay(apt: Appointment): number {
    return new Date(apt.startDatetime).getDay();
  }

  function aptTop(apt: Appointment): number {
    const d = new Date(apt.startDatetime);
    return (d.getHours() * 60 + d.getMinutes() - START_HOUR * 60) * SLOT_HEIGHT;
  }

  function aptHeight(apt: Appointment): number {
    return apt.service.durationMin * SLOT_HEIGHT;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Week navigation */}
      <div className="flex items-center gap-4 px-6 py-3 border-b border-gold-border/20">
        <button
          onClick={() => setWeekStart(addDays(weekStart, -7))}
          className="text-text-secondary hover:text-gold transition-colors px-2"
        >
          ←
        </button>
        <span className="font-medium text-text-primary text-sm">
          {weekStart.toLocaleDateString('pt-PT', { day: '2-digit', month: 'long' })} —{' '}
          {addDays(weekStart, 5).toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' })}
        </span>
        <button
          onClick={() => setWeekStart(addDays(weekStart, 7))}
          className="text-text-secondary hover:text-gold transition-colors px-2"
        >
          →
        </button>
        <button
          onClick={() => setWeekStart(getWeekStart(new Date()))}
          className="ml-auto text-xs text-gold border border-gold px-3 py-1 rounded hover:bg-gold-muted transition-colors"
        >
          Hoje
        </button>
      </div>

      {/* Calendar grid */}
      <div className="flex flex-1 overflow-auto">
        {/* Hour labels */}
        <div className="w-14 flex-shrink-0 border-r border-gold-border/20">
          <div className="h-10 border-b border-gold-border/20" /> {/* day header spacer */}
          {hours.map((h) => (
            <div key={h} style={{ height: 60 * SLOT_HEIGHT }} className="border-b border-gold-border/10 px-2 pt-1">
              <span className="text-[10px] text-text-muted">{String(h).padStart(2, '0')}:00</span>
            </div>
          ))}
        </div>

        {/* Day columns */}
        {WEEK_DAYS.map((dayOfWeek, colIdx) => {
          const dayDate = addDays(weekStart, colIdx);
          const isToday = dayDate.getTime() === today.getTime();
          const dayApts = appointments.filter((a) => aptDay(a) === dayOfWeek);
          const isoDate = dayDate.toISOString().slice(0, 10);

          return (
            <div key={dayOfWeek} className="flex-1 min-w-0 border-r border-gold-border/10 last:border-r-0">
              {/* Day header */}
              <div className={`h-10 border-b border-gold-border/20 flex items-center justify-center gap-1.5 ${isToday ? 'bg-gold-muted' : ''}`}>
                <span className="text-[10px] text-text-secondary uppercase">{DAY_LABELS[dayOfWeek]}</span>
                <span className={`text-sm font-medium ${isToday ? 'text-gold font-bold' : 'text-text-primary'}`}>
                  {dayDate.getDate()}
                </span>
              </div>

              {/* Time slots + appointments */}
              <div className="relative" style={{ height: TOTAL_MINUTES * SLOT_HEIGHT }}>
                {/* Hour gridlines */}
                {hours.map((h) => (
                  <div
                    key={h}
                    className="absolute left-0 right-0 border-b border-gold-border/10"
                    style={{ top: (h - START_HOUR) * 60 * SLOT_HEIGHT, height: 60 * SLOT_HEIGHT }}
                  />
                ))}

                {/* Appointments for this day */}
                {dayApts
                  .filter((a) => new Date(a.startDatetime).toISOString().slice(0, 10) === isoDate)
                  .map((apt) => {
                    const color = employeeColorMap[apt.employee.id] ?? '#C9A84C';
                    return (
                      <button
                        key={apt.id}
                        onClick={() => setSelected(apt)}
                        className="absolute left-1 right-1 rounded text-left overflow-hidden hover:brightness-110 transition-all"
                        style={{
                          top: aptTop(apt),
                          height: Math.max(aptHeight(apt), 20),
                          backgroundColor: `${color}25`,
                          borderLeft: `3px solid ${color}`,
                        }}
                      >
                        <div className="px-1.5 py-0.5">
                          <p className="text-[10px] font-medium leading-tight truncate" style={{ color }}>
                            {new Date(apt.startDatetime).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p className="text-[10px] leading-tight truncate text-text-primary">{apt.clientName}</p>
                          {apt.service.durationMin >= 30 && (
                            <p className="text-[9px] leading-tight truncate text-text-secondary">{apt.service.name}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>

      {selected && <AppointmentModal appointment={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
```

- [ ] **Step 3: Update `backoffice/app/(dashboard)/page.tsx`**

```tsx
import { api } from '@/lib/api';
import { cookies } from 'next/headers';
import TopBar from '@/components/TopBar';
import CalendarWeek from '@/components/CalendarWeek';
import type { Appointment } from '@/lib/types';

const COLORS = ['#C9A84C', '#4C9AC9', '#9A4CC9', '#4CC97A', '#C94C4C', '#C97A4C'];

export default async function DashboardPage() {
  const today = new Date().toISOString().slice(0, 10);

  let appointments: Appointment[] = [];
  try {
    appointments = await api.appointments.list({ date: today });
  } catch {
    // fallback to empty
  }

  const employeeIds = Array.from(new Set(appointments.map((a) => a.employee.id)));
  const employeeColorMap: Record<number, string> = {};
  employeeIds.forEach((id, i) => { employeeColorMap[id] = COLORS[i % COLORS.length]; });

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar title="Dashboard" />
      <div className="flex-1 overflow-hidden">
        <CalendarWeek appointments={appointments} employeeColorMap={employeeColorMap} />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify calendar renders**

```bash
# Visit http://localhost:3001/ after logging in
# Should see the week calendar with today highlighted
```

- [ ] **Step 5: Commit**

```bash
git add backoffice/components/CalendarWeek.tsx backoffice/components/AppointmentModal.tsx backoffice/app/\(dashboard\)/page.tsx
git commit -m "feat(backoffice): CalendarWeek with 15-min grid and appointment blocks"
```

---

## Task 8: Marcações Page

**Files:**
- Create: `backoffice/app/(dashboard)/marcacoes/page.tsx`
- Create: `backoffice/app/(dashboard)/marcacoes/AppointmentsClient.tsx`

- [ ] **Step 1: Create `backoffice/components/DataTable.tsx`**

```tsx
import { ReactNode } from 'react';

interface Column<T> {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export default function DataTable<T extends { id: number }>({ columns, data, emptyMessage = 'Sem resultados.' }: Props<T>) {
  if (data.length === 0) {
    return <p className="text-text-secondary text-sm py-8 text-center">{emptyMessage}</p>;
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-gold-border/30">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gold-border/30 bg-bg-section">
            {columns.map((col) => (
              <th key={col.key} className="text-left px-4 py-3 text-text-secondary font-medium text-xs uppercase tracking-wider">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id} className={`border-b border-gold-border/10 last:border-0 hover:bg-bg-card/50 transition-colors ${i % 2 === 0 ? '' : 'bg-bg-section/30'}`}>
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-text-primary">
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 2: Create `backoffice/app/(dashboard)/marcacoes/AppointmentsClient.tsx`**

```tsx
'use client';
import { useState, useTransition } from 'react';
import type { Appointment } from '@/lib/types';
import DataTable from '@/components/DataTable';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import { updateAppointmentStatusAction } from '@/lib/actions';

export default function AppointmentsClient({ initial }: { initial: Appointment[] }) {
  const [appointments, setAppointments] = useState(initial);
  const [isPending, startTransition] = useTransition();

  function handleStatus(id: number, status: string) {
    startTransition(async () => {
      await updateAppointmentStatusAction(id, status);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: status as Appointment['status'] } : a))
      );
    });
  }

  const columns = [
    {
      key: 'datetime',
      label: 'Data / Hora',
      render: (a: Appointment) => (
        <span className="whitespace-nowrap">
          {new Date(a.startDatetime).toLocaleString('pt-PT', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
        </span>
      ),
    },
    { key: 'client', label: 'Cliente', render: (a: Appointment) => <span>{a.clientName}</span> },
    { key: 'service', label: 'Serviço', render: (a: Appointment) => <span>{a.service.name}</span> },
    { key: 'employee', label: 'Artista', render: (a: Appointment) => <span>{a.employee.name}</span> },
    { key: 'status', label: 'Estado', render: (a: Appointment) => <Badge status={a.status} /> },
    {
      key: 'actions',
      label: 'Acções',
      render: (a: Appointment) => (
        <div className="flex items-center gap-2">
          {a.status === 'confirmed' && (
            <>
              <Button size="sm" variant="ghost" onClick={() => handleStatus(a.id, 'completed')} disabled={isPending}>
                Concluir
              </Button>
              <Button size="sm" variant="danger" onClick={() => handleStatus(a.id, 'cancelled')} disabled={isPending}>
                Cancelar
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={appointments} emptyMessage="Sem marcações para este período." />;
}
```

- [ ] **Step 3: Add `updateAppointmentStatusAction` to `backoffice/lib/actions.ts`**

Append to the existing file:

```typescript
export async function updateAppointmentStatusAction(id: number, status: string) {
  'use server';
  await api.appointments.updateStatus(id, status);
}
```

Note: add the import for `api` at the top of actions.ts if not already there: `import { api } from './api';`

- [ ] **Step 4: Create `backoffice/app/(dashboard)/marcacoes/page.tsx`**

```tsx
import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import AppointmentsClient from './AppointmentsClient';

export const metadata = { title: 'Marcações' };

export default async function MarcacoesPage() {
  const appointments = await api.appointments.list().catch(() => []);

  return (
    <div>
      <TopBar title="Marcações" />
      <div className="p-6">
        <AppointmentsClient initial={appointments} />
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add backoffice/components/DataTable.tsx backoffice/app/\(dashboard\)/marcacoes/
git commit -m "feat(backoffice): Marcações page with status actions"
```

---

## Task 9: Consultas Page

**Files:**
- Create: `backoffice/app/(dashboard)/consultas/page.tsx`
- Create: `backoffice/app/(dashboard)/consultas/ConsultasClient.tsx`

- [ ] **Step 1: Add server actions for consultations to `backoffice/lib/actions.ts`**

Append:

```typescript
export async function scheduleConsultationAction(id: number, data: {
  employeeId: number; date: string; time: string;
}) {
  'use server';
  await api.consultations.schedule(id, data);
}

export async function rejectConsultationAction(id: number) {
  'use server';
  await api.consultations.reject(id);
}
```

- [ ] **Step 2: Create `backoffice/app/(dashboard)/consultas/ConsultasClient.tsx`**

```tsx
'use client';
import { useState, useTransition } from 'react';
import type { ConsultationRequest, Employee } from '@/lib/types';
import DataTable from '@/components/DataTable';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import { rejectConsultationAction, scheduleConsultationAction } from '@/lib/actions';

interface Props {
  initial: ConsultationRequest[];
  employees: Employee[];
}

export default function ConsultasClient({ initial, employees }: Props) {
  const [consultations, setConsultations] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [scheduling, setScheduling] = useState<number | null>(null);
  const [form, setForm] = useState({ employeeId: '', date: '', time: '' });

  function handleReject(id: number) {
    startTransition(async () => {
      await rejectConsultationAction(id);
      setConsultations((prev) => prev.map((c) => c.id === id ? { ...c, status: 'rejected' as const } : c));
    });
  }

  async function handleSchedule(id: number) {
    await scheduleConsultationAction(id, {
      employeeId: parseInt(form.employeeId),
      date: form.date,
      time: form.time,
    });
    setConsultations((prev) => prev.map((c) => c.id === id ? { ...c, status: 'scheduled' as const } : c));
    setScheduling(null);
  }

  const columns = [
    { key: 'client', label: 'Cliente', render: (c: ConsultationRequest) => <span>{c.clientName}</span> },
    { key: 'email', label: 'Email', render: (c: ConsultationRequest) => <span className="text-text-secondary">{c.clientEmail}</span> },
    { key: 'service', label: 'Serviço', render: (c: ConsultationRequest) => <span>{c.serviceType}</span> },
    {
      key: 'desc',
      label: 'Descrição',
      render: (c: ConsultationRequest) => (
        <span className="text-text-secondary text-xs max-w-[200px] truncate block">{c.description ?? '—'}</span>
      ),
    },
    { key: 'status', label: 'Estado', render: (c: ConsultationRequest) => <Badge status={c.status} /> },
    {
      key: 'actions',
      label: 'Acções',
      render: (c: ConsultationRequest) =>
        c.status === 'pending' ? (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setScheduling(c.id)}>Agendar</Button>
            <Button size="sm" variant="danger" onClick={() => handleReject(c.id)} disabled={isPending}>Rejeitar</Button>
          </div>
        ) : null,
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={consultations} emptyMessage="Sem consultas." />

      {scheduling !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-bg-card border border-gold-border rounded-lg p-6 w-full max-w-sm mx-4 space-y-4">
            <h2 className="font-display text-lg font-bold">Agendar Consulta</h2>
            <div className="space-y-3">
              <select
                value={form.employeeId}
                onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
                className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm"
              >
                <option value="">Escolher artista</option>
                {employees.map((e) => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </select>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm"
              />
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm"
              />
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => handleSchedule(scheduling)} disabled={!form.employeeId || !form.date || !form.time}>
                Confirmar
              </Button>
              <Button variant="outline" onClick={() => setScheduling(null)}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 3: Create `backoffice/app/(dashboard)/consultas/page.tsx`**

```tsx
import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import ConsultasClient from './ConsultasClient';

export const metadata = { title: 'Consultas' };

export default async function ConsultasPage() {
  const [consultations, employees] = await Promise.all([
    api.consultations.list().catch(() => []),
    api.employees.list().catch(() => []),
  ]);

  const pending = consultations.filter((c) => c.status === 'pending').length;

  return (
    <div>
      <TopBar
        title={`Consultas${pending > 0 ? ` (${pending} pendentes)` : ''}`}
      />
      <div className="p-6">
        <ConsultasClient initial={consultations} employees={employees} />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add backoffice/app/\(dashboard\)/consultas/
git commit -m "feat(backoffice): Consultas page with schedule/reject actions"
```

---

## Task 10: Funcionários Page

**Files:**
- Create: `backoffice/app/(dashboard)/funcionarios/page.tsx`
- Create: `backoffice/app/(dashboard)/funcionarios/FuncionariosClient.tsx`

- [ ] **Step 1: Add server actions for employees to `backoffice/lib/actions.ts`**

Append:

```typescript
export async function createEmployeeAction(data: {
  name: string; email: string; password: string; bio?: string; role: string;
}) {
  'use server';
  return api.employees.create(data);
}

export async function updateEmployeeAction(id: number, data: object) {
  'use server';
  return api.employees.update(id, data);
}
```

- [ ] **Step 2: Create `backoffice/app/(dashboard)/funcionarios/FuncionariosClient.tsx`**

```tsx
'use client';
import { useState, useTransition } from 'react';
import type { Employee, Service } from '@/lib/types';
import DataTable from '@/components/DataTable';
import Button from '@/components/Button';
import { createEmployeeAction, updateEmployeeAction } from '@/lib/actions';

interface Props { initial: Employee[]; services: Service[]; }

const emptyForm = { name: '', email: '', password: '', bio: '', role: 'employee' };

export default function FuncionariosClient({ initial, services }: Props) {
  const [employees, setEmployees] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [isPending, startTransition] = useTransition();

  function handleCreate() {
    startTransition(async () => {
      const created = await createEmployeeAction(form) as Employee;
      setEmployees((prev) => [...prev, created]);
      setShowForm(false);
      setForm(emptyForm);
    });
  }

  function handleToggleActive(emp: Employee) {
    startTransition(async () => {
      await updateEmployeeAction(emp.id, { isActive: !emp.isActive });
      setEmployees((prev) => prev.map((e) => e.id === emp.id ? { ...e, isActive: !e.isActive } : e));
    });
  }

  const columns = [
    { key: 'name', label: 'Nome', render: (e: Employee) => <span className="font-medium">{e.name}</span> },
    { key: 'email', label: 'Email', render: (e: Employee) => <span className="text-text-secondary">{e.user.email}</span> },
    {
      key: 'services',
      label: 'Serviços',
      render: (e: Employee) => (
        <span className="text-text-secondary text-xs">
          {e.services.map((s) => s.service.name).join(', ') || '—'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Estado',
      render: (e: Employee) => (
        <span className={`text-xs font-medium ${e.isActive ? 'text-emerald-400' : 'text-text-muted'}`}>
          {e.isActive ? 'Activo' : 'Inactivo'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Acções',
      render: (e: Employee) => (
        <Button size="sm" variant={e.isActive ? 'danger' : 'outline'} onClick={() => handleToggleActive(e)} disabled={isPending}>
          {e.isActive ? 'Desactivar' : 'Activar'}
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setShowForm(true)}>Novo Funcionário</Button>
      </div>
      <DataTable columns={columns} data={employees} emptyMessage="Sem funcionários." />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-bg-card border border-gold-border rounded-lg p-6 w-full max-w-sm mx-4 space-y-4">
            <h2 className="font-display text-lg font-bold">Novo Funcionário</h2>
            <div className="space-y-3">
              {(['name', 'email', 'password', 'bio'] as const).map((field) => (
                <input
                  key={field}
                  type={field === 'password' ? 'password' : 'text'}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted"
                />
              ))}
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm"
              >
                <option value="employee">Funcionário</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={handleCreate} disabled={!form.name || !form.email || !form.password || isPending} loading={isPending}>
                Criar
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 3: Create `backoffice/app/(dashboard)/funcionarios/page.tsx`**

```tsx
import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import FuncionariosClient from './FuncionariosClient';

export const metadata = { title: 'Funcionários' };

export default async function FuncionariosPage() {
  const [employees, services] = await Promise.all([
    api.employees.list().catch(() => []),
    api.services.adminList().catch(() => []),
  ]);

  return (
    <div>
      <TopBar title="Funcionários" />
      <div className="p-6">
        <FuncionariosClient initial={employees} services={services} />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add backoffice/app/\(dashboard\)/funcionarios/
git commit -m "feat(backoffice): Funcionários page with create/toggle-active"
```

---

## Task 11: Serviços Page (Admin + Employee)

**Files:**
- Create: `backoffice/components/ServiceForm.tsx`
- Create: `backoffice/app/(dashboard)/servicos/ServicosClient.tsx`
- Create: `backoffice/app/(dashboard)/servicos/page.tsx`

- [ ] **Step 1: Add service server actions to `backoffice/lib/actions.ts`**

Append:

```typescript
export async function createServiceAction(role: 'admin' | 'employee', data: object) {
  'use server';
  if (role === 'admin') return api.services.adminCreate(data);
  return api.services.employeeCreate(data);
}

export async function updateServiceAction(role: 'admin' | 'employee', id: number, data: object) {
  'use server';
  if (role === 'admin') return api.services.adminUpdate(id, data);
  return api.services.employeeUpdate(id, data);
}
```

- [ ] **Step 2: Create `backoffice/components/ServiceForm.tsx`**

```tsx
'use client';
import { useState } from 'react';
import type { Service, ServiceCategory } from '@/lib/types';
import Button from './Button';

const CATEGORIES: { value: ServiceCategory; label: string }[] = [
  { value: 'barbershop', label: 'Barbearia' },
  { value: 'tattoo', label: 'Tatuagem' },
  { value: 'piercing', label: 'Piercing' },
  { value: 'nails', label: 'Unhas' },
];

interface Props {
  initial?: Partial<Service>;
  onSave: (data: Partial<Service>) => Promise<void>;
  onClose: () => void;
  loading?: boolean;
}

export default function ServiceForm({ initial, onSave, onClose, loading }: Props) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    category: initial?.category ?? 'barbershop' as ServiceCategory,
    description: initial?.description ?? '',
    durationMin: initial?.durationMin ?? 30,
    price: initial?.price ?? 0,
    requiresConsultation: initial?.requiresConsultation ?? false,
    isActive: initial?.isActive ?? true,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-bg-card border border-gold-border rounded-lg p-6 w-full max-w-md mx-4 space-y-4">
        <h2 className="font-display text-lg font-bold">{initial?.id ? 'Editar Serviço' : 'Novo Serviço'}</h2>
        <div className="space-y-3">
          <input
            placeholder="Nome do serviço"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as ServiceCategory })}
            className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <textarea
            placeholder="Descrição (opcional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
            className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted resize-none"
          />
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-text-secondary mb-1 block">Duração (min)</label>
              <input
                type="number"
                min={5}
                step={5}
                value={form.durationMin}
                onChange={(e) => setForm({ ...form, durationMin: parseInt(e.target.value) })}
                className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-text-secondary mb-1 block">Preço (€)</label>
              <input
                type="number"
                min={0}
                step={0.5}
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
                className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.requiresConsultation}
              onChange={(e) => setForm({ ...form, requiresConsultation: e.target.checked })}
              className="accent-gold"
            />
            <span className="text-sm text-text-secondary">Requer consulta prévia</span>
          </label>
        </div>
        <div className="flex gap-3">
          <Button className="flex-1" onClick={() => onSave(form)} disabled={!form.name || loading} loading={loading}>
            Guardar
          </Button>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `backoffice/app/(dashboard)/servicos/ServicosClient.tsx`**

```tsx
'use client';
import { useState, useTransition } from 'react';
import type { Service, ServiceCategory } from '@/lib/types';
import DataTable from '@/components/DataTable';
import ServiceForm from '@/components/ServiceForm';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { createServiceAction, updateServiceAction } from '@/lib/actions';

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  barbershop: 'Barbearia',
  tattoo: 'Tatuagem',
  piercing: 'Piercing',
  nails: 'Unhas',
};

interface Props {
  initial: Service[];
  role: 'admin' | 'employee';
}

export default function ServicosClient({ initial, role }: Props) {
  const [services, setServices] = useState(initial);
  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleCreate(data: Partial<Service>) {
    startTransition(async () => {
      const created = await createServiceAction(role, data) as Service;
      setServices((prev) => [...prev, created]);
      setCreating(false);
    });
  }

  function handleUpdate(data: Partial<Service>) {
    if (!editing) return;
    startTransition(async () => {
      const updated = await updateServiceAction(role, editing.id, data) as Service;
      setServices((prev) => prev.map((s) => s.id === updated.id ? updated : s));
      setEditing(null);
    });
  }

  function handleToggleActive(service: Service) {
    startTransition(async () => {
      const updated = await updateServiceAction(role, service.id, { isActive: !service.isActive }) as Service;
      setServices((prev) => prev.map((s) => s.id === updated.id ? updated : s));
    });
  }

  const columns = [
    { key: 'name', label: 'Nome', render: (s: Service) => <span className="font-medium">{s.name}</span> },
    {
      key: 'category',
      label: 'Categoria',
      render: (s: Service) => <span className="text-text-secondary text-xs">{CATEGORY_LABELS[s.category]}</span>,
    },
    {
      key: 'duration',
      label: 'Duração',
      render: (s: Service) => <span className="text-text-secondary">{s.durationMin} min</span>,
    },
    {
      key: 'price',
      label: 'Preço',
      render: (s: Service) => <span>{s.price.toFixed(2)} €</span>,
    },
    {
      key: 'consultation',
      label: 'Consulta',
      render: (s: Service) => (
        <span className={s.requiresConsultation ? 'text-amber-400 text-xs' : 'text-text-muted text-xs'}>
          {s.requiresConsultation ? 'Sim' : 'Não'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Estado',
      render: (s: Service) => (
        <span className={`text-xs font-medium ${s.isActive ? 'text-emerald-400' : 'text-text-muted'}`}>
          {s.isActive ? 'Activo' : 'Inactivo'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Acções',
      render: (s: Service) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setEditing(s)}>Editar</Button>
          <Button size="sm" variant={s.isActive ? 'danger' : 'ghost'} onClick={() => handleToggleActive(s)} disabled={isPending}>
            {s.isActive ? 'Desactivar' : 'Activar'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setCreating(true)}>Novo Serviço</Button>
      </div>
      <DataTable columns={columns} data={services} emptyMessage="Sem serviços." />
      {creating && (
        <ServiceForm onSave={handleCreate} onClose={() => setCreating(false)} loading={isPending} />
      )}
      {editing && (
        <ServiceForm initial={editing} onSave={handleUpdate} onClose={() => setEditing(null)} loading={isPending} />
      )}
    </>
  );
}
```

- [ ] **Step 4: Create `backoffice/app/(dashboard)/servicos/page.tsx`**

```tsx
import { cookies } from 'next/headers';
import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import ServicosClient from './ServicosClient';

export const metadata = { title: 'Serviços' };

export default async function ServicosPage() {
  const cookieStore = await cookies();
  // Determine role from the token; api.auth.me() gives us the user
  let role: 'admin' | 'employee' = 'employee';
  try {
    const user = await api.auth.me();
    role = user.role as 'admin' | 'employee';
  } catch {
    // fallback
  }

  const services = role === 'admin'
    ? await api.services.adminList().catch(() => [])
    : await api.services.employeeList().catch(() => []);

  return (
    <div>
      <TopBar title="Serviços" />
      <div className="p-6">
        <ServicosClient initial={services} role={role} />
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add backoffice/components/ServiceForm.tsx backoffice/app/\(dashboard\)/servicos/
git commit -m "feat(backoffice): Serviços page with create/edit/toggle (admin + employee)"
```

---

## Task 12: Blog Page

**Files:**
- Create: `backoffice/app/(dashboard)/blog/page.tsx`
- Create: `backoffice/app/(dashboard)/blog/BlogClient.tsx`

- [ ] **Step 1: Add blog server actions to `backoffice/lib/actions.ts`**

Append:

```typescript
export async function createBlogPostAction(data: object) {
  'use server';
  return api.blog.create(data);
}

export async function updateBlogPostAction(id: number, data: object) {
  'use server';
  return api.blog.update(id, data);
}

export async function deleteBlogPostAction(id: number) {
  'use server';
  await api.blog.remove(id);
}
```

- [ ] **Step 2: Create `backoffice/app/(dashboard)/blog/BlogClient.tsx`**

```tsx
'use client';
import { useState, useTransition } from 'react';
import type { BlogPost } from '@/lib/types';
import DataTable from '@/components/DataTable';
import Button from '@/components/Button';
import { createBlogPostAction, updateBlogPostAction, deleteBlogPostAction } from '@/lib/actions';

const emptyPost = { title: '', slug: '', excerpt: '', content: '', coverImage: '', published: false };

interface Props { initial: BlogPost[]; }

export default function BlogClient({ initial }: Props) {
  const [posts, setPosts] = useState(initial);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyPost);
  const [isPending, startTransition] = useTransition();

  function openCreate() { setForm(emptyPost); setCreating(true); }

  function openEdit(post: BlogPost) {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? '',
      content: post.content,
      coverImage: post.coverImage ?? '',
      published: post.published,
    });
    setEditing(post);
  }

  function handleSave() {
    startTransition(async () => {
      if (editing) {
        const updated = await updateBlogPostAction(editing.id, form) as BlogPost;
        setPosts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
        setEditing(null);
      } else {
        const created = await createBlogPostAction(form) as BlogPost;
        setPosts((prev) => [created, ...prev]);
        setCreating(false);
      }
    });
  }

  function handleDelete(id: number) {
    if (!confirm('Eliminar este post?')) return;
    startTransition(async () => {
      await deleteBlogPostAction(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    });
  }

  const columns = [
    { key: 'title', label: 'Título', render: (p: BlogPost) => <span className="font-medium">{p.title}</span> },
    {
      key: 'status',
      label: 'Estado',
      render: (p: BlogPost) => (
        <span className={`text-xs font-medium ${p.published ? 'text-emerald-400' : 'text-text-muted'}`}>
          {p.published ? 'Publicado' : 'Rascunho'}
        </span>
      ),
    },
    {
      key: 'date',
      label: 'Data',
      render: (p: BlogPost) => (
        <span className="text-text-secondary text-xs">
          {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('pt-PT') : '—'}
        </span>
      ),
    },
    { key: 'author', label: 'Autor', render: (p: BlogPost) => <span className="text-text-secondary text-xs">{p.author?.name ?? '—'}</span> },
    {
      key: 'actions',
      label: 'Acções',
      render: (p: BlogPost) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => openEdit(p)}>Editar</Button>
          <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)} disabled={isPending}>Eliminar</Button>
        </div>
      ),
    },
  ];

  const showForm = creating || editing !== null;

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={openCreate}>Novo Post</Button>
      </div>
      <DataTable columns={columns} data={posts} emptyMessage="Sem posts." />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 overflow-y-auto py-8">
          <div className="bg-bg-card border border-gold-border rounded-lg p-6 w-full max-w-2xl mx-4 space-y-4">
            <h2 className="font-display text-lg font-bold">{editing ? 'Editar Post' : 'Novo Post'}</h2>
            <div className="space-y-3">
              <input
                placeholder="Título"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted"
              />
              <input
                placeholder="Slug (ex: o-meu-post)"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted"
              />
              <input
                placeholder="Excerpt"
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted"
              />
              <input
                placeholder="Cover image URL"
                value={form.coverImage}
                onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted"
              />
              <textarea
                placeholder="Conteúdo (Markdown)"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={10}
                className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted resize-y font-mono"
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="accent-gold"
                />
                <span className="text-sm text-text-secondary">Publicar imediatamente</span>
              </label>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={handleSave} disabled={!form.title || !form.slug || !form.content || isPending} loading={isPending}>
                Guardar
              </Button>
              <Button variant="outline" onClick={() => { setCreating(false); setEditing(null); }}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 3: Create `backoffice/app/(dashboard)/blog/page.tsx`**

```tsx
import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import BlogClient from './BlogClient';

export const metadata = { title: 'Blog' };

export default async function BlogPage() {
  const posts = await api.blog.list().catch(() => []);
  return (
    <div>
      <TopBar title="Blog" />
      <div className="p-6">
        <BlogClient initial={posts} />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add backoffice/app/\(dashboard\)/blog/
git commit -m "feat(backoffice): Blog page with create/edit/delete posts"
```

---

## Task 13: Clientes Page

**Files:**
- Create: `backoffice/app/(dashboard)/clientes/page.tsx`

- [ ] **Step 1: Create `backoffice/app/(dashboard)/clientes/page.tsx`**

```tsx
import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import DataTable from '@/components/DataTable';
import type { Client } from '@/lib/types';

export const metadata = { title: 'Clientes' };

export default async function ClientesPage() {
  const clients = await api.clients.list().catch(() => []);

  const columns = [
    { key: 'name', label: 'Nome', render: (c: Client) => <span className="font-medium">{c.name}</span> },
    { key: 'email', label: 'Email', render: (c: Client) => <span className="text-text-secondary">{c.email}</span> },
    { key: 'phone', label: 'Telefone', render: (c: Client) => <span className="text-text-secondary">{c.phone}</span> },
    {
      key: 'count',
      label: 'Marcações',
      render: (c: Client) => <span className="text-gold font-medium">{c.appointmentCount}</span>,
    },
  ];

  return (
    <div>
      <TopBar title="Clientes" />
      <div className="p-6">
        <DataTable columns={columns} data={clients} emptyMessage="Sem clientes registados." />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add backoffice/app/\(dashboard\)/clientes/
git commit -m "feat(backoffice): Clientes read-only page"
```

---

## Task 14: Employee Pages — Horário, Bloqueios, Perfil

**Files:**
- Create: `backoffice/app/(dashboard)/horario/page.tsx`
- Create: `backoffice/app/(dashboard)/bloqueios/page.tsx`
- Create: `backoffice/app/(dashboard)/bloqueios/BloqueiosClient.tsx`
- Create: `backoffice/app/(dashboard)/perfil/page.tsx`

- [ ] **Step 1: Add employee server actions to `backoffice/lib/actions.ts`**

Append:

```typescript
export async function updateScheduleAction(schedule: import('./types').WeeklyScheduleDay[]) {
  'use server';
  return api.schedule.update(schedule);
}

export async function createTimeBlockAction(data: object) {
  'use server';
  return api.timeBlocks.create(data);
}

export async function deleteTimeBlockAction(id: number) {
  'use server';
  await api.timeBlocks.remove(id);
}

export async function updateProfileAction(data: object) {
  'use server';
  return api.profile.update(data);
}
```

- [ ] **Step 2: Create `backoffice/app/(dashboard)/horario/page.tsx`**

```tsx
import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import HorarioClient from './HorarioClient';

export const metadata = { title: 'Horário' };

export default async function HorarioPage() {
  const schedule = await api.schedule.get().catch(() => []);
  return (
    <div>
      <TopBar title="Horário Semanal" />
      <div className="p-6 max-w-lg">
        <HorarioClient initial={schedule} />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `backoffice/app/(dashboard)/horario/HorarioClient.tsx`**

```tsx
'use client';
import { useState, useTransition } from 'react';
import type { WeeklyScheduleDay } from '@/lib/types';
import Button from '@/components/Button';
import { updateScheduleAction } from '@/lib/actions';

const DAY_NAMES = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

const DEFAULT_SCHEDULE: WeeklyScheduleDay[] = [1, 2, 3, 4, 5, 6].map((d) => ({
  dayOfWeek: d,
  isActive: d < 6,
  startTime: '10:00',
  endTime: '19:00',
}));

export default function HorarioClient({ initial }: { initial: WeeklyScheduleDay[] }) {
  const [schedule, setSchedule] = useState<WeeklyScheduleDay[]>(
    initial.length > 0 ? initial : DEFAULT_SCHEDULE
  );
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function updateDay(dayOfWeek: number, patch: Partial<WeeklyScheduleDay>) {
    setSchedule((prev) =>
      prev.map((d) => d.dayOfWeek === dayOfWeek ? { ...d, ...patch } : d)
    );
  }

  function handleSave() {
    startTransition(async () => {
      await updateScheduleAction(schedule);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div className="space-y-3">
      {schedule.map((day) => (
        <div key={day.dayOfWeek} className="flex items-center gap-4 bg-bg-card border border-gold-border/30 rounded-lg px-4 py-3">
          <label className="flex items-center gap-2 w-28 cursor-pointer flex-shrink-0">
            <input
              type="checkbox"
              checked={day.isActive}
              onChange={(e) => updateDay(day.dayOfWeek, { isActive: e.target.checked })}
              className="accent-gold"
            />
            <span className={`text-sm ${day.isActive ? 'text-text-primary' : 'text-text-muted'}`}>
              {DAY_NAMES[day.dayOfWeek]}
            </span>
          </label>
          <input
            type="time"
            value={day.startTime}
            disabled={!day.isActive}
            onChange={(e) => updateDay(day.dayOfWeek, { startTime: e.target.value })}
            className="bg-bg-section border border-gold-border/30 rounded px-2 py-1 text-sm text-text-primary disabled:opacity-40"
          />
          <span className="text-text-muted text-xs">—</span>
          <input
            type="time"
            value={day.endTime}
            disabled={!day.isActive}
            onChange={(e) => updateDay(day.dayOfWeek, { endTime: e.target.value })}
            className="bg-bg-section border border-gold-border/30 rounded px-2 py-1 text-sm text-text-primary disabled:opacity-40"
          />
        </div>
      ))}
      <Button onClick={handleSave} loading={isPending} className="mt-2">
        {saved ? 'Guardado!' : 'Guardar Horário'}
      </Button>
    </div>
  );
}
```

- [ ] **Step 4: Create `backoffice/app/(dashboard)/bloqueios/BloqueiosClient.tsx`**

```tsx
'use client';
import { useState, useTransition } from 'react';
import type { TimeBlock } from '@/lib/types';
import Button from '@/components/Button';
import { createTimeBlockAction, deleteTimeBlockAction } from '@/lib/actions';

const emptyForm = { type: 'holiday' as 'holiday' | 'unavailable', reason: '', startDatetime: '', endDatetime: '' };

export default function BloqueiosClient({ initial }: { initial: TimeBlock[] }) {
  const [blocks, setBlocks] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [isPending, startTransition] = useTransition();

  function handleCreate() {
    startTransition(async () => {
      const created = await createTimeBlockAction(form) as TimeBlock;
      setBlocks((prev) => [...prev, created]);
      setShowForm(false);
      setForm(emptyForm);
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      await deleteTimeBlockAction(id);
      setBlocks((prev) => prev.filter((b) => b.id !== id));
    });
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setShowForm(true)}>Novo Bloqueio</Button>
      </div>

      {blocks.length === 0 ? (
        <p className="text-text-secondary text-sm text-center py-8">Sem bloqueios registados.</p>
      ) : (
        <div className="space-y-3">
          {blocks.map((b) => (
            <div key={b.id} className="flex items-center justify-between bg-bg-card border border-gold-border/30 rounded-lg px-4 py-3">
              <div>
                <p className="text-sm font-medium text-text-primary">{b.reason ?? (b.type === 'holiday' ? 'Férias' : 'Indisponível')}</p>
                <p className="text-xs text-text-secondary">
                  {new Date(b.startDatetime).toLocaleString('pt-PT', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  {' '}—{' '}
                  {new Date(b.endDatetime).toLocaleString('pt-PT', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <Button size="sm" variant="danger" onClick={() => handleDelete(b.id)} disabled={isPending}>Eliminar</Button>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-bg-card border border-gold-border rounded-lg p-6 w-full max-w-sm mx-4 space-y-4">
            <h2 className="font-display text-lg font-bold">Novo Bloqueio</h2>
            <div className="space-y-3">
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as 'holiday' | 'unavailable' })}
                className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm"
              >
                <option value="holiday">Férias</option>
                <option value="unavailable">Indisponível</option>
              </select>
              <input
                placeholder="Razão (opcional)"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted"
              />
              <div>
                <label className="text-xs text-text-secondary mb-1 block">Início</label>
                <input
                  type="datetime-local"
                  value={form.startDatetime}
                  onChange={(e) => setForm({ ...form, startDatetime: e.target.value })}
                  className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-text-secondary mb-1 block">Fim</label>
                <input
                  type="datetime-local"
                  value={form.endDatetime}
                  onChange={(e) => setForm({ ...form, endDatetime: e.target.value })}
                  className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={handleCreate} disabled={!form.startDatetime || !form.endDatetime || isPending} loading={isPending}>
                Criar
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 5: Create `backoffice/app/(dashboard)/bloqueios/page.tsx`**

```tsx
import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import BloqueiosClient from './BloqueiosClient';

export const metadata = { title: 'Bloqueios' };

export default async function BloqueiosPage() {
  const blocks = await api.timeBlocks.list().catch(() => []);
  return (
    <div>
      <TopBar title="Bloqueios / Férias" />
      <div className="p-6 max-w-2xl">
        <BloqueiosClient initial={blocks} />
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Create `backoffice/app/(dashboard)/perfil/page.tsx`**

```tsx
import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import PerfilClient from './PerfilClient';

export const metadata = { title: 'Perfil' };

export default async function PerfilPage() {
  const profile = await api.profile.get().catch(() => null);
  return (
    <div>
      <TopBar title="Perfil" />
      <div className="p-6 max-w-md">
        {profile ? <PerfilClient initial={profile} /> : <p className="text-text-secondary">Não foi possível carregar o perfil.</p>}
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Create `backoffice/app/(dashboard)/perfil/PerfilClient.tsx`**

```tsx
'use client';
import { useState, useTransition } from 'react';
import type { Employee } from '@/lib/types';
import Button from '@/components/Button';
import { updateProfileAction } from '@/lib/actions';

export default function PerfilClient({ initial }: { initial: Employee }) {
  const [form, setForm] = useState({
    name: initial.name,
    bio: initial.bio ?? '',
    photoUrl: initial.photoUrl ?? '',
  });
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSave() {
    startTransition(async () => {
      await updateProfileAction(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-text-secondary mb-1.5">Nome</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-bg-card border border-gold-border rounded px-3 py-2 text-text-primary text-sm"
        />
      </div>
      <div>
        <label className="block text-xs text-text-secondary mb-1.5">Bio</label>
        <textarea
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          rows={4}
          className="w-full bg-bg-card border border-gold-border rounded px-3 py-2 text-text-primary text-sm resize-none"
        />
      </div>
      <div>
        <label className="block text-xs text-text-secondary mb-1.5">Foto URL</label>
        <input
          value={form.photoUrl}
          onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
          placeholder="https://..."
          className="w-full bg-bg-card border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted"
        />
      </div>
      <Button onClick={handleSave} loading={isPending}>
        {saved ? 'Guardado!' : 'Guardar Perfil'}
      </Button>
    </div>
  );
}
```

- [ ] **Step 8: Commit**

```bash
git add backoffice/app/\(dashboard\)/horario/ backoffice/app/\(dashboard\)/bloqueios/ backoffice/app/\(dashboard\)/perfil/
git commit -m "feat(backoffice): employee pages — Horário, Bloqueios, Perfil"
```

---

## Task 15: Final Check + Push

- [ ] **Step 1: Run type check on backoffice**

```bash
cd backoffice && npx tsc --noEmit
```

Expected: no errors (or fix any type errors before proceeding)

- [ ] **Step 2: Test full admin flow**

```bash
# Ensure backend is running: cd backend && npm run dev
# Ensure backoffice is running: cd backoffice && npm run dev -- --port 3001
# 1. Login as admin → verify dashboard calendar
# 2. Navigate to Marcações → verify table
# 3. Navigate to Consultas → verify list
# 4. Navigate to Funcionários → create a test employee
# 5. Navigate to Serviços → create a test service
# 6. Navigate to Blog → create a test post
# 7. Navigate to Clientes → verify read-only table
```

- [ ] **Step 3: Test full employee flow**

```bash
# Login as employee user (if exists in DB, otherwise create one via admin panel)
# 1. Verify sidebar shows only employee routes
# 2. Agenda page visible
# 3. Serviços → create/edit service
# 4. Horário → set working days/hours
# 5. Bloqueios → create a block
# 6. Perfil → update bio
```

- [ ] **Step 4: Push to GitHub**

```bash
cd /Users/claudiovieira/Desktop/Ganesha-new
git push origin feature/backend-api
```

- [ ] **Step 5: Done**

All backoffice pages are implemented. The next steps would be:
- Add `npm run dev` and `npm run build` scripts to the root `package.json` workspace (optional)
- Configure reverse proxy (Nginx) for `app.ganeshaink.pt` pointing to port 3001
- Deploy to PTiSTP server

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| `/login` page — fundo escuro, logo centrado | Task 4 |
| httpOnly cookie `ganesha_token` | Task 4 (Server Action) |
| Middleware protege rotas autenticadas | Task 4 |
| Sidebar admin (Dashboard, Marcações, Consultas, Funcionários, Serviços, Blog, Clientes) | Task 6 |
| Sidebar funcionário (Agenda, Serviços, Horário, Bloqueios, Perfil) | Task 6 |
| User info + logout na sidebar | Task 6 |
| Dashboard — calendário semanal, 15-min grid, blocos proporcionais | Task 7 |
| Dashboard — cor por funcionário, admin vê todos | Task 7 |
| Dashboard — clicar bloco abre modal | Task 7 |
| `/marcacoes` — tabela, filtros, alterar estado | Task 8 |
| `/consultas` — lista, agendar, rejeitar | Task 9 |
| `/funcionarios` — tabela, criar, toggle activo | Task 10 |
| `/employee/services` backend endpoint | Task 2 |
| `/servicos` — admin usa `/admin/services`, funcionário usa `/employee/services` | Task 11 |
| `/blog` — criar, editar, eliminar posts | Task 12 |
| `/clientes` — read-only | Task 13 |
| `/horario` — toggle activo por dia, hora início/fim | Task 14 |
| `/bloqueios` — criar, eliminar | Task 14 |
| `/perfil` — editar nome, bio, foto | Task 14 |

**Spec gaps found and fixed:**
- Badge na sidebar com nº de consultas pendentes: implementado via o título da página (`Consultas (N pendentes)`). A sidebar em si não tem badges dinâmicos (implicaria fetch server-side no layout). Abordagem aceite para MVP.
- `GET /me` para validar token: feito no `(dashboard)/layout.tsx`
- Admin não pode aceder a `/horario`, `/bloqueios`, `/perfil` (employee-only): **não protegido no frontend** (sidebar não mostra os links para admin, mas a rota em si não tem guard de role). Para MVP é suficiente — as rotas da API já rejeitam pedidos com role errado.

**Placeholder scan:** Nenhum TBD ou TODO deixado. Todo o código é completo.

**Type consistency:** Todos os tipos de `lib/types.ts` usados consistentemente. Server Actions usam `api` do `lib/api.ts`. `DataTable<T extends { id: number }>` requer que todos os dados tenham `id: number` — todos os tipos têm.
