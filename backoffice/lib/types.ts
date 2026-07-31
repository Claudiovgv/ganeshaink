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
  appointmentCount: number;
}

export type StatsPeriod = 'week' | 'month' | 'year';

export interface StatsByCategory {
  category: ServiceCategory;
  revenue: number;
  count: number;
}

export interface StatsByService {
  serviceId: number;
  name: string;
  category: ServiceCategory;
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
