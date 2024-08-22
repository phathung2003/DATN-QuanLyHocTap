'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { LogOut } from '@/backend/feature/user/validate';
import { usePathname } from 'next/navigation';
import { GetLastName } from '@/backend/feature/general';
import MenuData from '@/components/header/homepage/menuData';
import SwitchTheme from '@/components/header/addOn/switchTheme1';

//Icon
import DropdownIcon from '@/public/vector/dropdown-black.svg';

export default function Header({ name }) {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center px-10 ${
          sticky
            ? 'dark:shadow-sticky-dark shadow-sticky fixed z-[9999] bg-white !bg-opacity-80 backdrop-blur-sm transition dark:bg-slate-950'
            : 'absolute bg-transparent'
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? 'py-5 lg:py-2' : 'py-8'
                } `}
              >
                <Image
                  src="/images/logo/logo.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="h-auto max-h-[30px] w-auto max-w-[140px] dark:hidden"
                />
                <Image
                  src="/images/logo/logo.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="hidden h-auto max-h-[30px] w-auto max-w-[140px] dark:block"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 block rounded-lg px-3 ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative mb-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? ' top-[7px] rotate-45' : ' '
                    }`}
                  />
                  <span
                    className={`relative mb-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? 'opacity-0 ' : ' '
                    }`}
                  />
                  <span
                    className={`relative mb-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? ' top-[-8px] -rotate-45' : ' '
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar border-body-color/50 dark:border-body-color/20 dark:bg-dark absolute right-0 z-30 w-[250px] rounded border-[.5px] bg-white px-6 py-4 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? 'visibility top-full opacity-100'
                      : 'invisible top-[120%] opacity-0'
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {MenuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                              usePathName === menuItem.path
                                ? 'text-primary dark:text-white'
                                : 'text-dark hover:text-primary dark:text-white/70 dark:hover:text-white'
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <p
                              onClick={() => handleSubmenu(index)}
                              className="text-dark flex cursor-pointer items-center justify-between py-2 text-base group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                            >
                              {menuItem.title}
                              <span className="pl-3">
                                <DropdownIcon />
                              </span>
                            </p>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                {name === null && (
                  <>
                    <Link
                      href="/login"
                      className="text-dark hidden px-7 py-3 text-base font-medium hover:opacity-70 dark:text-white md:block"
                    >
                      Đăng Nhập
                    </Link>
                    <Link
                      href="/register"
                      className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-[#FF5580] px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
                    >
                      Đăng Ký
                    </Link>
                  </>
                )}
                {name != null && (
                  <div className="flex items-center">
                    <p className="mr-10 text-lg font-extrabold leading-none tracking-tight text-[#FF5580] dark:text-white md:text-xl lg:text-xl">
                      Xin chào {GetLastName(name)}
                    </p>

                    <button
                      onClick={() => LogOut()}
                      className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-[#FF5580] px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
                <div>
                  <SwitchTheme />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
