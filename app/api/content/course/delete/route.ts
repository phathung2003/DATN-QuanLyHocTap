import { DeleteCourse } from '@/backend/database/course';
import { CheckToken, LoginSession } from '@/app/api/checkData';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import SystemMessage from '@/backend/messages/systemMessage';
import CourseMessage from '@/backend/messages/courseMessage';

export async function DELETE(request) {
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

    //Xóa loại
    await DeleteCourse(dataInput.courseID);
    return MessageReturnOnly(CourseMessage.COURSE_DELETE_COMPLETED, 200);
  } catch {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
async function CheckData(request) {
  try {
    const courseIDRequest = request.nextUrl.searchParams.get('courseID');
    const tokenID = LoginSession(request);
    if (!tokenID || !courseIDRequest) {
      return false;
    }

    return {
      token: tokenID,
      courseID: courseIDRequest,
    };
  } catch {
    return false;
  }
}
