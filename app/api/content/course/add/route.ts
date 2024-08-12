import { AddCourse } from '@/backend/database/course';
import { GetUserID } from '@/app/api/checkData';
import { CheckCourseData } from '@/app/api/content/course/courseData';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import SystemMessage from '@/backend/messages/systemMessage';
import CourseMessage from '@/backend/messages/courseMessage';

export async function POST(request: Request) {
  try {
    //Kiểm tra dữ liệu hợp lệ
    const dataInput = await CheckCourseData(request);
    if (dataInput === false) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    //Kiểm tra phiên đăng nhập hợp lệ
    const userID = await GetUserID(dataInput.token);
    if (typeof userID != 'string') {
      return userID;
    }
    dataInput.data.courseAuthorID = userID;

    //Thêm dữ liệu vào bảng
    await AddCourse(dataInput.data);
    return MessageReturnOnly(CourseMessage.COURSE_ADD_COMPLETED, 201);
  } catch {
    return MessageReturnOnly(SystemMessage.SYSTEM_ERROR, 500);
  }
}
