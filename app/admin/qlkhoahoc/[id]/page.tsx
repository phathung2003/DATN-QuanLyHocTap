import { GetCourseInfo } from '@/backend/feature/course';
import { GetUnitList } from '@/backend/feature/unit';
import { GetSubject } from '@/backend/feature/subject';
import { GetGrade } from '@/backend/feature/grade';
import NotFoundCourse from '@/app/admin/qlkhoahoc/[id]/courseNotFound';
import CourseDetail from '@/app/admin/qlkhoahoc/[id]/courseDetail';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const course = await GetCourseInfo(id);
  if (!course) return <NotFoundCourse />;

  const unit = await GetUnitList(id);
  const subject = await GetSubject();
  const grade = await GetGrade();
  return (
    <CourseDetail
      courseID={id}
      courseInfo={course}
      unitList={unit}
      subject={subject}
      grade={grade}
    />
  );
}
