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
