import '@/css/globals.css';
import '@/css/satoshi.css';
import '@/css/style.css';
import '@/css/index.css';
import '@/css/loadingDot.css';
import { DefaultAccount } from '@/backend/database/users';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import { Providers } from '@/app/providers';

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await DefaultAccount();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
