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
    REQUIRED: string;
  };

  TASK_ADD_COMPLETE: string;
  TASK_ADD_FAILED: string;
  TASK_NOT_FOUND: string;
  TASK_EDIT_COMPLETE: string;
  TASK_DELETE_COMPLETE: string;
  SYSTEM_ERROR: string;
}

export interface ITaskError {
  status: boolean;
  taskNoError: string | null;
  systemError: string | null;
}
