import ResetPasswordClient from './ResetPasswordClient';

export const metadata = { title: 'Repor senha' };

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  return <ResetPasswordClient token={searchParams.token || ''} />;
}
