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
  const courseData = {
    courseID: data.courseID,
    unitName: data.unitName,
    unitNo: data.unitNo,
    unitDescription: data.unitDescription,
    unitUploadDate: new Date(),
    unitLastEditDate: null,
  };
  const id = await GenerateID(TableName.UNIT);
  return await AddDatabaseWithoutID(
    `${TableName.COURSE}/${data.courseID}/${TableName.UNIT}/${id}`,
    courseData,
  );
}

//Lấy danh sách
export async function GetUnit(courseID: string, unitID: null | string) {
  try {
    //Tìm kiếm ID cụ thể
    if (unitID) {
      const docRef = doc(
        db,
        `${TableName.COURSE}/${courseID}/${TableName.UNIT}/`,
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
      `${TableName.COURSE}/${courseID}/${TableName.UNIT}`,
    );
    const unitData = await getDocs(unitDatabase);
    const unitList = await Promise.all(
      unitData.docs.map(async (doc) => await UnitListData(doc)),
    );

    if (unitList.length === 0) {
      return null;
    }
    return unitList;
  } catch {
    return GradeMessage.SYSTEM_ERROR;
  }
}

async function UnitListData(doc) {
  return {
    unitID: doc.id,
    courseID: doc.data().courseID,
    unitName: doc.data().unitName,
    unitNo: doc.data().unitNo,
    unitDescription: doc.data().unitDescription,
    unitUploadDate: FormatISODate(
      doc.data().unitUploadDate.toDate().toISOString(),
    ),
    unitLastEditDate:
      doc.data().unitLastEditDate != null
        ? FormatISODate(doc.data().courseLastEditDate.toDate().toISOString())
        : null,
  };
}
