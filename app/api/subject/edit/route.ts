import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { CheckSession } from '@/backend/database/session';
import SessionMessage from '@/backend/messages/sessionMessage';
import { DeleteToken } from '@/app/api/user/checkToken/deleteToken';
import SubjectMessage from '@/backend/messages/subjectMessage';
import {
  CheckSubjectEditExist,
  EditSubject,
  GetSubjectIDFile,
} from '@/backend/database/subject';

import { NextResponse } from 'next/server';

export async function PUT(request) {
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

    //Kiểm tra mã loại cần sửa có trên hệ thống
    const categoryFileID = await GetSubjectIDFile(dataInput.subjectID);
    switch (categoryFileID) {
      case SubjectMessage.SYSTEM_ERROR:
        return MessageReturnOnly(categoryFileID, 500);
      case SubjectMessage.SUBJECT_EDIT_NOT_FOUND:
        return MessageReturnOnly(categoryFileID, 404);
    }

    //Kiểm tra thông tin chỉnh sửa đã tồn tại hay chưa
    const result = await CheckSubjectEditExist(categoryFileID, dataInput.data);
    if (result.status == false) {
      return new NextResponse(
        JSON.stringify({
          message: SubjectMessage.SUBJECT_EXIST,
          errorMessage: result,
        }),
        {
          status: 409,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    //Tiến hành cập nhật
    await EditSubject(categoryFileID, dataInput.data);
    return MessageReturnOnly(SubjectMessage.SUBJECT_EDIT_COMPLETE, 200);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
async function CheckData(request) {
  const tokenID = request.headers.get('Authorization');
  const searchParams = request.nextUrl.searchParams;
  const subjectIDRequest = searchParams.get('subjectID');

  try {
    const dataInput = await request.json();
    if (
      !tokenID ||
      tokenID == null ||
      subjectIDRequest == null ||
      !dataInput.subjectID ||
      !dataInput.subjectName
    ) {
      return false;
    }
    return {
      token: tokenID,
      subjectID: subjectIDRequest,
      data: dataInput,
    };
  } catch {
    return false;
  }
}

//Kiểm tra phiên đăng nhập
async function CheckToken(tokenID: string) {
  const result = await CheckSession(tokenID);
  if (result.status === false) {
    const errorCode =
      result.message === SessionMessage.SYSTEM_ERROR ? 404 : 401;
    return DeleteToken(tokenID, result.message, errorCode);
  }
  return true;
}
