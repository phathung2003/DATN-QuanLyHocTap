import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/backend/database/firebase';
import {
  AddDatabaseWithoutID,
  GenerateID,
  FormatDate,
  DeleteDocument,
} from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';
import SystemMessage from '@/backend/messages/systemMessage';
import IUnit from '@/backend/models/data/IUnit';

//Thêm bài học
export async function AddUnit(courseID: string, data: IUnit): Promise<boolean> {
  let pathName = `${TableName.COURSE}/${courseID}/${TableName.UNIT}/`;

  const courseData = {
    unitName: data.unitName,
    unitNo: data.unitNo,
    unitDescription: data.unitDescription,
    unitUploadDate: new Date(),
    unitLastEditDate: null,
  };

  const id = await GenerateID(pathName);
  pathName = pathName + id;
  return await AddDatabaseWithoutID(pathName, courseData);
}

//Lấy danh sách bài học
export async function GetUnit(courseID: string, unitID: null | string) {
  const pathName = `${TableName.COURSE}/${courseID}/${TableName.UNIT}`;
  try {
    //Tìm kiếm ID cụ thể
    if (unitID) {
      const document = doc(db, pathName, unitID);
      const documentData = await getDoc(document);
      if (!documentData.exists()) {
        return null;
      }
      return await UnitListData(documentData);
    }

    //Lấy toàn bộ danh sách
    const unitCollection = collection(db, pathName);
    const unitDocuments = await getDocs(unitCollection);
    const unitList = await Promise.all(
      unitDocuments.docs.map(async (doc) => await UnitListData(doc)),
    );

    if (unitList.length === 0) {
      return null;
    }
    return unitList;
  } catch {
    return SystemMessage.SYSTEM_ERROR;
  }
}

//Xóa bài học
export async function DeleteUnit(courseID: string, unitID: string) {
  const pathName = `${TableName.COURSE}/${courseID}/${TableName.UNIT}`;
  await DeleteDocument(pathName, unitID);
}

//Sửa thông tin bài học
export async function EditUnit(
  courseID: string,
  unitID: string,
  data: IUnit,
): Promise<boolean> {
  const pathName = `${TableName.COURSE}/${courseID}/${TableName.UNIT}`;
  const document = doc(db, pathName, unitID);

  //Bản chỉnh sửa ban đầu
  const originalDocumentData = await getDoc(document);
  if (!originalDocumentData.exists()) {
    return false;
  }

  //Tiến hành cập nhật
  try {
    await updateDoc(document, {
      unitName: data.unitName,
      unitDescription: data.unitDescription,
      unitNo: data.unitNo,

      unitUploadDate: originalDocumentData.data().unitUploadDate,
      unitLastEditDate: new Date(),
    });
    return true;
  } catch {
    return false;
  }
}

//--- Cục bộ ---//
//Format danh sách
async function UnitListData(doc) {
  return {
    unitID: doc.id,
    unitName: doc.data().unitName,
    unitNo: doc.data().unitNo,
    unitDescription: doc.data().unitDescription,
    unitUploadDate: FormatDate(doc.data().unitUploadDate),
    unitLastEditDate:
      doc.data().unitLastEditDate != null
        ? FormatDate(doc.data().unitLastEditDate)
        : null,
  };
}
