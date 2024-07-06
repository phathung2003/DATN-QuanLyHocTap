'use client';
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar/SidebarParent';
import Header from '@/components/Header/headerParent';

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Di chuyển state lên đây
  return (
    <>
      {/* <!-- ==========================  Wrapper Start =============================== --> */}
      <div className="h-screen overflow-hidden">
        {/* <!-- ===== Header Start ===== --> */}
        <Header />
        {/* <!-- ===== Header End ===== --> */}

        {/* <!-- ===== Content Start ===== --> */}
        <div className="relative flex flex-1 flex-row overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main
            className={`flex-1 transition-all duration-500 ${isSidebarOpen ? 'sm:ml-8' : 'sm:-ml-64'}`}
          >
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
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
