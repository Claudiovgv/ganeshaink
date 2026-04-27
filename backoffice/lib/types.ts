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
