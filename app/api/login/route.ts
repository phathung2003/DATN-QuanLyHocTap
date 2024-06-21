import { NextResponse } from 'next/server';
import LoginMessage from '@/backend/messages/loginMessage';
import { LoginResult, GenerateToken } from '@/app/api/login/loginProcess';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';

const expiresInSeconds = process.env.NEXT_PUBLIC_TOKEN_EXPIRED;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { info, password } = data;

    //Xác đinh thời gian có phải là số hay không
    const tokenExpirationNumber = expiresInSeconds
      ? Number(expiresInSeconds)
      : null;

    if (tokenExpirationNumber === null || isNaN(tokenExpirationNumber)) {
      return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
    }
    //Lỗi thiếu dữ liệu
    if (!data.info || !data.password) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    // Lấy thông tin người dùng dựa trên username
    const user = await LoginResult(info, password);

    if (!user) {
      return MessageReturnOnly(LoginMessage.WRONG_INFO, 404);
    }

    const token = await GenerateToken(user, tokenExpirationNumber);
    if (token != null) {
      return new NextResponse(
        JSON.stringify({
          message: 'Đăng nhập thành công',
          loginToken: token,
        }),
        {
          status: 200, // Thiết lập mã trạng thái HTTP phản hồi tại đây
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Strict; Secure;`,
          },
        },
      );
    } else {
      return MessageReturnOnly(LoginMessage.SYSTEM_ERROR, 500);
    }
  } catch (e) {
    console.log(e);
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}
