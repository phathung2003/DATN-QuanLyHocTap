import * as Yup from 'yup';
import SubjectMessage from '@/backend/messages/subjectMessage';
import CategoryCondition from '@/backend/validationSchema/category/categoryCondition';

const SchemaLogin = Yup.object().shape({
  //Kiểm tra tên loại
  subjectName: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (CategoryCondition.CATEGORY_NAME.MAX > 0) {
      baseSchema = baseSchema.min(
        CategoryCondition.CATEGORY_NAME.MAX,
        SubjectMessage.SUBJECT_NAME.OVER_MAX_CHARACTER,
      );
    }

    if (CategoryCondition.CATEGORY_NAME.REQUIRED) {
      baseSchema = baseSchema.required(SubjectMessage.SUBJECT_NAME.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra mô tả
  subjectDescription: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (CategoryCondition.CATEGORY_DESCRIPTION.MAX > 0) {
      baseSchema = baseSchema.min(
        CategoryCondition.CATEGORY_DESCRIPTION.MAX,
        SubjectMessage.SUBJECT_DESCRIPTION.OVER_MAX_CHARACTER,
      );
    }

    if (CategoryCondition.CATEGORY_DESCRIPTION.REQUIRED) {
      baseSchema = baseSchema.required(
        SubjectMessage.SUBJECT_DESCRIPTION.REQUIRED,
      );
    }
    return baseSchema;
  }),

  //Kiểm tra hình
  subjectFile: Yup.mixed().when([], (isRequired, schema) => {
    let baseSchema = schema.test(
      'fileType',
      SubjectMessage.SUBJECT_IMAGE.WRONG_FILE,
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
    if (CategoryCondition.CATEGORY_IMAGE.REQUIRED) {
      baseSchema = baseSchema.required(SubjectMessage.SUBJECT_IMAGE.REQUIRED);
    }
    return baseSchema;
  }),
});

export default SchemaLogin;
