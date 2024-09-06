import { DeleteGrade } from '@/backend/database/grade';
import { CheckToken, LoginSession } from '@/app/api/checkData';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import GradeMessage from '@/backend/messages/gradeMessage';
import SystemMessage from '@/backend/messages/systemMessage';

export async function DELETE(request) {
  try {
    const dataInput = await CheckData(request);

    //Kiểm tra dữ liệu hợp lệ
    if (dataInput == false) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    //Kiểm tra phiên đăng nhập hợp lệ
    const sessionCheck = await CheckToken(dataInput.token);
    if (sessionCheck != true) {
      return sessionCheck;
    }

    //Xóa loại
    await DeleteGrade(dataInput.gradeID);
    return MessageReturnOnly(GradeMessage.GRADE_DELETE_COMPLETED, 200);
  } catch {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
async function CheckData(request) {
  try {
    const gradeIDRequest = request.nextUrl.searchParams.get('gradeID');
    const tokenID = LoginSession(request);
    if (!tokenID || !gradeIDRequest) {
      return false;
    }

    return {
      token: tokenID,
      gradeID: gradeIDRequest,
    };
  } catch {
    return false;
  }
}
