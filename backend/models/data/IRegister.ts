export interface IRegister {
  name: string;
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
  rePassword: string;
}

export interface IRegisterDB {
  name: string | null;
  username: string | null;
  phoneNumber: string | null;
  email: string | null;
  password: string;
  role: string;
}
