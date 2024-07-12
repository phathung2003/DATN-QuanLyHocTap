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
      <h3 className="mb-4 text-2xl font-bold leading-tight text-black dark:text-white">
        Đăng ký để nhận được những cập nhật mới nhất
      </h3>
      <p className="border-body-color text-body-color mb-11 border-b border-opacity-25 pb-11 text-base leading-relaxed dark:border-white dark:border-opacity-25">
        Lorem ipsum dolor sited Sed ullam corper consectur adipiscing Mae ornare
        massa quis lectus.
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
          className="shadow-submit dark:shadow-submit-dark mb-5 flex w-full cursor-pointer items-center justify-center rounded-sm bg-[#FF5580] px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90"
        />
      </div>
      <NewsLetterDecoration theme={theme} />
    </div>
  );
}
