import { NextResponse } from 'next/server';
import { CheckSession } from '@/backend/database/session';
import SubjectMessage from '@/backend/messages/subjectMessage';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { CheckSubjectExist, AddSubject } from '@/backend/database/subject';
import SessionMessage from '@/backend/messages/sessionMessage';
import { DeleteToken } from '@/app/api/user/checkToken/deleteToken';

export async function POST(request: Request) {
  try {
    //Kiểm tra dữ liệu hợp lệ
    const dataInput = await CheckData(request);
    if (dataInput === false) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    //Kiểm tra phiên đăng nhập hợp lệ
    const sessionCheck = await CheckToken(dataInput.token);
    if (sessionCheck != true) {
      return sessionCheck;
    }

    //Kiểm tra xem dữ liệu đã có hay chưa
    const result = await CheckSubjectExist(dataInput.data);
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

    //Thêm dữ liệu vào bảng
    await AddSubject(dataInput.data);
    return MessageReturnOnly(SubjectMessage.SUBJECT_ADD_COMPLETE, 201);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
async function CheckData(request: Request) {
  const tokenID = request.headers.get('Authorization');
  try {
    const dataInput = await request.json();
    if (
      !tokenID ||
      tokenID == null ||
      !dataInput.subjectID ||
      !dataInput.subjectName
    ) {
      return false;
    }
    return {
      token: tokenID,
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
