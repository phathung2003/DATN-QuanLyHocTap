import { EditCourse } from '@/backend/database/course';
import { CheckToken } from '@/app/api/checkData';
import { CheckCourseData } from '@/app/api/content/course/courseData';
import { CheckIDExist } from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import SystemMessage from '@/backend/messages/systemMessage';
import CourseMessage from '@/backend/messages/courseMessage';

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

    //Tiến hành cập nhật
    if (await EditCourse(dataInput.courseID, dataInput.data)) {
      return MessageReturnOnly(CourseMessage.COURSE_EDIT_COMPLETED, 200);
    }
    return MessageReturnOnly(CourseMessage.COURSE_EDIT_FAILED, 500);
  } catch {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
async function CheckData(request) {
  try {
    //Các trường có thể null
    const courseIDRequest = request.nextUrl.searchParams.get('courseID');
    const checkResult = await CheckCourseData(request);

    if (!checkResult || !courseIDRequest) {
      return false;
    }

    return {
      token: checkResult.token,
      data: checkResult.data,
      courseID: courseIDRequest,
    };
  } catch {
    return false;
  }
}
