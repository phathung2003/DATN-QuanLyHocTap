import { Metadata } from 'next';
import { CookieGetInfo } from '@/backend/feature/validate';

import AboutSectionOne from '@/components/page/homepage/about/aboutSectionOne';
import Blog from '@/components/page/homepage/blog';
import Contact from '@/components/Contact';
import Features from '@/components/Features';
import Hero from '@/components/element/other/hero';
import Testimonials from '@/components/Testimonials';

export const metadata: Metadata = {
  title: 'Trang Chủ',
  description: 'Đây là trang chủ của web HungThanh',
};

export default async function Home() {
  const userInfo = await CookieGetInfo();
  let userName: string | null = userInfo;
  if (userName != null) {
    userName = userInfo.name;
  }
  return (
    <>
      <Hero />
      <Features />
      <Blog />
      <AboutSectionOne />
      <Testimonials />
      <Contact />
    </>
  );
}
