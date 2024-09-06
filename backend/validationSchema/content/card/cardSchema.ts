import * as Yup from 'yup';
import CardMessage from '@/backend/messages/content/cardMessage';
import CardCondition from '@/backend/validationSchema/content/card/cardCondition';

const SchemaCard = Yup.object().shape({
  //Kiểm tra chữ
  text: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (CardCondition.TEXT.MAX > 0) {
      baseSchema = baseSchema.max(
        CardCondition.TEXT.MAX,
        CardMessage.TEXT.OVER_MAX_CHARACTER,
      );
    }

    if (CardCondition.TEXT.REQUIRED) {
      baseSchema = baseSchema.required(CardMessage.TEXT.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra hình mặt trên
  firstSideFile: Yup.mixed().when([], (isRequired, schema) => {
    let baseSchema = schema.test(
      'fileType',
      CardMessage.IMAGE.WRONG_FILE,
      (value) => {
        if (value && value instanceof File) {
          const fileType = value.type;
          return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(
            fileType,
          );
        } else {
          return true;
        }
      },
    );
    if (CardCondition.IMAGE.REQUIRED) {
      baseSchema = baseSchema.required(CardMessage.IMAGE.REQUIRED);
    }
    return baseSchema;
  }),
});

export default SchemaCard;
