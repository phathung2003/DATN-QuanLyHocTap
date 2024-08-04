import { NextResponse } from 'next/server';
import { AddTask } from '@/backend/database/content';
import { CheckToken } from '@/app/api/checkData';
import ContentMessage from '@/backend/messages/contentMessage';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { CheckData } from '@/app/api/content/taskContent/taskContentData';
export async function POST(request: Request) {
  try {
    //Kiểm tra dữ liệu hợp lệ
    const dataInput = await CheckData(request);
    if (dataInput === false) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    //Kiểm tra phiên đăng nhập hợp lệ
    const sessionCheck = await CheckToken(dataInput.token);
    if (sessionCheck instanceof NextResponse) {
      return sessionCheck;
    }

    //Thêm dữ liệu vào bảng
    if (
      !(await AddTask(
        dataInput.courseID,
        dataInput.unitID,
        dataInput.taskID,
        dataInput.contentID,
        dataInput.data,
      ))
    ) {
      return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
    }

    return MessageReturnOnly(ContentMessage.CONTENT_ADD_COMPLETE, 201);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}
