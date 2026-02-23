import type { Metadata } from 'next';
import './globals.css';
import GlobalCountdown from './components/GlobalCountdown';

export const metadata: Metadata = {
  title: 'Valentine',
  description: 'Private Valentine experience',
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalCountdown />
        {children}
      </body>
    </html>
  );
}
