'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { api } from './api';

type ActionState = { error: string } | { requires2FA: true; needsSetup: boolean; pendingToken: string } | null;

function setSessionCookie(cookieStore: Awaited<ReturnType<typeof cookies>>, token: string) {
  cookieStore.set('ganesha_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function loginAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  let result: { token: string; user: { role: string } } | { requires2FA: true; needsSetup: boolean; pendingToken: string };
  try {
    result = await api.auth.login(email, password);
  } catch (err) {
    return { error: (err as Error).message };
  }

  if ('requires2FA' in result) {
    return { requires2FA: true, needsSetup: result.needsSetup, pendingToken: result.pendingToken };
  }

  const cookieStore = await cookies();
  setSessionCookie(cookieStore, result.token);

  redirect('/');
}

export async function setupPendingLogin2FAAction(pendingToken: string) {
  return api.auth.setupPendingLogin2FA(pendingToken);
}

export async function verify2FAAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const pendingToken = formData.get('pendingToken') as string;
  const code = formData.get('code') as string;

  let result: { token: string; user: { role: string } };
  try {
    result = await api.auth.verify2FA(pendingToken, code);
  } catch (err) {
    return { error: (err as Error).message };
  }

  const cookieStore = await cookies();
  setSessionCookie(cookieStore, result.token);

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

export async function createAppointmentAction(data: {
  clientName: string; clientEmail?: string; clientPhone?: string;
  employeeId: number; serviceId: number; date: string; time: string; notes?: string; force?: boolean;
}) {
  return api.appointments.create(data);
}

export async function updateAppointmentClientAction(
  id: number,
  data: { clientName?: string; clientEmail?: string; clientPhone?: string; price?: number | string | null },
) {
  return api.appointments.updateClient(id, data);
}

export async function scheduleConsultationAction(id: number, data: { employeeId: number; date: string; time: string }) {
  await api.consultations.schedule(id, data);
}

export async function rejectConsultationAction(id: number) {
  await api.consultations.reject(id);
}

export async function updateClientNicknameAction(email: string, nickname: string) {
  return api.clients.updateNickname(email, nickname);
}

export async function createEmployeeAction(data: object) {
  return api.employees.create(data);
}

export async function updateEmployeeAction(id: number, data: object) {
  return api.employees.update(id, data);
}

export async function deleteEmployeeAction(id: number) {
  return api.employees.remove(id);
}

export async function reorderEmployeesAction(employeeIds: number[]) {
  return api.employees.reorder(employeeIds);
}

export async function createServiceAction(role: 'superadmin' | 'admin' | 'employee', data: object) {
  if (role === 'admin' || role === 'superadmin') return api.services.adminCreate(data);
  return api.services.employeeCreate(data);
}

export async function updateServiceAction(role: 'superadmin' | 'admin' | 'employee', id: number, data: object) {
  if (role === 'admin' || role === 'superadmin') return api.services.adminUpdate(id, data);
  return api.services.employeeUpdate(id, data);
}

export async function deleteServiceAction(id: number) {
  return api.services.adminRemove(id);
}

export async function reorderCatalogAction(serviceIds: number[]) {
  return api.services.adminReorder(serviceIds);
}

export async function updateMyServiceOrderAction(serviceIds: number[]) {
  return api.services.updateMyOrder(serviceIds);
}

export async function reorderEmployeeServicesAction(employeeId: number, serviceIds: number[]) {
  return api.services.reorderForEmployee(employeeId, serviceIds);
}

export async function createCategoryAction(name: string, parentId?: number) {
  return api.categories.create(name, parentId);
}

export async function updateCategoryAction(id: number, data: { name?: string; isActive?: boolean }) {
  return api.categories.update(id, data);
}

export async function deleteCategoryAction(id: number) {
  return api.categories.remove(id);
}

export async function reorderCategoriesAction(categoryIds: number[]) {
  return api.categories.reorder(categoryIds);
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

// O backend guarda apenas os dias em que se trabalha — os dias desligados
// desaparecem do horário, que é como ficam fechados às marcações.
export async function updateScheduleAction(schedule: import('./types').WeeklyScheduleDay[]) {
  return api.schedule.update(schedule.filter((d) => d.isActive));
}

export async function updateEmployeeScheduleAction(
  employeeId: number,
  schedule: import('./types').WeeklyScheduleDay[],
) {
  return api.adminSchedules.update(employeeId, schedule.filter((d) => d.isActive));
}

export async function previewTimeBlockAction(data: import('./types').TimeBlockInput) {
  return api.timeBlocks.preview(data);
}

export async function createTimeBlockAction(data: import('./types').TimeBlockInput) {
  return api.timeBlocks.create(data);
}

export async function deleteTimeBlockAction(id: number) {
  await api.timeBlocks.remove(id);
}

export async function previewAdminBlockAction(data: import('./types').TimeBlockInput) {
  return api.adminBlocks.preview(data);
}

export async function createAdminBlockAction(data: import('./types').TimeBlockInput) {
  return api.adminBlocks.create(data);
}

export async function deleteAdminBlockAction(id: number) {
  await api.adminBlocks.remove(id);
}

export async function updateProfileAction(data: object) {
  return api.profile.update(data);
}

export async function setup2FAAction() {
  return api.auth.setup2FA();
}

export async function enable2FAAction(code: string) {
  return api.auth.enable2FA(code);
}

export async function disable2FAAction(password: string) {
  return api.auth.disable2FA(password);
}

export async function updateSmtpSettingsAction(data: import('./types').SmtpSettings) {
  return api.settings.updateSmtp(data);
}

export async function testSmtpSettingsAction(data: import('./types').SmtpSettings & { testEmail: string }) {
  return api.settings.testSmtp(data);
}

export async function fetchLogsAction(params: { level?: string; page?: number }) {
  return api.logs.list(params);
}

export async function createUserAction(data: { name: string; email: string; password: string; role: string }) {
  return api.users.create(data);
}

export async function updateUserAction(id: number, data: { name?: string; role?: string }) {
  return api.users.update(id, data);
}

export async function deleteUserAction(id: number) {
  return api.users.remove(id);
}

export async function updateRolePermissionsAction(role: import('./types').ConfigurableRole, permissions: Record<string, boolean>) {
  return api.roles.update(role, permissions);
}

export async function fetchStatsAction(period: import('./types').StatsPeriod, offset: number) {
  return api.stats.get(period, offset);
}
