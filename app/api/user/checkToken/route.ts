import { NextResponse } from 'next/server';
import { GetSessionInfo } from '@/backend/database/session';
import SessionMessage from '@/backend/messages/sessionMessage';
import { DeleteToken } from '@/app/api/user/checkToken/deleteToken';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import SystemMessage from '@/backend/messages/systemMessage';

//Kiểm tra token
export async function POST(request: Request) {
  try {
    //Lấy dữ liệu
    const data = await request.json();

    //Lỗi thiếu dữ liệu
    if (!data.tokenID) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }
    const { tokenID } = data;
    //Kiểm tra token có hợp lệ
    const userData = await GetSessionInfo(tokenID);
    if ('status' in userData && userData.status === false) {
      //Lỗi hệ thống 404 | Các lỗi khác 401
      const errorCode =
        userData.message === SystemMessage.SYSTEM_ERROR ? 404 : 401;
      return DeleteToken(tokenID, userData.message, errorCode);
    }

    //Token hợp lệ
    return new NextResponse(
      JSON.stringify({
        message: SessionMessage.VALID_TOKEN,
        userInfo: userData,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
  }
}
