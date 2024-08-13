import { GetTaskInfo } from '@/backend/feature/task';
import { GetContentList } from '@/backend/feature/content';
import TaskDetail from '@/components/pages/contentManagement/task/taskDetail';
import NotFoundData from '@/components/pages/other/notFound';

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
    return <NotFoundData />;
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
