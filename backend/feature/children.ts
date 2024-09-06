import { Role } from '@/backend/globalVariable';

import { IRegisterDB } from '@/backend/models/data/IRegister';
import { IRegisterError } from '@/backend/models/messages/IRegisterMessage';
import { DefaultRegisteErrorValue } from '@/backend/defaultData/register';
import SystemMessage from '@/backend/messages/systemMessage';
import { IChildren, IChildrenDB } from '@/backend/models/data/IChildren';
import { CheckInfoExist } from '@/backend/database/users';
import { AddChildren, GetChildrenList } from '@/backend/database/children';
import { RemoveAccent } from './general';

//Đăng ký
export async function RegisterChildren(
  parentID: string,
  data: IChildren,
  setError: React.Dispatch<React.SetStateAction<IRegisterError>>,
) {
  try {
    const info: IRegisterDB = {
      name: data.name,
      username: data.username,
      phoneNumber: null,
      email: null,
      password: data.password,
      role: Role.CHILDREN,
    };
    const result = await CheckInfoExist(info);

    if (result.status) {
      await AddChildren(parentID, data);
      return window.location.reload();
    }

    setError(result);
  } catch {
    const error = DefaultRegisteErrorValue();
    error.systemError = SystemMessage.SYSTEM_ERROR;
    setError(error);
  }
}

//Lấy danh sách của trẻ
export async function GetChildren(parentUID) {
  const data = await GetChildrenList(parentUID);

  if (Array.isArray(data)) {
    return data;
  }
  return [];
}

//Tìm kiếm
export function SearchChildren(search: string, childrenList: IChildrenDB[]) {
  const searchInfo = RemoveAccent(search).toLowerCase();
  return childrenList.filter(
    (gradeData) =>
      RemoveAccent(gradeData.name.toLowerCase()).includes(searchInfo) ||
      RemoveAccent(gradeData.username.toLowerCase()).includes(searchInfo),
  );
}

//Reset lỗi
export function ResetChildrenRegisterError(
  data: React.ChangeEvent<HTMLInputElement>,
  setFieldValue,
  setError: React.Dispatch<React.SetStateAction<IRegisterError>>,
) {
  setFieldValue(data.target.name, data.target.value);
  setError((prev) => {
    const newErrorState = {
      ...prev,
      systemError: null,
    };
    if (['username'].includes(data.target.name)) {
      newErrorState[`${data.target.name}Error`] = null;
    }
    return newErrorState;
  });
}
