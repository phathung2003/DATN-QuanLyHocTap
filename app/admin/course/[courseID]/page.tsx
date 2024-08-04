import { GetCourseInfo } from '@/backend/feature/course';
import { GetUnitList } from '@/backend/feature/unit';
import { GetSubject } from '@/backend/feature/subject';
import { GetGrade } from '@/backend/feature/grade';
import NotFoundData from '@/app/admin/notFound';
import CourseDetail from '@/app/admin/course/[courseID]/courseDetail';

interface ProductPageProps {
  params: {
    courseID: string;
  };
}

export default async function CoursePage({ params }: ProductPageProps) {
  const { courseID } = params;
  const course = await GetCourseInfo(courseID);
  if (!course) return <NotFoundData />;

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
