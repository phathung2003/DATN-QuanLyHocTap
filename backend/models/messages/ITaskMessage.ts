export interface ITaskMessage {
  TASK_NAME: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };

  TASK_DESCRIPTION: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };

  TASK_NO: {
    NOT_A_NUMBER: string;
    NEGATIVE_NUMBER: string;
    ALREADY_EXIST: string;
    REQUIRED: string;
  };

  TASK_NOT_FOUND: string;

  TASK_ADD_COMPLETED: string;
  TASK_ADD_FAILED: string;

  TASK_EDIT_COMPLETED: string;
  TASK_EDIT_FAILED: string;

  TASK_DELETE_COMPLETED: string;
  TASK_DELETE_FAILED: string;
}

export interface ITaskError {
  status: boolean;
  taskNoError: string | null;
  systemError: string | null;
}
