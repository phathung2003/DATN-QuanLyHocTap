import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
//import ScrollUp from '@/components/Common copy/ScrollUp';
import Footer from '@/components/Footer';
import Header from '@/components/Header/headerUser';
//import ScrollToTop from '@/components/ScrollToTop';
import '@/css/index.css';
import { Providers } from '@/app/providers';
import { CookieGetInfo } from '@/backend/feature/validate';
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const userInfo = await CookieGetInfo();
  let userName: string | null = userInfo;
  if (userName != null) {
    userName = userInfo.name;
  }
  return (
    <html lang="en">
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <Header name={userName} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
