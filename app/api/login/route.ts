import { NextResponse } from 'next/server';
import { ErrorMessage } from '@/components/process/feature/login/loginErrorMessage';
import { LoginResult, GenerateToken } from './handle';

export async function POST(request: Request) {
  const data = await request.json();
  const { info, password } = data;

  // Lấy thông tin người dùng dựa trên username
  const user = await LoginResult(info, password);

  if (!user) {
    return NextResponse.json(
      { message: ErrorMessage.WRONG_INFO },
      { status: 404 },
    );
  }

  const token = await GenerateToken(user.id, user.name);
  if (token != null) {
    return new NextResponse(
      JSON.stringify({
        message: 'Đăng nhập thành công',
        loginToken: token,
      }),
      {
        status: 200, // Thiết lập mã trạng thái HTTP phản hồi tại đây
        headers: {
          'Content-Type': 'application/json', // Đảm bảo đặt Content-Type phù hợp
        },
      },
    );
  } else {
    return NextResponse.json(
      { message: ErrorMessage.SYSTEM_ERROR },
      { status: 500 },
    );
  }
}
