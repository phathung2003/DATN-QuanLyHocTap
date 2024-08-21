import { Metadata } from 'next';
import { GetUnitInfo } from '@/backend/feature/unit';
import { GetTaskList } from '@/backend/feature/task';
import UnitDetail from '@/components/page/content/unit/manager/unitDetail';
import NotFoundPage from '@/components/page/other/notFound';

export const metadata: Metadata = {
  title: 'Chi tiết bài học',
  description: 'Trang chi tiết bài học',
};

interface ProductPageProps {
  params: {
    courseID: string;
    unitID: string;
  };
}

export default async function UnitDetailPage({ params }: ProductPageProps) {
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
