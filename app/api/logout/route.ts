import SessionMessage from '@/components/process/messages/sessionMessage';
import { DeleteToken } from '@/app/api/checkToken/deleteToken';

//Đăng xuất
export async function POST(request: Request) {
  const data = await request.json();
  const { tokenID } = data;
  return DeleteToken(tokenID, SessionMessage.LOG_OUT, 204);
}
