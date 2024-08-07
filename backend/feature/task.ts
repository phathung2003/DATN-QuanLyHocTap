import ITask from '@/backend/models/data/ITask';
import { GetToken } from '@/backend/feature/validate';
import { ITaskError } from '@/backend/models/messages/ITaskMessage';
import { HomePage } from '@/backend/routers';
import { DefaultTaskErrorValue } from '@/backend/defaultData/task';
//Lấy danh sách nội dung bài học
export async function GetTaskList(courseID: string, unitID: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/task/list?courseID=${courseID}&unitID=${unitID}`,
    { method: 'GET', cache: 'no-store' },
  );
  const info: ITask[] = await response.json();
  if (Array.isArray(info)) {
    return info;
  }
  return [];
}

//Thêm bài học
export async function AddTask(
  courseID: string,
  unitID: string,
  data: ITask,
  setError: React.Dispatch<React.SetStateAction<ITaskError>>,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Thêm dữ liệu vào cơ sở dữ liệu
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/task/add?courseID=${courseID}&unitID=${unitID}`,
    {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        taskNo: data.taskNo,
        taskName: data.taskName,
        taskDescription: data.taskDescription,
      }),
    },
  );

  if (response.ok) {
    return window.location.reload();
  }

  const error = DefaultTaskErrorValue();
  const errorData = await response.json();

  error.status = false;
  error.systemError = errorData.message;
  setError(error);
  return;
}

//Reset lỗi
export function ResetError(
  data,
  setFieldValue,
  setError: React.Dispatch<React.SetStateAction<ITaskError>>,
) {
  setFieldValue(data.target.name, data.target.value);

  setError((prev) => {
    const newErrorState = {
      ...prev,
      systemError: null,
    };
    if (['taskNo'].includes(data.target.name)) {
      newErrorState[`${data.target.name}Error`] = null;
    }

    return newErrorState;
  });
}
