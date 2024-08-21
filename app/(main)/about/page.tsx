import AboutSectionOne from '@/components/page/homepage/about/aboutSectionOne';
import AboutSectionTwo from '@/components/page/homepage/about/aboutSectionTwo';
import Breadcrumb from '@/components/Main/breadcrumb';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trang giới thiệu',
  description: 'Đây là trang giới thiệu của hệ thống website',
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Trang giới thiệu"
        description="Trang web hỗ trợ quản lý việc học của trẻ mầm non được thiết kế nhằm giúp phụ huynh theo dõi và hỗ trợ quá trình học tập của con em mình một cách hiệu qu với giao diện thân thiện và dễ sử dụng."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
