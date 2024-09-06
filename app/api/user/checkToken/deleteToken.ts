import { NextResponse } from 'next/server';
import { DeleteSession } from '@/backend/database/session';
import SystemMessage from '@/backend/messages/systemMessage';

//Xóa token
export async function DeleteToken(
  token: string,
  messageInfo: string | null,
  statusCode: number,
) {
  try {
    //Tiến hành xóa phiên đăng nhập
    await DeleteSession(token);
  } catch {
    statusCode = 404;
    messageInfo = SystemMessage.SYSTEM_ERROR;
  }

  const response = new NextResponse(
    JSON.stringify({
      message: messageInfo,
    }),
    {
      status: statusCode,
      headers: { 'Content-Type': 'application/json' },
    },
  );
  response.cookies.delete('token');
  return response;
}
