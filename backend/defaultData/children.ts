import { IChildren } from '@/backend/models/data/IChildren';
import { IRegisterError } from '@/backend/models/messages/IRegisterMessage';

export function DefaultChilrenRegisterValue(): IChildren {
  return {
    name: '',
    username: '',
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
