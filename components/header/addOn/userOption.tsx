'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { LogOut } from '@/backend/feature/user/validate';
import { ToTitleCase } from '@/backend/database/generalFeature';

//Icon
import LogoutIcon from '@/public/vector/login.svg';
import UserInfo from '@/public/vector/userInfo.svg';
import ArrowIcon from '@/public/vector/dropdown-black.svg';

const DropdownUser: React.FC<{ name: string; role: string }> = ({
  name,
  role,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  //Đóng Dropdown
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  return (
    <div className="relative">
      <div
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {ToTitleCase(name)}
          </span>
          <span className="block text-xs">{ToTitleCase(role)}</span>
        </span>

        <span className="relative h-12 w-12 rounded-full">
          <Image
            src={'/images/users/user01.png'}
            alt="User"
            priority
            fill
            className="object-cover"
            sizes="48px"
          />
        </span>
        <ArrowIcon className="hidden fill-current sm:block" />
      </div>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-50 flex-col rounded-xl border border-slate-200 bg-white shadow-lg dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-5 dark:border-strokedark">
          <li>
            <Link
              href="/admin/qltaikhoan/myprofile"
              className="flex items-center gap-3.5 text-xs font-normal duration-300 ease-in-out hover:font-bold lg:text-sm"
            >
              <UserInfo className="fill-current group-hover:stroke-current" />
              Hồ sơ của tôi
            </Link>
          </li>
        </ul>

        <button
          onClick={() => LogOut()}
          className="group flex items-center gap-3 px-6 py-3 text-xs font-bold text-rose-600  hover:text-rose-400 lg:text-sm"
        >
          <LogoutIcon className="rotate-180  stroke-rose-600 group-hover:stroke-rose-400" />
          Đăng Xuất
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
