import { EditUnit } from '@/backend/database/unit';
import { CheckToken } from '@/app/api/checkData';
import CheckUnitData from '@/app/api/content/unit/unitData';
import {
  CheckIDExist,
  CheckGetEditNo,
} from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import SystemMessage from '@/backend/messages/systemMessage';
import CourseMessage from '@/backend/messages/courseMessage';
import UnitMessage from '@/backend/messages/unitMessage';

export async function PATCH(request) {
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

    //Kiểm tra mã khóa học có tồn tại
    if (!(await CheckIDExist(TableName.COURSE, dataInput.courseID))) {
      return MessageReturnOnly(CourseMessage.COURSE_NOT_FOUND, 404);
    }

    //Kiểm tra mã bài học có tồn tại
    const coursePathName = `${TableName.COURSE}/${dataInput.courseID}/${TableName.UNIT}/`;
    if (!(await CheckIDExist(coursePathName, dataInput.unitID))) {
      return MessageReturnOnly(UnitMessage.UNIT_NOT_FOUND, 404);
    }

    //Kiểm tra số thứ tự bài
    if (!isNaN(dataInput.data.unitNo) && dataInput.data.unitNo < 0) {
      return MessageReturnOnly(UnitMessage.UNIT_NO.NEGATIVE_NUMBER, 500);
    }
    const unitPathName = `${TableName.COURSE}/${dataInput.courseID}/${TableName.UNIT}/`;
    dataInput.data.unitNo = await CheckGetEditNo(
      unitPathName,
      'unitNo',
      dataInput.unitID,
      dataInput.data.unitNo,
    );
    if (isNaN(dataInput.data.unitNo)) {
      return MessageReturnOnly(UnitMessage.UNIT_NO.ALREADY_EXIST, 500);
    }

    //Tiến hành cập nhật
    if (
      !(await EditUnit(dataInput.courseID, dataInput.unitID, dataInput.data))
    ) {
      return MessageReturnOnly(CourseMessage.COURSE_EDIT_FAILED, 500);
    }
    return MessageReturnOnly(CourseMessage.COURSE_EDIT_COMPLETED, 200);
  } catch {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
async function CheckData(request) {
  try {
    const unitIDRequest = request.nextUrl.searchParams.get('unitID');
    const checkResult = await CheckUnitData(request);

    if (!checkResult || !unitIDRequest) {
      return false;
    }

    return {
      token: checkResult.token,
      data: checkResult.data,
      courseID: checkResult.courseID,
      unitID: unitIDRequest,
    };
  } catch {
    return false;
  }
}
