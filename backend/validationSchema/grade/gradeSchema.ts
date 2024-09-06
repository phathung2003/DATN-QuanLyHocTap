import * as Yup from 'yup';
import GradeMessage from '@/backend/messages/gradeMessage';
import GradeCondition from '@/backend/validationSchema/grade/gradeCondition';

const SchemaGrade = Yup.object().shape({
  //Kiểm tra tên loại
  gradeName: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (GradeCondition.GRADE_NAME.MAX > 0) {
      baseSchema = baseSchema.min(
        GradeCondition.GRADE_NAME.MAX,
        GradeMessage.GRADE_NAME.OVER_MAX_CHARACTER,
      );
    }

    if (GradeCondition.GRADE_NAME.REQUIRED) {
      baseSchema = baseSchema.required(GradeMessage.GRADE_NAME.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra mô tả
  gradeDescription: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (GradeCondition.GRADE_DESCRIPTION.MAX > 0) {
      baseSchema = baseSchema.min(
        GradeCondition.GRADE_DESCRIPTION.MAX,
        GradeMessage.GRADE_DESCRIPTION.OVER_MAX_CHARACTER,
      );
    }

    if (GradeCondition.GRADE_DESCRIPTION.REQUIRED) {
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
    if (GradeCondition.GRADE_IMAGE.REQUIRED) {
      baseSchema = baseSchema.required(GradeMessage.GRADE_IMAGE.REQUIRED);
    }
    return baseSchema;
  }),
});

export default SchemaGrade;
