import { NextResponse } from 'next/server';
import { DeleteSession } from '@/components/process/database/session';
import SessionMessage from '@/components/process/messages/sessionMessage';

export async function DeleteToken(
  token: string,
  message: string,
  status: number,
) {
  try {
    //Tiến hành xóa phiên đăng nhập
    await DeleteSession(token);
  } catch {
    status = 404;
    message = SessionMessage.SYSTEM_ERROR;
  }
  return new NextResponse(
    JSON.stringify({
      message,
    }),
    {
      status,
      //Hủy token hiện có
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict; Secure; Max-Age=0`,
      },
    },
  );
}
