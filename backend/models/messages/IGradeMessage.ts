export interface IGradeMessage {
  GRADE_ID: {
    ALREADY_EXIST: string;
  };

  GRADE_NAME: {
    OVER_MAX_CHARACTER: string;
    ALREADY_EXIST: string;
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
  GRADE_NOT_FOUND: string;

  GRADE_ADD_COMPLETED: string;
  GRADE_ADD_FAILED: string;

  GRADE_EDIT_COMPLETED: string;
  GRADE_EDIT_FAILED: string;

  GRADE_DELETE_COMPLETED: string;
  GRADE_DELETE_FAILED: string;
}

export interface IGradeError {
  status: boolean;
  gradeIDError: string | null;
  gradeNameError: string | null;
  gradeImageError: string | null;
  gradeFileError?: string | null;
  systemError: string | null;
}
