import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { CheckSession } from '@/backend/database/session';
import SessionMessage from '@/backend/messages/sessionMessage';
import { DeleteToken } from '@/app/api/user/checkToken/deleteToken';
import { DeleteSubject } from '@/backend/database/subject';
import SubjectMessage from '@/backend/messages/subjectMessage';

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
    await DeleteSubject(dataInput.subjectID);
    return MessageReturnOnly(SubjectMessage.SUBJECT_DELETE_COMPLETE, 200);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
function CheckData(request) {
  const tokenID = request.headers.get('Authorization');
  const searchParams = request.nextUrl.searchParams;
  const subjectIDRequest = searchParams.get('subjectID');

  try {
    if (!tokenID || tokenID == null || subjectIDRequest == null) {
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

//Kiểm tra phiên đăng nhập
async function CheckToken(tokenID: string) {
  const result = await CheckSession(tokenID);
  if (result.status === false) {
    const errorCode =
      result.message === SessionMessage.SYSTEM_ERROR ? 404 : 401;
    return DeleteToken(tokenID, result.message, errorCode);
  }
  return true;
}
