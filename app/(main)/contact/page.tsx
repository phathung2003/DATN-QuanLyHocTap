import Breadcrumb from '@/components/Main/breadcrumb';
import Contact from '@/components/Contact';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trang liên hệ',
  description: 'Đây là trang liên hệ',
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Trang liên hệ"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
