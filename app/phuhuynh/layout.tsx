'use client';
import React from 'react';
import Sidebar from '@/components/Sidebar/SidebarParent';
import Header from '@/components/Header/headerParent';

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <!-- ==========================  Wrapper Start =============================== --> */}
      <div className="h-screen bg-slate-50 dark:bg-black">
        {/* <!-- ===== Header Start ===== --> */}
        <Header />
        {/* <!-- ===== Header End ===== --> */}

        {/* <!-- ===== Content Start ===== --> */}
        <div className="flex flex-row overflow-y-auto">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main className={`transition-all duration-500`}>
            <div className="mx-auto max-w-screen-3xl dark:bg-black 2xl:p-5">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ========================== Wrapper End ================================= --> */}
    </>
  );
}
