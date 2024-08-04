import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import SubjectMessage from '@/backend/messages/subjectMessage';
import { CheckSubjectEditExist, EditSubject } from '@/backend/database/subject';
import { CheckDataInputNeedLogin, CheckToken } from '@/app/api/checkData';
import SubjectData from '@/app/api/category/subject/subjectData';
import { NextResponse } from 'next/server';
import { CheckIDExist } from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';
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
      return MessageReturnOnly(SubjectMessage.SUBJECT_EDIT_NOT_FOUND, 404);
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
    return MessageReturnOnly(SubjectMessage.SUBJECT_EDIT_COMPLETE, 200);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
async function CheckData(request) {
  try {
    const subjectIDRequest = request.nextUrl.searchParams.get('subjectID');

    //Các trường có thể null
    const nullableCheckField = ['subjectImage', 'subjectDescription'];
    const checkField = ['subjectID', 'subjectName'];
    const result = await CheckDataInputNeedLogin(
      request,
      checkField,
      nullableCheckField,
    );
    if (!result || !subjectIDRequest) {
      return false;
    }

    const subjectData = SubjectData(result);
    if (!subjectData) {
      return false;
    }

    return {
      token: result.token,
      data: subjectData,
      subjectID: subjectIDRequest,
    };
  } catch {
    return false;
  }
}