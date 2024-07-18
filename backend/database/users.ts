import {
  collection,
  addDoc,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { db, auth } from '@/backend/database/firebase';
import { IRegisterDB } from '@/backend/models/data/IRegister';
import IUserInfo from '@/backend/models/data/IUserInfo';
import RegisterMessage from '@/backend/messages/registerMessage';
import UserMessage from '@/backend/messages/userMessage';
import { DefaultRegisteErrorValue } from '@/backend/defaultData/register';
import { DefaultAPIResult } from '@/backend/defaultData/global';

const TABLE_NAME = 'users';

//Đăng ký tài khoản
export async function AddUser(data: IRegisterDB) {
  //Không có email
  if (data.email == null) {
    await addDoc(collection(db, TABLE_NAME), data);
    return;
  }

  //Có email (Hỗ trợ lấy lại mật khẩu)
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  );
  const userInfo = doc(db, TABLE_NAME, userCredential.user.uid);
  await setDoc(userInfo, {
    name: data.name,
    username: data.username,
    phoneNumber: data.phoneNumber,
    email: data.email,
    password: null,
  });
}

//Kiểm tra đã có tài khoản chưa
export async function CheckInfoExist(data: IRegisterDB) {
  const error = DefaultRegisteErrorValue;
  try {
    const usersDatabase = collection(db, TABLE_NAME);
    const field = ['username', 'email', 'phoneNumber'];
    const input = [data.username, data.email, data.phoneNumber];

    for (let i = 0; i < field.length; i++) {
      if (input[i] != null) {
        const userQuery = query(usersDatabase, where(field[i], '==', input[i]));
        const userData = await getDocs(userQuery);
        if (userData.empty == false) {
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
    }
  } catch (error) {
    error.status = false;
    error.systemError = RegisterMessage.SYSTEM_ERROR;
  }
  return error;
}

//Lấy dữ liệu người dùng
export async function GetInfo(userID: string) {
  try {
    const usersData = doc(db, 'users', userID);
    const userInfo = await getDoc(usersData);
    if (!userInfo.exists()) {
      return false;
    } else {
      const data = userInfo.data();
      const info: IUserInfo = {
        accountID: userID,
        name: data.name,
        username: data.username,
        phoneNumber: data.phoneNumber,
        email: data.email,
      };
      return info;
    }
  } catch {
    return false;
  }
}

//Lấy tên người dùng
export async function GetName(userID: string) {
  try {
    const usersData = doc(db, 'users', userID);
    const userInfo = await getDoc(usersData);
    if (!userInfo.exists()) {
      return false;
    }
    const name = userInfo.data().name;
    return name;
  } catch {
    return false;
  }
}

//Đăng nhập
export async function Login(info: string, password: string) {
  //Đăng nhập bằng email
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (pattern.test(info) == true) {
    return await EmailLogin(info, password);
  }

  //Đăng nhập bằng số điện thoại/username
  const usersDatabase = collection(db, 'users');
  const fields = ['username', 'phoneNumber'];
  for (const field of fields) {
    const userQuery = query(usersDatabase, where(field, '==', info));
    const userData = await getDocs(userQuery);
    if (!userData.empty) {
      //Kiểm tra có email hay không
      const email = userData.docs[0].data().email;
      if (email != null) {
        return await EmailLogin(email, password);
      }
      return userData;
    }
  }
  return null;
}

//Đăng nhập bằng email với Firebase Authentication
async function EmailLogin(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  if (userCredential.user.uid != null) {
    return await GetInfo(userCredential.user.uid);
  }
  return null;
}

//Quên mật khẩu (Chỉ dành cho người dùng sử dụng email)
export async function ResetPassword(info: string) {
  const result = DefaultAPIResult;

  const usersDatabase = collection(db, 'users');
  const fields = ['email', 'username', 'phoneNumber'];
  for (const field of fields) {
    const userQuery = query(usersDatabase, where(field, '==', info));
    const userData = await getDocs(userQuery);
    if (!userData.empty) {
      //Kiểm tra có email hay không
      const email = userData.docs[0].data().email;
      if (email != null) {
        return await SendEmail(email);
      } else {
        result.status = false;
        result.message = UserMessage.RESET_PASSWORD_EMAIL_MISSING;
        return result;
      }
    }
  }
  //Không tìm thấy thông tin
  result.status = false;
  result.message = UserMessage.RESET_PASSWORD_INVALID_INFO;
  return result;
}

//Gửi email đặt lại mật khẩu
async function SendEmail(email: string) {
  const result = DefaultAPIResult;
  try {
    await sendPasswordResetEmail(auth, email);
    result.message = UserMessage.RESET_PASSWORD_SEND_SUCCESFULLY;
  } catch {
    result.status = false;
    result.message = UserMessage.RESET_PASSWORD_SEND_FAILED;
  }
  return result;
}
