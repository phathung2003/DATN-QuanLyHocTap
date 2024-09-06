import { ICalculate_Two_NumberCondition } from '@/backend/models/validationSchema/content/ICalculate_Two_NumberCondition';

//MAX: 0 = No max characters requirement
const Calculate_Two_NumberCondition: ICalculate_Two_NumberCondition = {
  FIRST_NUMBER: {
    REQUIRED: true,
  },

  SECOND_NUMBER: {
    REQUIRED: true,
  },

  OPERATOR: {
    REQUIRED: true,
  },
};

export default Calculate_Two_NumberCondition;
