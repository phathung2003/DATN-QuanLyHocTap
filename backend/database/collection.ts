import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import ICollection from '@/backend/models/data/ICollection';
import GradeMessage from '@/backend/messages/gradeMessage';
import { db } from '@/backend/database/firebase';
import {
  AddDatabaseWithoutID,
  GenerateID,
  FormatISODate,
} from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';
import { GetName } from '@/backend/database/users';

//Thêm lớp
export async function AddCollection(data: ICollection): Promise<boolean> {
  const collectionData = {
    collectionAuthorID: data.collectionAuthorID,
    collectionGrade: data.collectionGrade,
    collectionSubject: data.collectionSubject,
    collectionName: data.collectionName,
    collectionDescription: data.collectionDescription,
    collectionImage:
      data.collectionImage == null
        ? process.env.NEXT_PUBLIC_COLLECTION_DEFAULT_IMAGE
        : data.collectionImage,
    collectionUploadDate: new Date(),
    collectionLastEditDate: null,
  };
  const id = await GenerateID(TableName.CONTENT);
  return await AddDatabaseWithoutID(
    `${TableName.CONTENT}/${id}`,
    collectionData,
  );
}

//Lấy danh sách
export async function GetCollection(collectionID: string | null) {
  try {
    //Tìm kiếm ID cụ thể
    if (collectionID) {
      const docRef = doc(db, `${TableName.CONTENT}`, collectionID);
      const docData = await getDoc(docRef);
      if (!docData.exists()) {
        return null;
      }
      return await CollectionData(docData);
    }

    const collectionDatabase = collection(db, `${TableName.CONTENT}`);
    const collectionData = await getDocs(collectionDatabase);
    const collectionList = await Promise.all(
      collectionData.docs.map(async (doc) => await CollectionData(doc)),
    );

    if (collectionList.length === 0) {
      return null;
    }
    return collectionList;
  } catch {
    return GradeMessage.SYSTEM_ERROR;
  }
}

async function CollectionData(doc) {
  return {
    collectionID: doc.data().id,
    collectionAuthor: await GetName(doc.data().collectionAuthorID),
    collectionAuthorID: doc.data().collectionAuthorID,
    collectionGrade: doc.data().collectionGrade,
    collectionSubject: doc.data().collectionSubject,
    collectionName: doc.data().collectionName,
    collectionDescription: doc.data().collectionDescription,
    collectionImage: doc.data().collectionImage,
    collectionUploadDate: FormatISODate(
      doc.data().collectionUploadDate.toDate().toISOString(),
    ),
    collectionLastEditDate:
      doc.data().collectionLastEditDate != null
        ? FormatISODate(
            doc.data().collectionLastEditDate.toDate().toISOString(),
          )
        : null,
  };
}
