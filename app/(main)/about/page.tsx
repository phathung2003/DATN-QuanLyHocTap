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
        pageName="Giới thiệu"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
