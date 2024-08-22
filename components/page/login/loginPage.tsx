'use client';
import Link from 'next/link';
import React from 'react';
import LoginForm from '@/components/form/user/loginForm';
import ScrollToTop from '@/components/element/other/scrollToTop';
import LoginDecoration from '@/public/decoration/login-decoration';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đây là trang đăng nhập của web HungThanh',
};

export default function LoginnPage() {
  return (
    <div>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[100px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-md dark:bg-slate-800 sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Đăng nhập
                </h3>

                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1.5px] w-full max-w-[70px] bg-slate-200 sm:block"></span>
                </div>

                <LoginForm />

                <p className="text-body-color pt-5 text-center text-base font-medium dark:text-white">
                  Bạn không có tài khoản?{' '}
                  <Link
                    href="/register"
                    className="text-blue-500 hover:underline"
                  >
                    Đăng Ký
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0 z-[-1]">
          <LoginDecoration />
        </div>
      </section>
      <ScrollToTop />
    </div>
  );
}
