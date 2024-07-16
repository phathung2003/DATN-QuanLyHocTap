import {
  collection,
  query,
  where,
  getDocs,
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

export async function AddDatabaseWithoutID(
  pathName: string,
  data,
): Promise<boolean> {
  try {
    const docReferrence = doc(db, pathName);

    const uploadResult = await setDoc(docReferrence, data, { merge: true });
    if (uploadResult != null) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}

export async function CheckInfoExist(
  data: string,
  tableName: string,
  checkField: string[],
): Promise<string> {
  try {
    const databaseCollection = collection(db, tableName);
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

//Nội bộ
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

export async function CheckIDExist(
  filePath: string,
  id: string,
): Promise<boolean> {
  const docRef = doc(db, filePath, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

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
