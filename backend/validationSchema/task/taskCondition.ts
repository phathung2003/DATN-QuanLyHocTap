import ITaskCondition from '@/backend/models/validationSchema/ITaskCondition';

//MAX: 0 = No max characters requirement
const TaskCondition: ITaskCondition = {
  TASK_NAME: {
    MAX: 0,
    REQUIRED: true,
  },

  TASK_DESCRIPTION: {
    MAX: 0,
    REQUIRED: false,
  },

  TASK_NO: {
    REQUIRED: true,
  },
};

export default TaskCondition;
