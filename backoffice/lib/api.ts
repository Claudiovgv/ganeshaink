import { cookies } from 'next/headers';
import type {
  AdminPermissionKey, Appointment, BlogPost, BarbershopStatsResponse, Category, Client, ConfigurableRole, ConsultationRequest, CreateAppointmentResult,
  Employee, EmployeePermissionKey, EmployeeSchedules, Service, SmtpSettings, NotificationMatrix, Partnership, StatsPeriod, StatsResponse, SystemLogEntry,
  TimeBlock, TimeBlockConflict, TimeBlockInput, User, WeeklyScheduleDay, AppointmentExportRow,
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
    me: () => apiFetch<User>('/auth/me'),
    login: (email: string, password: string) =>
      apiFetch<{ token: string; user: User } | { requires2FA: true; needsSetup: boolean; pendingToken: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    setupPendingLogin2FA: (pendingToken: string) =>
      apiFetch<{ secret: string; qrCodeDataUrl: string }>('/auth/login/setup-2fa', {
        method: 'POST',
        body: JSON.stringify({ pendingToken }),
      }),
    verify2FA: (pendingToken: string, code: string) =>
      apiFetch<{ token: string; user: User }>('/auth/login/verify-2fa', {
        method: 'POST',
        body: JSON.stringify({ pendingToken, code }),
      }),
    setup2FA: () =>
      apiFetch<{ secret: string; qrCodeDataUrl: string }>('/auth/2fa/setup', { method: 'POST' }),
    enable2FA: (code: string) =>
      apiFetch<{ message: string }>('/auth/2fa/enable', { method: 'POST', body: JSON.stringify({ code }) }),
    disable2FA: (password: string) =>
      apiFetch<{ message: string }>('/auth/2fa/disable', { method: 'POST', body: JSON.stringify({ password }) }),
  },
  appointments: {
    list: (params?: { date?: string; employeeId?: number; status?: string }) => {
      const q = new URLSearchParams(
        Object.entries(params ?? {}).filter(([, v]) => v !== undefined).map(([k, v]) => [k, String(v)])
      ).toString();
      return apiFetch<Appointment[]>(`/admin/appointments${q ? `?${q}` : ''}`);
    },
    create: async (data: object): Promise<CreateAppointmentResult> => {
      const cookieStore = await cookies();
      const token = cookieStore.get('ganesha_token')?.value;
      const res = await fetch(`${API}/admin/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(data),
        cache: 'no-store',
      });
      const body = await res.json().catch(() => ({}));
      if (res.status === 409 && body.conflict) return { ok: false, conflict: body.conflict };
      if (!res.ok) throw new Error(body.error ?? res.statusText);
      return { ok: true, appointment: body as Appointment };
    },
    updateStatus: (id: number, status: string) =>
      apiFetch<Appointment>(`/admin/appointments/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),
    updateClient: (id: number, data: { clientName?: string; clientEmail?: string; clientPhone?: string; price?: number | string | null; partnershipId?: number | null; extraFieldValue?: string | null }) =>
      apiFetch<Appointment>(`/admin/appointments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id: number) =>
      apiFetch<{ message: string }>(`/admin/appointments/${id}`, { method: 'DELETE' }),
    exportAll: () => apiFetch<{ exportedAt: string; count: number; appointments: AppointmentExportRow[] }>('/admin/appointments/export'),
    importAll: (appointments: AppointmentExportRow[]) =>
      apiFetch<{ created: number; skipped: number; errors: string[]; total: number }>(
        '/admin/appointments/import',
        { method: 'POST', body: JSON.stringify({ appointments }) },
      ),
    myList: (params?: { date?: string }) => {
      const q = new URLSearchParams(
        Object.entries(params ?? {}).filter(([, v]) => v !== undefined).map(([k, v]) => [k, String(v)])
      ).toString();
      return apiFetch<Appointment[]>(`/employee/appointments${q ? `?${q}` : ''}`);
    },
  },
    consultations: {
    list: (params?: { status?: string; category?: string; excludeCategory?: string }) => {
      const q = new URLSearchParams(
        Object.entries(params ?? {}).filter(([, v]) => v).map(([k, v]) => [k, String(v)])
      ).toString();
      return apiFetch<ConsultationRequest[]>(`/admin/consultations${q ? `?${q}` : ''}`);
    },
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
    remove: (id: number) =>
      apiFetch<{ message: string }>(`/admin/employees/${id}`, { method: 'DELETE' }),
    reorder: (employeeIds: number[]) =>
      apiFetch<Employee[]>('/admin/employees/reorder', { method: 'PUT', body: JSON.stringify({ employeeIds }) }),
    uploadPhoto: async (id: number, formData: FormData) => {
      const cookieStore = await cookies();
      const token = cookieStore.get('ganesha_token')?.value;
      const res = await fetch(`${API}/admin/employees/${id}/photo`, {
        method: 'POST',
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: formData,
        cache: 'no-store',
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error ?? res.statusText);
      }
      return res.json() as Promise<Employee>;
    },
  },
  services: {
    adminList: () => apiFetch<Service[]>('/admin/services'),
    adminCreate: (data: object) =>
      apiFetch<Service>('/admin/services', { method: 'POST', body: JSON.stringify(data) }),
    adminUpdate: (id: number, data: object) =>
      apiFetch<Service>(`/admin/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    adminRemove: (id: number) =>
      apiFetch<{ message: string }>(`/admin/services/${id}`, { method: 'DELETE' }),
    employeeList: () => apiFetch<Service[]>('/employee/services'),
    employeeCreate: (data: object) =>
      apiFetch<Service>('/employee/services', { method: 'POST', body: JSON.stringify(data) }),
    employeeUpdate: (id: number, data: object) =>
      apiFetch<Service>(`/employee/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    adminReorder: (serviceIds: number[]) =>
      apiFetch<Service[]>('/admin/services/reorder', { method: 'PUT', body: JSON.stringify({ serviceIds }) }),
    myOrder: () => apiFetch<Service[]>('/employee/services/my-order'),
    updateMyOrder: (serviceIds: number[]) =>
      apiFetch<Service[]>('/employee/services/my-order', { method: 'PUT', body: JSON.stringify({ serviceIds }) }),
    reorderForEmployee: (employeeId: number, serviceIds: number[]) =>
      apiFetch<Service[]>(`/admin/employees/${employeeId}/services/reorder`, {
        method: 'PUT',
        body: JSON.stringify({ serviceIds }),
      }),
  },
  categories: {
    list: () => apiFetch<Category[]>('/categories'),
    adminList: () => apiFetch<Category[]>('/admin/categories'),
    create: (name: string, parentId?: number) =>
      apiFetch<Category>('/admin/categories', { method: 'POST', body: JSON.stringify({ name, parentId }) }),
    update: (id: number, data: { name?: string; isActive?: boolean }) =>
      apiFetch<Category>(`/admin/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    reorder: (categoryIds: number[]) =>
      apiFetch<Category[]>('/admin/categories/reorder', { method: 'PUT', body: JSON.stringify({ categoryIds }) }),
    remove: (id: number) =>
      apiFetch<{ message: string }>(`/admin/categories/${id}`, { method: 'DELETE' }),
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
    updateNickname: (email: string, nickname: string) =>
      apiFetch<{ email: string; nickname: string | null }>(`/admin/clients/${encodeURIComponent(email)}/nickname`, {
        method: 'PUT',
        body: JSON.stringify({ nickname }),
      }),
  },
  schedule: {
    get: () => apiFetch<WeeklyScheduleDay[]>('/employee/schedule'),
    update: (data: WeeklyScheduleDay[]) =>
      apiFetch<WeeklyScheduleDay[]>('/employee/schedule', { method: 'PUT', body: JSON.stringify({ schedules: data }) }),
  },
  adminSchedules: {
    list: () => apiFetch<EmployeeSchedules[]>('/admin/schedules'),
    update: (employeeId: number, data: WeeklyScheduleDay[]) =>
      apiFetch<WeeklyScheduleDay[]>(`/admin/schedules/${employeeId}`, {
        method: 'PUT',
        body: JSON.stringify({ schedules: data }),
      }),
  },
  timeBlocks: {
    list: () => apiFetch<TimeBlock[]>('/employee/time-blocks'),
    preview: (data: TimeBlockInput) =>
      apiFetch<{ conflicts: TimeBlockConflict[] }>('/employee/time-blocks/preview', { method: 'POST', body: JSON.stringify(data) }),
    create: (data: TimeBlockInput) =>
      apiFetch<TimeBlock>('/employee/time-blocks', { method: 'POST', body: JSON.stringify(data) }),
    remove: (id: number) =>
      apiFetch<void>(`/employee/time-blocks/${id}`, { method: 'DELETE' }),
  },
  adminBlocks: {
    list: () => apiFetch<TimeBlock[]>('/admin/blocks'),
    preview: (data: TimeBlockInput) =>
      apiFetch<{ conflicts: TimeBlockConflict[] }>('/admin/blocks/preview', { method: 'POST', body: JSON.stringify(data) }),
    create: (data: TimeBlockInput) =>
      apiFetch<TimeBlock[]>('/admin/blocks', { method: 'POST', body: JSON.stringify(data) }),
    remove: (id: number) =>
      apiFetch<void>(`/admin/blocks/${id}`, { method: 'DELETE' }),
  },
  profile: {
    get: () => apiFetch<Employee>('/employee/profile'),
    update: (data: object) =>
      apiFetch<Employee>('/employee/profile', { method: 'PUT', body: JSON.stringify(data) }),
    uploadPhoto: async (formData: FormData) => {
      const cookieStore = await cookies();
      const token = cookieStore.get('ganesha_token')?.value;
      const res = await fetch(`${API}/employee/profile/photo`, {
        method: 'POST',
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: formData,
        cache: 'no-store',
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error ?? res.statusText);
      }
      return res.json() as Promise<Employee>;
    },
  },
  settings: {
    getSmtp: () => apiFetch<SmtpSettings>('/admin/settings/smtp'),
    updateSmtp: (data: Partial<SmtpSettings>) =>
      apiFetch<SmtpSettings>('/admin/settings/smtp', { method: 'PUT', body: JSON.stringify(data) }),
    testSmtp: (data: Partial<SmtpSettings> & { testEmail: string }) =>
      apiFetch<{ message: string }>('/admin/settings/smtp/test', { method: 'POST', body: JSON.stringify(data) }),
    getNotifications: () => apiFetch<NotificationMatrix>('/admin/settings/notifications'),
    updateNotifications: (data: {
      preferences: { userId: number; eventType: string; enabled: boolean }[];
      mailboxes?: { userId: number; notificationEmail: string }[];
    }) =>
      apiFetch<NotificationMatrix>('/admin/settings/notifications', { method: 'PUT', body: JSON.stringify(data) }),
    testSmtpTemplate: (data: { eventType: string; testEmail: string; audience?: 'client' | 'staff' }) =>
      apiFetch<{ message: string }>('/admin/settings/smtp/test-template', { method: 'POST', body: JSON.stringify(data) }),
  },
  logs: {
    list: (params?: { level?: string; page?: number }) => {
      const q = new URLSearchParams(
        Object.entries(params ?? {}).filter(([, v]) => v !== undefined).map(([k, v]) => [k, String(v)])
      ).toString();
      return apiFetch<{ logs: SystemLogEntry[]; total: number; page: number; pageSize: number }>(
        `/admin/logs${q ? `?${q}` : ''}`
      );
    },
    clear: () => apiFetch<{ deleted: number; message: string }>('/admin/logs', { method: 'DELETE' }),
    loginBlocks: () => apiFetch<{ blocks: { key: string; hits: number; resetAt: string }[] }>('/admin/logs/login-blocks'),
    unlockLogins: () => apiFetch<{ message: string }>('/admin/logs/login-blocks', { method: 'DELETE' }),
  },
  partnerships: {
    list: () => apiFetch<Partnership[]>('/admin/partnerships'),
    create: (data: { name: string; percent: number; extraFieldLabel?: string | null }) =>
      apiFetch<Partnership>('/admin/partnerships', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: { name?: string; percent?: number; extraFieldLabel?: string | null; isActive?: boolean }) =>
      apiFetch<Partnership>(`/admin/partnerships/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id: number) =>
      apiFetch<{ message: string }>(`/admin/partnerships/${id}`, { method: 'DELETE' }),
  },
  users: {
    list: () => apiFetch<User[]>('/admin/users'),
    create: (data: { name: string; email: string; password: string; role: string }) =>
      apiFetch<User>('/admin/users', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: { name?: string; role?: string; notificationEmail?: string | null }) =>
      apiFetch<User>(`/admin/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id: number) =>
      apiFetch<{ message: string }>(`/admin/users/${id}`, { method: 'DELETE' }),
  },
  roles: {
    get: () => apiFetch<{
      keys: { admin: AdminPermissionKey[]; employee: EmployeePermissionKey[] };
      permissions: { admin: Record<AdminPermissionKey, boolean>; employee: Record<EmployeePermissionKey, boolean> };
    }>('/admin/roles'),
    update: (role: ConfigurableRole, permissions: Record<string, boolean>) =>
      apiFetch<{ role: ConfigurableRole; permissions: Record<string, boolean> }>('/admin/roles', {
        method: 'PUT',
        body: JSON.stringify({ role, permissions }),
      }),
  },
  stats: {
    get: (period: StatsPeriod, offset: number) =>
      apiFetch<StatsResponse>(`/admin/stats?period=${period}&offset=${offset}`),
    getBarbershop: (period: StatsPeriod, offset: number) =>
      apiFetch<BarbershopStatsResponse>(`/admin/stats/barbershop?period=${period}&offset=${offset}`),
  },
};
