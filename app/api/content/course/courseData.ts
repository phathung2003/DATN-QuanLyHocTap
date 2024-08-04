import ICourse from '@/backend/models/data/ICourse';
import { CheckDataInputNeedLogin } from '@/app/api/checkData';
import { TableName } from '@/backend/globalVariable';
import { CheckIDExist } from '@/backend/database/generalFeature';
import { GetGradeIDFile } from '@/backend/database/grade';
import { GetSubjectIDFile } from '@/backend/database/subject';
import GradeMessage from '@/backend/messages/gradeMessage';
import SubjectMessage from '@/backend/messages/subjectMessage';

//Kiểm tra dữ liệu
export async function CheckCourseData(request) {
  try {
    const optionField = ['courseDescription', 'courseImage'];
    const requireField = ['courseGrade', 'courseSubject', 'courseName'];
    const result = await CheckDataInputNeedLogin(
      request,
      requireField,
      optionField,
    );
    if (!result) {
      return false;
    }

    //Lấy mã documentID của courseID
    const gradeID = await GetGradeIDFile(result.data.courseGrade);
    if (
      gradeID != GradeMessage.GRADE_EDIT_NOT_FOUND &&
      gradeID != GradeMessage.SYSTEM_ERROR
    ) {
      result.data.courseGrade = gradeID;
    }
    //Kiểm tra cấp bậc có trên hệ thống hay không
    if (!(await CheckIDExist(TableName.GRADE, result.data.courseGrade))) {
      return false;
    }

    //Lấy mã documentID của subjectID
    const subjectID = await GetSubjectIDFile(result.data.courseSubject);
    if (
      subjectID != SubjectMessage.SUBJECT_EDIT_NOT_FOUND &&
      subjectID != SubjectMessage.SYSTEM_ERROR
    ) {
      result.data.courseSubject = subjectID;
    }

    //Kiểm tra môn học có trên hệ thống hay không
    if (!(await CheckIDExist(TableName.SUBJECT, result.data.courseSubject))) {
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

//Format dữ liệu
function CourseData(dataInput): ICourse | null {
  try {
    const data: ICourse = {
      courseAuthorID: '',
      courseGrade: dataInput.courseGrade,
      courseSubject: dataInput.courseSubject,
      courseName: dataInput.courseName,
      courseDescription: dataInput.courseDescription,
      courseImage: dataInput.courseImage,
    };
    return data;
  } catch {
    return null;
  }
}
