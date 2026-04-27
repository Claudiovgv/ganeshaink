import Image from 'next/image';
import LoginForm from './login-form';

export const metadata = { title: 'Login' };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4">
            <Image
              src="/images/logo/ganesha-icon.png"
              alt="Ganesha Ink"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h1 className="font-display text-3xl font-bold text-text-primary">Ganesha Ink</h1>
          <p className="text-text-secondary text-sm mt-1">Área de Gestão</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
