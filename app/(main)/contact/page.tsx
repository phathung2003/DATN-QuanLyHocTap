import { Metadata } from 'next';
import Contact from '@/components/page/homepage/contact';
import Breadcrumb from '@/components/page/homepage/main/breadcrumb';

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: 'Trang liên hệ hỗ trợ',
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
