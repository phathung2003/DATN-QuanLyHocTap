import * as Yup from 'yup';
import ContentMessage from '@/backend/messages/contentMessage';
import ContentCondition from '@/backend/validationSchema/content/contentCondition';

const SchemaContent = Yup.object().shape({
  //Kiểm tra tên nội dung
  contentName: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (ContentCondition.CONTENT_NAME.MAX > 0) {
      baseSchema = baseSchema.max(
        ContentCondition.CONTENT_NAME.MAX,
        ContentMessage.CONTENT_NAME.OVER_MAX_CHARACTER,
      );
    }

    if (ContentCondition.CONTENT_NAME.REQUIRED) {
      baseSchema = baseSchema.required(ContentMessage.CONTENT_NAME.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra mô tả
  contentDescription: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (ContentCondition.CONTENT_DESCRIPTION.MAX > 0) {
      baseSchema = baseSchema.max(
        ContentCondition.CONTENT_DESCRIPTION.MAX,
        ContentMessage.CONTENT_DESCRIPTION.OVER_MAX_CHARACTER,
      );
    }

    if (ContentCondition.CONTENT_DESCRIPTION.REQUIRED) {
      baseSchema = baseSchema.required(
        ContentMessage.CONTENT_DESCRIPTION.REQUIRED,
      );
    }
    return baseSchema;
  }),

  //Kiểm tra mục nội dung
  contentType: Yup.string()
    .notOneOf(['Default'], ContentMessage.CONTENT_TYPE.REQUIRED)
    .required(ContentMessage.CONTENT_TYPE.REQUIRED),
});

export default SchemaContent;
