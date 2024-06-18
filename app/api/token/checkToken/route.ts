import { NextResponse } from 'next/server';
import { CheckSession } from '@/components/process/database/session';
import { SessionErrorMessage } from '@/components/process/feature/validate/validateErrorMessage';

export async function POST(request: Request) {
  const data = await request.json();
  const { tokenID } = data;
  const userData = await CheckSession(tokenID);

  //Kiểm tra nếu có lỗi
  if ('status' in userData && userData.status === false) {
    //Lỗi hệ thống 404 | Các lỗi khác 401
    const ErrorCode =
      userData.message === SessionErrorMessage.SYSTEM_ERROR ? 404 : 401;
    return new NextResponse(
      JSON.stringify({
        message: userData.message,
      }),
      {
        status: ErrorCode,
        //Hủy token hiện có
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict; Secure; Max-Age=0`,
        },
      },
    );
  }

  //Phiên đăng nhập hợp lệ
  return new NextResponse(
    JSON.stringify({
      message: 'Phiên đăng nhập hợp lệ',
      userInfo: userData,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}
