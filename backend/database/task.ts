import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
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

//Thêm bài
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

//Lấy bài
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
