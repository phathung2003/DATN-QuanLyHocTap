import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { ISession } from '@/backend/models/data/ISession';
import { ISessionError } from '@/backend/models/messages/ISessionMessage';
import SessionMessage from '@/backend/messages/sessionMessage';
import { db } from '@/backend/database/firebase';
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
    // console.log(docRef.id);
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
  const tokenDatabase = collection(db, tableName);
  const tokenData = query(tokenDatabase, where('tokenID', '==', token));
  const tokenResult = await getDocs(tokenData);

  tokenResult.forEach(async (session) => {
    await deleteDoc(session.ref);
  });
}

//Lấy thông tin session
export async function GetSessionInfo(token: string) {
  const defaultError: ISessionError = {
    status: true,
    message: null,
  };
  try {
    //Lấy thông tin session
    const tokenDatabase = collection(db, tableName);
    const tokenData = query(tokenDatabase, where('tokenID', '==', token));
    const tokenResult = await getDocs(tokenData);

    if (tokenResult.empty) {
      defaultError.status = false;
      defaultError.message = SessionMessage.INVALID_TOKEN;
      return defaultError;
    }

    //Kiểm tra session còn hạn không
    const sessionInfo = await tokenResult.docs[0].data();
    if (sessionInfo.expiresAt.toDate() < new Date()) {
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

export async function CheckSession(token: string) {
  const defaultError: ISessionError = {
    status: true,
    message: null,
  };
  try {
    //Lấy thông tin session
    const tokenDatabase = collection(db, tableName);
    const tokenData = query(tokenDatabase, where('tokenID', '==', token));
    const tokenResult = await getDocs(tokenData);

    if (tokenResult.empty) {
      defaultError.status = false;
      defaultError.message = SessionMessage.INVALID_TOKEN;
      return defaultError;
    }

    //Kiểm tra session còn hạn không
    const sessionInfo = await tokenResult.docs[0].data();
    if (sessionInfo.expiresAt.toDate() < new Date()) {
      await DeleteSession(sessionInfo.tokenID);
      defaultError.status = false;
      defaultError.message = SessionMessage.SESSION_TIME_OUT;
      return defaultError;
    }
    return defaultError;
  } catch {
    defaultError.status = false;
    defaultError.message = SessionMessage.SYSTEM_ERROR;
    return defaultError;
  }
}
