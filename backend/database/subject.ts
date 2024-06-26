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
import { ISubject } from '@/backend/models/data/ISubject';
import SubjectMessage from '@/backend/messages/subjectMessage';
import DefaultCategoryErrorValue from '@/backend//defaultData/category';
import { db } from '@/backend/database/firebase';

const tableName = 'subject';

//Thêm loại
export async function AddSubject(data: ISubject) {
  try {
    await addDoc(collection(db, tableName), {
      subjectID: data.subjectID.toUpperCase(),
      subjectName: ToTitleCase(data.subjectName),
    });
    return true;
  } catch {
    return false;
  }
}

//Xóa loại
export async function DeleteSubject(subjectID: string) {
  const subjectDatabase = collection(db, tableName);
  const subjectQuery = query(
    subjectDatabase,
    where('subjectID', '==', subjectID.toUpperCase()),
  );
  const subjectData = await getDocs(subjectQuery);

  subjectData.forEach(async (subject) => {
    await deleteDoc(subject.ref);
  });
}

//Sửa loại
export async function EditSubject(fileID: string, data: ISubject) {
  const subjectFile = doc(db, tableName, fileID);
  await updateDoc(subjectFile, {
    subjectID: data.subjectID.toUpperCase(),
    subjectName: ToTitleCase(data.subjectName),
  });
}

//Lấy danh sách loại
export async function GetSubjectList() {
  try {
    const subjectDatabase = collection(db, tableName);
    const subjectData = await getDocs(subjectDatabase);
    const categoryList = await subjectData.docs.map((doc) => ({
      subjectID: doc.data().subjectID,
      subjectName: doc.data().subjectName,
    }));
    if (categoryList.length === 0) {
      return null;
    }
    return categoryList;
  } catch {
    return SubjectMessage.SYSTEM_ERROR;
  }
}

//Kiểm tra đã có loại chưa
export async function CheckSubjectExist(data: ISubject) {
  const error = DefaultCategoryErrorValue;

  try {
    const subjectDatabase = collection(db, tableName);
    const field = ['subjectID', 'subjectName'];
    const input = [data.subjectID.toUpperCase(), ToTitleCase(data.subjectName)];

    for (let i = 0; i < field.length; i++) {
      if (input[i] != null) {
        const subjectQuery = query(
          subjectDatabase,
          where(field[i], '==', input[i]),
        );
        const result = await getDocs(subjectQuery);
        if (result.empty == false) {
          error.status = false;
          switch (field[i]) {
            case field[0]:
              error.subjectIDError = SubjectMessage.SUBJECT_ID_EXIST;
              break;
            case field[1]:
              error.subjectNameError = SubjectMessage.SUBJECT_NAME_EXIST;
              break;
          }
        }
      }
    }
  } catch (error) {
    error.status = false;
    error.systemError = SubjectMessage.SYSTEM_ERROR;
  }
  return error;
}

//Kiểm tra đã có loại chưa (Edit)
export async function CheckSubjectEditExist(
  originalID: string,
  data: ISubject,
) {
  const error = DefaultCategoryErrorValue;

  try {
    const subjectDatabase = collection(db, tableName);
    const field = ['subjectID', 'subjectName'];
    const input = [data.subjectID.toUpperCase(), ToTitleCase(data.subjectName)];

    for (let i = 0; i < field.length; i++) {
      if (input[i] != null) {
        const subjectQuery = query(
          subjectDatabase,
          where(field[i], '==', input[i]),
        );
        const subjectData = await getDocs(subjectQuery);

        if (subjectData.empty == false) {
          subjectData.forEach((doc) => {
            console.log(doc.id);
            if (doc.id !== originalID) {
              error.status = false;
              switch (field[i]) {
                case field[0]:
                  error.subjectIDError = SubjectMessage.SUBJECT_ID_EXIST;
                  break;
                case field[1]:
                  error.subjectNameError = SubjectMessage.SUBJECT_NAME_EXIST;
                  break;
              }
            }
          });
        }
      }
    }
  } catch (error) {
    error.status = false;
    error.systemError = SubjectMessage.SYSTEM_ERROR;
  }
  return error;
}

//Lấy tên ID file
export async function GetSubjectIDFile(subjectID: string) {
  try {
    const subjectDatabase = collection(db, tableName);
    const subjectQuery = query(
      subjectDatabase,
      where('subjectID', '==', subjectID.toUpperCase()),
    );
    const categoryData = await getDocs(subjectQuery);
    if (categoryData.size > 0) {
      return categoryData.docs[0].id;
    }
    return SubjectMessage.SUBJECT_EDIT_NOT_FOUND;
  } catch {
    return SubjectMessage.SYSTEM_ERROR;
  }
}

function ToTitleCase(text: string): string {
  return text.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}
