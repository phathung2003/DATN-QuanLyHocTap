import { Metadata } from 'next';
import { GetTaskInfo } from '@/backend/feature/content/task';
import { GetContentList } from '@/backend/feature/content/content';
import TaskDetail from '@/components/page/content/task/manager/taskDetail';
import NotFoundPage from '@/components/page/other/notFound';

export const metadata: Metadata = {
  title: 'Quản lý nội dung',
  description: 'Trang quản lý nội dung bài học',
};

interface ProductPageProps {
  params: {
    courseID: string;
    unitID: string;
    taskID: string;
  };
}

export default async function ContentManagementPage({
  params,
}: ProductPageProps) {
  const { courseID, unitID, taskID } = params;

  const task = await GetTaskInfo(courseID, unitID, taskID);
  if (!task) {
    return <NotFoundPage />;
  }

  const content = await GetContentList(courseID, unitID, taskID);
  return (
    <TaskDetail
      courseID={courseID}
      unitID={unitID}
      taskID={taskID}
      taskInfo={task}
      contentList={content}
    />
  );
}
