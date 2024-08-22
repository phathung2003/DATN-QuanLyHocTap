import { ILogin } from '@/backend/models/data/ILogin';
import { AdminPage, UserPage } from '@/backend/routers';
import { Role } from '@/backend/globalVariable';
import { LogOut } from '@/backend/feature/user/validate';
import { LoginPage } from '@/backend/routers';
import { IRegister } from '@/backend/models/data/IRegister';
import { IRegisterError } from '@/backend/models/messages/IRegisterMessage';
import { DefaultRegisteErrorValue } from '@/backend/defaultData/register';
import SystemMessage from '@/backend/messages/systemMessage';

//Đăng nhập
export async function Login(
  data: ILogin,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          info: data.info,
          password: data.password,
        }),
      },
    );

    const responseData = await response.json();

    if (response.ok) {
      switch (responseData.role) {
        case Role.ADMIN:
          return await AdminPage();
        case Role.USER:
          return await UserPage();
        default:
          return await LogOut();
      }
    }
    setErrorMessage(responseData.message);
  } catch {
    setErrorMessage(SystemMessage.SYSTEM_ERROR);
  }
}

//Đăng ký
export async function Register(
  data: IRegister,
  setError: React.Dispatch<React.SetStateAction<IRegisterError>>,
) {
  try {
    //Kết nối API
    const response = await fetch('/api/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        username: data.username,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
      }),
    });

    //Kiểm tra dữ liệu API
    if (response.ok) {
      return await LoginPage();
    }
    const errorData = await response.json();
    setError(errorData.errorMessage);
  } catch {
    const error = DefaultRegisteErrorValue();
    error.systemError = SystemMessage.SYSTEM_ERROR;
    setError(error);
  }
}

//Reset lỗi
export function ResetRegisterError(
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
    if (['username', 'phoneNumber', 'email'].includes(data.target.name)) {
      newErrorState[`${data.target.name}Error`] = null;
    }
    return newErrorState;
  });
}
