import { NextResponse } from 'next/server';
import { AddContent } from '@/backend/database/content';
import { LoginSession, CheckToken } from '@/app/api/checkData';
import ContentMessage from '@/backend/messages/contentMessage';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { TableName, ContentType } from '@/backend/globalVariable';
import { DefaultContentErrorValue } from '@/backend/defaultData/content';
import { CheckIDExist } from '@/backend/database/generalFeature';
import {
  IsFlashcard,
  IsCalculateTwoNumber,
  IsCard,
} from '@/app/api/content/contentData';

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

    //Kiểm tra xem lớp với môn học có tồn tại trên hệ thống hay chưa
    const contentData = await CheckClassification(
      dataInput.courseID,
      dataInput.unitID,
    );
    if (contentData instanceof NextResponse) {
      return contentData;
    }
    //Thêm dữ liệu vào bảng
    if (
      !(await AddContent(dataInput.courseID, dataInput.unitID, dataInput.data))
    ) {
      return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
    }

    return MessageReturnOnly(ContentMessage.CONTENT_ADD_COMPLETE, 201);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
async function CheckData(request) {
  try {
    const tokenID = LoginSession(request);
    const unitFileID = request.nextUrl.searchParams.get('unitID');
    const courseFileID = request.nextUrl.searchParams.get('courseID');
    const dataInput = await request.json();

    if (
      !tokenID ||
      !courseFileID ||
      !unitFileID ||
      !(dataInput instanceof Array)
    ) {
      return false;
    }

    for (let type = 0; type < dataInput.length; type++) {
      if (!dataInput[type].taskNo) {
        return false;
      }
      switch (dataInput[type].contentType.toUpperCase()) {
        case ContentType.FLASHCARD:
          if (!IsFlashcard(dataInput[type].content)) {
            return false;
          }
          break;
        case ContentType.CALCULATE_TWO_NUMBER:
          if (!IsCalculateTwoNumber(dataInput[type].content)) {
            return false;
          }
          break;
        case ContentType.CARD:
          if (!IsCard(dataInput[type].content)) {
            return false;
          }
          break;
        default:
          return false;
      }
    }

    return {
      token: tokenID,
      data: dataInput,
      courseID: courseFileID,
      unitID: unitFileID,
    };
  } catch {
    return false;
  }
}

//Kiểm tra loại có trên hệ thống hay không
async function CheckClassification(courseID: string, unitID: string) {
  const error = DefaultContentErrorValue;

  if (!(await CheckIDExist(TableName.COURSE, courseID))) {
    error.status = false;
    error.courseIDError = ContentMessage.COURSE_NOT_FOUND;
    return new NextResponse(
      JSON.stringify({
        message: ContentMessage.CONTENT_ADD_FAILED,
        errorMessage: error,
      }),
      {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  if (
    !(await CheckIDExist(
      `${TableName.COURSE}/${courseID}/${TableName.UNIT}`,
      unitID,
    ))
  ) {
    error.status = false;
    error.contentUnitIDError = ContentMessage.UNIT_NOT_FOUND;

    return new NextResponse(
      JSON.stringify({
        message: ContentMessage.CONTENT_ADD_FAILED,
        errorMessage: error,
      }),
      {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
  return true;
}
