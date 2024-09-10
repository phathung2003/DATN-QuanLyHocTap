import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Login } from '@/backend/database/users';
import { DateTime } from 'next-auth/providers/kakao';
import { QuerySnapshot } from 'firebase/firestore';
import IUserInfo from '@/backend/models/data/IUserInfo';

//Kiểm tra thông tin đăng nhập
export async function LoginResult(email: string, password: string) {
  const userData = await Login(email, password);

  //Thông tin đăng nhập không đúng
  if (userData == null) {
    return null;
  }
  //Đăng nhập vào tài khoản không có gmail
  if (userData instanceof QuerySnapshot) {
    const userInfo = userData.docs[0].data();
    const isMatch = await bcrypt.compare(password, userInfo.password);
    if (isMatch) {
      const user: IUserInfo = {
        accountID: userData.docs[0].id,
        name: userInfo.name,
        username: userInfo.username,
        phoneNumber: userInfo.phoneNumber,
        email: userInfo.email,
        role: userInfo.role,
      };
      return user; // Đăng nhập thành công
    }
    //Mật khẩu không đúng
    return null;
  }
  //Đăng nhập bằng email
  else {
    return userData;
  }
}

export interface LoginResponse {
  token?: string;
  expiresDate?: DateTime;
  message: string;
}

//Tạo token
export async function GenerateToken(
  userInfo: IUserInfo,
  expiresInSeconds: number,
) {
  const currentTime = new Date();
  const expireDate = currentTime.setSeconds(
    currentTime.getSeconds() + expiresInSeconds,
  );
  //Tạo token
  const token = jwt.sign(
    {
      accountID: userInfo.accountID,
      createAt: currentTime,
      expiresAt: expireDate,
    },
    process.env.SECRET_KEY,
  );
  return token;
}
