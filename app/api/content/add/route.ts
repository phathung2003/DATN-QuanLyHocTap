import { NextResponse } from 'next/server';
import { AddContent } from '@/backend/database/content';
import {
  CheckDataInputTrueFalse,
  LoginSession,
  CheckToken,
} from '@/app/api/checkData';
import ContentMessage from '@/backend/messages/contentMessage';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { TableName } from '@/backend/globalVariable';
import { DefaultContentErrorValue } from '@/backend/defaultData/content';
import { CheckIDExist } from '@/backend/database/generalFeature';
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
      dataInput.collectionID,
      dataInput.unitID,
    );
    if (contentData instanceof NextResponse) {
      return contentData;
    }
    //Thêm dữ liệu vào bảng
    await AddContent(dataInput.collectionID, dataInput.unitID, dataInput.data);

    return MessageReturnOnly(ContentMessage.CONTENT_ADD_COMPLETE, 201);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
/* eslint-disable */
async function CheckData(request) {
  try {
    const tokenID = LoginSession(request);
    const unitID = request.nextUrl.searchParams.get('unitID');
    const collectionID = request.nextUrl.searchParams.get('collectionID');
    if (!tokenID || !collectionID || !unitID) {
      return false;
    }

    const dataInput: any[] = await request.json();

    for (let type = 0; type < dataInput.length; type++) {
      if (!dataInput[type].taskNo) {
        return false;
      }

      switch (dataInput[type].contentType) {
        case 'Flashcard':
          if (!IsFlashcard(dataInput[type].content)) {
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
      collectionID: collectionID,
      unitID: unitID,
    };
  } catch {
    return false;
  }
}

function IsFlashcard(data: any[]): boolean {
  try {
    for (let slide = 0; slide < data.length; slide++) {
      const nullableCheckField = [
        'firstSideText',
        'firstSideImage',
        'secondSideText',
        'secondSideImage',
      ];
      const checkField = ['position'];
      if (
        !CheckDataInputTrueFalse(data[slide], checkField, nullableCheckField)
      ) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

//Kiểm tra loại có trên hệ thống hay không
async function CheckClassification(collectionID: string, unitID: string) {
  const error = DefaultContentErrorValue;

  if (!(await CheckIDExist(TableName.CONTENT, collectionID))) {
    error.status = false;
    error.contentCollectionIDError = ContentMessage.COLLECTION_NOT_FOUND;

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
      `${TableName.CONTENT}/${collectionID}/${TableName.UNIT}`,
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
