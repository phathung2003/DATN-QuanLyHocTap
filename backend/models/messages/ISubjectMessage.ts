export interface ISubjectMessage {
  SUBJECT_ID: { ALREADY_EXIST: string };
  SUBJECT_NAME: {
    OVER_MAX_CHARACTER: string;
    ALREADY_EXIST: string;
    REQUIRED: string;
  };
  SUBJECT_DESCRIPTION: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };
  SUBJECT_IMAGE: {
    WRONG_FILE: string;
    REQUIRED: string;
  };

  SUBJECT_EXIST: string;
  SUBJECT_NOT_FOUND: string;

  SUBJECT_ADD_COMPLETED: string;
  SUBJECT_ADD_FAILED: string;

  SUBJECT_EDIT_COMPLETED: string;
  SUBJECT_EDIT_FAILED: string;

  SUBJECT_DELETE_COMPLETED: string;
  SUBJECT_DELETE_FAILED: string;
}

export interface ISubjectError {
  status: boolean;
  subjectIDError: string | null;
  subjectNameError: string | null;
  subjectFileError?: string | null;
  systemError: string | null;
}
