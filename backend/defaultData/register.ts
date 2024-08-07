import { IRegister } from '@/backend/models/data/IRegister';
import { IRegisterError } from '@/backend/models/messages/IRegisterMessage';

export function DefaultRegisterValue(): IRegister {
  return {
    name: '',
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    rePassword: '',
  };
}

export function DefaultRegisteErrorValue(): IRegisterError {
  return {
    status: true,
    usernameError: null,
    phoneNumberError: null,
    emailError: null,
    systemError: null,
  };
}
