import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/backend/database/firebase';
import {
  AddDatabaseWithoutID,
  GenerateID,
  FormatDate,
  DeleteDocument,
  StringToDate,
} from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';
import { GetName } from '@/backend/database/users';
import { GetSubjectName } from '@/backend/database/subject';
import { GetGradeName } from '@/backend/database/grade';
import { GetUnit } from './unit';
import ICourse from '@/backend/models/data/ICourse';
import SystemMessage from '@/backend/messages/systemMessage';

//Thêm khóa học
export async function AddCourse(data: ICourse): Promise<boolean> {
  const courseData = {
    courseAuthorID: data.courseAuthorID,
    courseGrade: data.courseGrade,
    courseSubject: data.courseSubject,
    courseName: data.courseName,
    courseDescription: data.courseDescription,
    courseImage:
      data.courseImage ?? process.env.NEXT_PUBLIC_COURSE_DEFAULT_IMAGE,
    courseUploadDate: new Date(),
    courseLastEditDate: null,
  };
  const id = await GenerateID(TableName.COURSE);
  return await AddDatabaseWithoutID(`${TableName.COURSE}/${id}`, courseData);
}

//Lấy danh sách khóa học
export async function GetCourse(courseID: string | null) {
  try {
    //Tìm kiếm ID cụ thể
    if (courseID) {
      const document = doc(db, TableName.COURSE, courseID);
      const documentData = await getDoc(document);
      if (!documentData.exists()) {
        return null;
      }
      return await CourseData(documentData);
    }

    //Lấy toàn bộ danh sách
    const courseCollection = collection(db, TableName.COURSE);
    const courseDocuments = await getDocs(courseCollection);
    const courseList = await Promise.all(
      courseDocuments.docs.map(async (doc) => await CourseData(doc)),
    );

    if (courseList.length === 0) {
      return null;
    }

    return courseList.sort((a, b) => {
      const dateA = StringToDate(
        a.courseLastEditDate ? a.courseLastEditDate : a.courseUploadDate,
      );
      const dateB = StringToDate(
        b.courseLastEditDate ? b.courseLastEditDate : b.courseUploadDate,
      );
      return dateB - dateA;
    });
  } catch {
    return SystemMessage.SYSTEM_ERROR;
  }
}

//Xóa khóa học
export async function DeleteCourse(courseID: string) {
  await DeleteDocument(TableName.COURSE, courseID);
}

//Sửa thông tin khóa học
export async function EditCourse(
  courseID: string,
  data: ICourse,
): Promise<boolean> {
  const document = doc(db, TableName.COURSE, courseID);

  //Bản chỉnh sửa ban đầu
  const originalDocumentData = await getDoc(document);
  if (!originalDocumentData.exists()) {
    return false;
  }

  //Tiến hành cập nhật
  try {
    await updateDoc(document, {
      courseName: data.courseName,
      courseDescription: data.courseDescription,
      courseGrade: data.courseGrade,
      courseSubject: data.courseSubject,
      courseAuthorID: originalDocumentData.data().courseAuthorID,
      courseImage:
        data.courseImage ?? process.env.NEXT_PUBLIC_COURSE_DEFAULT_IMAGE,
      courseUploadDate: originalDocumentData.data().courseUploadDate,
      courseLastEditDate: new Date(),
    });
    return true;
  } catch {
    return false;
  }
}

//--- Cục bộ ---//
//Format danh sách
async function CourseData(doc) {
  const pathName = `${TableName.COURSE}/${doc.id}/${TableName.UNIT}`;

  //Lấy toàn bộ danh sách
  const unitCollection = collection(db, pathName);
  const unitDocuments = await getDocs(unitCollection);

  return {
    courseID: doc.id,
    courseAuthor: await GetName(doc.data().courseAuthorID),
    courseAuthorID: doc.data().courseAuthorID,
    courseGrade: doc.data().courseGrade,
    courseGradeName: await GetGradeName(doc.data().courseGrade),
    courseSubject: doc.data().courseSubject,
    courseSubjectName: await GetSubjectName(doc.data().courseSubject),
    courseName: doc.data().courseName,
    courseDescription: doc.data().courseDescription,
    courseImage: doc.data().courseImage,
    courseUploadDate: FormatDate(doc.data().courseUploadDate),
    courseLastEditDate:
      doc.data().courseLastEditDate != null
        ? FormatDate(doc.data().courseLastEditDate)
        : null,
    unit: unitDocuments.size,
  };
}

//Lấy danh sách khóa học kèm bài học
export async function GetCourseListWithUnit() {
  try {
    //Lấy toàn bộ danh sách
    const courseCollection = collection(db, TableName.COURSE);
    const courseDocuments = await getDocs(courseCollection);
    const courseList = await Promise.all(
      courseDocuments.docs.map(async (doc) => await CourseDataWithUnit(doc)),
    );

    if (courseList.length === 0) {
      return null;
    }

    return courseList.sort((a, b) => {
      let dateA = 0;
      if (typeof a.courseLastEditDate === 'string') {
        dateA = StringToDate(a.courseLastEditDate);
      } else if (typeof a.courseUploadDate === 'string') {
        dateA = StringToDate(a.courseUploadDate);
      }

      const dateB = 0;
      if (typeof b.courseLastEditDate === 'string') {
        dateA = StringToDate(b.courseLastEditDate);
      } else if (typeof b.courseUploadDate === 'string') {
        dateA = StringToDate(b.courseUploadDate);
      }

      return dateB - dateA;
    });
  } catch {
    return SystemMessage.SYSTEM_ERROR;
  }
}

async function CourseDataWithUnit(doc): Promise<ICourse> {
  const pathName = `${TableName.COURSE}/${doc.id}/${TableName.UNIT}`;

  //Lấy toàn bộ danh sách
  const unitCollection = collection(db, pathName);
  const unitDocuments = await getDocs(unitCollection);
  const unitList = await GetUnit(doc.id, null);

  return {
    courseID: doc.id,
    courseAuthor: await GetName(doc.data().courseAuthorID),
    courseAuthorID: doc.data().courseAuthorID,
    courseGrade: doc.data().courseGrade,
    courseGradeName: await GetGradeName(doc.data().courseGrade),
    courseSubject: doc.data().courseSubject,
    courseSubjectName: await GetSubjectName(doc.data().courseSubject),
    courseName: doc.data().courseName,
    courseDescription: doc.data().courseDescription,
    courseImage: doc.data().courseImage,
    courseUploadDate: FormatDate(doc.data().courseUploadDate),
    courseLastEditDate:
      doc.data().courseLastEditDate != null
        ? FormatDate(doc.data().courseLastEditDate)
        : null,
    unit: unitDocuments.size,
    unitList,
  };
}
