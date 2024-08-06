import { DeleteTask } from '@/backend/database/task';
import { CheckToken, LoginSession } from '@/app/api/checkData';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import TaskMessage from '@/backend/messages/taskMessage';

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

    //Xóa tác vụ bài
    await DeleteTask(dataInput.courseID, dataInput.unitID, dataInput.taskID);
    return MessageReturnOnly(TaskMessage.TASK_DELETE_COMPLETE, 200);
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
    const tokenID = LoginSession(request);

    if (!tokenID || !courseIDRequest || !unitIDRequest || !taskIDRequest) {
      return false;
    }

    return {
      token: tokenID,
      courseID: courseIDRequest,
      unitID: unitIDRequest,
      taskID: taskIDRequest,
    };
  } catch {
    return false;
  }
}
