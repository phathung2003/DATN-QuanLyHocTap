import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import jwt from 'jsonwebtoken';
import { ISession } from '@/backend/models/data/ISession';
import { ISessionError } from '@/backend/models/messages/ISessionMessage';
import { db } from '@/backend/database/firebase';
import { TableName } from '@/backend/globalVariable';
import { GetInfo } from '@/backend/database/users';
import SystemMessage from '@/backend/messages/systemMessage';
import SessionMessage from '@/backend/messages/sessionMessage';

//Thêm session
export async function AddSession(data: ISession) {
  try {
    const docRef = await addDoc(collection(db, TableName.SESSION), {
      tokenID: data.tokenID.replace('Bearer ', ''),
      accountID: data.accountID,
      expiresAt: data.expiresAt,
      createAt: data.createAt,
    });
    return docRef.id != null ? true : false;
  } catch {
    return false;
  }
}

//Xóa session
export async function DeleteSession(token: string) {
  const tokenDatabase = collection(db, TableName.SESSION);
  const tokenQuery = query(
    tokenDatabase,
    where('tokenID', '==', token.replace('Bearer ', '')),
  );
  const tokenData = await getDocs(tokenQuery);

  tokenData.forEach(async (session) => {
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
    return await jwt.verify(
      token,
      process.env.SECRET_KEY,
      async (err, decoded) => {
        //Token không hợp lệ
        if (err) {
          defaultError.status = false;
          defaultError.message = SessionMessage.INVALID_TOKEN;
          return defaultError;
        }

        //Lưu nội dung phiên đăng nhập
        const sessionInfo = decoded;
        //Kiểm tra phiên đăng nhập còn hạn không
        if (sessionInfo.expiresAt < new Date().getTime()) {
          await DeleteSession(sessionInfo.tokenID);
          defaultError.status = false;
          defaultError.message = SessionMessage.SESSION_TIME_OUT;
          return defaultError;
        }
        console.log(sessionInfo);
        //Lấy thông tin người dùng
        const getUserData = await GetInfo(sessionInfo.accountID);
        if (getUserData == false) {
          defaultError.status = false;
          defaultError.message = SessionMessage.INFO_NOT_FOUND;
          return defaultError;
        }
        return getUserData;
      },
    );
  } catch {
    defaultError.status = false;
    defaultError.message = SystemMessage.SYSTEM_ERROR;
    return defaultError;
  }
}

//Kiểm tra phiên đăng nhập
export async function CheckSession(token: string) {
  const defaultError: ISessionError = {
    status: true,
    message: null,
  };
  try {
    return await jwt.verify(
      token,
      process.env.SECRET_KEY,
      async (err, decoded) => {
        //Token không hợp lệ
        if (err) {
          defaultError.status = false;
          defaultError.message = SessionMessage.INVALID_TOKEN;
          return defaultError;
        }

        //Lưu nội dung phiên đăng nhập
        const sessionInfo = decoded;
        //Kiểm tra phiên đăng nhập còn hạn không
        if (sessionInfo.expiresAt < new Date().getTime()) {
          await DeleteSession(sessionInfo.tokenID);
          defaultError.status = false;
          defaultError.message = SessionMessage.SESSION_TIME_OUT;
          return defaultError;
        }

        //Lấy thông tin người dùng
        const getUserData = await GetInfo(sessionInfo.accountID);
        if (getUserData == false) {
          defaultError.status = false;
          defaultError.message = SessionMessage.INFO_NOT_FOUND;
          return defaultError;
        }
        return defaultError;
      },
    );
  } catch {
    defaultError.status = false;
    defaultError.message = SystemMessage.SYSTEM_ERROR;
    return defaultError;
  }
}

//Lấy thông tin session
export async function GetUserIDFromSession(
  token: string,
): Promise<ISessionError | string> {
  const defaultError: ISessionError = {
    status: true,
    message: null,
  };
  try {
    //Lấy thông tin session
    const tokenDatabase = collection(db, TableName.SESSION);
    const tokenQuery = query(
      tokenDatabase,
      where('tokenID', '==', token.replace('Bearer ', '')),
    );
    const tokenData = await getDocs(tokenQuery);

    if (tokenData.empty) {
      defaultError.status = false;
      defaultError.message = SessionMessage.INVALID_TOKEN;
      return defaultError;
    }

    //Kiểm tra session còn hạn không
    const sessionInfo = await tokenData.docs[0].data();
    if (sessionInfo.expiresAt.toDate() < new Date()) {
      await DeleteSession(sessionInfo.tokenID);
      defaultError.status = false;
      defaultError.message = SessionMessage.SESSION_TIME_OUT;
      return defaultError;
    }

    //Lấy thông tin người dùng
    const getUserData = await GetInfo(tokenData.docs[0].data().accountID);
    if (getUserData == false) {
      defaultError.status = false;
      defaultError.message = SessionMessage.INFO_NOT_FOUND;
      return defaultError;
    }
    return tokenData.docs[0].data().accountID;
  } catch {
    defaultError.status = false;
    defaultError.message = SystemMessage.SYSTEM_ERROR;
    return defaultError;
  }
}
