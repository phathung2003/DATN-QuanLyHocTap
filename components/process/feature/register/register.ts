import { IRegister, IError } from '@/components/models/IRegister';
import { HomePage } from '@/components/process/routers/routers';
import { ErrorMessage } from '@/components/process/feature/register/registerErrorMessage';

export const defaultRegisterValue: IRegister = {
  name: '',
  username: '',
  phoneNumber: '',
  email: '',
  password: '',
  rePassword: '',
};

export const defaultErrorValue: IError = {
  status: true,
  usernameError: null,
  phoneNumberError: null,
  emailError: null,
  systemError: null,
};

export async function handelSubmit(
  data: IRegister,
  setError: React.Dispatch<React.SetStateAction<IError>>,
) {
  try {
    //Kết nối API
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
  } catch (error) {
    defaultErrorValue.systemError = ErrorMessage.SYSTEM_ERROR;
    setError(defaultErrorValue);
  }
}

export function ResetError(
  data: React.ChangeEvent<HTMLInputElement>,
  setFieldValue,
  setError: React.Dispatch<React.SetStateAction<IError>>,
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

export async function CheckSession() {}
