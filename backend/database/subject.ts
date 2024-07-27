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
import { DefaultSubjectErrorValue } from '@/backend//defaultData/subject';
import { db } from '@/backend/database/firebase';

const TABLE_NAME = 'subject';
//Thêm lớp học
export async function AddSubject(data: ISubject) {
  try {
    await addDoc(collection(db, TABLE_NAME), {
      subjectID: data.subjectID.toUpperCase(),
      subjectName: ToTitleCase(data.subjectName),
      subjectDescription: data.subjectDescription,
      subjectImage:
        data.subjectImage == null
          ? process.env.NEXT_PUBLIC_SUBJECT_DEFAULT_IMAGE
          : data.subjectImage,
    });
    return true;
  } catch {
    return false;
  }
}

//Xóa lớp học
export async function DeleteSubject(subjectID: string) {
  const subjectDatabase = collection(db, TABLE_NAME);
  const subjectQuery = query(
    subjectDatabase,
    where('subjectID', '==', subjectID.toUpperCase()),
  );
  const subjectData = await getDocs(subjectQuery);

  subjectData.forEach(async (subject) => {
    await deleteDoc(subject.ref);
  });
}

//Sửa lớp học
export async function EditSubject(fileID: string, data: ISubject) {
  const subjectFile = doc(db, TABLE_NAME, fileID);
  await updateDoc(subjectFile, {
    subjectID: data.subjectID.toUpperCase(),
    subjectName: ToTitleCase(data.subjectName),
    subjectDescription: data.subjectDescription,
    subjectImage:
      data.subjectImage == null
        ? process.env.NEXT_PUBLIC_SUBJECT_DEFAULT_IMAGE
        : data.subjectImage,
  });
}

//Lấy danh sách loại
export async function GetSubjectList() {
  try {
    const subjectDatabase = collection(db, TABLE_NAME);
    const subjectData = await getDocs(subjectDatabase);
    const categoryList = await subjectData.docs.map((doc) => ({
      subjectID: doc.data().subjectID,
      subjectName: doc.data().subjectName,
      subjectDescription: doc.data().subjectDescription,
      subjectImage: doc.data().subjectImage,
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
  const error = DefaultSubjectErrorValue;

  try {
    const subjectDatabase = collection(db, TABLE_NAME);
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
  const error = DefaultSubjectErrorValue;

  try {
    const subjectDatabase = collection(db, TABLE_NAME);
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
    const subjectDatabase = collection(db, TABLE_NAME);
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
