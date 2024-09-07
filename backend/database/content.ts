import {
  doc,
  updateDoc,
  getDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { db } from '@/backend/database/firebase';
import { TableName } from '@/backend/globalVariable';
import {
  AddDatabaseWithoutID,
  GenerateID,
} from '@/backend/database/generalFeature';
import { ICalculateTwoNumbersContent } from '@/backend/models/data/Content/ICalculateTwoNumbers';
import { ICardContent } from '@/backend/models/data/Content/ICard';
import { IFlashcardContent } from '@/backend/models/data/Content/IFlashcard';
import { IContent } from '@/backend/models/data/Content/IContent';
import { DeleteDocument } from '@/backend/database/generalFeature';
import { FormatDate } from '@/backend/database/generalFeature';
import { ContentType } from '@/backend/globalVariable';
import SystemMessage from '@/backend/messages/systemMessage';

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
  if (contentID && data.contentData != null) {
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

  //Không có contentID ==> Dữ liệu mới
  const id = await GenerateID(baseURL);
  const contentData = {
    contentNo: data.contentNo,
    contentType: data.contentType.toUpperCase(),
    contentName: data.contentName,
    contentDescription: data.contentDescription,
    contentData: data.contentData == null ? [] : [data.contentData],
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
    return;
  }

  //Không liệt kê vị trí => Xóa content
  await DeleteDocument(baseURL, contentID);
}

//Sửa nội dung bài học
export async function EditContent(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
  data: IContent,
  originalPosition: number,
) {
  const baseURL = `${TableName.COURSE}/${courseID}/${TableName.UNIT}/${unitID}/${TableName.TASK}/${taskID}/${TableName.CONTENT}`;
  const document = doc(db, baseURL, contentID);

  //Bản chỉnh sửa ban đầu
  const originalDocumentData = await getDoc(document);
  if (!originalDocumentData.exists()) {
    return false;
  }

  //Có chỉnh sửa Content Data
  let editContent = originalDocumentData.data().contentData;
  if (data.contentData) {
    editContent = editContent.map((original) => {
      if (original.position == originalPosition) {
        return data.contentData;
      }
      return original;
    });
  }

  //Tiến hành cập nhật
  try {
    //Chỉ chỉnh sửa nội dung
    if (originalPosition > 0) {
      await updateDoc(document, {
        contentType: originalDocumentData.data().contentType,
        contentName: originalDocumentData.data().contentName,
        contentDescription: originalDocumentData.data().contentDescription,
        contentNo: originalDocumentData.data().contentNo,
        contentData: editContent,
        contentCreateAt: originalDocumentData.data().contentCreateAt,
        contentLastEditDate: new Date(),
      });
      return true;
    }
    //Chỉnh sửa tiêu đề
    await updateDoc(document, {
      contentType: originalDocumentData.data().contentType,
      contentName: data.contentName,
      contentDescription: data.contentDescription,
      contentNo: data.contentNo,
      contentData: editContent,
      contentCreateAt: originalDocumentData.data().contentCreateAt,
      contentLastEditDate: new Date(),
    });

    return true;
  } catch (e) {
    return false;
  }
}

//Lấy danh sách nội dung
export async function GetContent(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
) {
  const baseURL = `${TableName.COURSE}/${courseID}/${TableName.UNIT}/${unitID}/${TableName.TASK}/${taskID}/${TableName.CONTENT}/`;
  const unitURL = `${TableName.COURSE}/${courseID}/${TableName.UNIT}/`;
  const taskURL = `${TableName.COURSE}/${courseID}/${TableName.UNIT}/${unitID}/${TableName.TASK}/`;
  try {
    if (!unitID) {
      const taskDatabase = collection(db, unitURL);
      const taskData = await getDocs(taskDatabase);
      const taskList = await Promise.all(
        taskData.docs.map(
          async (doc) =>
            await GetUnit(doc, `${unitURL}${doc.id}/${TableName.TASK}/`),
        ),
      );

      if (taskList.length === 0) {
        return null;
      }
      return taskList.sort((a, b) => {
        return a.unitNo - b.unitNo;
      });
    }

    if (!taskID) {
      const taskDatabase = collection(db, taskURL);
      const taskData = await getDocs(taskDatabase);
      const taskList = await Promise.all(
        taskData.docs.map(
          async (doc) =>
            await GetTask(doc, `${taskURL}${doc.id}/${TableName.CONTENT}/`),
        ),
      );

      if (taskList.length === 0) {
        return null;
      }
      return taskList.sort((a, b) => {
        return a.taskNo - b.taskNo;
      });
    }

    //Lấy chi tiết contentID
    if (contentID) {
      const document = doc(db, baseURL, contentID);
      const documentData = await getDoc(document);
      if (!documentData.exists()) {
        return null;
      }
      return await ContentData(documentData);
    }

    const contentCollection = collection(db, baseURL);
    const contentDocuments = await getDocs(contentCollection);
    const contentList = await Promise.all(
      contentDocuments.docs.map(async (doc) => await ContentData(doc)),
    );

    if (contentList.length === 0) {
      return null;
    }
    return contentList.sort((a, b) => {
      return a.contentNo - b.contentNo;
    });
  } catch {
    return SystemMessage.SYSTEM_ERROR;
  }
}

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

//Kiểm tra đổi thứ tự nội dung
export async function CheckPositionEdit(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
  previousPosition: number,
  position: number,
): Promise<number> {
  //Lấy danh sách nội dung
  const pathName = `${TableName.COURSE}/${courseID}/${TableName.UNIT}/${unitID}/${TableName.TASK}/${taskID}/${TableName.CONTENT}`;
  const document = doc(db, pathName, contentID);
  const documentData = await getDoc(document);

  //Lấy được danh sách
  if (documentData.exists()) {
    const dataList:
      | ICalculateTwoNumbersContent[]
      | ICardContent[]
      | IFlashcardContent[] = documentData.data().contentData;

    //Nếu số bị null
    if (isNaN(position)) {
      return previousPosition;
    }

    //Kiểm tra số có hợp lệ không
    for (const data of dataList) {
      const currentNo = Number(data.position);
      if (
        !isNaN(currentNo) &&
        currentNo === position &&
        currentNo != previousPosition
      ) {
        return NaN;
      }
    }
    return position;
  }
  return NaN;
}

export async function CheckEditPositionExist(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
  contentType: string,
  position: number,
): Promise<boolean> {
  //Lấy danh sách nội dung
  const pathName = `${TableName.COURSE}/${courseID}/${TableName.UNIT}/${unitID}/${TableName.TASK}/${taskID}/${TableName.CONTENT}`;
  const document = doc(db, pathName, contentID);
  const documentData = await getDoc(document);
  //Lấy được danh sách
  if (documentData.exists()) {
    if (contentType != documentData.data().contentType) {
      return false;
    }

    const dataList:
      | ICalculateTwoNumbersContent[]
      | ICardContent[]
      | IFlashcardContent[] = documentData.data().contentData;

    //Kiểm tra vị trí cũ có tồn tại không
    for (const data of dataList) {
      const currentNo = Number(data.position);
      if (currentNo == position) {
        return true;
      }
    }
    return false;
  }
  return false;
}

//Format danh sách
async function GetUnit(doc, baseURL) {
  const taskCollection = collection(db, baseURL);
  const taskDocuments = await getDocs(taskCollection);
  const taskList = await Promise.all(
    taskDocuments.docs.map(
      async (doc) =>
        await GetTask(doc, `${baseURL}${doc.id}/${TableName.CONTENT}/`),
    ),
  );

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
    task: taskList.sort((a, b) => {
      return a.taskNo - b.taskNo;
    }),
  };
}

async function GetTask(doc, baseURL: string) {
  const contentCollection = collection(db, baseURL);
  const contentDocuments = await getDocs(contentCollection);
  const contentList = await Promise.all(
    contentDocuments.docs.map(async (doc) => await ContentData(doc)),
  );

  return {
    taskID: doc.id,
    taskNo: doc.data().taskNo,
    taskName: doc.data().taskName,
    taskDescription: doc.data().taskDescription,
    taskUploadDate: FormatDate(doc.data().taskUploadDate),
    taskLastEditDate:
      doc.data().taskLastEditDate != null
        ? FormatDate(doc.data().taskLastEditDate)
        : null,
    content: contentList.sort((a, b) => {
      return a.contentNo - b.contentNo;
    }),
  };
}

async function ContentData(doc) {
  return {
    contentID: doc.id,
    contentType: doc.data().contentType,
    contentNo: doc.data().contentNo,
    contentName: doc.data().contentName,
    contentDescription: doc.data().contentDescription,
    contentCreateAt: FormatDate(doc.data().contentCreateAt),
    contentLastEditDate:
      doc.data().contentLastEditDate != null
        ? FormatDate(doc.data().contentLastEditDate)
        : null,
    contentData: ContentListData(
      doc.data().contentData,
      doc.data().contentType,
    ),
  };
}

function ContentListData(content, type: string) {
  let contentList;

  switch (type) {
    case ContentType.CALCULATE_TWO_NUMBER:
      contentList = content.map((item) => ({
        ...item,
        result: Calculation(item),
      }));
      break;
    default:
      contentList = content.map((data) => {
        return data;
      });
  }
  return contentList;
}

function Calculation(data) {
  const firstNumber = data.firstNumber;
  const secondNumber = data.secondNumber;
  switch (data.operator) {
    case '+':
      return firstNumber + secondNumber;
    case '-':
      return firstNumber - secondNumber;
    case '*':
      return firstNumber * secondNumber;
    case '/':
      return firstNumber / secondNumber;
    default:
      return NaN; // Xử lý cho các toán tử không xác định
  }
}
