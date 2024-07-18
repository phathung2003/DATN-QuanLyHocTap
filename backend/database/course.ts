import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import ICourse from '@/backend/models/data/ICourse';
import GradeMessage from '@/backend/messages/gradeMessage';
import { db } from '@/backend/database/firebase';
import {
  AddDatabaseWithoutID,
  GenerateID,
  FormatISODate,
} from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';
import { GetName } from '@/backend/database/users';

//Thêm lớp
export async function AddCourse(data: ICourse): Promise<boolean> {
  const courseData = {
    courseAuthorID: data.courseAuthorID,
    courseGrade: data.courseGrade,
    courseSubject: data.courseSubject,
    courseName: data.courseName,
    courseDescription: data.courseDescription,
    courseImage:
      data.courseImage == null
        ? process.env.NEXT_PUBLIC_COURSE_DEFAULT_IMAGE
        : data.courseImage,
    courseUploadDate: new Date(),
    courseLastEditDate: null,
  };
  const id = await GenerateID(TableName.COURSE);
  return await AddDatabaseWithoutID(`${TableName.COURSE}/${id}`, courseData);
}

//Lấy danh sách
export async function GetCourse(courseID: string | null) {
  try {
    //Tìm kiếm ID cụ thể
    if (courseID) {
      const docRef = doc(db, `${TableName.COURSE}`, courseID);
      const docData = await getDoc(docRef);
      if (!docData.exists()) {
        return null;
      }
      return await CourseData(docData);
    }

    const courseDatabase = collection(db, `${TableName.COURSE}`);
    const courseData = await getDocs(courseDatabase);
    const courseList = await Promise.all(
      courseData.docs.map(async (doc) => await CourseData(doc)),
    );

    if (courseList.length === 0) {
      return null;
    }
    return courseList;
  } catch {
    return GradeMessage.SYSTEM_ERROR;
  }
}

async function CourseData(doc) {
  return {
    courseID: doc.id,
    courseAuthor: await GetName(doc.data().courseAuthorID),
    courseAuthorID: doc.data().courseAuthorID,
    courseGrade: doc.data().courseGrade,
    courseSubject: doc.data().courseSubject,
    courseName: doc.data().courseName,
    courseDescription: doc.data().courseDescription,
    courseImage: doc.data().courseImage,
    courseUploadDate: FormatISODate(
      doc.data().courseUploadDate.toDate().toISOString(),
    ),
    courseLastEditDate:
      doc.data().courseLastEditDate != null
        ? FormatISODate(doc.data().courseLastEditDate.toDate().toISOString())
        : null,
  };
}
