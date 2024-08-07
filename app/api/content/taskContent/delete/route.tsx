import { CheckToken, LoginSession } from '@/app/api/checkData';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import ContentMessage from '@/backend/messages/contentMessage';
import { DeleteContent } from '@/backend/database/content';

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

    //Xóa nội dung bài hoc
    await DeleteContent(
      dataInput.courseID,
      dataInput.unitID,
      dataInput.taskID,
      dataInput.contentID,
      dataInput.position,
    );
    return MessageReturnOnly(ContentMessage.CONTENT_DELETE_COMPLETE, 200);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
async function CheckData(request) {
  try {
    const courseIDRequest = request.nextUrl.searchParams.get('courseID');
    const unitIDRequest = request.nextUrl.searchParams.get('unitID');
    const taskIDRequest = request.nextUrl.searchParams.get('taskID');
    const contentIDRequest = request.nextUrl.searchParams.get('contentID');
    const positionRequest = request.nextUrl.searchParams.get('position');
    const tokenID = LoginSession(request);

    if (
      !tokenID ||
      !courseIDRequest ||
      !unitIDRequest ||
      !taskIDRequest ||
      !contentIDRequest
    ) {
      return false;
    }

    return {
      token: tokenID,
      courseID: courseIDRequest,
      unitID: unitIDRequest,
      taskID: taskIDRequest,
      contentID: contentIDRequest,
      position: positionRequest,
    };
  } catch {
    return false;
  }
}
