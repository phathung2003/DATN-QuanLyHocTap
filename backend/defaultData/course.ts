import ICourse from '@/backend/models/data/ICourse';
import { ICourseError } from '@/backend/models/messages/ICourseMessage';

export const DefaultCourseValue: ICourse = {
  courseAuthorID: '',
  courseGrade: 'Default',
  courseSubject: 'Default',
  courseName: '',
  courseDescription: '',
  courseImage: null,
  courseUploadDate: null,
  courseLastEditDate: null,
};

export const DefaultCourseErrorValue: ICourseError = {
  status: true,
  courseNameError: null,
  courseGradeError: null,
  courseSubjectError: null,
  courseDescriptionError: null,
  courseImageError: null,
  systemError: null,
};
