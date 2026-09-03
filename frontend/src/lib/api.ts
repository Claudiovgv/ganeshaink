import { reportClientError } from './reportError';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/v1';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    const method = (options?.method || 'GET').toUpperCase();
    const headers = new Headers(options?.headers);
    if (method !== 'GET' && method !== 'HEAD' && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: res.statusText }));
      if (res.status >= 500) {
        reportClientError({
          message: `Erro no site (${res.status}) ao pedir ${path}`,
          path,
          status: res.status,
          detail: body.error,
        });
      }
      throw new ApiError(res.status, body.error || res.statusText);
    }
    return res.json();
  } catch (err) {
    if (err instanceof ApiError) throw err;
    reportClientError({
      message: `Erro ao abrir/ligar ao site (${path})`,
      path,
      detail: err instanceof Error ? err.message : String(err),
    });
    throw err;
  }
}

export interface Employee {
  id: number;
  name: string;
  bio: string | null;
  photoUrl: string | null;
  services: Service[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  sortOrder: number;
  children?: Category[];
}

export interface Service {
  id: number;
  name: string;
  category: Category;
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

export const api = {
  employees: {
    list: () => apiFetch<Employee[]>('/employees', { cache: 'no-store' }),
    get: (id: number) => apiFetch<Employee>(`/employees/${id}`, { cache: 'no-store' }),
  },
  services: {
    list: (category?: string) =>
      apiFetch<Service[]>(
        category ? `/services?category=${category}` : '/services',
        { cache: 'no-store' },
      ),
  },
  categories: {
    list: () => apiFetch<Category[]>('/categories', { cache: 'no-store' }),
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
    list: () => apiFetch<BlogPost[]>('/blog', { next: { revalidate: 600 } } as RequestInit),
    get: (slug: string) => apiFetch<BlogPost>(`/blog/${slug}`, { next: { revalidate: 600 } } as RequestInit),
  },
};
