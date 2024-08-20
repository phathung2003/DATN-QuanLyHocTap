'use client';
import React from 'react';
import Sidebar from '@/components/Sidebar/SidebarParent';
import Header from '@/components/Header/headerParent';
import ChatSupport from '@/components/Chat/ChatSupport';

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <!-- ==========================  Wrapper Start =============================== --> */}
      <div className="flex h-screen flex-col bg-neutral-100 dark:bg-black">
        <Header />

        <div className="flex flex-1 flex-row overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <div className="sticky top-0 ">
            <Sidebar />
          </div>
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main className="flex-1 overflow-auto">
            <div className=" mx-auto max-w-screen-3xl dark:bg-black 2xl:p-5">
              {children}
              {/* chat */}
              <ChatSupport />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
      </div>
      {/* <!-- ========================== Wrapper End ================================= --> */}
    </>
  );
}
