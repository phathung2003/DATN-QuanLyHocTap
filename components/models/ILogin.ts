import * as Yup from 'yup';
import { ErrorMessage } from '../process/feature/login/loginErrorMessage';
export interface ILogin {
  info: string;
  password: string;
}

export const schemaLogin = Yup.object().shape({
  info: Yup.string().required(ErrorMessage.NO_INFO),
  password: Yup.string().required(ErrorMessage.NO_PASSWORD),
});
