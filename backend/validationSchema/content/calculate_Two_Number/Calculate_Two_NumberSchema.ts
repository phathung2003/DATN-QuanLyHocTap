import * as Yup from 'yup';
import Calculate_Two_NumberMessage from '@/backend/messages/content/calculate_Two_NumberMessage';

const SchemaCalculate_Two_Number = Yup.object().shape({
  //Kiểm tra số đầu tiên
  firstNumber: Yup.number().when([], (isRequired, schema) => {
    let baseSchema = schema;

    baseSchema = baseSchema.typeError(
      Calculate_Two_NumberMessage.FIRST_NUMBER.NOT_A_NUMBER,
    );

    if (Calculate_Two_NumberMessage.FIRST_NUMBER.REQUIRED) {
      baseSchema = baseSchema.required(
        Calculate_Two_NumberMessage.FIRST_NUMBER.REQUIRED,
      );
    }
    return baseSchema;
  }),

  //Kiểm tra số thứ hai
  secondNumber: Yup.number().when([], (isRequired, schema) => {
    let baseSchema = schema;

    baseSchema = baseSchema.typeError(
      Calculate_Two_NumberMessage.SECOND_NUMBER.NOT_A_NUMBER,
    );

    if (Calculate_Two_NumberMessage.SECOND_NUMBER.REQUIRED) {
      baseSchema = baseSchema.required(
        Calculate_Two_NumberMessage.SECOND_NUMBER.REQUIRED,
      );
    }
    return baseSchema;
  }),

  //Kiểm tra phép tính
  operator: Yup.string()
    .notOneOf(['Default'], Calculate_Two_NumberMessage.OPERATOR.REQUIRED)
    .required(Calculate_Two_NumberMessage.OPERATOR.REQUIRED),
});

export default SchemaCalculate_Two_Number;
