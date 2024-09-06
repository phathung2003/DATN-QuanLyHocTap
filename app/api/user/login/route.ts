import { NextResponse } from 'next/server';
import LoginMessage from '@/backend/messages/loginMessage';
import { LoginResult, GenerateToken } from '@/app/api/user/login/loginProcess';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import SystemMessage from '@/backend/messages/systemMessage';
const expiresInSeconds = process.env.NEXT_PUBLIC_TOKEN_EXPIRED;

export async function POST(request: Request) {
  try {
    const data = await request.json();

    //Xác đinh thời gian có phải là số hay không
    const tokenExpirationNumber = expiresInSeconds
      ? Number(expiresInSeconds)
      : null;
    if (tokenExpirationNumber === null || isNaN(tokenExpirationNumber)) {
      return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
    }

    //Lỗi thiếu dữ liệu
    if (!data.info || !data.password) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }
    const { info, password } = data;

    // Lấy thông tin người dùng dựa trên username
    const user = await LoginResult(info, password);

    if (!user) {
      return MessageReturnOnly(LoginMessage.WRONG_INFO, 400);
    }

    const token = await GenerateToken(user, tokenExpirationNumber);
    if (token != null) {
      const response = new NextResponse(
        JSON.stringify({
          message: 'Đăng nhập thành công',
          tokenID: token,
          role: user.role,
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      response.cookies.set('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      });
      return response;
    } else {
      return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
    }
  } catch {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
  }
}
