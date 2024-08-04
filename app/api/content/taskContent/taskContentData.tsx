import { LoginSession } from '@/app/api/checkData';
import { CheckDataInputTrueFalse } from '@/app/api/checkData';
import { ContentType } from '@/backend/globalVariable';
import { CheckIDExist } from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';

//Kiểm tra dữ liệu
export async function CheckData(request) {
  try {
    const tokenID = LoginSession(request);
    const courseFileID = request.nextUrl.searchParams.get('courseID');
    const unitFileID = request.nextUrl.searchParams.get('unitID');
    const taskFileID = request.nextUrl.searchParams.get('taskID');
    const contentFileID = request.nextUrl.searchParams.get('contentID');
    const dataInput = await request.json();

    if (!tokenID || !courseFileID || !unitFileID || !taskFileID) {
      return false;
    }

    if (!CheckContent(dataInput)) {
      return false;
    }

    //Kiểm tra khóa học có trên hệ thống hay không
    if (!(await CheckIDExist(TableName.COURSE, courseFileID))) {
      return false;
    }

    //Kiểm tra bài học có trên hệ thống hay không
    const unitPath = `${TableName.COURSE}/${courseFileID}/${TableName.UNIT}`;
    if (!(await CheckIDExist(unitPath, unitFileID))) {
      return false;
    }

    //Kiểm tra bài có trên hệ thống hay không
    const taskPath = `${TableName.COURSE}/${courseFileID}/${TableName.UNIT}/${unitFileID}/${TableName.TASK}`;
    if (!(await CheckIDExist(taskPath, taskFileID))) {
      return false;
    }

    //Kiểm tra nội dung hệ thống
    if (contentFileID) {
      const contentPath = `${TableName.COURSE}/${courseFileID}/${TableName.UNIT}/${unitFileID}/${TableName.TASK}/${taskFileID}/${TableName.CONTENT}`;
      if (!(await CheckIDExist(contentPath, contentFileID))) {
        return false;
      }
    }

    return {
      token: tokenID,
      data: dataInput,
      courseID: courseFileID,
      unitID: unitFileID,
      taskID: taskFileID,
      contentID: contentFileID,
    };
  } catch {
    return false;
  }
}

//Kiểm tra nội dung

function CheckContent(dataInput): boolean {
  if (!dataInput.contentNo || !IsNumber(dataInput.contentNo)) {
    return false;
  }

  switch (dataInput.contentType.toUpperCase()) {
    case ContentType.FLASHCARD:
      if (!IsFlashcard(dataInput.contentData)) {
        return false;
      }
      break;
    case ContentType.CALCULATE_TWO_NUMBER:
      if (!IsCalculateTwoNumber(dataInput.contentData)) {
        return false;
      }
      break;
    case ContentType.CARD:
      if (!IsCard(dataInput.contentData)) {
        return false;
      }
      break;
    default:
      return false;
  }

  return true;
}

//Kiểu dạng: Flashcard
export function IsFlashcard(data: any[]): boolean {
  try {
    for (let slide = 0; slide < data.length; slide++) {
      const nullableCheckField = [
        'firstSideText',
        'firstSideImage',
        'secondSideText',
        'secondSideImage',
      ];
      const checkField = ['position'];
      if (
        !CheckDataInputTrueFalse(data[slide], checkField, nullableCheckField)
      ) {
        return false;
      }

      //Kiểm tra có phải dạng số không
      if (!IsNumber(data[slide].position)) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

//Kiểu dạng: CalculateTwoNumber
export function IsCalculateTwoNumber(data: any[]): boolean {
  try {
    for (let calculation = 0; calculation < data.length; calculation++) {
      const checkField = [
        'questionNo',
        'firstNumber',
        'secondNumber',
        'operator',
      ];

      //Kiểm tra có chứa đủ các trường
      if (!CheckDataInputTrueFalse(data[calculation], checkField, null)) {
        return false;
      }

      //Kiểm tra các dấu phép tính có hợp lệ
      if (!['+', '-', '*', '/'].includes(data[calculation].operator)) {
        return false;
      }

      if (
        !IsNumber(data[calculation].firstNumber) ||
        !IsNumber(data[calculation].secondNumber) ||
        !IsNumber(data[calculation].questionNo)
      ) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

//Kiểu dạng: Card
export function IsCard(data: any[]): boolean {
  try {
    for (let calculation = 0; calculation < data.length; calculation++) {
      const nullableField = ['image'];
      const checkField = ['position', 'word'];

      //Kiểm tra có chứa đủ các trường
      if (
        !CheckDataInputTrueFalse(data[calculation], checkField, nullableField)
      ) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

//--- Nội bộ ---//
export function IsNumber(value: any): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}
