import { storage } from '@/backend/database/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import GlobalMessage from '@/backend/messages/gobalMessage';

//Đăng hình lên máy chủ
export async function UploadImage(image: File, filePath: string) {
  try {
    const storageRef = ref(storage, filePath);
    await uploadBytes(storageRef, image);
    return await getDownloadURL(storageRef);
  } catch {
    return GlobalMessage.UPLOAD_IMAGE_ERROR;
  }
}
