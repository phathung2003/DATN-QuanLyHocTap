import { AddCourse } from '@/backend/database/course';
import { GetUserID } from '@/app/api/checkData';
import CourseMessage from '@/backend/messages/courseMessage';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import { CheckCourseData } from '@/app/api/content/course/courseData';

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
    return MessageReturnOnly(CourseMessage.COURSE_ADD_COMPLETE, 201);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}
