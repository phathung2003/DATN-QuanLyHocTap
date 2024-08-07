import { NextResponse } from 'next/server';
import {
  AddContent,
  SuggestCheckAddPosition,
  CheckContentType,
} from '@/backend/database/content';
import { CheckToken } from '@/app/api/checkData';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { CheckData } from '@/app/api/content/taskContent/taskContentData';
import {
  CheckSuggestAddNo,
  CheckGetAddNo,
} from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';
import ContentMessage from '@/backend/messages/contentMessage';

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

    const contentPathName = `${TableName.COURSE}/${dataInput.courseID}/${TableName.UNIT}/${dataInput.unitID}/${TableName.TASK}/${dataInput.taskID}/${TableName.CONTENT}`;
    //--- Chèn vào nội dung sẵn có ---//
    if (dataInput.contentID) {
      //B1: Kiểm tra số thứ tự nội dung
      if (!isNaN(dataInput.data.contentNo) && dataInput.data.contentNo < 0) {
        return MessageReturnOnly(
          ContentMessage.CONTENT_NO.NEGATIVE_NUMBER,
          500,
        );
      }
      dataInput.data.contentNo = await CheckGetAddNo(
        contentPathName,
        'contentNo',
        dataInput.contentID,
        dataInput.data.contentNo,
      );
      if (isNaN(dataInput.data.contentNo)) {
        return MessageReturnOnly(ContentMessage.CONTENT_NOT_FOUND, 500);
      }

      //B2: Kiểm tra kiểu nội dung
      if (
        !(await CheckContentType(
          dataInput.courseID,
          dataInput.unitID,
          dataInput.taskID,
          dataInput.contentID,
          dataInput.data.contentNo,
          dataInput.data.contentType,
        ))
      ) {
        return MessageReturnOnly(ContentMessage.CONTENT_NOT_FOUND, 500);
      }

      //B3: Kiểm tra số thứ tự trong nội dung
      if (
        !isNaN(dataInput.data.contentData.position) &&
        dataInput.data.contentData.position < 0
      ) {
        return MessageReturnOnly(
          ContentMessage.CONTENT_POSITION.NEGATIVE_NUMBER,
          500,
        );
      }
      dataInput.data.contentData.position = await SuggestCheckAddPosition(
        dataInput.courseID,
        dataInput.unitID,
        dataInput.taskID,
        dataInput.contentID,
        dataInput.data.contentData.position,
      );
      if (isNaN(dataInput.data.contentData.position)) {
        return MessageReturnOnly(
          ContentMessage.CONTENT_POSITION.ALREADY_EXIST,
          500,
        );
      }
    } //--- Thêm mới ---//
    else {
      //B1: Kiểm tra số thứ tự nội dung
      if (!isNaN(dataInput.data.contentNo) && dataInput.data.contentNo < 0) {
        return MessageReturnOnly(
          ContentMessage.CONTENT_NO.NEGATIVE_NUMBER,
          500,
        );
      }

      dataInput.data.contentNo = await CheckSuggestAddNo(
        contentPathName,
        'contentNo',
        dataInput.data.contentNo,
      );

      if (isNaN(dataInput.data.contentNo)) {
        return MessageReturnOnly(ContentMessage.CONTENT_NO.ALREADY_EXIST, 500);
      }

      //B2: Kiểm tra xem thứ tự dữ liệu nội dung
      //* Nếu như là NaN => Mặc định số thứ tự là 1
      if (isNaN(dataInput.data.contentData.position)) {
        dataInput.data.contentData.position = 1;
      }
      //* Nếu như là số âm => Trả về sai
      else if (dataInput.data.contentData.position < 0) {
        return MessageReturnOnly(
          ContentMessage.CONTENT_POSITION.NEGATIVE_NUMBER,
          500,
        );
      }
    }

    //Thêm dữ liệu vào bảng
    if (
      !(await AddContent(
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
