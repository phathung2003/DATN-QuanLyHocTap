import { Metadata } from 'next';
import { GetContentListByCourseID } from '@/backend/feature/content/content';
import UnitDetail from '@/components/page/content/unit/user/unitDetail';
import NotFoundPage from '@/components/page/other/notFound';

export const metadata: Metadata = {
  title: 'Nội dung',
  description: 'Trang nội dung khóa học',
};

interface ContentPageProps {
  params: {
    courseID: string;
  };
}

export default async function UnitParentPage({ params }: ContentPageProps) {
  const { courseID } = params;
  const content = await GetContentListByCourseID(courseID);
  if (!content) {
    return <NotFoundPage />;
  }

  return <UnitDetail data={content} courseID={courseID} />;
}
