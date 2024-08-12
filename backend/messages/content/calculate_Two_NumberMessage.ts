import { ICalculate_Two_NumberMessage } from '@/backend/models/messages/content/ICalculate_Two_NumberMessage';

const Calculate_Two_NumberMessage: ICalculate_Two_NumberMessage = {
  FIRST_NUMBER: {
    NOT_A_NUMBER: 'Dữ liệu phải là số',
    REQUIRED: 'Xin hãy nhập số',
  },
  SECOND_NUMBER: {
    NOT_A_NUMBER: 'Dữ liệu phải là số',
    REQUIRED: 'Xin hãy nhập số',
  },
  OPERATOR: {
    REQUIRED: 'Xin hãy chọn phép tính',
  },
};

export default Calculate_Two_NumberMessage;
