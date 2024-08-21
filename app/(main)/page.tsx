import { Metadata } from 'next';
import { CookieGetInfo } from '@/backend/feature/validate';

import AboutSectionOne from '@/components/page/homepage/about/aboutSectionOne';
import Blog from '@/components/page/homepage/blog';
import Contact from '@/components/page/homepage/contact';
import Features from '@/components/page/homepage/features';
import Hero from '@/components/page/homepage/hero';
import Testimonials from '@/components/page/homepage/testimonials';

export const metadata: Metadata = {
  title: 'Trang Chủ',
  description: 'Trang chủ đồ án tốt nghiệp',
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
