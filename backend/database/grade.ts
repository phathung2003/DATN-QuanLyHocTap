import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import { IGrade } from '@/backend/models/data/IGrade';
import { DefaultGradeErrorValue } from '@/backend/defaultData/grade';
import { db } from '@/backend/database/firebase';
import { TableName } from '@/backend/globalVariable';
import { DeleteDocument } from '@/backend/database/generalFeature';
import SystemMessage from '@/backend/messages/systemMessage';
import GradeMessage from '@/backend/messages/gradeMessage';

//Thêm lớp
export async function AddGrade(data: IGrade) {
  try {
    await addDoc(collection(db, TableName.GRADE), {
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
  let documentID = await GetGradeIDFile(gradeID);
  if (
    documentID == GradeMessage.GRADE_NOT_FOUND ||
    documentID == SystemMessage.SYSTEM_ERROR
  ) {
    documentID = gradeID;
  }
  await DeleteDocument(TableName.GRADE, documentID);
}

//Sửa thông tin lớp
export async function EditGrade(fileID: string, data: IGrade) {
  const gradeFile = doc(db, TableName.GRADE, fileID);
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
    const gradeDatabase = collection(db, TableName.GRADE);
    const gradeData = await getDocs(gradeDatabase);
    const categoryList = await gradeData.docs.map((doc) => ({
      gradeID: doc.id,
      gradeName: doc.data().gradeName,
      gradeDescription: doc.data().gradeDescription,
      gradeImage: doc.data().gradeImage,
    }));
    if (categoryList.length === 0) {
      return null;
    }
    return categoryList;
  } catch {
    return SystemMessage.SYSTEM_ERROR;
  }
}

//Kiểm tra đã có cấp bậc chưa (Add)
export async function CheckGradeExist(data: IGrade) {
  const error = DefaultGradeErrorValue();
  error.status = true;
  try {
    const gradeDatabase = collection(db, TableName.GRADE);
    const field = ['gradeID', 'gradeName'];
    const input = [data.gradeID.toUpperCase(), ToTitleCase(data.gradeName)];

    for (let i = 0; i < field.length; i++) {
      if (input[i] != null) {
        const gradeQuery = query(
          gradeDatabase,
          where(field[i], '==', input[i]),
        );
        const result = await getDocs(gradeQuery);

        if (result.size > 0) {
          error.status = false;
          switch (field[i]) {
            case field[0]:
              error.gradeIDError = GradeMessage.GRADE_ID.ALREADY_EXIST;
              break;
            case field[1]:
              error.gradeNameError = GradeMessage.GRADE_NAME.ALREADY_EXIST;
              break;
          }
        }
      }
    }
  } catch (error) {
    error.status = false;
    error.systemError = SystemMessage.SYSTEM_ERROR;
  }
  return error;
}

//Kiểm tra đã có cấp bậc chưa (Edit)
export async function CheckGradeEditExist(originalID: string, data: IGrade) {
  const error = DefaultGradeErrorValue();
  error.status = true;
  try {
    const gradeDatabase = collection(db, TableName.GRADE);
    const field = ['gradeID', 'gradeName'];
    const input = [data.gradeID.toUpperCase(), ToTitleCase(data.gradeName)];

    for (let i = 0; i < field.length; i++) {
      if (input[i] != null) {
        const gradeQuery = query(
          gradeDatabase,
          where(field[i], '==', input[i]),
        );
        const gradeData = await getDocs(gradeQuery);
        if (gradeData.size > 0) {
          gradeData.forEach((doc) => {
            if (doc.id !== originalID) {
              error.status = false;
              switch (field[i]) {
                case field[0]:
                  error.gradeIDError = GradeMessage.GRADE_ID.ALREADY_EXIST;
                  break;
                case field[1]:
                  error.gradeNameError = GradeMessage.GRADE_NAME.ALREADY_EXIST;
                  break;
              }
            }
          });
        }
      }
    }
  } catch (error) {
    error.status = false;
    error.systemError = SystemMessage.SYSTEM_ERROR;
  }
  return error;
}

//Lấy tên ID file
export async function GetGradeIDFile(gradeID: string) {
  try {
    const gradeDatabase = collection(db, TableName.GRADE);
    const gradeQuery = query(
      gradeDatabase,
      where('gradeID', '==', gradeID.toUpperCase()),
    );
    const categoryData = await getDocs(gradeQuery);
    if (categoryData.size > 0) {
      return categoryData.docs[0].id;
    }
    return GradeMessage.GRADE_NOT_FOUND;
  } catch {
    return SystemMessage.SYSTEM_ERROR;
  }
}

//Lấy tên môn học
export async function GetGradeName(gradeID: string): Promise<string | null> {
  const docRef = doc(db, TableName.GRADE, gradeID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().gradeName;
  }
  return null;
}

function ToTitleCase(text: string): string {
  return text.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}
