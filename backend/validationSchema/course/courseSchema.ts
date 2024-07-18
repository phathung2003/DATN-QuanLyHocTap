import * as Yup from 'yup';
import CourseMessage from '@/backend/messages/courseMessage';
import CourseCondition from '@/backend/validationSchema/course/courseCondition';

const SchemaCourse = Yup.object().shape({
  //Kiểm tra tên danh mục
  collectionName: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (CourseCondition.COURSE_NAME.MAX > 0) {
      baseSchema = baseSchema.min(
        CourseCondition.COURSE_NAME.MAX,
        CourseMessage.COURSE_NAME.OVER_MAX_CHARACTER,
      );
    }

    if (CourseCondition.COURSE_NAME.REQUIRED) {
      baseSchema = baseSchema.required(CourseMessage.COURSE_NAME.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra lớp học
  collectionGrade: Yup.string()
    .notOneOf(['Default'], CourseMessage.COURSE_GRADE.REQUIRED)
    .required(CourseMessage.COURSE_GRADE.REQUIRED),

  //Kiểm tra môn học
  collectionSubject: Yup.string()
    .notOneOf(['Default'], CourseMessage.COURSE_SUBJECT.REQUIRED)
    .required(CourseMessage.COURSE_SUBJECT.REQUIRED),

  //Kiểm tra mô tả
  collectionDescription: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (CourseCondition.COURSE_DESCRIPTION.MAX > 0) {
      baseSchema = baseSchema.min(
        CourseCondition.COURSE_DESCRIPTION.MAX,
        CourseMessage.COURSE_DESCRIPTION.OVER_MAX_CHARACTER,
      );
    }

    if (CourseCondition.COURSE_DESCRIPTION.REQUIRED) {
      baseSchema = baseSchema.required(
        CourseMessage.COURSE_DESCRIPTION.REQUIRED,
      );
    }
    return baseSchema;
  }),

  //Kiểm tra hình
  collectionImage: Yup.mixed().when([], (isRequired, schema) => {
    let baseSchema = schema.test(
      'fileType',
      CourseMessage.COURSE_IMAGE.WRONG_FILE,
      (value) => {
        if (value && value instanceof File) {
          const fileType = value.type;
          return ['image/jpeg', 'image/jpg', 'image/png'].includes(fileType);
        } else {
          return true;
        }
      },
    );
    if (CourseCondition.COURSE_IMAGE.REQUIRED) {
      baseSchema = baseSchema.required(CourseMessage.COURSE_IMAGE.REQUIRED);
    }
    return baseSchema;
  }),
});

export default SchemaCourse;
