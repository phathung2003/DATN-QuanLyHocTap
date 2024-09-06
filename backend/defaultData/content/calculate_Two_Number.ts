import { ICalculateTwoNumbersContent } from '@/backend/models/data/Content/ICalculateTwoNumbers';
import { ICalculate_Two_NumberError } from '@/backend/models/messages/content/ICalculate_Two_NumberMessage';

export function DefaultCalculate_Two_NumberValue(): ICalculateTwoNumbersContent {
  return {
    position: NaN,
    firstNumber: '',
    secondNumber: '',
    operator: '+',
  };
}

export function DefaultCalculate_Two_NumberError(): ICalculate_Two_NumberError {
  return {
    status: true,
    operatorError: null,
    systemError: null,
  };
}

export function Calculate_Two_NumberEditDefaultValue(
  data: ICalculateTwoNumbersContent,
): ICalculateTwoNumbersContent {
  return {
    position: data.position,
    firstNumber: data.firstNumber,
    secondNumber: data.secondNumber,
    operator: data.operator,
  };
}
