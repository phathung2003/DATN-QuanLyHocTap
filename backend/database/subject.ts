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
import { db } from '@/backend/database/firebase';
import { ISubject } from '@/backend/models/data/ISubject';
import { DefaultSubjectErrorValue } from '@/backend/defaultData/subject';
import { TableName } from '@/backend/globalVariable';
import { DeleteDocument, ToTitleCase } from '@/backend/database/generalFeature';
import { ISubjectError } from '@/backend/models/messages/ISubjectMessage';
import SubjectMessage from '@/backend/messages/subjectMessage';
import SystemMessage from '@/backend/messages/systemMessage';

//Thêm lớp học
export async function AddSubject(data: ISubject): Promise<boolean> {
  try {
    await addDoc(collection(db, TableName.SUBJECT), {
      subjectID: data.subjectID.toUpperCase(),
      subjectName: ToTitleCase(data.subjectName),
      subjectDescription: data.subjectDescription,
      subjectImage:
        data.subjectImage == null
          ? process.env.NEXT_PUBLIC_SUBJECT_DEFAULT_IMAGE
          : data.subjectImage,
      subjectCreateAt: new Date(),
      subjectLastEdit: null,
    });
    return true;
  } catch {
    return false;
  }
}

//Xóa lớp học
export async function DeleteSubject(subjectID: string): Promise<boolean> {
  try {
    let documentID = await GetSubjectIDFile(subjectID);
    if (
      documentID == SubjectMessage.SUBJECT_NOT_FOUND ||
      documentID == SystemMessage.SYSTEM_ERROR
    ) {
      documentID = subjectID;
    }
    await DeleteDocument(TableName.SUBJECT, documentID);
    return true;
  } catch {
    return false;
  }
}

//Sửa lớp học
export async function EditSubject(
  fileID: string,
  data: ISubject,
): Promise<boolean> {
  const document = doc(db, TableName.SUBJECT, fileID);

  //Bản chỉnh sửa ban đầu
  const originalDocumentData = await getDoc(document);
  if (!originalDocumentData.exists()) {
    return false;
  }

  try {
    await updateDoc(document, {
      subjectID: data.subjectID.toUpperCase(),
      subjectName: ToTitleCase(data.subjectName),
      subjectDescription: data.subjectDescription,
      subjectImage:
        data.subjectImage == null
          ? process.env.NEXT_PUBLIC_SUBJECT_DEFAULT_IMAGE
          : data.subjectImage,
      subjectCreateAt: originalDocumentData.data().subjectCreateAt,
      subjectLastEdited: new Date(),
    });
    return true;
  } catch {
    return false;
  }
}

//Lấy danh sách môn học
export async function GetSubjectList(): Promise<ISubject[] | string | null> {
  try {
    const dataCollection = collection(db, TableName.SUBJECT);
    const documents = await getDocs(dataCollection);
    const subjectList = await documents.docs.map((doc) => ({
      subjectID: doc.id,
      subjectName: doc.data().subjectName,
      subjectDescription: doc.data().subjectDescription,
      subjectImage: doc.data().subjectImage,
    }));
    if (subjectList.length === 0) {
      return null;
    }
    return subjectList;
  } catch {
    return SystemMessage.SYSTEM_ERROR;
  }
}

//Kiểm tra đã có loại chưa
export async function CheckSubjectExist(
  data: ISubject,
): Promise<ISubjectError> {
  const error = DefaultSubjectErrorValue();
  error.status = true;

  try {
    const dataCollection = collection(db, TableName.SUBJECT);
    const field = ['subjectID', 'subjectName'];
    const input = [data.subjectID.toUpperCase(), ToTitleCase(data.subjectName)];

    for (let i = 0; i < field.length; i++) {
      if (input[i] != null) {
        const dataQuery = query(
          dataCollection,
          where(field[i], '==', input[i]),
        );
        const documents = await getDocs(dataQuery);
        if (documents.size > 0) {
          error.status = false;
          switch (field[i]) {
            case field[0]:
              error.subjectIDError = SubjectMessage.SUBJECT_ID.ALREADY_EXIST;
              break;
            case field[1]:
              error.subjectNameError =
                SubjectMessage.SUBJECT_NAME.ALREADY_EXIST;
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

//Kiểm tra đã có loại chưa (Edit)
export async function CheckSubjectEditExist(
  originalID: string,
  data: ISubject,
): Promise<ISubjectError> {
  const error = DefaultSubjectErrorValue();
  error.status = true;

  try {
    const dataCollection = collection(db, TableName.SUBJECT);
    const field = ['subjectID', 'subjectName'];
    const input = [data.subjectID.toUpperCase(), ToTitleCase(data.subjectName)];

    for (let i = 0; i < field.length; i++) {
      if (input[i] != null) {
        const dataQuery = query(
          dataCollection,
          where(field[i], '==', input[i]),
        );
        const documents = await getDocs(dataQuery);

        if (documents.size > 0) {
          documents.forEach((doc) => {
            if (doc.id !== originalID) {
              error.status = false;
              switch (field[i]) {
                case field[0]:
                  error.subjectIDError =
                    SubjectMessage.SUBJECT_ID.ALREADY_EXIST;
                  break;
                case field[1]:
                  error.subjectNameError =
                    SubjectMessage.SUBJECT_NAME.ALREADY_EXIST;
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
export async function GetSubjectIDFile(subjectID: string): Promise<string> {
  try {
    const dataCollection = collection(db, TableName.SUBJECT);
    const dataQuery = query(
      dataCollection,
      where('subjectID', '==', subjectID.toUpperCase()),
    );
    const documents = await getDocs(dataQuery);
    if (documents.size > 0) {
      return documents.docs[0].id;
    }
    return SubjectMessage.SUBJECT_NOT_FOUND;
  } catch {
    return SystemMessage.SYSTEM_ERROR;
  }
}

//Lấy tên môn học
export async function GetSubjectName(
  subjectID: string,
): Promise<string | null> {
  const docRef = doc(db, TableName.SUBJECT, subjectID);
  const document = await getDoc(docRef);
  if (document.exists()) {
    return document.data().subjectName;
  }
  return null;
}
