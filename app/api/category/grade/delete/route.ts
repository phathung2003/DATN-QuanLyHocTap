import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { DeleteGrade } from '@/backend/database/grade';
import GradeMessage from '@/backend/messages/gradeMessage';
import { CheckDataInputNeedLogin, CheckToken } from '@/app/api/checkData';

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
    return MessageReturnOnly(GradeMessage.GRADE_DELETE_COMPLETE, 200);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
async function CheckData(request) {
  try {
    const gradeIDRequest = request.nextUrl.searchParams.get('gradeID');

    const result = await CheckDataInputNeedLogin(
      request,
      [gradeIDRequest],
      null,
    );
    if (!result) {
      return false;
    }

    return {
      token: result.token,
      gradeID: gradeIDRequest,
    };
  } catch {
    return false;
  }
}
