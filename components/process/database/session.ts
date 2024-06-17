import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { ISession, IError } from '@/components/models/ISession';
import { SessionErrorMessage } from '../feature/validate/validateErrorMessage';
import { db } from '@/components/process/database/firebase';
import { GetInfo } from './users';

const tableName = 'sessions';
export async function AddSession(data: ISession) {
  try {
    const docRef = await addDoc(collection(db, tableName), {
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
  } catch {
    return false;
  }
}

export async function CheckSession(token: string) {
  const defaultError: IError = {
    status: true,
    message: null,
  };
  try {
    const tokensData = collection(db, tableName);
    const tokenData = query(tokensData, where('tokenID', '==', token));
    const tokenResult = await getDocs(tokenData);

    if (tokenResult.empty) {
      defaultError.status = false;
      defaultError.message = SessionErrorMessage.INVALID_TOKEN;
    } else {
      const getUserData = await GetInfo(tokenResult.docs[0].data().accountID);
      if (getUserData == false) {
        defaultError.status = false;
        defaultError.message = SessionErrorMessage.INFO_NOT_FOUND;
      } else {
        return getUserData;
      }
    }
    return defaultError;
  } catch (e) {
    defaultError.status = false;
    defaultError.message = SessionErrorMessage.SYSTEM_ERROR;
    return defaultError;
  }
}
