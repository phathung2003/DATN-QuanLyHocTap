import { CheckDataInputTrueFalse } from '@/app/api/checkData';

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
      if (!isNumber(data[slide].position)) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

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
        !isNumber(data[calculation].firstNumber) ||
        !isNumber(data[calculation].secondNumber) ||
        !isNumber(data[calculation].questionNo)
      ) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

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
function isNumber(value: any): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}
