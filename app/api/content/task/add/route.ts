import { NextResponse } from 'next/server';
import { AddTask } from '@/backend/database/task';
import { CheckToken } from '@/app/api/checkData';
import ContentMessage from '@/backend/messages/contentMessage';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import CheckTaskData from '@/app/api/content/task/taskData';
import {
  CheckIDExist,
  CheckSuggestAddNo,
} from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';
import TaskMessage from '@/backend/messages/taskMessage';
import CourseMessage from '@/backend/messages/courseMessage';
import UnitMessage from '@/backend/messages/unitMessage';

export async function POST(request: Request) {
  try {
    //Kiểm tra dữ liệu hợp lệ
    const dataInput = await CheckTaskData(request);
    if (dataInput === false) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    //Kiểm tra phiên đăng nhập hợp lệ
    const sessionCheck = await CheckToken(dataInput.token);
    if (sessionCheck instanceof NextResponse) {
      return sessionCheck;
    }

    //Kiểm tra mã khóa học có tồn tại
    if (!(await CheckIDExist(TableName.COURSE, dataInput.courseID))) {
      return MessageReturnOnly(CourseMessage.COURSE_EDIT_NOT_FOUND, 404);
    }

    //Kiểm tra mã bài học có tồn tại
    const unitPathName = `${TableName.COURSE}/${dataInput.courseID}/${TableName.UNIT}/`;
    if (!(await CheckIDExist(unitPathName, dataInput.unitID))) {
      return MessageReturnOnly(UnitMessage.UNIT_NOT_FOUND, 404);
    }

    //Kiểm tra số thứ tự bài
    if (!isNaN(dataInput.data.taskNo) && dataInput.data.taskNo < 0) {
      return MessageReturnOnly(TaskMessage.TASK_NO.NEGATIVE_NUMBER, 500);
    }
    const taskPathName = `${TableName.COURSE}/${dataInput.courseID}/${TableName.UNIT}/${dataInput.unitID}/${TableName.TASK}/`;
    dataInput.data.taskNo = await CheckSuggestAddNo(
      taskPathName,
      'taskNo',
      dataInput.data.taskNo,
    );
    if (isNaN(dataInput.data.taskNo)) {
      return MessageReturnOnly(TaskMessage.TASK_NO.ALREADY_EXIST, 500);
    }

    //Thêm dữ liệu vào bảng
    if (
      !(await AddTask(dataInput.courseID, dataInput.unitID, dataInput.data))
    ) {
      return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
    }

    return MessageReturnOnly(ContentMessage.CONTENT_ADD_COMPLETE, 201);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}
