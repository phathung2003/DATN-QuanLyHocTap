'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';

//Icon
import CalendarIcon from '@/public/vector/calendar.svg';
import LogoIcon from '@/public/vector/logo.svg';
import LessonIcon from '@/public/vector/lesson.svg';
import AccountIcon from '@/public/vector/table.svg';
import InfoIcon from '@/public/vector/user.svg';
import CollapsIcon from '@/public/vector/double-arrow.svg';
import SubjectIcon from '@/public/vector/book.svg';
import BoardIcon from '@/public/vector/board.svg';
//Menu
const menuItems = [
  {
    label: 'Quản lý môn học',
    icon: SubjectIcon,
    link: '/admin/subject',
  },
  {
    label: 'Quản lý cấp độ',
    icon: BoardIcon,
    link: '/admin/grade',
  },
  {
    label: 'Quản lý khóa học',
    icon: LessonIcon,
    link: '/admin/course',
  },
  {
    label: 'Quản lý bài viết',
    icon: CalendarIcon,
    link: '/admin/qlbaiviet',
  },
  {
    label: 'Quản lý thông tin',
    icon: InfoIcon,
    link: '/admin/qlthongtin',
  },
  {
    label: 'Quản lý tài khoản',
    icon: AccountIcon,
    link: '/admin/qltaikhoan',
  },
  // { id: 6, label: 'Quản lý cài đặt', icon: SettingIcon, link: 'qlcaidat' },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  return (
    <aside
      className={`h-screen bg-black transition-all duration-300 dark:bg-boxdark lg:static lg:translate-x-0 ${open ? 'w-70' : 'w-20'}`}
    >
      <nav className="flex h-full flex-col shadow-sm">
        <div
          id="sidebarHeader"
          className="flex items-center justify-between p-4 pb-2 pt-7"
        >
          {/*Logo*/}
          <Link href="/admin">
            <div
              id="logo"
              className={classNames('flex items-center gap-4 pl-1 pr-4', {
                hidden: !open,
              })}
            >
              <LogoIcon />
              <span className={classNames('text-2xl font-bold text-white')}>
                HungThanh
              </span>
            </div>
          </Link>

          {/*Nút phóng to - Thu nhỏ*/}
          <button
            id="collapseButton"
            onClick={() => setOpen((curr) => !curr)}
            className={`bg-gray-50 rounded-lg p-3.5 hover:bg-graydark dark:hover:bg-meta-4 ${!open && 'rotate-180 duration-300'}`}
          >
            <CollapsIcon />
          </button>
        </div>

        {/*Thanh tác vụ*/}
        <div id="sidebarBody" className="flex-1 p-3">
          {menuItems.map(({ icon: Icon, ...menu }, index) => {
            return (
              <div key={index}>
                <Link
                  href={menu.link}
                  className={`flex w-full items-center gap-2.5 font-medium text-bodydark1 ${pathname === menu.link && 'w-full bg-graydark dark:bg-meta-4'} ${open ? 'rounded-xl duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4' : ''}`}
                >
                  <div
                    className={`flex h-full items-center py-4 ${open ? 'px-3' : 'rounded-2xl p-4 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4'}`}
                  >
                    <div className={`fill-current ${open && 'w-[2.5rem]'}`}>
                      <Icon />
                    </div>

                    {open && (
                      <p className="text-md text-text-light w-full overflow-hidden whitespace-nowrap font-medium ">
                        {menu.label}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
