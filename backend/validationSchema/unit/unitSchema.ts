import * as Yup from 'yup';
import UnitMessage from '@/backend/messages/unitMessage';
import UnitCondition from '@/backend/validationSchema/unit/unitCondition';

const SchemaUnit = Yup.object().shape({
  //Kiểm tra số bài
  unitNo: Yup.number().when([], (isRequired, schema) => {
    let baseSchema = schema;
    baseSchema = baseSchema
      .typeError(UnitMessage.UNIT_NO.NOT_A_NUMBER)
      .positive(UnitMessage.UNIT_NO.NEGATIVE_NUMBER);

    if (UnitCondition.UNIT_NAME.REQUIRED) {
      baseSchema = baseSchema.required(UnitMessage.UNIT_NAME.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra tên danh mục
  unitName: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (UnitCondition.UNIT_NAME.MAX > 0) {
      baseSchema = baseSchema.max(
        UnitCondition.UNIT_NAME.MAX,
        UnitMessage.UNIT_NAME.OVER_MAX_CHARACTER,
      );
    }

    if (UnitCondition.UNIT_NAME.REQUIRED) {
      baseSchema = baseSchema.required(UnitMessage.UNIT_NAME.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra mô tả
  unitDescription: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (UnitCondition.UNIT_DESCRIPTION.MAX > 0) {
      baseSchema = baseSchema.min(
        UnitCondition.UNIT_DESCRIPTION.MAX,
        UnitMessage.UNIT_DESCRIPTION.OVER_MAX_CHARACTER,
      );
    }

    if (UnitCondition.UNIT_DESCRIPTION.REQUIRED === true) {
      baseSchema = baseSchema.required(UnitMessage.UNIT_DESCRIPTION.REQUIRED);
    }
    return baseSchema;
  }),
});

export default SchemaUnit;
