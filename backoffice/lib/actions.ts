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
