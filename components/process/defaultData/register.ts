import { IRegister } from '@/components/models/data/IRegister';
import { IRegisterError } from '@/components/models/messages/IRegisterMessage';

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
