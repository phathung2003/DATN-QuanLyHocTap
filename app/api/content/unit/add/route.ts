import { NextResponse } from 'next/server';
import { AddUnit } from '@/backend/database/unit';
import { CheckDataInputNeedLogin, CheckToken } from '@/app/api/checkData';
import UnitMessage from '@/backend/messages/unitMessage';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import UnitData from '@/app/api/content/unit/unitData';
import { CheckIDExist } from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';
import { DefaultUnitErrorValue } from '@/backend/defaultData/unit';
import IUnit from '@/backend/models/data/IUnit';

export async function POST(request: Request) {
  try {
    //Kiểm tra dữ liệu hợp lệ
    const dataInput = await CheckData(request);
    if (dataInput === false) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    //Kiểm tra phiên đăng nhập hợp lệ
    const loginSession = await CheckToken(dataInput.token);
    if (loginSession instanceof NextResponse) {
      return loginSession;
    }

    //Kiểm tra xem lớp với môn học có tồn tại trên hệ thống hay chưa
    const courseCheck = await CheckClassification(dataInput.data);
    if (courseCheck instanceof NextResponse) {
      return courseCheck;
    }

    //Thêm dữ liệu vào bảng
    if (!(await AddUnit(dataInput.data))) {
      return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
    }

    return MessageReturnOnly(UnitMessage.UNIT_ADD_COMPLETE, 201);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
async function CheckData(request: Request) {
  try {
    //Các trường có thể null
    const nullableCheckField = ['unitDescription'];
    const checkField = ['courseID', 'unitName', 'unitNo'];

    const result = await CheckDataInputNeedLogin(
      request,
      checkField,
      nullableCheckField,
    );
    if (!result) {
      return false;
    }

    const unitData = UnitData(result.data);
    if (!unitData) {
      return false;
    }
    return { token: result.token, data: unitData };
  } catch {
    return false;
  }
}

//Kiểm tra mã khóa học có trên hệ thống hay không
async function CheckClassification(dataInput: IUnit) {
  const error = DefaultUnitErrorValue;
  if (!(await CheckIDExist(TableName.COURSE, dataInput.courseID))) {
    error.status = false;
    error.courseIDError = UnitMessage.COURSE_NOT_FOUND;

    return new NextResponse(
      JSON.stringify({
        message: UnitMessage.UNIT_ADD_FAILED,
        errorMessage: error,
      }),
      {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
