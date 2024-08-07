import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/backend/database/firebase';
import { TableName } from '@/backend/globalVariable';
import {
  AddDatabaseWithoutID,
  GenerateID,
} from '@/backend/database/generalFeature';
import { ICalculateTwoNumbersContent } from '@/backend/models/data/Content/ICalculateTwoNumbers';
import { ICardContent } from '@/backend/models/data/Content/ICard';
import { IFlashcardContent } from '@/backend/models/data/Content/IFlashcard';
import IContent from '@/backend/models/data/Content/IContent';
import { DeleteDocument } from '@/backend/database/generalFeature';

//Thêm nội dung học
export async function AddContent(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
  data: IContent,
): Promise<boolean> {
  const baseURL = `${TableName.COURSE}/${courseID}/${TableName.UNIT}/${unitID}/${TableName.TASK}/${taskID}/${TableName.CONTENT}`;

  //Có contentID ==> Dữ liệu cũ
  if (contentID) {
    try {
      const document = doc(db, baseURL, contentID);
      const documentData = await getDoc(document);
      if (documentData.exists()) {
        const contents = documentData.data().contentData;
        contents.push(data.contentData);

        await updateDoc(document, {
          contentData: contents,
          contentLastEditDate: new Date(),
        });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  //KhÔng có contentID ==> Dữ liệu mới
  const id = await GenerateID(baseURL);
  const contentData = {
    contentNo: data.contentNo,
    contentType: data.contentType.toUpperCase(),
    contentName: data.contentName,
    contentDescription: data.contentDescription,
    contentData: [data.contentData],
    contentCreateAt: new Date(),
    contentLastEditDate: null,
  };
  return await AddDatabaseWithoutID(`${baseURL}/${id}`, contentData);
}

//Xóa nội dung bài học
export async function DeleteContent(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
  position: string,
) {
  const baseURL = `${TableName.COURSE}/${courseID}/${TableName.UNIT}/${unitID}/${TableName.TASK}/${taskID}/${TableName.CONTENT}`;
  //Có liệt kê vị trí => Xóa dữ liệu bên trong
  if (position) {
    const document = doc(db, baseURL, contentID);
    const documentData = await getDoc(document);

    if (documentData.exists()) {
      let contents = documentData.data().contentData;
      contents = contents.filter((question) => question.position != position);
      await updateDoc(document, {
        contentData: contents,
        contentLastEditDate: new Date(),
      });
    }
  }

  //Không liệt kê vị trí => Xóa content
  await DeleteDocument(baseURL, contentID);
}

//Sửa nội dung bài học
export async function EditContent() {}

//Kiểm tra và đề xuất vị trí cho position trong contentData
export async function SuggestCheckAddPosition(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
  positionNo: number,
): Promise<number> {
  //Kiểm tra có số âm không
  if (!isNaN(positionNo) && positionNo < 1) {
    return NaN;
  }
  //Lấy danh sách nội dung
  const pathName = `${TableName.COURSE}/${courseID}/${TableName.UNIT}/${unitID}/${TableName.TASK}/${taskID}/${TableName.CONTENT}`;
  const document = doc(db, pathName, contentID);
  const documentData = await getDoc(document);

  //Có dữ liệu trong danh sách
  if (documentData.exists()) {
    const dataList:
      | ICalculateTwoNumbersContent[]
      | ICardContent[]
      | IFlashcardContent[] = documentData.data().contentData;

    //Không có số => Đề xuất số
    if (isNaN(positionNo) || positionNo == null) {
      let suggestNo = 1;
      for (const data of dataList) {
        const previousNo = Number(data.position);
        if (!isNaN(previousNo) && previousNo >= suggestNo) {
          suggestNo = previousNo + 1;
        }
      }
      return suggestNo;
    }

    //Có số => Kiểm tra số hợp lệ
    for (const data of dataList) {
      const previousNo = Number(data.position);
      if (!isNaN(previousNo) && previousNo == positionNo) {
        return NaN;
      }
    }
    return positionNo;
  }

  //Không có dữ liệu => Trả về nguyên vẹn
  if (isNaN(positionNo)) {
    return 1;
  }
  return positionNo;
}

//Kiểu tra kiểu nội dung có khớp không
export async function CheckContentType(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
  contentNo: number,
  contentType: string,
): Promise<boolean> {
  //Lấy danh sách nội dung
  const pathName = `${TableName.COURSE}/${courseID}/${TableName.UNIT}/${unitID}/${TableName.TASK}/${taskID}/${TableName.CONTENT}`;
  const document = doc(db, pathName, contentID);
  const documentData = await getDoc(document);

  //Kiểm tra kiểu loại
  if (documentData.exists()) {
    if (
      documentData.data().contentType.toUpperCase() ==
        contentType.toUpperCase() &&
      documentData.data().contentNo == contentNo
    ) {
      return true;
    }
  }

  return false;
}
