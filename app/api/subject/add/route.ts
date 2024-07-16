import { NextResponse } from 'next/server';
import SubjectMessage from '@/backend/messages/subjectMessage';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { CheckSubjectExist, AddSubject } from '@/backend/database/subject';
import { CheckDataInputNeedLogin, CheckToken } from '@/app/api/checkData';
import SubjectData from '@/app/api/subject/subjectData';

export async function POST(request: Request) {
  try {
    //Kiểm tra dữ liệu hợp lệ
    const dataInput = await CheckData(request);
    if (dataInput === false) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    //Kiểm tra phiên đăng nhập
    const loginSession = await CheckToken(dataInput.token);
    if (loginSession != true) {
      return loginSession;
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
  try {
    //Các trường có thể null
    const nullableCheckField = ['subjectImage', 'subjectDescription'];
    const checkField = ['subjectID', 'subjectName'];
    const result = await CheckDataInputNeedLogin(
      request,
      checkField,
      nullableCheckField,
    );
    if (!result) {
      return false;
    }

    const subjectData = SubjectData(result);
    if (!subjectData) {
      return false;
    }

    return { token: result.token, data: subjectData };
  } catch {
    return false;
  }
}
