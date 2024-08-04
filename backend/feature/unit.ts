import IUnit from '@/backend/models/data/IUnit';
import { GetToken } from '@/backend/feature/validate';
import { HomePage } from '@/backend/routers';
import { IUnitError } from '@/backend/models/messages/IUnitMessage';
import { RemoveAccent } from '@/backend/feature/general';
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

  const error = DefaultUnitErrorValue;
  const errorData = await response.json();

  error.status = false;
  error.systemError = errorData.message;
  setError(error);
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
