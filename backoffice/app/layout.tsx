import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: { template: '%s | Ganesha Ink Admin', default: 'Ganesha Ink — Backoffice' },
  icons: { icon: '/images/logo/ganesha-icon.webp' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-bg-primary text-text-primary font-body min-h-screen">{children}</body>
    </html>
  );
}
