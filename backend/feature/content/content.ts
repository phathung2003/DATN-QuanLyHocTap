import {
  IContentList,
  IContentCourseList,
} from '@/backend/models/data/Content/IContent';
import { GetToken } from '@/backend/feature/user/validate';
import { HomePage } from '@/backend/routers';
import { IContentError } from '@/backend/models/messages/IContentMessage';
import { DefaultContentErrorValue } from '@/backend/defaultData/content';
import { CheckChangeData } from '@/backend/feature/general';
import SystemMessage from '@/backend/messages/systemMessage';

//Lấy danh sách nội dung bài học
export async function GetContentList(
  courseID: string,
  unitID: string,
  taskID: string,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/taskContent/list?courseID=${courseID}&unitID=${unitID}&taskID=${taskID}`,
    { method: 'GET', cache: 'no-store' },
  );
  const info: IContentList[] = await response.json();
  if (Array.isArray(info)) {
    return info;
  }
  return [];
}

//Lấy danh sách nội dung bài học - Theo khóa học
export async function GetContentListByCourseID(courseID: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/taskContent/list?courseID=${courseID}`,
    { method: 'GET', cache: 'no-store' },
  );
  const info: IContentCourseList[] = await response.json();
  if (Array.isArray(info)) {
    return info;
  }
  return [];
}

//Thêm nội dung bài học
export async function AddContent(
  courseID: string,
  unitID: string,
  taskID: string,
  data: IContentList,
  setError: React.Dispatch<React.SetStateAction<IContentError>>,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  const error = DefaultContentErrorValue();
  //Thêm dữ liệu vào cơ sở dữ liệu
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/taskContent/add?courseID=${courseID}&unitID=${unitID}&taskID=${taskID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
        cache: 'no-store',
      },
      body: JSON.stringify({
        contentType: data.contentType,
        contentName: data.contentName,
        contentDescription: data.contentDescription,
        contentData: null,
      }),
    },
  );

  if (response.ok) {
    return window.location.reload();
  }

  const errorData = await response.json();
  error.status = false;
  error.systemError = errorData.message;
  setError(error);
  return;
}

//Chỉnh sửa nội dung bài học
export async function EditContent(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
  editData: IContentList,
  defaultData: IContentList,
  setError: React.Dispatch<React.SetStateAction<IContentError>>,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Kiểm tra có sự thay đổi dữ liệu hay không
  const checkDefault = [
    defaultData.contentName,
    defaultData.contentDescription,
  ];
  const checkEdit = [editData.contentName, editData.contentDescription];
  if (!CheckChangeData(checkDefault, checkEdit, null)) {
    return;
  }

  const error = DefaultContentErrorValue();
  //Thêm dữ liệu vào cơ sở dữ liệu
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/taskContent/edit?courseID=${courseID}&unitID=${unitID}&taskID=${taskID}&contentID=${contentID}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
        cache: 'no-store',
      },
      body: JSON.stringify({
        contentType: defaultData.contentType,
        contentName: editData.contentName,
        contentDescription: editData.contentDescription,
        contentData: null,
      }),
    },
  );

  if (response.ok) {
    return window.location.reload();
  }
  const errorData = await response.json();
  error.status = false;
  error.systemError = errorData.message ?? SystemMessage.SYSTEM_ERROR;
  setError(error);
  return;
}

//Xóa nội dung bài học
export async function DeleteContent(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/taskContent/delete?courseID=${courseID}&unitID=${unitID}&taskID=${taskID}&contentID=${contentID}`,
    {
      method: 'DELETE',
      cache: 'no-store',
      headers: { Authorization: `${token}` },
    },
  );

  return window.location.reload();
}

//Xóa nội dung chi tiết bài học
export async function DeleteContentDetail(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
  position: string | number,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/taskContent/delete?courseID=${courseID}&unitID=${unitID}&taskID=${taskID}&contentID=${contentID}&position=${position}`,
    {
      method: 'DELETE',
      cache: 'no-store',
      headers: { Authorization: `${token}` },
    },
  );

  return window.location.reload();
}

//Reset lỗi
export function ResetError(
  data,
  setFieldValue,
  setError: React.Dispatch<React.SetStateAction<IContentError>>,
) {
  setFieldValue(data.target.name, data.target.value);
  setError((prev) => {
    const newErrorState = {
      ...prev,
      systemError: null,
    };
    if (
      ['contentName', 'contentDescription', 'contentType'].includes(
        data.target.name,
      )
    ) {
      newErrorState[`${data.target.name}Error`] = null;
    }
    return newErrorState;
  });
}
