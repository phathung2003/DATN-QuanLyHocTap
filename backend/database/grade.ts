import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import { IGrade } from '@/backend/models/data/IGrade';
import GradeMessage from '@/backend/messages/gradeMessage';
import DefaultGradeErrorValue from '@/backend//defaultData/grade';
import { db } from '@/backend/database/firebase';

const TABLE_NAME = 'grade';
//Thêm lớp
export async function AddGrade(data: IGrade) {
  try {
    await addDoc(collection(db, TABLE_NAME), {
      gradeID: data.gradeID.toUpperCase(),
      gradeName: ToTitleCase(data.gradeName),
      gradeDescription: data.gradeDescription,
      gradeImage:
        data.gradeImage == null
          ? process.env.NEXT_PUBLIC_GRADE_DEFAULT_IMAGE
          : data.gradeImage,
    });
    return true;
  } catch {
    return false;
  }
}

//Xóa lớp
export async function DeleteGrade(gradeID: string) {
  const gradeDatabase = collection(db, TABLE_NAME);
  const gradeQuery = query(
    gradeDatabase,
    where('gradeID', '==', gradeID.toUpperCase()),
  );
  const gradeData = await getDocs(gradeQuery);

  gradeData.forEach(async (grade) => {
    await deleteDoc(grade.ref);
  });
}

//Sửa thông tin lớp
export async function EditGrade(fileID: string, data: IGrade) {
  const gradeFile = doc(db, TABLE_NAME, fileID);
  await updateDoc(gradeFile, {
    gradeID: data.gradeID.toUpperCase(),
    gradeName: ToTitleCase(data.gradeName),
    gradeDescription: data.gradeDescription,
    gradeImage:
      data.gradeImage == null
        ? process.env.NEXT_PUBLIC_GRADE_DEFAULT_IMAGE
        : data.gradeImage,
  });
}

//Lấy danh sách loại
export async function GetGradeList() {
  try {
    const gradeDatabase = collection(db, TABLE_NAME);
    const gradeData = await getDocs(gradeDatabase);
    const categoryList = await gradeData.docs.map((doc) => ({
      gradeID: doc.data().gradeID,
      gradeName: doc.data().gradeName,
    }));
    if (categoryList.length === 0) {
      return null;
    }
    return categoryList;
  } catch {
    return GradeMessage.SYSTEM_ERROR;
  }
}

//Kiểm tra đã có lớp chưa
export async function CheckGradeExist(data: IGrade) {
  const error = DefaultGradeErrorValue;

  try {
    const gradeDatabase = collection(db, TABLE_NAME);
    const field = ['gradeID', 'gradeName'];
    const input = [data.gradeID.toUpperCase(), ToTitleCase(data.gradeName)];

    for (let i = 0; i < field.length; i++) {
      if (input[i] != null) {
        const gradeQuery = query(
          gradeDatabase,
          where(field[i], '==', input[i]),
        );
        const result = await getDocs(gradeQuery);
        if (result.empty == false) {
          error.status = false;
          switch (field[i]) {
            case field[0]:
              error.gradeIDError = GradeMessage.GRADE_ID_EXIST;
              break;
            case field[1]:
              error.gradeNameError = GradeMessage.GRADE_NAME_EXIST;
              break;
          }
        }
      }
    }
  } catch (error) {
    error.status = false;
    error.systemError = GradeMessage.SYSTEM_ERROR;
  }
  return error;
}

//Kiểm tra đã có loại chưa (Edit)
export async function CheckGradeEditExist(originalID: string, data: IGrade) {
  const error = DefaultGradeErrorValue;

  try {
    const gradeDatabase = collection(db, TABLE_NAME);
    const field = ['gradeID', 'gradeName'];
    const input = [data.gradeID.toUpperCase(), ToTitleCase(data.gradeName)];

    for (let i = 0; i < field.length; i++) {
      if (input[i] != null) {
        const gradeQuery = query(
          gradeDatabase,
          where(field[i], '==', input[i]),
        );
        const gradeData = await getDocs(gradeQuery);

        if (gradeData.empty == false) {
          gradeData.forEach((doc) => {
            console.log(doc.id);
            if (doc.id !== originalID) {
              error.status = false;
              switch (field[i]) {
                case field[0]:
                  error.gradeIDError = GradeMessage.GRADE_ID_EXIST;
                  break;
                case field[1]:
                  error.gradeNameError = GradeMessage.GRADE_NAME_EXIST;
                  break;
              }
            }
          });
        }
      }
    }
  } catch (error) {
    error.status = false;
    error.systemError = GradeMessage.SYSTEM_ERROR;
  }
  return error;
}

//Lấy tên ID file
export async function GetGradeIDFile(gradeID: string) {
  try {
    const gradeDatabase = collection(db, TABLE_NAME);
    const gradeQuery = query(
      gradeDatabase,
      where('gradeID', '==', gradeID.toUpperCase()),
    );
    const categoryData = await getDocs(gradeQuery);
    if (categoryData.size > 0) {
      return categoryData.docs[0].id;
    }
    return GradeMessage.GRADE_EDIT_NOT_FOUND;
  } catch {
    return GradeMessage.SYSTEM_ERROR;
  }
}

function ToTitleCase(text: string): string {
  return text.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}
