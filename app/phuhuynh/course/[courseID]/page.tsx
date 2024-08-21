import { Metadata } from 'next';
import { GetUnitList } from '@/backend/feature/unit';
import { GetCourseInfo } from '@/backend/feature/course';
import NotFoundPage from '@/components/page/other/notFound';
import UserUnitList from '@/components/page/content/course/user/courseDetail';

export const metadata: Metadata = {
  title: 'Chi tiết khóa học',
  description: 'Trang chi tiết khóa học',
};

interface ProductPageProps {
  params: {
    courseID: string;
  };
}

export default async function CoursePage({ params }: ProductPageProps) {
  const { courseID } = params;
  const course = await GetCourseInfo(courseID);
  if (!course) {
    return <NotFoundPage />;
  }

  const unit = await GetUnitList(courseID);
  return (
    <UserUnitList courseID={courseID} courseInfo={course} unitList={unit} />
  );
}
