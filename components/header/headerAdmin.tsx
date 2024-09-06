'use client';
import DropdownUser from '@/components/header/addOn/userOption';
import Message from '@/components/header/addOn/message';
import SwitchTheme from '@/components/header/addOn/switchTheme2';
import Notification from '@/components/header/addOn/notification';

const Header: React.FC<{ name: string; role: string }> = ({ name, role }) => {
  return (
    <header className="sticky top-0 z-999 flex max-h-[10vh] min-h-[10vh] w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-end px-4 py-2 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <SwitchTheme />

            <Notification />

            <Message />
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser name={name} role={role} />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
