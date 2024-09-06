export interface ICalculateTwoNumbers {
  contentType: 'CalculateTwoNumber';
  contentNo: number;
  content: ICalculateTwoNumbersContent[];
}

export interface ICalculateTwoNumbersContent {
  position: number;
  firstNumber: number | string;
  secondNumber: number | string;
  operator: '+' | '-' | '*' | '/';
  result?: number;
}
