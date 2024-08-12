export interface ICalculate_Two_NumberMessage {
  FIRST_NUMBER: {
    NOT_A_NUMBER: string;
    REQUIRED: string;
  };

  SECOND_NUMBER: {
    NOT_A_NUMBER: string;
    REQUIRED: string;
  };

  OPERATOR: {
    REQUIRED: string;
  };
}

export interface ICalculate_Two_NumberError {
  status: boolean;
  operatorError: string | null;
  systemError: string | null;
}
