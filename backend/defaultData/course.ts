import ICourse from '@/backend/models/data/ICourse';
import { ICourseError } from '@/backend/models/messages/ICourseMessage';

export function DefaultCourseValue(): ICourse {
  return {
    courseAuthorID: '',
    courseGrade: 'Default',
    courseSubject: 'Default',
    courseName: '',
    courseDescription: '',
    courseImage: null,
    courseUploadDate: null,
    courseLastEditDate: null,
  };
}

export function DefaultCourseErrorValue(): ICourseError {
  return {
    status: true,
    courseNameError: null,
    courseGradeError: null,
    courseSubjectError: null,
    courseDescriptionError: null,
    courseImageError: null,
    courseFileError: null,
    systemError: null,
  };
}

export function CourseEditDefaultValue(data: ICourse): ICourse {
  return {
    courseName: data.courseName,
    courseAuthorID: data.courseAuthorID,
    courseGrade: data.courseGrade,
    courseSubject: data.courseSubject,
    courseDescription: data.courseDescription,
    courseImage: data.courseImage,
    courseLastEditDate: data.courseLastEditDate,
    courseUploadDate: data.courseUploadDate,
  };
}
