import IUnit from '@/backend/models/data/IUnit';
import { GetToken } from '@/backend/feature/validate';
import { HomePage, CourseDetail } from '@/backend/routers';
import { IUnitError } from '@/backend/models/messages/IUnitMessage';
import { RemoveAccent, CheckChangeData } from '@/backend/feature/general';
import { DefaultUnitErrorValue } from '@/backend/defaultData/unit';

//Lấy danh sách bài học
export async function GetUnitList(courseID: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/unit/list?courseID=${courseID}`,
    { method: 'GET', cache: 'no-cache' },
  );
  const info: IUnit[] = await response.json();
  if (Array.isArray(info)) {
    return info;
  }
  return [];
}

//Lấy thông tin 1 bài học
export async function GetUnitInfo(
  courseID: string,
  unitID: string,
): Promise<IUnit | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/unit/list?courseID=${courseID}&unitID=${unitID}`,
    { method: 'GET', cache: 'no-store' },
  );
  const info: IUnit = await response.json();
  if (info) {
    return info;
  }
  return null;
}

//Thêm bài học
export async function AddUnit(
  courseID: string,
  data: IUnit,
  setError: React.Dispatch<React.SetStateAction<IUnitError>>,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Thêm dữ liệu vào cơ sở dữ liệu
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/unit/add?courseID=${courseID}`,
    {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        unitNo: data.unitNo,
        unitName: data.unitName,
        unitDescription: data.unitDescription,
      }),
    },
  );

  if (response.ok) {
    return window.location.reload();
  }

  const error = DefaultUnitErrorValue();
  const errorData = await response.json();

  error.status = false;
  error.systemError = errorData.message;
  setError(error);
  return;
}

//Chỉnh sửa bài học
export async function EditUnit(
  courseID: string,
  unitID: string,
  editData: IUnit,
  defaultData: IUnit,
  setError: React.Dispatch<React.SetStateAction<IUnitError>>,
) {
  //Kiểm tra lấy token
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Kiểm tra có sự thay đổi dữ liệu hay không
  const checkDefault = [
    defaultData.unitName,
    defaultData.unitNo,
    defaultData.unitDescription,
  ];
  const checkEdit = [
    editData.unitName,
    editData.unitNo,
    editData.unitDescription,
  ];

  if (!CheckChangeData(checkDefault, checkEdit, null)) {
    return;
  }

  //Tiến hành cập nhật dữ liệu
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/unit/edit?courseID=${courseID}&unitID=${unitID}`,
    {
      method: 'PATCH',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        unitName: editData.unitName,
        unitNo: editData.unitNo,
        unitDescription: editData.unitDescription,
      }),
    },
  );

  if (response.ok) {
    return window.location.reload();
  }
  const errorData = await response.json();
  const error = DefaultUnitErrorValue();
  error.status = false;
  error.systemError = errorData.message;
  setError(error);
  return;
}

//Xóa bài học
export async function DeleteUnit(
  courseID: string,
  unitID: string,
  setError?: React.Dispatch<React.SetStateAction<IUnitError>>,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Tiến hành xóa bài học
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/unit/delete?courseID=${courseID}&unitID=${unitID}`,
    {
      method: 'DELETE',
      cache: 'no-store',
      headers: { Authorization: `${token}` },
    },
  );

  //Xóa thành công
  if (response.ok) {
    return await CourseDetail(courseID);
  }

  //Xóa thất bại
  if (setError) {
    const error = DefaultUnitErrorValue();
    const errorData = await response.json();
    error.status = false;
    error.systemError = errorData.message;
    setError(error);
  }

  return;
}

//Tìm kiếm bài học
export function SearchUnit(search: string, unitList: IUnit[]) {
  const searchInfo = RemoveAccent(search).toLowerCase();

  return unitList.filter(
    (data) =>
      RemoveAccent(data.unitNo.toString()).includes(searchInfo) ||
      RemoveAccent(data.unitName.toLowerCase()).includes(searchInfo),
  );
}

//Reset lỗi
export function ResetError(
  data,
  setFieldValue,
  setError: React.Dispatch<React.SetStateAction<IUnitError>>,
) {
  setFieldValue(data.target.name, data.target.value);

  setError((prev) => {
    const newErrorState = {
      ...prev,
      systemError: null,
    };
    if (['courseIDError', 'unitNoError'].includes(data.target.name)) {
      newErrorState[`${data.target.name}Error`] = null;
    }

    return newErrorState;
  });
}
