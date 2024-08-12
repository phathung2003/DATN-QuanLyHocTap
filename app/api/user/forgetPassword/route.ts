import UserMessage from '@/backend/messages/userMessage';
import { ResetPassword } from '@/backend/database/users';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import SystemMessage from '@/backend/messages/systemMessage';

// Quên mật khẩu
export async function POST(request: Request) {
  try {
    const data = await request.json();

    //Lỗi thiếu dữ liệu
    if (!data.info) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    const { info } = data;

    let statusCode = 202;
    const result = await ResetPassword(info);

    //Nếu xảy ra lỗi
    if (result.status == false) {
      switch (result.message) {
        case UserMessage.RESET_PASSWORD_EMAIL_MISSING:
          statusCode = 400;
          break;
        case UserMessage.RESET_PASSWORD_INVALID_INFO:
          statusCode = 404;
          break;
        case UserMessage.RESET_PASSWORD_SEND_FAILED:
          statusCode = 500;
          break;
      }
    }
    return MessageReturnOnly(result.message, statusCode);
  } catch {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
  }
}
