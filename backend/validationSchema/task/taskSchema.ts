import * as Yup from 'yup';
import TaskMessage from '@/backend/messages/taskMessage';
import TaskCondition from '@/backend/validationSchema/task/taskCondition';

const SchemaTask = Yup.object().shape({
  //Kiểm tra số bài
  taskNo: Yup.number().when([], (isRequired, schema) => {
    let baseSchema = schema;
    baseSchema = baseSchema
      .typeError(TaskMessage.TASK_NO.NOT_A_NUMBER)
      .positive(TaskMessage.TASK_NO.NEGATIVE_NUMBER);

    if (TaskCondition.TASK_NO.REQUIRED) {
      baseSchema = baseSchema.required(TaskMessage.TASK_NO.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra tên danh mục
  taskName: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (TaskCondition.TASK_NAME.MAX > 0) {
      baseSchema = baseSchema.max(
        TaskCondition.TASK_NAME.MAX,
        TaskMessage.TASK_NAME.OVER_MAX_CHARACTER,
      );
    }

    if (TaskCondition.TASK_NAME.REQUIRED) {
      baseSchema = baseSchema.required(TaskMessage.TASK_NAME.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra mô tả
  taskDescription: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (TaskCondition.TASK_DESCRIPTION.MAX > 0) {
      baseSchema = baseSchema.min(
        TaskCondition.TASK_DESCRIPTION.MAX,
        TaskMessage.TASK_DESCRIPTION.OVER_MAX_CHARACTER,
      );
    }

    if (TaskCondition.TASK_DESCRIPTION.REQUIRED === true) {
      baseSchema = baseSchema.required(TaskMessage.TASK_DESCRIPTION.REQUIRED);
    }
    return baseSchema;
  }),
});

export default SchemaTask;
