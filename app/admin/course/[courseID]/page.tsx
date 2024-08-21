import { Metadata } from 'next';
import { GetCourseInfo } from '@/backend/feature/course';
import { GetUnitList } from '@/backend/feature/unit';
import { GetSubject } from '@/backend/feature/subject';
import { GetGrade } from '@/backend/feature/grade';
import NotFoundPage from '@/components/page/other/notFound';
import CourseDetail from '@/components/page/content/course/manager/courseDetail';

export const metadata: Metadata = {
  title: 'Chi tiết khóa học',
  description: 'Trang chi tiết khóa học',
};

interface ProductPageProps {
  params: {
    courseID: string;
  };
}

export default async function CourseDetailPage({ params }: ProductPageProps) {
  const { courseID } = params;
  const course = await GetCourseInfo(courseID);
  if (!course) {
    return <NotFoundPage />;
  }

  const unit = await GetUnitList(courseID);
  const subject = await GetSubject();
  const grade = await GetGrade();
  return (
    <CourseDetail
      courseID={courseID}
      courseInfo={course}
      unitList={unit}
      subject={subject}
      grade={grade}
    />
  );
}
