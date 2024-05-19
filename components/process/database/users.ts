import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/components/process/database/firebase';

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

export async function CheckInfoExist(filed: string, info: string) {
  try {
    const usersData = collection(db, 'users');
    const emailData = query(usersData, where(filed, '==', info));
    const user = await getDocs(emailData);

    if (user.empty) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
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
