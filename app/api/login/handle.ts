import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Login } from '@/components/process/database/users';
import { DateTime } from 'next-auth/providers/kakao';
import { ISession } from '@/components/models/ISession';
import { AddSession } from '@/components/process/database/session';

export async function LoginResult(email: string, password: string) {
  const userData = await Login(email);
  if (userData != null && !userData.empty) {
    const userInfo = userData.docs[0].data();
    const isMatch = await bcrypt.compare(password, userInfo.password);
    if (isMatch) {
      const user = {
        id: userData.docs[0].id,
        username: userInfo.username,
        name: userInfo.name,
      };
      return user; // Đăng nhập thành công
    } else {
      return null; // Mật khẩu không đúng
    }
  } else {
    return null; // Tài khoản không tồn tại
  }
}

export interface LoginResponse {
  token?: string;
  expiresDate?: DateTime;
  message: string;
}

//Tạo token
export async function GenerateToken(
  userId: string,
  userName: string,
  expiresInSeconds: number,
) {
  const currentTime = new Date();
  const expireDate = currentTime.setSeconds(
    currentTime.getSeconds() + expiresInSeconds,
  );
  const token = jwt.sign(
    {
      id: userId,
      name: userName,
      createAt: currentTime,
      expiredDate: expireDate,
    },
    process.env.NEXTAUTH_SECRET,
  );
  try {
    const sessionData: ISession = {
      tokenID: token,
      accountID: userId,
      expiresAt: new Date(expireDate),
      createAt: new Date(),
    };
    const result = await AddSession(sessionData);
    if (result == true) {
      return token;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}
