import { NextResponse } from 'next/server';
import { DeleteSession } from '@/components/process/database/session';
import SessionMessage from '@/components/process/messages/sessionMessage';

export async function DeleteToken(
  token: string,
  messageInfo: string,
  statusCode: number,
) {
  try {
    //Tiến hành xóa phiên đăng nhập
    await DeleteSession(token);
  } catch {
    statusCode = 404;
    messageInfo = SessionMessage.SYSTEM_ERROR;
  }

  return new NextResponse(
    JSON.stringify({
      message: messageInfo,
    }),
    {
      status: statusCode,
      //Hủy token hiện có
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict; Secure; Max-Age=0`,
      },
    },
  );
}
