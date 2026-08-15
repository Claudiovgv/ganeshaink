export type AdminPermissionKey = 'manage_appointments' | 'manage_employees' | 'manage_services' | 'manage_clients' | 'manage_blog' | 'manage_settings' | 'view_stats';
export type EmployeePermissionKey = 'view_services' | 'manage_schedule' | 'manage_blocks' | 'edit_profile';
export type ConfigurableRole = 'admin' | 'employee';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'employee';
  twoFactorEnabled?: boolean;
  permissions?: Partial<Record<AdminPermissionKey | EmployeePermissionKey, boolean>>;
  createdAt?: string;
  employee?: { id: number; isActive: boolean } | null;
}

export interface Employee {
  id: number;
  name: string;
  bio: string | null;
  photoUrl: string | null;
  materialCost: number | null;
  payoutPercent: number | null;
  isActive: boolean;
  user: { id: number; email: string; role: string };
  services: { service: Service }[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  sortOrder: number;
  isActive: boolean;
  parentId: number | null;
  _count?: { services: number };
  children?: Category[];
}

export interface Service {
  id: number;
  name: string;
  categoryId: number;
  category: Category;
  description: string | null;
  durationMin: number;
  price: number;
  requiresConsultation: boolean;
  isActive: boolean;
  sortOrder?: number;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Appointment {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  startDatetime: string;
  endDatetime: string;
  status: AppointmentStatus;
  price: number | null;
  notes: string | null;
  employee: { id: number; name: string };
  service: Service;
  cancelToken: string;
}

export interface AppointmentConflict {
  clientName: string;
  startDatetime: string;
  endDatetime: string;
  service: string;
}

export type CreateAppointmentResult = { ok: true; appointment: Appointment } | { ok: false; conflict: AppointmentConflict };

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

export interface EmployeeSchedules {
  id: number;
  name: string;
  workSchedules: Omit<WeeklyScheduleDay, 'isActive'>[];
}

export type TimeBlockType = 'vacation' | 'break' | 'custom';

export interface TimeBlock {
  id: number;
  employeeId: number;
  employee?: { id: number; name: string };
  type: TimeBlockType;
  reason: string | null;
  startDatetime: string;
  endDatetime: string;
}

export interface TimeBlockInput {
  employeeId?: number | 'all'; // só usado nas rotas de admin
  type: TimeBlockType;
  reason?: string;
  startDate: string; // "yyyy-MM-dd"
  startTime?: string; // "HH:mm" — não usado quando type === 'vacation'
  endDate: string;
  endTime?: string;
  cancelAppointmentIds?: number[];
}

export interface TimeBlockConflict {
  id: number;
  clientName: string;
  clientEmail: string;
  startDatetime: string;
  endDatetime: string;
  service: { name: string };
  employee: { id: number; name: string };
}

export interface SmtpSettings {
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPass: string;
  smtpFrom: string;
  source: 'database' | 'env';
}

export type LogLevel = 'info' | 'warning' | 'error' | 'security';

export interface SystemLogEntry {
  id: number;
  level: LogLevel;
  category: string;
  message: string;
  ip: string | null;
  userId: number | null;
  meta: unknown;
  createdAt: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  nickname: string | null;
  appointmentCount: number;
}

export type StatsPeriod = 'week' | 'month' | 'year';

export interface StatsByCategory {
  category: Category;
  revenue: number;
  count: number;
}

export interface StatsByService {
  serviceId: number;
  name: string;
  category: Category;
  revenue: number;
  count: number;
}

export interface StatsResponse {
  period: StatsPeriod;
  offset: number;
  range: { start: string; end: string };
  totalRevenue: number;
  totalAppointments: number;
  averageTicket: number;
  byCategory: StatsByCategory[];
  byService: StatsByService[];
  mostRequested: StatsByService | null;
}

export interface BarberStats {
  employeeId: number;
  name: string;
  count: number;
  revenue: number;
  materialCost: number;
  netRevenue: number;
  payoutPercent: number | null;
  payoutAmount: number;
  hasConfig: boolean;
}

export interface BarbershopStatsResponse {
  period: StatsPeriod;
  offset: number;
  range: { start: string; end: string };
  barbers: BarberStats[];
  totals: { count: number; revenue: number; materialCost: number; netRevenue: number; payoutAmount: number };
}
