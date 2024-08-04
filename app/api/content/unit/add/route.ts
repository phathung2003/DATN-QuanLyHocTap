import { CheckToken } from '@/app/api/checkData';
import { CheckIDExist } from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';
import { AddUnit } from '@/backend/database/unit';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import CheckUnitData from '@/app/api/content/unit/unitData';
import APIMessage from '@/backend/messages/apiMessage';
import CourseMessage from '@/backend/messages/courseMessage';
import UnitMessage from '@/backend/messages/unitMessage';

export async function POST(request: Request) {
  try {
    //Kiểm tra dữ liệu hợp lệ
    const dataInput = await CheckUnitData(request);
    if (dataInput === false) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    //Kiểm tra phiên đăng nhập hợp lệ
    const sessionCheck = await CheckToken(dataInput.token);
    if (sessionCheck != true) {
      return sessionCheck;
    }

    //Kiểm tra mã khóa học có tồn tại
    if (!(await CheckIDExist(TableName.COURSE, dataInput.courseID))) {
      return MessageReturnOnly(CourseMessage.COURSE_EDIT_NOT_FOUND, 404);
    }

    //Thêm bài học
    if (!(await AddUnit(dataInput.data))) {
      return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
    }

    return MessageReturnOnly(UnitMessage.UNIT_ADD_COMPLETE, 201);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}
