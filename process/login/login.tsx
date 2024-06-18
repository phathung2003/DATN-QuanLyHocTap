import { ILogin } from '@/components/models/ILogin';
import { HomePage } from '../routers/routers';

export const defaultLoginValue: ILogin = {
  info: '',
  password: '',
};

export function handelSubmit(
  data: ILogin,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
) {
  if (data.info === '1') {
    setErrorMessage('Sai thông tin đăng nhập');
    return;
  } else {
    //window.location.replace('/');
    HomePage();
  }
  console.log(data.info);
}
