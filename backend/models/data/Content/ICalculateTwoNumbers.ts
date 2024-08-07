export interface ICalculateTwoNumbers {
  contentType: 'CalculateTwoNumber';
  contentNo: number;
  content: ICalculateTwoNumbersContent[];
}

export interface ICalculateTwoNumbersContent {
  position: number;
  firstNumber: number;
  secondNumber: number;
  operator: '+' | '-' | '*' | '/';
  result?: number;
}
