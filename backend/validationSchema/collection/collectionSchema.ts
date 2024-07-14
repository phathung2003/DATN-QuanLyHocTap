import * as Yup from 'yup';
import CollectionMessage from '@/backend/messages/collectionMessage';
import CollectionCondition from '@/backend/validationSchema/collection/collectionCondition';

const SchemaCollection = Yup.object().shape({
  //Kiểm tra tên danh mục
  collectionName: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (CollectionCondition.COLLECTION_NAME.MAX > 0) {
      baseSchema = baseSchema.min(
        CollectionCondition.COLLECTION_NAME.MAX,
        CollectionMessage.COLLECTION_NAME.OVER_MAX_CHARACTER,
      );
    }

    if (CollectionCondition.COLLECTION_NAME.REQUIRED) {
      baseSchema = baseSchema.required(
        CollectionMessage.COLLECTION_NAME.REQUIRED,
      );
    }
    return baseSchema;
  }),

  //Kiểm tra lớp học
  collectionGrade: Yup.string()
    .notOneOf(['Default'], CollectionMessage.COLLECTION_GRADE.REQUIRED)
    .required(CollectionMessage.COLLECTION_GRADE.REQUIRED),

  //Kiểm tra môn học
  collectionSubject: Yup.string()
    .notOneOf(['Default'], CollectionMessage.COLLECTION_SUBJECT.REQUIRED)
    .required(CollectionMessage.COLLECTION_SUBJECT.REQUIRED),

  //Kiểm tra mô tả
  collectionDescription: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (CollectionCondition.COLLECTION_DESCRIPTION.MAX > 0) {
      baseSchema = baseSchema.min(
        CollectionCondition.COLLECTION_DESCRIPTION.MAX,
        CollectionMessage.COLLECTION_DESCRIPTION.OVER_MAX_CHARACTER,
      );
    }

    if (CollectionCondition.COLLECTION_DESCRIPTION.REQUIRED) {
      baseSchema = baseSchema.required(
        CollectionMessage.COLLECTION_DESCRIPTION.REQUIRED,
      );
    }
    return baseSchema;
  }),

  //Kiểm tra hình
  collectionImage: Yup.mixed().when([], (isRequired, schema) => {
    let baseSchema = schema.test(
      'fileType',
      CollectionMessage.COLLECTION_IMAGE.WRONG_FILE,
      (value) => {
        if (value && value instanceof File) {
          const fileType = value.type;
          return ['image/jpeg', 'image/jpg', 'image/png'].includes(fileType);
        } else {
          return true;
        }
      },
    );
    if (CollectionCondition.COLLECTION_IMAGE.REQUIRED) {
      baseSchema = baseSchema.required(
        CollectionMessage.COLLECTION_IMAGE.REQUIRED,
      );
    }
    return baseSchema;
  }),
});

export default SchemaCollection;
