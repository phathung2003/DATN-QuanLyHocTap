export default interface ISubjectCondition {
  TASK_NAME: {
    MAX: number;
    REQUIRED: boolean;
  };

  TASK_DESCRIPTION: {
    MAX: number;
    REQUIRED: boolean;
  };

  TASK_NO: {
    REQUIRED: boolean;
  };
}
