import { NextResponse } from 'next/server';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import { CheckGradeEditExist, EditGrade } from '@/backend/database/grade';
import { CheckDataInputNeedLogin, CheckToken } from '@/app/api/checkData';
import { CheckIDExist } from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';
import GradeData from '@/app/api/category/grade/gradeData';
import APIMessage from '@/backend/messages/apiMessage';
import GradeMessage from '@/backend/messages/gradeMessage';
import SystemMessage from '@/backend/messages/systemMessage';

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
    if (!(await CheckIDExist(TableName.GRADE, dataInput.gradeID))) {
      return MessageReturnOnly(GradeMessage.GRADE_NOT_FOUND, 404);
    }

    //Kiểm tra thông tin chỉnh sửa đã tồn tại hay chưa
    const result = await CheckGradeEditExist(dataInput.gradeID, dataInput.data);
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
    await EditGrade(dataInput.gradeID, dataInput.data);
    return MessageReturnOnly(GradeMessage.GRADE_EDIT_COMPLETED, 200);
  } catch {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
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
