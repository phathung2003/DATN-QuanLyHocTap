import { DeleteToken } from '@/app/api/user/checkToken/deleteToken';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import SystemMessage from '@/backend/messages/systemMessage';
import SessionMessage from '@/backend/messages/sessionMessage';

//Đăng xuất
export async function DELETE(request) {
  try {
    const data = await request.json();

    if (!data.tokenID) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    const { tokenID } = data;
    return DeleteToken(tokenID, SessionMessage.LOG_OUT, 200);
  } catch {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
  }
}
