
import AboutSectionOne from '@/components/About/AboutSectionOne';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Features from '@/components/Features';
import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trang Chủ',
  description: 'Đây là trang chủ của web HungThanh',
};

export default function Home() {
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
