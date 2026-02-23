import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/lib/providers/QueryProvider';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'QR Menu',
  description: 'Digital menus for restaurants',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="antialiased">
        <QueryProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
