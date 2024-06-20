import { NextResponse } from 'next/server';
import LoginMessage from '@/backend/messages/loginMessage';
import { LoginResult, GenerateToken } from '@/app/api/login/loginProcess';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
const expiresInSeconds = 30;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { info, password } = data;

    //Lỗi thiếu dữ liệu
    if (!data.info || !data.password) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    // Lấy thông tin người dùng dựa trên username
    const user = await LoginResult(info, password);

    if (!user) {
      return MessageReturnOnly(LoginMessage.WRONG_INFO, 404);
    }

    const token = await GenerateToken(user, expiresInSeconds);
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
            'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Strict; Secure; ; Max-Age=${expiresInSeconds}`,
          },
        },
      );
    } else {
      return MessageReturnOnly(LoginMessage.SYSTEM_ERROR, 500);
    }
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}
