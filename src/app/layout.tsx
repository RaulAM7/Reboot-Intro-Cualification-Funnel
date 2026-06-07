import type { Metadata } from 'next';

import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';

import './globals.css';

export const metadata: Metadata = {
  title: 'Reboot Academy | Orientación y Admisión',
  description: 'Funnel de orientación y admisión ligera para leads orgánicos de Reboot Academy.',
  icons: {
    icon: '/favicon-32x32.png'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='es'>
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}

