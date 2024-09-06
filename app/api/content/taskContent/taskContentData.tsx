import {
  CheckDataInputTrueFalse,
  CheckDataInputNeedLogin,
} from '@/app/api/checkData';
import { ContentType } from '@/backend/globalVariable';
import { CheckIDExist } from '@/backend/database/generalFeature';
import { TableName } from '@/backend/globalVariable';
import { IContent } from '@/backend/models/data/Content/IContent';
import { ICalculateTwoNumbersContent } from '@/backend/models/data/Content/ICalculateTwoNumbers';
import { ICardContent } from '@/backend/models/data/Content/ICard';
import { IFlashcardContent } from '@/backend/models/data/Content/IFlashcard';

//Kiểm tra dữ liệu
export async function CheckData(request) {
  const optionField = ['contentName', 'contentDescription', 'contentData'];
  const requireField = ['contentType'];
  try {
    const courseFileID = request.nextUrl.searchParams.get('courseID');
    const unitFileID = request.nextUrl.searchParams.get('unitID');
    const taskFileID = request.nextUrl.searchParams.get('taskID');
    const contentFileID = request.nextUrl.searchParams.get('contentID');

    const result = await CheckDataInputNeedLogin(
      request,
      requireField,
      optionField,
    );

    if (!result || !courseFileID || !unitFileID || !taskFileID) {
      return false;
    }

    let content = result.data;

    if (result.data.contentData != null) {
      content = CheckContent(result.data);
      if (!content) {
        return false;
      }
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

    //Kiểm tra tác vụ bài có trên hệ thống hay không
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
      token: result.token,
      data: content,
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
function CheckContent(dataInput): IContent | null {
  try {
    //Kiểm tra contentNo có null không
    const contentNo = dataInput.contentNo ?? NaN;
    if (!isNaN(contentNo) && isNaN(Number(dataInput.contentNo))) {
      return null;
    }

    //Lấy contentData
    let contentData:
      | ICalculateTwoNumbersContent
      | ICardContent
      | IFlashcardContent
      | null;
    switch (dataInput.contentType.toUpperCase()) {
      case ContentType.FLASHCARD:
        contentData = IsFlashcard(dataInput.contentData);
        break;
      case ContentType.CALCULATE_TWO_NUMBER:
        contentData = IsCalculateTwoNumber(dataInput.contentData);
        break;
      case ContentType.CARD:
        contentData = IsCard(dataInput.contentData);
        break;
      default:
        return null;
    }
    if (!contentData) {
      return null;
    }

    const data: IContent = {
      contentName: dataInput.contentName,
      contentDescription: dataInput.contentDescription,
      contentType: dataInput.contentType.toUpperCase(),
      contentNo: Number(contentNo),
      contentData: dataInput.contentData,
    };
    return data;
  } catch {
    return null;
  }
}

//Kiểu dạng: Flashcard
export function IsFlashcard(data): IFlashcardContent | null {
  try {
    const optionField = [
      'firstSideText',
      'firstSideImage',
      'secondSideText',
      'secondSideImage',
    ];

    //Kiểm tra có đủ các trường không
    if (!CheckDataInputTrueFalse(data, null, optionField)) {
      return null;
    }

    //Kiểm tra có phải dạng số không
    const positionNo = NullNaNNumber(data.position);
    if (positionNo == null) {
      return null;
    }
    //Ít nhất 1 trong 2 trường của mỗi mặt phải có dữ liệu
    if (
      (!data.firstSideText && !data.firstSideImage) ||
      (!data.secondSideText && !data.secondSideImage)
    ) {
      return null;
    }

    //Xuất dữ liệu
    const flashcardData: IFlashcardContent = {
      position: positionNo,
      firstSideImage: data.firstSideImage == '' ? null : data.firstSideImage,
      firstSideText: data.firstSideText,
      secondSideImage: data.secondSideImage == '' ? null : data.secondSideImage,
      secondSideText: data.secondSideText,
    };
    return flashcardData;
  } catch {
    return null;
  }
}

//Kiểu dạng: CalculateTwoNumber
export function IsCalculateTwoNumber(data): ICalculateTwoNumbersContent | null {
  try {
    const requireField = ['firstNumber', 'secondNumber', 'operator'];
    //Kiểm tra có chứa đủ các trường
    if (!CheckDataInputTrueFalse(data, requireField, null)) {
      return null;
    }

    //Kiểm tra các dấu phép tính có hợp lệ
    if (!['+', '-', '*', '/'].includes(data.operator)) {
      return null;
    }

    //Kiểm tra số thứ nhất và số thứ hai có phải là số không
    if (!IsNumber(data.firstNumber) || !IsNumber(data.secondNumber)) {
      return null;
    }

    //Kiểm tra có phải dạng số không
    const positionNo = NullNaNNumber(data.position);
    if (positionNo == null) {
      return null;
    }

    //Xuất dữ liệu
    const mathData: ICalculateTwoNumbersContent = {
      position: positionNo,
      firstNumber: data.firstNumber,
      secondNumber: data.secondNumber,
      operator: data.operator,
    };
    return mathData;
  } catch {
    return null;
  }
}

//Kiểu dạng: Card
export function IsCard(data): ICardContent | null {
  try {
    const optionField = ['image', 'text'];

    //Kiểm tra có chứa đủ các trường
    if (!CheckDataInputTrueFalse(data, null, optionField)) {
      return null;
    }

    //Phải có 1 trong 2 trường
    if (!data.image && !data.text) {
      return null;
    }

    //Kiểm tra có phải dạng số không
    const positionNo = NullNaNNumber(data.position);
    if (positionNo == null) {
      return null;
    }

    const cardData: ICardContent = {
      position: positionNo,
      image: data.image,
      text: data.word,
    };
    return cardData;
  } catch {
    return null;
  }
}

//--- Nội bộ ---//
export function IsNumber(value: any): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

//Kiểm tra có phải dạng số không - Cho phép null và NaN
export function NullNaNNumber(numberInput): number | null {
  const number = numberInput ?? NaN;
  if (!isNaN(number) && isNaN(Number(numberInput))) {
    return null;
  }
  return Number(number);
}

//Kiểm tra dữ liệu
export async function CheckEditData(request) {
  const optionField = ['contentName', 'contentDescription', 'contentData'];
  const requireField = ['contentType'];

  try {
    const courseFileID = request.nextUrl.searchParams.get('courseID');
    const unitFileID = request.nextUrl.searchParams.get('unitID');
    const taskFileID = request.nextUrl.searchParams.get('taskID');
    const contentFileID = request.nextUrl.searchParams.get('contentID');
    const positionRequest = Number(
      request.nextUrl.searchParams.get('position'),
    );

    const result = await CheckDataInputNeedLogin(
      request,
      requireField,
      optionField,
    );

    if (
      !result ||
      !courseFileID ||
      !unitFileID ||
      !taskFileID ||
      !contentFileID
    ) {
      return false;
    }

    let content = result.data;
    if (result.data.contentData) {
      if (!positionRequest) {
        return false;
      }
      content = CheckContent(result.data);
      if (!content) {
        return false;
      }
    }

    //Kiểm tra xem position có phải là số không
    if (!Number.isFinite(positionRequest)) {
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

    //Kiểm tra tác vụ bài có trên hệ thống hay không
    const taskPath = `${TableName.COURSE}/${courseFileID}/${TableName.UNIT}/${unitFileID}/${TableName.TASK}`;
    if (!(await CheckIDExist(taskPath, taskFileID))) {
      return false;
    }

    //Kiểm tra nội dung có trên hệ thống
    const contentPath = `${TableName.COURSE}/${courseFileID}/${TableName.UNIT}/${unitFileID}/${TableName.TASK}/${taskFileID}/${TableName.CONTENT}`;
    if (!(await CheckIDExist(contentPath, contentFileID))) {
      return false;
    }

    return {
      token: result.token,
      data: content,
      courseID: courseFileID,
      unitID: unitFileID,
      taskID: taskFileID,
      contentID: contentFileID,
      position: positionRequest,
    };
  } catch {
    return false;
  }
}
