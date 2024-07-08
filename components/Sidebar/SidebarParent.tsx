'use client';
import React, { useEffect, useState } from 'react';
import { DashboardIcon, LogoIcon, LessonIcon, BlogIcon } from '../icons';
import Link from 'next/link';

const menuItems = [
  { id: 1, icon: DashboardIcon, link: '/phuhuynh' },
  { id: 2, icon: BlogIcon, link: '/phuhuynh' },
  { id: 3, icon: LessonIcon, link: '/phuhuynh' },
];

const menuChildrens = [
  { id: 1, label: 'Giao bài', icon: DashboardIcon, link: '/giaobai' },
  { id: 2, label: 'Xem tiến độ học', icon: BlogIcon, link: '/tiendo' },
];

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  // Allow currentSidebarTab to be either a string or null

  const [currentSidebarTab, setCurrentSidebarTab] = useState<string | null>(
    null,
  );

  // chiều rộng của cửa sổ trình duyệt nhỏ 1024 px, sidebar đóng lại
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsSidebarOpen]);

  return (
    <aside className="mt-8 flex flex-shrink-0 transition-all dark:bg-slate-900">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-100 lg:hidden xl:hidden 2xl:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar khi screen thu nhỏ lại dần dần */}
      <div
        className={`${isSidebarOpen ? 'fixed' : 'hidden'} dark:boxdark z-10 w-16 rounded-br-3xl rounded-tr-3xl bg-[#40679E]`}
      ></div>

      {/* Navigation when the screen is bé nhỏ nhỏ như điện thoại  */}
      <nav
        aria-label="Options"
        className="shadow-t shadow-l fixed inset-x-0 bottom-0 flex flex-row-reverse items-center justify-between rounded-l-3xl rounded-t-3xl border-t border-indigo-100 bg-white px-4 py-2 dark:border-slate-900 dark:bg-boxdark sm:hidden"
      >
        {/* Collapse button when screen is small */}
        <button
          onClick={() => {
            setIsSidebarOpen(
              currentSidebarTab === 'linksTab' ? !isSidebarOpen : true,
            );
            setCurrentSidebarTab('linksTab');
          }}
          className={`rounded-lg p-2 shadow-md transition-colors hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-white ${
            isSidebarOpen && currentSidebarTab === 'linksTab'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-slate-500'
          }`}
        >
          <span className="sr-only">Toggle sidebar</span>
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>

        {/* Logo when screen is small */}
        <div className="flex items-center gap-4 pl-1">
          <LogoIcon />
        </div>
      </nav>

      {/* Sidebar for larger screens khi chưa expand ra*/}
      <nav
        aria-label="Options"
        className="z-20 hidden w-16 flex-shrink-0 flex-col items-center rounded-br-3xl rounded-tr-3xl border-indigo-100 bg-[#40679E] py-4 shadow-md dark:border-boxdark dark:bg-boxdark sm:flex"
      >
        <div className="flex-shrink-0 py-4">
          {/* Logo */}
          <div className="flex items-center gap-4 pl-1">
            <LogoIcon />
          </div>
        </div>

        {/* Navigation items */}
        {menuItems.map((item) => (
          <div key={item.id} className="flex flex-col items-center p-4">
            <Link href={item.link}>
              <div
                onClick={() => {
                  setIsSidebarOpen(
                    currentSidebarTab === 'linksTab' ? !isSidebarOpen : true,
                  );
                  setCurrentSidebarTab('linksTab');
                }}
                className={`rounded-lg p-2 shadow-md transition-colors hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-white  ${
                  isSidebarOpen && currentSidebarTab === 'linksTab'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-500'
                }`}
              >
                <item.icon className="h-6 w-6" />
              </div>
            </Link>
          </div>
        ))}
      </nav>

      {/* Full sidebar (sidebar khi expand) */}
      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 flex-shrink-0 transform rounded-br-3xl rounded-tr-3xl border-r-2 border-indigo-100 bg-white shadow-lg transition-transform duration-300 sm:left-16 sm:w-72 lg:static lg:w-64 ${
          isSidebarOpen
            ? 'translate-x-0 dark:bg-boxdark'
            : '-translate-x-full dark:bg-boxdark'
        }`}
      >
        <nav className="flex h-full flex-col dark:bg-boxdark" aria-label="Main">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center justify-center py-10">
            <div className="flex items-center gap-4 pl-1">
              <LogoIcon />
              <span className="text-dark text-2xl font-bold">HungThanh</span>
            </div>
          </div>

          {/* Sidebar items */}
          <div className="flex-1 space-y-2 overflow-hidden px-4 hover:overflow-auto">
            {menuChildrens.map((item) => (
              <Link key={item.id} href={item.link}>
                <div className="flex w-full items-center space-x-2 rounded-lg bg-white text-slate-500 hover:bg-indigo-800 hover:text-white">
                  <span
                    aria-hidden="true"
                    className="rounded-lg bg-slate-200 p-2"
                  >
                    <item.icon className="h-6 w-6" />
                  </span>
                  <span className="py-2 text-lg font-medium">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
