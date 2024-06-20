import { IRegister } from '@/backend/models/data/IRegister';
import { IRegisterError } from '@/backend/models/messages/IRegisterMessage';

export const DefaultRegisterValue: IRegister = {
  name: '',
  username: '',
  phoneNumber: '',
  email: '',
  password: '',
  rePassword: '',
};

export const DefaultRegisteErrorValue: IRegisterError = {
  status: true,
  usernameError: null,
  phoneNumberError: null,
  emailError: null,
  systemError: null,
};
