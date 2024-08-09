import { HomePage } from '@/backend/routers';
import { IRegister } from '@/backend/models/data/IRegister';
import { IRegisterError } from '@/backend/models/messages/IRegisterMessage';
import RegisterMessage from '@/backend/messages/registerMessage';
import { DefaultRegisteErrorValue } from '../defaultData/register';

//Đăng ký
export async function handelSubmit(
  data: IRegister,
  setError: React.Dispatch<React.SetStateAction<IRegisterError>>,
) {
  try {
    //Kết nối API
    const response = await fetch('/api/register', {
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
      HomePage();
    } else {
      const errorData = await response.json();
      setError(errorData.errorMessage);
    }
  } catch {
    const error = DefaultRegisteErrorValue();
    error.systemError = RegisterMessage.SYSTEM_ERROR;
    setError(error);
  }
}

//Reset lỗi
export function ResetError(
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
