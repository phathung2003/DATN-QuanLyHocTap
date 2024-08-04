import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/backend/database/firebase';
import { TableName } from '@/backend/globalVariable';
import {
  AddDatabaseWithoutID,
  GenerateID,
} from '@/backend/database/generalFeature';

//Thêm nội dung học
export async function AddTask(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
  data: any,
): Promise<boolean> {
  const baseURL = `${TableName.COURSE}/${courseID}/${TableName.UNIT}/${unitID}/${TableName.TASK}/${taskID}/${TableName.CONTENT}`;

  //Có contentID ==> Dữ liệu cũ
  if (contentID) {
    const document = doc(db, baseURL, contentID);
    try {
      await updateDoc(document, {
        contentData: arrayUnion(...data.contentData),
        contentLastEditDate: new Date(),
      });
      return true;
    } catch {
      return false;
    }
  }
  //KhÔng có contentID ==> Dữ liệu mới
  const id = await GenerateID(baseURL);
  const contentData = {
    contentNo: data.contentNo,
    contentType: data.contentType.toUpperCase(),
    contentData: data.contentData,
    contentCreateAt: new Date(),
    contentLastEditDate: null,
  };
  return await AddDatabaseWithoutID(`${baseURL}/${id}`, contentData);
}
