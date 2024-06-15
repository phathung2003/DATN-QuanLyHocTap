import { collection, addDoc } from 'firebase/firestore';
import { ISession } from '@/components/models/ISession';
import { db } from '@/components/process/database/firebase';

export async function AddSession(data: ISession) {
  try {
    const docRef = await addDoc(collection(db, 'sessions'), {
      tokenID: data.tokenID,
      accountID: data.accountID,
      expiresAt: data.expiresAt,
      createAt: data.createAt,
    });
    if (docRef.id != null) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}
