import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ClientErrorReporter from '@/components/ClientErrorReporter';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Ganesha Ink',
    default: 'Ganesha Ink — Tatuagem, Barbearia & Piercing em Vale de Cambra',
  },
  description:
    'Studio premium de tatuagem, barbearia, body piercing e estética de unhas em Vale de Cambra. Marcações online disponíveis.',
  icons: {
    icon: '/images/logo/ganesha-icon.webp',
    apple: '/images/logo/ganesha-icon.png',
  },
  openGraph: {
    siteName: 'Ganesha Ink',
    locale: 'pt_PT',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-bg-primary text-text-primary font-body min-h-screen flex flex-col">
        <Header />
        <ClientErrorReporter />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
