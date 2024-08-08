import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { storage, db } from '@/backend/database/firebase';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import GlobalMessage from '@/backend/messages/gobalMessage';
import { Status } from '@/backend/globalVariable';
import { nanoid } from 'nanoid';

//Đăng hình lên máy chủ
export async function UploadImage(image: File, filePath: string) {
  try {
    const storageReference = ref(storage, filePath);
    await uploadBytes(storageReference, image);
    return await getDownloadURL(storageReference);
  } catch {
    return GlobalMessage.UPLOAD_IMAGE_ERROR;
  }
}

//Xóa hình trong Storage
export async function DeleteImage(imagePath: string | null) {
  if (!imagePath) {
    return true;
  }
  const defaultImage = [
    process.env.NEXT_PUBLIC_SUBJECT_DEFAULT_IMAGE,
    process.env.NEXT_PUBLIC_GRADE_DEFAULT_IMAGE,
  ];

  //Hình mặc đinh => Không xóa
  if (defaultImage.includes(imagePath)) {
    return true;
  }

  const imageReference = ref(storage, imagePath);
  try {
    await deleteObject(imageReference);
    return true;
  } catch (error) {
    return false;
  }
}

//Xóa trường dữ liệu đơn trong FireStore
export async function DeleteDocument(tablePath: string, documentID: string) {
  await deleteDoc(doc(db, tablePath, documentID));
}

//Thêm dữ liệu chèn ID trực tiếp
export async function AddDatabaseWithoutID(
  pathName: string,
  data,
): Promise<boolean> {
  try {
    const docReferrence = doc(db, pathName);
    await setDoc(docReferrence, data, { merge: false });
    return true;
  } catch {
    return false;
  }
}

//Kiểm tra thông tin có tồn tại hay không
export async function CheckInfoExist(
  data: string,
  tablePath: string,
  checkField: string[],
): Promise<string> {
  try {
    const databaseCollection = collection(db, tablePath);
    for (let i = 0; i < checkField.length; i++) {
      if (data != null) {
        const databaseQuery = query(
          databaseCollection,
          where(`${checkField[i]}`, '==', data),
        );
        const result = await getDocs(databaseQuery);
        if (result.empty == false) {
          return result.docs[0].id;
        }
      }
    }
    return Status.NOT_FOUND;
  } catch {
    return Status.SYSTEM_ERROR;
  }
}

//Tạo ID
export async function GenerateID(filePath: string): Promise<string> {
  let id: string;
  let attempt: number = 0;
  let exists: boolean;
  let length: number;

  try {
    length = Number(process.env.NEXT_PUBLIC_ID_DEFAULT_LENGTH);
  } catch {
    //Mặc định độ dài ID là 4 ký tự
    length = 4;
  }

  do {
    //Quá 10 lần mà vẫn trùng => Tăng lên 1 ký tự
    if (attempt == 10) {
      length++;
      attempt = 0;
    }

    //Tạo ID
    id = nanoid(length);

    //Kiểm tra ID có tồn tại không
    exists = await CheckIDExist(filePath, id);
    //Không tồn tại => Tăng số lần thử
    attempt++;
  } while (exists);

  return id;
}

//Kiểm tra - Đề xuất số thứ tự khi thêm vào
export async function CheckSuggestAddNo(
  pathName: string,
  fieldName: string,
  dataNo: number,
): Promise<number> {
  const dataCollection = collection(db, pathName);
  const dataDocuments = await getDocs(dataCollection);
  const suggestNo: number = dataNo;

  //Không có số ==> Tiến hành gợi ý số
  if (isNaN(suggestNo) || suggestNo == null) {
    let suggestNo = 1;

    //Kiểm tra để lấy số lớn nhất
    for (const doc of dataDocuments.docs) {
      const previousUnitNo = Number(doc.data()[fieldName]);
      if (!isNaN(previousUnitNo) && previousUnitNo >= suggestNo) {
        suggestNo = previousUnitNo + 1;
      }
    }
    return suggestNo;
  }

  //Kiểm tra số có hợp lệ không
  for (const doc of dataDocuments.docs) {
    const previousUnitNo = Number(doc.data()[fieldName]);
    if (!isNaN(previousUnitNo) && previousUnitNo === suggestNo) {
      return NaN;
    }
  }
  return suggestNo;
}

//Kiểm tra - Lấy số thứ tự khi chỉnh sửa
export async function CheckGetEditNo(
  pathName: string,
  fieldName: string,
  dataID: string,
  dataNo: number,
): Promise<number> {
  const dataCollection = collection(db, pathName);
  const dataDocuments = await getDocs(dataCollection);

  //Nếu dataNo là NaN => Lấy số cũ
  if (isNaN(dataNo)) {
    for (const doc of dataDocuments.docs) {
      if (doc.id === dataID) {
        return Number(doc.data()[fieldName]);
      }
    }
  }

  //Kiểm tra số có hợp lệ không
  for (const doc of dataDocuments.docs) {
    const previousUnitNo = Number(doc.data()[fieldName]);
    if (
      !isNaN(previousUnitNo) &&
      previousUnitNo === dataNo &&
      doc.id != dataID
    ) {
      return NaN;
    }
  }
  return dataNo;
}

//Kiểm tra - Lấy số thứ tự khi thêm
export async function CheckGetAddNo(
  pathName: string,
  fieldName: string,
  dataID: string,
  dataNo: number,
): Promise<number> {
  const dataCollection = collection(db, pathName);
  const dataDocuments = await getDocs(dataCollection);

  //Nếu dataNo là NaN => Lấy số cũ
  if (isNaN(dataNo)) {
    for (const doc of dataDocuments.docs) {
      if (doc.id === dataID) {
        return Number(doc.data()[fieldName]);
      }
    }
  }

  //Kiểm tra số có hợp lệ không
  for (const doc of dataDocuments.docs) {
    const existUnitNo = Number(doc.data()[fieldName]);
    if (doc.id == dataID && existUnitNo == dataNo) {
      return dataNo;
    }
  }
  return NaN;
}

//Kiểm tra ID có tồn tại trên hệ thống hay không
export async function CheckIDExist(
  filePath: string,
  id: string,
): Promise<boolean> {
  const document = doc(db, filePath, id);
  const documentData = await getDoc(document);
  return documentData.exists();
}

//Format ngày
export function FormatISODate(ISODateString: string): string {
  const date = new Date(ISODateString);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export function ToTitleCase(text: string): string {
  return text.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}
