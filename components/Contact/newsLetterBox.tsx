'use client';
import { useTheme } from 'next-themes';

import NewsLetterDecoration from '@/public/decoration/newsLetter-decoration';
export default function NewsLetterBox() {
  const { theme } = useTheme();

  return (
    <div
      className="wow fadeInUp relative  z-10 rounded-sm bg-white p-8 shadow-md dark:bg-slate-900 sm:p-11 lg:p-8 xl:p-11"
      data-wow-delay=".2s"
    >
      <h3 className="mb-4 text-2xl font-bold leading-10 leading-tight text-black dark:text-white">
        Đăng ký tài khoản ngay để được hỗ trợ nhanh nhất
      </h3>
      <p className="border-body-color text-small mb-11 border-b border-opacity-25 pb-11 leading-relaxed text-slate-700 dark:border-white dark:border-opacity-25">
        Với tài khoản riêng, bạn sẽ dễ dàng truy cập để quản lý, giải quyết vấn
        đề một cách nhanh chóng và trải nghiệm các tính năng độc quyền chỉ dành
        cho thành viên.
      </p>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Điền vào tên của bạn"
          autoComplete="name"
          className="dark:text-body-color-dark dark:shadow-two text-body-color mb-4 w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Điền vào email của bạn"
          autoComplete="email"
          className="dark:text-body-color-dark dark:shadow-two text-body-color mb-4 w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
        />
        <input
          type="submit"
          value="Xác nhận"
          className="shadow-submit dark:shadow-submit-dark mb-5 flex w-full cursor-pointer items-center justify-center rounded-sm bg-[#FF5580] px-9 py-4 text-base font-medium text-white duration-300 hover:bg-[#FF5580]/90"
        />
      </div>
      <NewsLetterDecoration theme={theme} />
    </div>
  );
}
