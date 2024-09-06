import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/backend/database/firebase';
import { TableName } from '@/backend/globalVariable';
import SystemMessage from '@/backend/messages/systemMessage';

import { IChildren, IChildrenDB } from '@/backend/models/data/IChildren';

//Thêm nội dung học
export async function AddChildren(
  userID: string,
  data: IChildren,
): Promise<boolean> {
  const baseURL = `${TableName.USER}/${userID}/${TableName.CHILDREN}`;
  await addDoc(collection(db, baseURL), data);
  return true;
}

export async function GetChildrenList(userID: string) {
  try {
    const baseURL = `${TableName.USER}/${userID}/${TableName.CHILDREN}`;
    const childrenCollection = collection(db, baseURL);
    const childrenDocuments = await getDocs(childrenCollection);
    const childrenList = childrenDocuments.docs.map((doc) => CourseData(doc));

    if (childrenList.length === 0) {
      return null;
    }

    return childrenList;
  } catch {
    return SystemMessage.SYSTEM_ERROR;
  }
}

function CourseData(doc): IChildrenDB {
  return {
    childrenID: doc.id,
    name: doc.data().name,
    username: doc.data().username,
  };
}
