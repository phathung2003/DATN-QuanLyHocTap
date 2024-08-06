import { EditTask } from '@/backend/database/task';
import { CheckToken } from '@/app/api/checkData';
import CheckTaskData from '@/app/api/content/task/taskData';
import {
  CheckIDExist,
  CheckGetEditNo,
} from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import CourseMessage from '@/backend/messages/courseMessage';
import UnitMessage from '@/backend/messages/unitMessage';
import TaskMessage from '@/backend/messages/taskMessage';

export async function PATCH(request) {
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

    //Kiểm tra mã khóa học có tồn tại
    if (!(await CheckIDExist(TableName.COURSE, dataInput.courseID))) {
      return MessageReturnOnly(CourseMessage.COURSE_EDIT_NOT_FOUND, 404);
    }

    //Kiểm tra mã bài học có tồn tại
    const coursePathName = `${TableName.COURSE}/${dataInput.courseID}/${TableName.UNIT}/`;
    if (!(await CheckIDExist(coursePathName, dataInput.unitID))) {
      return MessageReturnOnly(UnitMessage.UNIT_NOT_FOUND, 404);
    }

    //Kiểm tra mã tác vụ bài có tồn tại
    const taskPathName = `${TableName.COURSE}/${dataInput.courseID}/${TableName.UNIT}/${dataInput.unitID}/${TableName.TASK}/`;
    if (!(await CheckIDExist(taskPathName, dataInput.taskID))) {
      return MessageReturnOnly(TaskMessage.TASK_NOT_FOUND, 404);
    }

    //Kiểm tra số thứ tự tác vụ bài
    if (!isNaN(dataInput.data.taskNo) && dataInput.data.taskNo < 0) {
      return MessageReturnOnly(TaskMessage.TASK_NO.NEGATIVE_NUMBER, 500);
    }
    dataInput.data.taskNo = await CheckGetEditNo(
      taskPathName,
      'taskNo',
      dataInput.taskID,
      dataInput.data.taskNo,
    );
    if (isNaN(dataInput.data.taskNo)) {
      return MessageReturnOnly(TaskMessage.TASK_NO.ALREADY_EXIST, 500);
    }

    //Tiến hành cập nhật tác vụ
    if (
      !(await EditTask(
        dataInput.courseID,
        dataInput.unitID,
        dataInput.taskID,
        dataInput.data,
      ))
    ) {
      return MessageReturnOnly(TaskMessage.TASK_EDIT_FAILED, 500);
    }

    return MessageReturnOnly(TaskMessage.TASK_EDIT_COMPLETE, 200);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
async function CheckData(request) {
  try {
    const taskIDRequest = request.nextUrl.searchParams.get('taskID');
    const checkResult = await CheckTaskData(request);

    if (!checkResult || !taskIDRequest) {
      return false;
    }

    return {
      token: checkResult.token,
      data: checkResult.data,
      courseID: checkResult.courseID,
      unitID: checkResult.unitID,
      taskID: taskIDRequest,
    };
  } catch {
    return false;
  }
}
