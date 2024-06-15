import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from './provider';
const inter = Inter({ subsets: ['latin'] });
import TopBar from '@/components/pages/components/topBar/topBar';
export const metadata: Metadata = {
  title: 'Quản lý trẻ em học',
  description: 'Phần mềm quản lý trẻ em học',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TopBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
