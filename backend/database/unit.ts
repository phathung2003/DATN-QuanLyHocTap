import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import IUnit from '@/backend/models/data/IUnit';
import GradeMessage from '@/backend/messages/gradeMessage';
import { db } from '@/backend/database/firebase';
import {
  AddDatabaseWithoutID,
  GenerateID,
  FormatISODate,
} from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';

//Thêm lớp
export async function AddUnit(data: IUnit): Promise<boolean> {
  const collectionData = {
    collectionID: data.collectionID,
    unitName: data.unitName,
    unitNo: data.unitNo,
    unitDescription: data.unitDescription,
    unitUploadDate: new Date(),
    unitLastEditDate: null,
  };
  const id = await GenerateID(TableName.CONTENT);
  return await AddDatabaseWithoutID(
    `${TableName.CONTENT}/${data.collectionID}/${TableName.UNIT}/${id}`,
    collectionData,
  );
}

//Lấy danh sách
export async function GetUnit(collectionID: string, unitID: null | string) {
  try {
    //Tìm kiếm ID cụ thể
    if (unitID) {
      const docRef = doc(
        db,
        `${TableName.CONTENT}/${collectionID}/${TableName.UNIT}/`,
        unitID,
      );
      const docData = await getDoc(docRef);
      if (!docData.exists()) {
        return null;
      }
      return await UnitListData(docData);
    }

    const unitDatabase = collection(
      db,
      `${TableName.CONTENT}/${TableName.COLLECTION}/${collectionID}`,
    );
    const unitData = await getDocs(unitDatabase);
    const unitList = await Promise.all(
      unitData.docs.map(async (doc) => await UnitListData(doc)),
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

async function UnitListData(doc) {
  return {
    unitID: doc.data().id,
    collectionID: doc.data().collectionID,
    unitName: doc.data().unitName,
    unitNo: doc.data().unitNo,
    unitDescription: doc.data().unitDescription,
    unitUploadDate: FormatISODate(
      doc.data().unitUploadDate.toDate().toISOString(),
    ),
    unitLastEditDate:
      doc.data().unitLastEditDate != null
        ? FormatISODate(
            doc.data().collectionLastEditDate.toDate().toISOString(),
          )
        : null,
  };
}
