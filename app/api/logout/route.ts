import SessionMessage from '@/components/process/messages/sessionMessage';
import { DeleteToken } from '@/app/api/checkToken/deleteToken';
import APIMessage from '@/components/process/messages/apiMessage';
import MessageReturnOnly from '@/app/api/messageReturnOnly';

//Đăng xuất
export async function POST(request: Request) {
  try {
    const data = await request.json();

    //Lỗi thiếu dữ liệu
    if (!data.tokenID) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    const { tokenID } = data;
    return DeleteToken(tokenID, SessionMessage.LOG_OUT, 200);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}
