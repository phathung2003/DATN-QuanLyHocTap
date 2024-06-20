import AboutSectionOne from '@/components/About/AboutSectionOne';
import AboutSectionTwo from '@/components/About/AboutSectionTwo';
import Breadcrumb from '@/components/Common copy/Breadcrumb';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trang giới thiệu',
  description: 'Đây là trang giới thiệu',
  // other metadata
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
