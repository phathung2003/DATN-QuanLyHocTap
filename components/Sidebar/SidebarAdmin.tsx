'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';
import {
  BlogIcon,
  CollapsIcon,
  DashboardIcon,
  LogoIcon,
  LessonIcon,
  AccountIcon,
  InfoIcon,
  SettingIcon,
} from '../icons';
/* eslint-disable */
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuItems = [
  {
    id: 1,
    label: 'Quản lý danh mục',
    icon: DashboardIcon,
    link: '/admin/qldanhmuc',
  },
  {
    id: 2,
    label: 'Quản lý bài viết',
    icon: BlogIcon,
    link: '/admin/qlbaiviet',
  },
  {
    id: 3,
    label: 'Quản lý bài học',
    icon: LessonIcon,
    link: '/admin/qlbaihoc',
  },
  {
    id: 4,
    label: 'Quản lý thông tin',
    icon: InfoIcon,
    link: '/admin/qlthongtin',
  },
  {
    id: 5,
    label: 'Quản lý tài khoản',
    icon: AccountIcon,
    link: '/admin/qltaikhoan',
  },
  {
    id: 6,
    label: 'Quản lý cài đặt',
    icon: SettingIcon,
    link: '/admin/qlcaidat',
  },
];


const Sidebar = () => {
  // sidebar collapse mới thêm vào collapse
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const combinedClasses = classNames(
    'absolute left-0 top-0 z-999 flex h-screen flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0',
    {
      'translate-x-0': sidebarOpen,
      '-translate-x-full': !sidebarOpen,
    },
    'px-4 pt-8 pb-4 bg-light justify-between',
    {
      'w-80': !toggleCollapse,
      'w-20': toggleCollapse,
    },
  );

  const collapseIconClasses = classNames(
    'p-4 rounded bg-light-lighter absolute right-0',
    {
      'rotate-180': toggleCollapse,
    },
  );

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = 'true';

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== 'Escape') return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={combinedClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: 'width 300ms cubic-bezier(0.2, 0, 0, 1) 0s' }}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="relative flex items-center justify-between gap-2 py-2">
        {/* logo */}
        <div className="flex items-center gap-4 pl-1">
          <LogoIcon />
          <span
            className={classNames('text-2xl font-bold text-white', {
              hidden: toggleCollapse,
            })}
          >
            HungThanh
          </span>
        </div>

        {/* nut collapse */}
        {isCollapsible && (
          <button className={collapseIconClasses} onClick={handleSidebarToggle}>
            <CollapsIcon />
          </button>
        )}
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <div className="py-4 lg:mt-9">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              QUẢN LÝ
            </h3>
            <div className="mb-5 flex w-full flex-col items-start">
              {menuItems.map(({ icon: Icon, ...menu }) => {
                return (
                  <div key={menu.id}>
                    <Link
                      href={menu.link}
                      className={`group relative flex w-full items-center gap-2.5 rounded-xl font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname === menu.link &&
                        'w-full bg-graydark dark:bg-meta-4'
                      }`}
                    >
                      <div className="flex h-full w-72 items-center px-3 py-4">
                        <div style={{ width: '2.5rem' }}>
                          <Icon />
                        </div>
                        {!toggleCollapse && (
                          <p
                            className={classNames(
                              'text-md text-text-light w-full font-medium',
                            )}
                          >
                            {menu.label}
                          </p>
                        )}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Sidebar Menu --> */}
    </aside>
  );
};

export default Sidebar;
