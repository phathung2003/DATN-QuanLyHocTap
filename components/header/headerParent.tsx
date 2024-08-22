'use client';
import Link from 'next/link';
import Image from 'next/image';
import DropdownUser from '@/components/header/addOn/userOption';
import Message from '@/components/header/addOn/message';
import SwitchTheme from '@/components/header/addOn/switchTheme2';
import Notification from '@/components/header/addOn/notification';

//Icon
import LogoIcon from '@/public/vector/logo.svg';

const Header: React.FC<{ name: string; role: string }> = ({ name, role }) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <Link className="block flex-shrink-0 sm:hidden" href="/parent">
            <Image
              width={160}
              height={160}
              src={'/images/logo/logo.svg'}
              alt="Logo"
            />
          </Link>
        </div>

        {/* icon khi screen bình thường */}
        <div className="flex flex-shrink-0 items-center justify-center md:block">
          <div className="flex items-center gap-4 pl-1">
            <LogoIcon />
            <span className="text-dark text-2xl font-bold dark:text-white">
              HungThanh
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <SwitchTheme />

            <Notification />

            <Message />
          </ul>

          <DropdownUser name={name} role={role} />
        </div>
      </div>
    </header>
  );
};

export default Header;
