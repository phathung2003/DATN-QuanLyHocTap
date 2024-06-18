import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { ISession } from '@/components/models/data/ISession';
import { ISessionError } from '@/components/models/messages/ISessionMessage';
import SessionMessage from '../messages/sessionMessage';
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
  console.log('Go here');
  const tokensData = collection(db, tableName);
  const tokenData = query(tokensData, where('tokenID', '==', token));
  const tokenResult = await getDocs(tokenData);

  tokenResult.forEach(async (session) => {
    await deleteDoc(session.ref);
  });
}

//Kiểm tra session hợp lệ
export async function CheckSession(token: string) {
  const defaultError: ISessionError = {
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
      defaultError.message = SessionMessage.INVALID_TOKEN;
      return defaultError;
    }

    //Kiểm tra session còn hạn không
    const sessionInfo = await tokenResult.docs[0].data();
    if (sessionInfo.expiresAt.toDate().getSeconds() < new Date().getSeconds()) {
      await DeleteSession(sessionInfo.tokenID);
      defaultError.status = false;
      defaultError.message = SessionMessage.SESSION_TIME_OUT;
      return defaultError;
    }

    //Lấy thông tin người dùng
    const getUserData = await GetInfo(tokenResult.docs[0].data().accountID);
    if (getUserData == false) {
      defaultError.status = false;
      defaultError.message = SessionMessage.INFO_NOT_FOUND;
      return defaultError;
    }
    return getUserData;
  } catch {
    defaultError.status = false;
    defaultError.message = SessionMessage.SYSTEM_ERROR;
    return defaultError;
  }
}
