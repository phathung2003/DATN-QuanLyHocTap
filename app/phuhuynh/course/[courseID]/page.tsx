import { GetCourseInfo } from '@/backend/feature/course';
import { GetUnitList } from '@/backend/feature/unit';
import NotFoundPage from '@/components/page/notFound';
import UserUnitList from '@/app/phuhuynh/course/[courseID]/unitList';

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
