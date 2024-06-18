import {
  collection,
  addDoc,
  query,
  where,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { IRegisterDB } from '@/components/models/data/IRegister';
import { db } from '@/components/process/database/firebase';
import RegisterMessage from '../messages/registerMessage';
import { ILogin } from '@/components/models/data/ILogin';
import { DefaultRegisteErrorValue } from '../defaultData/register';
export async function AddUser(data: IRegisterDB) {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      name: data.name,
      username: data.username,
      phoneNumber: data.phoneNumber,
      email: data.email,
      password: data.password,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function CheckInfoExist(data: IRegisterDB) {
  const error = DefaultRegisteErrorValue;

  try {
    const usersData = collection(db, 'users');
    const field = ['username', 'email', 'phoneNumber'];
    const input = [data.username, data.email, data.phoneNumber];

    for (let i = 0; i < field.length; i++) {
      const userData = query(usersData, where(field[i], '==', input[i]));
      const result = await getDocs(userData);
      if (!result.empty) {
        error.status = false;
        switch (field[i]) {
          case field[0]:
            error.usernameError = RegisterMessage.USERNAME.USERNAME_EXIST;
            break;
          case field[1]:
            error.emailError = RegisterMessage.EMAIL.EMAIL_EXIST;
            break;
          case field[2]:
            error.phoneNumberError =
              RegisterMessage.PHONE_NUMBER.PHONE_NUMBER_EXIST;
            break;
        }
      }
    }
  } catch (error) {
    error.status = false;
    error.systemError = RegisterMessage.SYSTEM_ERROR;
  }
  return error;
}

export async function GetInfo(accountID: string) {
  try {
    const userData = doc(db, 'users', accountID);
    const result = await getDoc(userData);
    if (!result.exists()) {
      return false;
    } else {
      const data = result.data();
      const info = {
        phoneNumber: data.phoneNumber,
        name: data.name,
        email: data.email,
      };
      return info;
    }
  } catch {
    return false;
  }
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

export async function LoginData(data: ILogin) {
  const usersData = collection(db, 'users');
  const fields = ['username', 'email', 'phoneNumber'];
  for (const field of fields) {
    const userData = query(
      usersData,
      where(field, '==', data.info),
      where(field, '==', data.password),
    );
    const result = await getDocs(userData);
    if (!result.empty) {
      return result;
    }
    return null;
  }
}
