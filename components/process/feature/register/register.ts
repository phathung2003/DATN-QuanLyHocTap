import { IRegister } from '@/components/models/IRegister';

import { HomePage } from '@/components/process/routers/routers';

export const defaultRegisterValue: IRegister = {
  name: '',
  username: '',
  phoneNumber: '',
  email: '',
  password: '',
  rePassword: '',
};

export async function handelSubmit(data: IRegister) {
  try {
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
    if (response.ok) {
      HomePage();
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export async function CheckSession() {}
