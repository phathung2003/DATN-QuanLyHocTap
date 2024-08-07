import { NextResponse } from 'next/server';
import {
  EditContent,
  CheckEditPositionExist,
  CheckPositionEdit,
} from '@/backend/database/content';
import { CheckToken } from '@/app/api/checkData';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { CheckEditData } from '@/app/api/content/taskContent/taskContentData';
import { CheckGetEditNo } from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';
import ContentMessage from '@/backend/messages/contentMessage';

export async function PATCH(request: Request) {
  try {
    //Kiểm tra dữ liệu hợp lệ
    const dataInput = await CheckEditData(request);
    if (dataInput === false) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    //Kiểm tra phiên đăng nhập hợp lệ
    const sessionCheck = await CheckToken(dataInput.token);
    if (sessionCheck instanceof NextResponse) {
      return sessionCheck;
    }

    const contentPathName = `${TableName.COURSE}/${dataInput.courseID}/${TableName.UNIT}/${dataInput.unitID}/${TableName.TASK}/${dataInput.taskID}/${TableName.CONTENT}`;

    //Kiểm tra số thứ tự nội dung
    if (!isNaN(dataInput.data.contentNo) && dataInput.data.contentNo < 0) {
      return MessageReturnOnly(ContentMessage.CONTENT_NO.NEGATIVE_NUMBER, 500);
    }
    dataInput.data.contentNo = await CheckGetEditNo(
      contentPathName,
      'contentNo',
      dataInput.contentID,
      dataInput.data.contentNo,
    );
    if (isNaN(dataInput.data.contentNo)) {
      return MessageReturnOnly(ContentMessage.CONTENT_NOT_FOUND, 500);
    }

    //Có chỉnh sửa contentData
    if (dataInput.data.contentData) {
      //Kiểm tra thông tin ban đầu trùng khớp
      if (
        !(await CheckEditPositionExist(
          dataInput.courseID,
          dataInput.unitID,
          dataInput.taskID,
          dataInput.contentID,
          dataInput.data.contentType,
          dataInput.position,
        ))
      ) {
        return MessageReturnOnly(ContentMessage.CONTENT_NOT_FOUND, 500);
      }

      if (
        !isNaN(dataInput.data.contentData.position) &&
        dataInput.data.contentData.position < 0
      ) {
        //Kiểm tra position trong nội dung
        return MessageReturnOnly(
          ContentMessage.CONTENT_POSITION.NEGATIVE_NUMBER,
          500,
        );
      }
      dataInput.data.contentData.position = await CheckPositionEdit(
        dataInput.courseID,
        dataInput.unitID,
        dataInput.taskID,
        dataInput.contentID,
        dataInput.position,
        dataInput.data.contentData.position,
      );
      if (isNaN(dataInput.data.contentData.position)) {
        return MessageReturnOnly(
          ContentMessage.CONTENT_POSITION.ALREADY_EXIST,
          500,
        );
      }
    }

    //Thêm dữ liệu vào bảng
    if (
      !(await EditContent(
        dataInput.courseID,
        dataInput.unitID,
        dataInput.taskID,
        dataInput.contentID,
        dataInput.data,
        dataInput.position,
      ))
    ) {
      return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
    }

    return MessageReturnOnly(ContentMessage.CONTENT_EDIT_COMPLETE, 201);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}
