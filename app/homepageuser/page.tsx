import AboutSectionOne from '@/components/About/AboutSectionOne';
import Blog from '@/components/Blog';
import ScrollUp from '@/components/Common copy/ScrollUp';
import Contact from '@/components/Contact';
import Features from '@/components/Features';
import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trang Chủ',
  description: 'Đây là trang chủ của web HungThanh',
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Blog />
      <AboutSectionOne />
      {/* <AboutSectionTwo /> */}
      <Testimonials />
      {/* <Pricing />       */}
      <Contact />
    </>
  );
}
