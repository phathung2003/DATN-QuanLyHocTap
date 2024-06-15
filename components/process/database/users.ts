import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { IRegister, IError } from '@/components/models/IRegister';
import { db } from '@/components/process/database/firebase';
import { ErrorMessage } from '@/components/process/feature/register/registerErrorMessage';

export async function AddUser(
  name: string,
  username: string,
  phoneNumber: string,
  email: string,
  password: string,
) {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      name,
      username,
      phoneNumber,
      email,
      password,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function CheckInfoExist(data: IRegister) {
  const defaultErrorValue: IError = {
    status: true,
    usernameError: null,
    phoneNumberError: null,
    emailError: null,
    systemError: null,
  };

  try {
    const usersData = collection(db, 'users');
    const field = ['username', 'email', 'phoneNumber'];
    const input = [data.username, data.email, data.phoneNumber];

    for (let i = 0; i < field.length; i++) {
      const userData = query(usersData, where(field[i], '==', input[i]));
      const result = await getDocs(userData);
      if (!result.empty) {
        defaultErrorValue.status = false;
        switch (field[i]) {
          case field[0]:
            defaultErrorValue.usernameError =
              ErrorMessage.USERNAME.USERNAME_EXIST;
            break;
          case field[1]:
            defaultErrorValue.emailError = ErrorMessage.EMAIL.EMAIL_EXIST;
            break;
          case field[2]:
            defaultErrorValue.phoneNumberError =
              ErrorMessage.PHONE_NUMBER.PHONE_NUMBER_EXIST;
            break;
        }
      }
    }
  } catch (error) {
    defaultErrorValue.status = false;
    defaultErrorValue.systemError = ErrorMessage.SYSTEM_ERROR;
  }
  return defaultErrorValue;
}

export async function Login(info: string) {
  const usersData = collection(db, 'users');

  const fields = ['username', 'email', 'phoneNumber'];

  for (const field of fields) {
    const userData = query(usersData, where(field, '==', info));
    const result = await getDocs(userData);
    if (!result.empty) {
      return result;
    }
    return null;
  }
}
