import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { DeleteSubject } from '@/backend/database/subject';
import SubjectMessage from '@/backend/messages/subjectMessage';
import { CheckToken, LoginSession } from '@/app/api/checkData';

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
    return MessageReturnOnly(SubjectMessage.SUBJECT_DELETE_COMPLETE, 200);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
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
