import { NextResponse } from 'next/server';
import { CheckSession } from '@/components/process/database/session';
import { SessionErrorMessage } from '@/components/process/feature/validate/validateErrorMessage';
import { DeleteToken } from '@/app/api/checkToken/deleteToken';

//Kiểm tra token
export async function POST(request: Request) {
  //Lấy dữ liệu
  const data = await request.json();
  const { tokenID } = data;

  //Kiểm tra token có hợp lệ
  const userData = await CheckSession(tokenID);
  if ('status' in userData && userData.status === false) {
    //Lỗi hệ thống 404 | Các lỗi khác 401
    const errorCode =
      userData.message === SessionErrorMessage.SYSTEM_ERROR ? 404 : 401;
    return DeleteToken(tokenID, userData.message, errorCode);
  }

  //Token hợp lệ
  return new NextResponse(
    JSON.stringify({
      message: SessionErrorMessage.VALID_TOKEN,
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
