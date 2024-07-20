import { NextResponse } from 'next/server';
import GradeMessage from '@/backend/messages/gradeMessage';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { CheckGradeExist, AddGrade } from '@/backend/database/grade';
import { CheckDataInputNeedLogin, CheckToken } from '@/app/api/checkData';
import GradeData from '@/app/api/category/grade/gradeData';

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
    const result = await CheckGradeExist(dataInput.data);
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

    //Thêm dữ liệu vào bảng
    await AddGrade(dataInput.data);
    return MessageReturnOnly(GradeMessage.GRADE_ADD_COMPLETE, 201);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
async function CheckData(request: Request) {
  try {
    //Các trường có thể null
    const nullableCheckField = ['gradeImage', 'gradeDescription'];
    const checkField = ['gradeID', 'gradeName'];
    const result = await CheckDataInputNeedLogin(
      request,
      checkField,
      nullableCheckField,
    );
    if (!result) {
      return false;
    }

    const gradeData = GradeData(result);
    if (!gradeData) {
      return false;
    }

    return { token: result.token, data: gradeData };
  } catch {
    return false;
  }
}
