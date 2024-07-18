import { collection, getDocs } from 'firebase/firestore';
import GradeMessage from '@/backend/messages/gradeMessage';
import { db } from '@/backend/database/firebase';
import { AddDatabaseWithoutID } from '@/backend/database/generalFeature';
import { ContentType, TableName } from '@/backend/globalVariable';

//Thêm lớp
export async function AddContent(
  courseID: string,
  unitID: string,
  data: any[],
): Promise<boolean> {
  for (let type = 0; type < data.length; type++) {
    const contentData = {
      taskNo: data[type].taskNo,
      content: data[type].content,
    };
    const result = await AddDatabaseWithoutID(
      `${TableName.COURSE}/${courseID}/${TableName.UNIT}/${unitID}/${TableName.CONTENT}/${data[type].contentType.toUpperCase()}`,
      contentData,
    );

    if (!result) {
      return false;
    }
  }
  return true;
}

//Lấy danh sách
export async function GetContent(courseID: string, unitID: string) {
  try {
    const unitDatabase = collection(
      db,
      `${TableName.COURSE}/${courseID}/${TableName.UNIT}/${unitID}/${TableName.CONTENT}`,
    );
    const unitData = await getDocs(unitDatabase);
    const unitList = await Promise.all(
      unitData.docs.map(async (doc) => await ContentListData(doc)),
    );

    if (unitList.length === 0) {
      return null;
    }
    return unitList;
  } catch {
    return GradeMessage.SYSTEM_ERROR;
  }
}

async function ContentListData(doc) {
  let updatedContent = doc.data().content;

  switch (doc.id) {
    case ContentType.CALCULATE_TWO_NUMBER:
      updatedContent = doc.data().content.map((item) => ({
        ...item,
        result: Calculation(item),
      }));
  }

  return {
    contentType: doc.id.toUpperCase(),
    taskNo: doc.data().taskNo,
    content: updatedContent,
  };
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
