import { IRegister } from '@/components/models/IRegister';
import { collection, addDoc } from 'firebase/firestore';
import { HomePage } from '@/components/process/routers/routers';
import { db } from '@/components/process/database/firebase';
export const defaultRegisterValue: IRegister = {
  name: '',
  username: '',
  phoneNumber: '',
  email: '',
  password: '',
  rePassword: '',
};

export async function handelSubmit(data: IRegister) {
  console.log(data.email);
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
  HomePage();
}
