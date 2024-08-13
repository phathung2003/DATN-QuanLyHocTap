import { GetCourseInfo } from '@/backend/feature/course';
import { GetUnitList } from '@/backend/feature/unit';
import { GetSubject } from '@/backend/feature/subject';
import { GetGrade } from '@/backend/feature/grade';
import NotFoundData from '@/components/pages/other/notFound';
import CourseDetail from '@/components/pages/contentManagement/course/courseDetail';

interface ProductPageProps {
  params: {
    courseID: string;
  };
}

export default async function CoursePage({ params }: ProductPageProps) {
  const { courseID } = params;
  const course = await GetCourseInfo(courseID);
  if (!course) {
    return <NotFoundData />;
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
