import { collection, getDocs } from 'firebase/firestore';
import GradeMessage from '@/backend/messages/gradeMessage';
import { db } from '@/backend/database/firebase';
import { AddDatabaseWithoutID } from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';

//Thêm lớp
export async function AddContent(
  collectionID: string,
  unitID: string,
  /* eslint-disable */
  data: any[],
): Promise<boolean> {
  for (let type = 0; type < data.length; type++) {
    const contentData = {
      taskNo: data[type].taskNo,
      content: data[type].content,
    };

    const result = await AddDatabaseWithoutID(
      `${TableName.CONTENT}/${collectionID}/${TableName.UNIT}/${unitID}/${TableName.CONTENT}/${data[type].contentType}`,
      contentData,
    );

    if (!result) {
      return false;
    }
  }
  return true;
}

//Lấy danh sách
export async function GetContent(collectionID: string, unitID: string) {
  try {
    const unitDatabase = collection(
      db,
      `${TableName.CONTENT}/${collectionID}/${TableName.UNIT}/${unitID}/${TableName.CONTENT}`,
    );
    const unitData = await getDocs(unitDatabase);
    const unitList = await Promise.all(
      unitData.docs.map(async (doc) => await ContentListData(doc)),
    );

    if (unitList.length === 0) {
      return null;
    }
    return unitList;
  } catch (e) {
    console.log(e);
    return GradeMessage.SYSTEM_ERROR;
  }
}

async function ContentListData(doc) {
  return {
    contentType: doc.data().id,
    taskNo: doc.data().taskNo,
    content: doc.data().content,
  };
}
