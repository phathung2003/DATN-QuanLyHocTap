import * as Yup from 'yup';
import GradeMessage from '@/backend/messages/gradeMessage';
import CategoryCondition from '@/backend/validationSchema/category/categoryCondition';

const SchemaLogin = Yup.object().shape({
  //Kiểm tra tên loại
  gradeName: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (CategoryCondition.CATEGORY_NAME.MAX > 0) {
      baseSchema = baseSchema.min(
        CategoryCondition.CATEGORY_NAME.MAX,
        GradeMessage.GRADE_NAME.OVER_MAX_CHARACTER,
      );
    }

    if (CategoryCondition.CATEGORY_NAME.REQUIRED) {
      baseSchema = baseSchema.required(GradeMessage.GRADE_NAME.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra mô tả
  gradeDescription: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (CategoryCondition.CATEGORY_DESCRIPTION.MAX > 0) {
      baseSchema = baseSchema.min(
        CategoryCondition.CATEGORY_DESCRIPTION.MAX,
        GradeMessage.GRADE_DESCRIPTION.OVER_MAX_CHARACTER,
      );
    }

    if (CategoryCondition.CATEGORY_DESCRIPTION.REQUIRED) {
      baseSchema = baseSchema.required(GradeMessage.GRADE_DESCRIPTION.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra hình
  gradeFile: Yup.mixed().when([], (isRequired, schema) => {
    let baseSchema = schema.test(
      'fileType',
      GradeMessage.GRADE_IMAGE.WRONG_FILE,
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
      baseSchema = baseSchema.required(GradeMessage.GRADE_IMAGE.REQUIRED);
    }
    return baseSchema;
  }),
});

export default SchemaLogin;
