import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { ISession, IError } from '@/components/models/ISession';
import { SessionErrorMessage } from '../feature/validate/validateErrorMessage';
import { db } from '@/components/process/database/firebase';
import { GetInfo } from './users';

const tableName = 'sessions';

//Thêm session
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

//Xóa session
export async function DeleteSession(token: string) {
  const tokensData = collection(db, tableName);
  const tokenData = query(tokensData, where('tokenID', '==', token));
  const tokenResult = await getDocs(tokenData);

  tokenResult.forEach(async (session) => {
    await deleteDoc(session.ref);
  });
}

//Kiểm tra session hợp lệ
export async function CheckSession(token: string) {
  const defaultError: IError = {
    status: true,
    message: null,
  };
  try {
    //Lấy thông tin session
    const tokensData = collection(db, tableName);
    const tokenData = query(tokensData, where('tokenID', '==', token));
    const tokenResult = await getDocs(tokenData);

    if (tokenResult.empty) {
      defaultError.status = false;
      defaultError.message = SessionErrorMessage.INVALID_TOKEN;
      return defaultError;
    }

    //Kiểm tra session còn hạn không
    const sessionInfo = tokenResult.docs[0].data();
    console.log(sessionInfo.expiresAt.toDate());
    console.log(new Date());
    if (sessionInfo.expiresAt.toDate() < new Date()) {
      console.log('Hết hạn');
      await DeleteSession(sessionInfo.tokenID);
      defaultError.status = false;
      defaultError.message = SessionErrorMessage.SESSION_TIME_OUT;
      return defaultError;
    }

    //Lấy thông tin người dùng
    const getUserData = await GetInfo(tokenResult.docs[0].data().accountID);
    if (getUserData == false) {
      defaultError.status = false;
      defaultError.message = SessionErrorMessage.INFO_NOT_FOUND;
      return defaultError;
    }
    return getUserData;
  } catch {
    defaultError.status = false;
    defaultError.message = SessionErrorMessage.SYSTEM_ERROR;
    return defaultError;
  }
}
