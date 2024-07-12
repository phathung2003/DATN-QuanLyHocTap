export interface IGradeMessage {
  GRADE_NAME: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };
  GRADE_TYPE: {
    REQUIRED: string;
  };
  GRADE_DESCRIPTION: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };
  GRADE_IMAGE: {
    WRONG_FILE: string;
    REQUIRED: string;
  };
  GRADE_EXIST: string;
  GRADE_ID_EXIST: string;
  GRADE_NAME_EXIST: string;
  GRADE_ADD_COMPLETE: string;
  GRADE_EDIT_NOT_FOUND: string;
  GRADE_EDIT_COMPLETE: string;
  GRADE_DELETE_COMPLETE: string;
  SYSTEM_ERROR: string;
}

export interface IGradeError {
  status: boolean;
  gradeIDError: string | null;
  gradeNameError: string | null;
  systemError: string | null;
}
