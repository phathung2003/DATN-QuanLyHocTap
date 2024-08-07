import { NextResponse } from 'next/server';
import { AddTask } from '@/backend/database/taskFull';
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
  IsNumber,
} from '@/app/api/content/taskFull/contentData';
import { CheckDataInputTrueFalse } from '@/app/api/checkData';

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
      !(await AddTask(dataInput.courseID, dataInput.unitID, dataInput.data))
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
      if (!CheckTask(dataInput[type])) {
        return false;
      }

      if (!CheckContent(dataInput[type].content)) {
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
    error.systemError = ContentMessage.CONTENT_ADD_FAILED;
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
    error.systemError = ContentMessage.CONTENT_ADD_FAILED;

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

//Kiểm tra nội dung
function CheckTask(dataInput): boolean {
  const nullableCheckField = ['taskDescription', 'content'];
  const checkField = ['taskNo', 'taskName'];
  if (!CheckDataInputTrueFalse(dataInput, checkField, nullableCheckField)) {
    return false;
  }

  if (!IsNumber(dataInput.taskNo)) {
    return false;
  }
  return true;
}

function CheckContent(dataInput): boolean {
  if (!(dataInput instanceof Array)) {
    return false;
  }

  for (let content = 0; content < dataInput.length; content++) {
    if (
      !dataInput[content].contentNo ||
      !IsNumber(dataInput[content].contentNo)
    ) {
      return false;
    }

    switch (dataInput[content].contentType.toUpperCase()) {
      case ContentType.FLASHCARD:
        if (!IsFlashcard(dataInput[content].contentData)) {
          return false;
        }
        break;
      case ContentType.CALCULATE_TWO_NUMBER:
        if (!IsCalculateTwoNumber(dataInput[content].contentData)) {
          return false;
        }
        break;
      case ContentType.CARD:
        if (!IsCard(dataInput[content].contentData)) {
          return false;
        }
        break;
      default:
        return false;
    }
  }
  return true;
}
