import { NextResponse } from 'next/server';
import { CheckSubjectExist, AddSubject } from '@/backend/database/subject';
import { CheckToken } from '@/app/api/checkData';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import CheckSubjectData from '@/app/api/category/subject/subjectData';
import SubjectMessage from '@/backend/messages/subjectMessage';
import APIMessage from '@/backend/messages/apiMessage';
import SystemMessage from '@/backend/messages/systemMessage';

export async function POST(request: Request) {
  try {
    //Kiểm tra dữ liệu hợp lệ
    const dataInput = await CheckSubjectData(request);
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
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    //Thêm dữ liệu vào bảng
    if (!(await AddSubject(dataInput.data))) {
      return MessageReturnOnly(SubjectMessage.SUBJECT_ADD_FAILED, 500);
    }
    return MessageReturnOnly(SubjectMessage.SUBJECT_ADD_COMPLETED, 201);
  } catch {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
  }
}
