import { NextResponse } from 'next/server';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import GradeMessage from '@/backend/messages/gradeMessage';
import {
  CheckGradeEditExist,
  EditGrade,
  GetGradeIDFile,
} from '@/backend/database/grade';
import { CheckDataInputNeedLogin, CheckToken } from '@/app/api/checkData';
import GradeData from '@/app/api/grade/gradeData';

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
    const categoryFileID = await GetGradeIDFile(dataInput.gradeID);
    switch (categoryFileID) {
      case GradeMessage.SYSTEM_ERROR:
        return MessageReturnOnly(categoryFileID, 500);
      case GradeMessage.GRADE_EDIT_NOT_FOUND:
        return MessageReturnOnly(categoryFileID, 404);
    }

    //Kiểm tra thông tin chỉnh sửa đã tồn tại hay chưa
    const result = await CheckGradeEditExist(categoryFileID, dataInput.data);
    if (result.status == false) {
      return new NextResponse(
        JSON.stringify({
          message: GradeMessage.GRADE_EXIST,
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
    await EditGrade(categoryFileID, dataInput.data);
    return MessageReturnOnly(GradeMessage.GRADE_EDIT_COMPLETE, 200);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
async function CheckData(request) {
  try {
    //Các trường có thể null
    const gradeIDRequest = request.nextUrl.searchParams.get('gradeID');
    const nullableCheckField = ['gradeImage', 'gradeDescription'];
    const checkField = ['gradeID', 'gradeName'];
    const result = await CheckDataInputNeedLogin(
      request,
      checkField,
      nullableCheckField,
    );
    if (!result || !gradeIDRequest) {
      return false;
    }

    const gradeData = GradeData(result);
    if (!gradeData) {
      return false;
    }

    return { token: result.token, data: gradeData, gradeID: gradeIDRequest };
  } catch {
    return false;
  }
}
