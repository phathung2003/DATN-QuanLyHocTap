import { ILogin } from '@/backend/models/data/ILogin';

export default function DefaultLoginValue(): ILogin {
  return {
    info: '',
    password: '',
  };
}
