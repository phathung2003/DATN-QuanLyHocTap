import { GetUnitInfo } from '@/backend/feature/unit';
import { GetTaskList } from '@/backend/feature/task';
import UnitDetail from '@/components/page/content/unit/unitDetail';
import NotFoundPage from '@/components/page/other/notFound';

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
    return <NotFoundPage />;
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
