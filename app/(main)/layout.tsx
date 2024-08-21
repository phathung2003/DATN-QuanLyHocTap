import { Metadata } from 'next';
import { Providers } from '@/app/providers';
import { CookieGetInfo } from '@/backend/feature/validate';
import Footer from '@/components/Footer';
import Header from '@/components/Header/headerUser';
import ProgressBarProvider from '@/components/element/other/progressBarProvider';

export const metadata: Metadata = {
  title: 'Quản lý học tập',
  description: 'Đồ án tốt nghiệp',
};

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const userInfo = await CookieGetInfo();
  let userName: string | null = userInfo;
  if (userName != null) {
    userName = userInfo.name;
  }
  return (
    <div className="bg-[#FCFCFC] dark:bg-black">
      <Providers>
        <Header name={userName} />
        <ProgressBarProvider>{children}</ProgressBarProvider>
        <Footer />
      </Providers>
    </div>
  );
}
