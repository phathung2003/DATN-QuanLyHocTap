import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import TaskMessage from '@/backend/messages/taskMessage';
import { db } from '@/backend/database/firebase';
import {
  AddDatabaseWithoutID,
  CheckInfoExist,
  GenerateID,
} from '@/backend/database/generalFeature';
import { Status, TableName } from '@/backend/globalVariable';
import ITask from '@/backend/models/data/ITask';
import { FormatISODate } from '@/backend/database/generalFeature';
import { DeleteDocument } from '@/backend/database/generalFeature';

//Thêm tác vụ bài
export async function AddTask(
  courseID: string,
  unitID: string,
  data: ITask,
): Promise<boolean> {
  const baseURL = `${TableName.COURSE}/${courseID}/${TableName.UNIT}/${unitID}/${TableName.TASK}`;

  //Tạo bộ task
  let taskID = await CheckInfoExist(data.taskNo.toString(), `${baseURL}`, [
    'taskNo',
  ]);

  if (taskID == Status.SYSTEM_ERROR || taskID != Status.NOT_FOUND) {
    return false;
  }

  taskID = await GenerateID(baseURL);
  const taskData = {
    taskNo: data.taskNo,
    taskName: data.taskName,
    taskDescription: data.taskDescription,
    taskUploadDate: new Date(),
    taskLastEditDate: null,
  };
  return await AddDatabaseWithoutID(`${baseURL}/${taskID}`, taskData);
}

//Lấy tác vụ bài
export async function GetTask(
  courseID: string,
  unitID: string,
  taskID: string | null,
) {
  const pathName = `${TableName.COURSE}/${courseID}/${TableName.UNIT}/${unitID}/${TableName.TASK}`;
  try {
    //Tìm kiếm ID cụ thể
    if (taskID) {
      const document = doc(db, pathName, taskID);
      const documentData = await getDoc(document);
      if (!documentData.exists()) {
        return null;
      }
      return await UnitData(documentData);
    }

    //Lấy toàn bộ danh sách
    const taskCollection = collection(db, pathName);
    const taskDocuments = await getDocs(taskCollection);
    const taskList = await Promise.all(
      taskDocuments.docs.map(async (doc) => await UnitData(doc)),
    );

    if (taskList.length === 0) {
      return null;
    }
    return taskList;
  } catch {
    return TaskMessage.SYSTEM_ERROR;
  }
}

//Xóa tác vụ bài
export async function DeleteTask(
  courseID: string,
  unitID: string,
  taskID: string,
) {
  const pathName = `${TableName.COURSE}/${courseID}/${TableName.UNIT}/${unitID}/${TableName.TASK}`;
  await DeleteDocument(pathName, taskID);
}

//Sửa tác vụ bài
//Sửa thông tin bài học
export async function EditTask(
  courseID: string,
  unitID: string,
  taskID: string,
  data: ITask,
): Promise<boolean> {
  const pathName = `${TableName.COURSE}/${courseID}/${TableName.UNIT}/${unitID}/${TableName.TASK}`;
  const document = doc(db, pathName, taskID);

  //Bản chỉnh sửa ban đầu
  const originalDocumentData = await getDoc(document);
  if (!originalDocumentData.exists()) {
    return false;
  }

  //Tiến hành cập nhật
  try {
    await updateDoc(document, {
      taskName: data.taskName,
      taskDescription: data.taskDescription,
      taskNo: data.taskNo,

      taskUploadDate: originalDocumentData.data().taskUploadDate,
      unitLastEditDate: new Date(),
    });
    return true;
  } catch {
    return false;
  }
}

//--- Cục bộ ---//
//Format danh sách
async function UnitData(doc) {
  return {
    taskID: doc.id,
    taskNo: doc.data().taskNo,
    taskName: doc.data().taskName,
    taskDescription: doc.data().taskDescription,
    taskUploadDate: FormatISODate(
      doc.data().taskUploadDate.toDate().toISOString(),
    ),
    taskLastEditDate:
      doc.data().taskLastEditDate != null
        ? FormatISODate(doc.data().taskLastEditDate.toDate().toISOString())
        : null,
  };
}
