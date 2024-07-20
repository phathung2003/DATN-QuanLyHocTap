import { NextResponse } from 'next/server';
import { AddCourse } from '@/backend/database/course';
import { CheckDataInputNeedLogin, GetUserID } from '@/app/api/checkData';
import CourseMessage from '@/backend/messages/courseMessage';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import CourseData from '@/app/api/content/course/courseData';
import { CheckInfoExist } from '@/backend/database/generalFeature';
import { Status, TableName } from '@/backend/globalVariable';
import { DefaultCourseErrorValue } from '@/backend/defaultData/course';
import ICourse from '@/backend/models/data/ICourse';

export async function POST(request: Request) {
  try {
    //Kiểm tra dữ liệu hợp lệ
    const dataInput = await CheckData(request);
    if (dataInput === false) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    //Kiểm tra phiên đăng nhập hợp lệ
    const userID = await GetUserID(dataInput.token);
    if (typeof userID != 'string') {
      return userID;
    }

    //Kiểm tra xem lớp với môn học có tồn tại trên hệ thống hay chưa
    const courseData = await CheckClassification(dataInput.data, userID);
    if (courseData instanceof NextResponse) {
      return courseData;
    }

    //Thêm dữ liệu vào bảng
    await AddCourse(courseData);
    return MessageReturnOnly(CourseMessage.COURSE_ADD_COMPLETE, 201);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
async function CheckData(request: Request) {
  try {
    //Các trường có thể null
    const nullableCheckField = ['courseDescription', 'courseImage'];
    const checkField = ['courseGrade', 'courseSubject', 'courseName'];
    const result = await CheckDataInputNeedLogin(
      request,
      checkField,
      nullableCheckField,
    );
    if (!result) {
      return false;
    }

    const gradeData = CourseData(result.data);
    if (!gradeData) {
      return false;
    }
    return { token: result.token, data: gradeData };
  } catch {
    return false;
  }
}

//Kiểm tra loại có trên hệ thống hay không
async function CheckClassification(dataInput: ICourse, authorID: string) {
  const error = DefaultCourseErrorValue;
  const courseData = dataInput;
  courseData.courseAuthorID = authorID;

  const filed = [
    ['gradeID', 'gradeName'],
    ['subjectID', 'subjectName'],
  ];

  const data = [dataInput.courseGrade, dataInput.courseSubject];
  const table = [TableName.GRADE, TableName.SUBJECT];

  //Kiểm tra thông tin
  for (let i = 0; i < table.length; i++) {
    const result = await CheckInfoExist(data[i], table[i], filed[i]);
    if (result == Status.SYSTEM_ERROR) {
      return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
    }
    if (result == Status.NOT_FOUND) {
      error.status = false;
      switch (table[i]) {
        case TableName.GRADE:
          error.courseGradeError = CourseMessage.COURSE_GRADE.NOT_EXIST;
          break;
        case TableName.SUBJECT:
          error.courseSubjectError = CourseMessage.COURSE_SUBJECT.NOT_EXIST;
          break;
      }
    } else {
      switch (table[i]) {
        case TableName.GRADE:
          courseData.courseGrade = result;
          break;
        case TableName.SUBJECT:
          courseData.courseSubject = result;
          break;
      }
    }
  }

  //Có lỗi xảy ra
  if (!error.status) {
    return new NextResponse(
      JSON.stringify({
        message: CourseMessage.COURSE_ADD_FAILED,
        errorMessage: error,
      }),
      {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
  return courseData;
}
