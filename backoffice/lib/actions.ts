'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { api } from './api';

type ActionState = { error: string } | null;

export async function loginAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
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

export async function updateAppointmentStatusAction(id: number, status: string) {
  await api.appointments.updateStatus(id, status);
}

export async function scheduleConsultationAction(id: number, data: { employeeId: number; date: string; time: string }) {
  await api.consultations.schedule(id, data);
}

export async function rejectConsultationAction(id: number) {
  await api.consultations.reject(id);
}

export async function createEmployeeAction(data: object) {
  return api.employees.create(data);
}

export async function updateEmployeeAction(id: number, data: object) {
  return api.employees.update(id, data);
}

export async function createServiceAction(role: 'admin' | 'employee', data: object) {
  if (role === 'admin') return api.services.adminCreate(data);
  return api.services.employeeCreate(data);
}

export async function updateServiceAction(role: 'admin' | 'employee', id: number, data: object) {
  if (role === 'admin') return api.services.adminUpdate(id, data);
  return api.services.employeeUpdate(id, data);
}

export async function createBlogPostAction(data: object) {
  return api.blog.create(data);
}

export async function updateBlogPostAction(id: number, data: object) {
  return api.blog.update(id, data);
}

export async function deleteBlogPostAction(id: number) {
  await api.blog.remove(id);
}

export async function updateScheduleAction(schedule: import('./types').WeeklyScheduleDay[]) {
  return api.schedule.update(schedule);
}

export async function createTimeBlockAction(data: object) {
  return api.timeBlocks.create(data);
}

export async function deleteTimeBlockAction(id: number) {
  await api.timeBlocks.remove(id);
}

export async function updateProfileAction(data: object) {
  return api.profile.update(data);
}
