import { ILogin } from '@/components/models/ILogin';
import { signIn } from 'next-auth/react';
import { HomePage } from '../../routers/routers';
import { ErrorMessage } from '@/components/process/feature/login/loginErrorMessage';
export const defaultLoginValue: ILogin = {
  info: '',
  password: '',
};

export async function handelSubmit(
  data: ILogin,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
) {
  try {
    const result = await signIn('credentials', {
      info: data.info,
      password: data.password,
      redirect: false,
    });
    if (result?.error) {
      console.log(result.error);
      setErrorMessage(ErrorMessage.WRONG_INFO);
    } else {
      HomePage();
    }
  } catch (error) {
    setErrorMessage('Hi');
  }
}
