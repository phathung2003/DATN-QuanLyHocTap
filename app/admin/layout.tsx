import { Metadata } from 'next';
import { CheckIsAdmin } from '@/backend/feature/user/validate';
import Sidebar from '@/components/sidebar/sidebarAdmin';
import Header from '@/components/header/headerAdmin';
import ProgressBarProvider from '@/components/element/other/progressBarProvider';

export const metadata: Metadata = {
  title: 'Quản lý',
  description: 'Trang chủ quản lý hệ thống',
};

export default async function AdminMainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await CheckIsAdmin();
  return (
    <div>
      {/* <!-- ========================== Page admin Wrapper Start =============================== --> */}
      <div className="flex h-screen bg-slate-50 dark:bg-black">
        {/* <!-- ===== Sidebar===== --> */}
        <Sidebar />
        {/* <!-- ===== Content Area ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-auto">
          {/* <!-- ===== Header Start ===== --> */}
          <Header name={user.name} role={user.role} />

          {/* <!-- ===== Main Content ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-3xl 2xl:p-5">
              <ProgressBarProvider>{children}</ProgressBarProvider>
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ========================== Page admin Wrapper End ================================= --> */}
    </div>
  );
}
