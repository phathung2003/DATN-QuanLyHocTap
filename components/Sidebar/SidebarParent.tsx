'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';

//Icon
import CalendarIcon from '@/public/vector/calendar.svg';
import LessonIcon from '@/public/vector/lesson.svg';
import CollapsIcon from '@/public/vector/double-arrow.svg';
import SubjectIcon from '@/public/vector/book.svg';
import BoardIcon from '@/public/vector/board.svg';
//Menu
const menuItems = [
  {
    label: 'Giao Bài Mới',
    icon: SubjectIcon,
    link: '/phuhuynh/giaobai',
  },
  {
    label: 'Xem DS Bài Học',
    icon: BoardIcon,
    link: '/phuhuynh/course',
  },
  {
    label: 'Quản lý tiến độ học',
    icon: LessonIcon,
    link: '/phuhuynh/tiendohoc',
  },
  {
    label: 'Hỗ Trợ Trực Tuyến',
    icon: CalendarIcon,
    link: '/phuhuynh/thongke',
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  return (
    <aside
      className={`z-900 my-5 h-[82vh] rounded-br-2xl rounded-tr-2xl bg-rose-800 transition-all duration-300 dark:bg-boxdark lg:static ${open ? 'w-70' : 'w-20'}`}
    >
      <nav className="flex h-full flex-col shadow-sm">
        <div
          id="sidebarHeader"
          className="flex items-center justify-between p-4 pb-2 pt-7"
        >
          {/*Logo*/}
          <Link href="/phuhuynh">
            <div
              id="logo"
              className={classNames('flex items-center gap-4 pl-1 pr-4', {
                hidden: !open,
              })}
            >
              <span className={classNames('text-2xl font-bold text-white')}>
                Menu
              </span>
            </div>
          </Link>

          {/*Nút phóng to - Thu nhỏ*/}
          <button
            id="collapseButton"
            onClick={() => setOpen((curr) => !curr)}
            className={`rounded-lg bg-slate-50 p-3 hover:bg-rose-300 dark:bg-graydark dark:hover:bg-meta-4 
              ${!open && 'rotate-180 duration-300'}`}
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
                  className={`my-1.5 flex w-full items-center gap-2.5 font-medium text-bodydark1 ${pathname === menu.link && 'w-full bg-white text-slate-700 dark:bg-meta-4 dark:text-slate-200'} ${open ? 'rounded-xl duration-300 ease-in-out hover:bg-white hover:text-slate-700 dark:hover:bg-meta-4 dark:hover:text-white' : ''}`}
                >
                  <div
                    className={`flex h-full items-center py-4 ${open ? 'px-3' : 'rounded-2xl p-4 duration-300 ease-in-out hover:bg-white hover:text-slate-700 dark:hover:bg-meta-4 dark:hover:text-white'}`}
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
