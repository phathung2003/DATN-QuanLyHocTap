import ITask from '@/backend/models/data/ITask';
import { GetToken } from '@/backend/feature/user/validate';
import { ITaskError } from '@/backend/models/messages/ITaskMessage';
import { HomePage, UnitDetail } from '@/backend/routers';
import { DefaultTaskErrorValue } from '@/backend/defaultData/task';
import { RemoveAccent, CheckChangeData } from '@/backend/feature/general';

//Lấy danh sách danh mục bài học
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

//Lấy thông tin 1 danh mục
export async function GetTaskInfo(
  courseID: string,
  unitID: string,
  taskID: string,
): Promise<ITask | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/task/list?courseID=${courseID}&unitID=${unitID}&taskID=${taskID}`,
    { method: 'GET', cache: 'no-store' },
  );
  const info: ITask = await response.json();
  if (info) {
    return info;
  }
  return null;
}

//Thêm danh mục
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

//Chỉnh sửa danh mục
export async function EditTask(
  courseID: string,
  unitID: string,
  taskID: string,
  editData: ITask,
  defaultData: ITask,
  setError: React.Dispatch<React.SetStateAction<ITaskError>>,
) {
  //Kiểm tra lấy token
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Kiểm tra có sự thay đổi dữ liệu hay không
  const checkDefault = [defaultData.taskName, defaultData.taskDescription];
  const checkEdit = [editData.taskName, editData.taskDescription];

  if (!CheckChangeData(checkDefault, checkEdit, null)) {
    return window.location.reload();
  }

  //Tiến hành cập nhật dữ liệu
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/task/edit?courseID=${courseID}&unitID=${unitID}&taskID=${taskID}`,
    {
      method: 'PATCH',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        taskName: editData.taskName,
        taskDescription: editData.taskDescription,
      }),
    },
  );

  if (response.ok) {
    return window.location.reload();
  }
  const errorData = await response.json();
  const error = DefaultTaskErrorValue();
  error.status = false;
  error.systemError = errorData.message;
  setError(error);
  return;
}

//Tìm kiếm
export function SearchTask(search: string, taskList: ITask[]) {
  const searchInfo = RemoveAccent(search).toLowerCase();
  return taskList.filter((data) =>
    RemoveAccent(data.taskName.toLowerCase()).includes(searchInfo),
  );
}

//Xóa danh mục
export async function DeleteTask(
  courseID: string,
  unitID: string,
  taskID: string,
  reload: boolean,
  setError?: React.Dispatch<React.SetStateAction<ITaskError>>,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Tiến hành xóa danh mục
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/task/delete?courseID=${courseID}&unitID=${unitID}&taskID=${taskID}`,
    {
      method: 'DELETE',
      cache: 'no-store',
      headers: { Authorization: `${token}` },
    },
  );

  //Xóa thành công
  if (response.ok) {
    if (reload) {
      return window.location.reload();
    }
    return await UnitDetail(courseID, unitID);
  }

  //Xóa thất bại
  if (setError) {
    const error = DefaultTaskErrorValue();
    const errorData = await response.json();

    error.status = false;
    error.systemError = errorData.message;
    setError(error);
  }
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
