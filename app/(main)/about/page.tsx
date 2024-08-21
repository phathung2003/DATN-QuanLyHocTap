import { Metadata } from 'next';
import Breadcrumb from '@/components/page/homepage/main/breadcrumb';
import AboutSectionOne from '@/components/page/homepage/about/aboutSectionOne';
import AboutSectionTwo from '@/components/page/homepage/about/aboutSectionTwo';

export const metadata: Metadata = {
  title: 'Giới thiệu',
  description: 'Trang giới thiệu',
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
