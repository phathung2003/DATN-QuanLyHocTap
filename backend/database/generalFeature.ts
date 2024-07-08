import { storage } from '@/backend/database/firebase';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import GlobalMessage from '@/backend/messages/gobalMessage';

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

export async function DeleteImage(imagePath: string) {
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
