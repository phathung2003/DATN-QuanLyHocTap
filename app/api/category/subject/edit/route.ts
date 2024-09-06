import { CheckSubjectEditExist, EditSubject } from '@/backend/database/subject';
import { CheckToken } from '@/app/api/checkData';
import { NextResponse } from 'next/server';
import { CheckIDExist } from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import SystemMessage from '@/backend/messages/systemMessage';
import SubjectMessage from '@/backend/messages/subjectMessage';
import CheckSubjectData from '@/app/api/category/subject/subjectData';

export async function PUT(request) {
  try {
    //Kiểm tra dữ liệu hợp lệ
    const dataInput = await CheckData(request);
    if (dataInput == false) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    //Kiểm tra phiên đăng nhập hợp lệ
    const sessionCheck = await CheckToken(dataInput.token);
    if (sessionCheck != true) {
      return sessionCheck;
    }

    //Kiểm tra mã môn học cần sửa có trên hệ thống
    if (!(await CheckIDExist(TableName.SUBJECT, dataInput.subjectID))) {
      return MessageReturnOnly(SubjectMessage.SUBJECT_NOT_FOUND, 404);
    }

    //Kiểm tra thông tin chỉnh sửa đã tồn tại hay chưa
    const result = await CheckSubjectEditExist(
      dataInput.subjectID,
      dataInput.data,
    );
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
    await EditSubject(dataInput.subjectID, dataInput.data);
    return MessageReturnOnly(SubjectMessage.SUBJECT_EDIT_COMPLETED, 200);
  } catch {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
async function CheckData(request) {
  try {
    const subjectIDRequest = request.nextUrl.searchParams.get('subjectID');
    const subjectData = await CheckSubjectData(request);

    if (!subjectData || !subjectIDRequest) {
      return false;
    }

    return {
      token: subjectData.token,
      data: subjectData.data,
      subjectID: subjectIDRequest,
    };
  } catch {
    return false;
  }
}
