import { GetUnitInfo } from '@/backend/feature/unit';
import { GetTaskList } from '@/backend/feature/task';
import UnitDetail from '@/app/admin/course/[courseID]/unit/[unitID]/unitDetail';
import NotFoundData from '@/app/admin/notFound';

interface ProductPageProps {
  params: {
    courseID: string;
    unitID: string;
  };
}

export default async function CoursePage({ params }: ProductPageProps) {
  const { courseID, unitID } = params;
  const unit = await GetUnitInfo(courseID, unitID);
  if (!unit) {
    return <NotFoundData />;
  }

  const task = await GetTaskList(courseID, unitID);
  return (
    <UnitDetail
      courseID={courseID}
      unitID={unitID}
      unitInfo={unit}
      taskList={task}
    />
  );
}
