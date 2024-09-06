import { DeleteSubject } from '@/backend/database/subject';
import { CheckToken, LoginSession } from '@/app/api/checkData';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import SystemMessage from '@/backend/messages/systemMessage';
import SubjectMessage from '@/backend/messages/subjectMessage';

export async function DELETE(request) {
  try {
    //Kiểm tra dữ liệu hợp lệ
    const dataInput = await CheckData(request);
    if (dataInput == false) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    //Kiểm tra phiên đăng nhập hợp lệ
    const sessionCheck = await CheckToken(dataInput.token);
    if (sessionCheck != true) {
      return sessionCheck;
    }

    //Xóa loại
    await DeleteSubject(dataInput.subjectID);
    return MessageReturnOnly(SubjectMessage.SUBJECT_DELETE_COMPLETED, 200);
  } catch {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
async function CheckData(request) {
  try {
    const subjectIDRequest = request.nextUrl.searchParams.get('subjectID');
    const tokenID = LoginSession(request);
    if (!tokenID || !subjectIDRequest) {
      return false;
    }

    return {
      token: tokenID,
      subjectID: subjectIDRequest,
    };
  } catch {
    return false;
  }
}
