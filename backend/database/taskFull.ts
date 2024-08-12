import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/backend/database/firebase';
import {
  AddDatabaseWithoutID,
  CheckInfoExist,
  GenerateID,
} from '@/backend/database/generalFeature';
import { ContentType, Status, TableName } from '@/backend/globalVariable';
import SystemMessage from '@/backend/messages/systemMessage';

//Thêm nội dung học
export async function AddTask(
  courseID: string,
  unitID: string,
  data: any[],
): Promise<boolean> {
  const baseURL = `${TableName.COURSE}/${courseID}/${TableName.UNIT}/${unitID}/${TableName.TASK}`;

  for (let type = 0; type < data.length; type++) {
    //Tạo bộ task
    let taskID = await CheckInfoExist(data[type].taskNo, `${baseURL}`, [
      'taskNo',
    ]);
    switch (taskID) {
      case Status.SYSTEM_ERROR:
        return false;
      case Status.NOT_FOUND:
        taskID = await GenerateID(baseURL);
        if (!(await CreateTask(data[type], baseURL, taskID))) {
          return false;
        }
        break;
    }

    //Chèn nội dung vào task
    if (!(await TaskContentInput(data[type].content, baseURL, taskID))) {
      return false;
    }
  }
  return true;
}

//Lấy nội dung học
export async function GetContent(courseID: string, unitID: string) {
  const baseURL = `${TableName.COURSE}/${courseID}/${TableName.UNIT}/${unitID}/${TableName.TASK}`;

  try {
    const unitDatabase = collection(db, baseURL);
    const unitData = await getDocs(unitDatabase);
    const unitList = await Promise.all(
      unitData.docs.map(async (doc) => await GetTask(doc, baseURL)),
    );

    if (unitList.length === 0) {
      return null;
    }
    return unitList;
  } catch {
    return SystemMessage.SYSTEM_ERROR;
  }
}

//--- Nội bộ ---//
async function GetTask(doc, baseURL: string) {
  const contentData = await ContentListData(
    `${baseURL}/${doc.id}/${TableName.CONTENT}`,
  );

  return {
    taskNo: doc.data().taskNo,
    taskName: doc.data().taskName,
    taskDescription: doc.data().taskDescription,
    taskUploadDate: doc.data().taskUploadDate,
    taskLastEditDate: doc.data().taskLastEditDate,
    content: contentData,
  };
}

async function ContentListData(baseURL: string) {
  const contentDatabase = collection(db, baseURL);
  const contentData = await getDocs(contentDatabase);
  const contentList = await Promise.all(
    contentData.docs.map(async (doc) => {
      //Lấy dữ liệu
      let updatedContent = doc.data().contentData;
      switch (doc.id) {
        case ContentType.CALCULATE_TWO_NUMBER:
          updatedContent = doc.data().contentData.map((item) => ({
            ...item,
            result: Calculation(item),
          }));
      }

      return {
        contentType: doc.id.toUpperCase(),
        contentNo: doc.data().contentNo,
        contentData: updatedContent,
      };
    }),
  );

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

//Tạo bài
async function CreateTask(
  dataInput,
  baseURL: string,
  taskID: string,
): Promise<boolean> {
  const tablePath = `${baseURL}/${taskID}`;

  const taskData = {
    taskNo: dataInput.taskNo,
    taskName: dataInput.taskName,
    taskDescription: dataInput.taskDescription,
    taskUploadDate: new Date(),
    taskLastEditDate: null,
  };
  return await AddDatabaseWithoutID(tablePath, taskData);
}

async function TaskContentInput(
  dataInput,
  baseURL: string,
  taskID: string,
): Promise<boolean> {
  for (let data = 0; data < dataInput.length; data++) {
    const contentData = {
      contentNo: dataInput[data].contentNo,
      contentData: dataInput[data].contentData,
    };
    const uploadURL = `${baseURL}/${taskID}/${TableName.CONTENT}/${dataInput[data].contentType.toUpperCase()}`;
    const result = await AddDatabaseWithoutID(uploadURL, contentData);
    if (!result) {
      return false;
    }
  }
  return true;
}
