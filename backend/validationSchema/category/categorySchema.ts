import * as Yup from 'yup';
import CategoryMessage from '@/backend/messages/categoryMessage';
import CategoryCondition from '@/backend/validationSchema/category/categoryCondition';

const SchemaLogin = Yup.object().shape({
  //Kiểm tra tên loại
  categoryName: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (CategoryCondition.CATEGORY_NAME.MAX > 0) {
      baseSchema = baseSchema.min(
        CategoryCondition.CATEGORY_NAME.MAX,
        CategoryMessage.CATEGORY_NAME.OVER_MAX_CHARACTER,
      );
    }

    if (CategoryCondition.CATEGORY_NAME.REQUIRED) {
      baseSchema = baseSchema.required(CategoryMessage.CATEGORY_NAME.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra loại
  categoryType: Yup.string()
    .notOneOf(['Default'], CategoryMessage.CATEGORY_TYPE.REQUIRED)
    .required(CategoryMessage.CATEGORY_TYPE.REQUIRED),

  //Kiểm tra mô tả
  categoryDescription: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (CategoryCondition.CATEGORY_DESCRIPTION.MAX > 0) {
      baseSchema = baseSchema.min(
        CategoryCondition.CATEGORY_DESCRIPTION.MAX,
        CategoryMessage.CATEGORY_DESCRIPTION.OVER_MAX_CHARACTER,
      );
    }

    if (CategoryCondition.CATEGORY_DESCRIPTION.REQUIRED) {
      baseSchema = baseSchema.required(
        CategoryMessage.CATEGORY_DESCRIPTION.REQUIRED,
      );
    }
    return baseSchema;
  }),

  //Kiểm tra hình
  categoryImage: Yup.mixed().when([], (isRequired, schema) => {
    let baseSchema = schema.test(
      'fileType',
      'Tệp phải là hình ảnh (jpeg, jpg, png, gif).',
      (value) => {
        if (value && value instanceof File) {
          const fileType = value.type;
          return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(
            fileType,
          );
        }
      },
    );
    if (CategoryCondition.CATEGORY_IMAGE.REQUIRED) {
      baseSchema = baseSchema.required(CategoryMessage.CATEGORY_IMAGE.REQUIRED);
    }
    return baseSchema;
  }),
});

export default SchemaLogin;
