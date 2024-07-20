import ICourse from '@/backend/models/data/ICourse';

export default function CourseData(dataInput): ICourse | null {
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
