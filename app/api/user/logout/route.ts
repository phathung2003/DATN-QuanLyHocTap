import SessionMessage from '@/backend/messages/sessionMessage';
import { DeleteToken } from '@/app/api/user/checkToken/deleteToken';
import APIMessage from '@/backend/messages/apiMessage';
import MessageReturnOnly from '@/app/api/messageReturnOnly';

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
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}
