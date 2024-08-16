import { GetTaskInfo } from '@/backend/feature/task';
import { GetContentList } from '@/backend/feature/content';
import TaskDetail from '@/components/page/content/task/taskDetail';
import NotFoundPage from '@/components/page/notFound';

interface ProductPageProps {
  params: {
    courseID: string;
    unitID: string;
    taskID: string;
  };
}

export default async function CoursePage({ params }: ProductPageProps) {
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
