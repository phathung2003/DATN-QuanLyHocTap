export interface ICourseMessage {
  COURSE_NAME: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };

  COURSE_GRADE: {
    NOT_EXIST: string;
    REQUIRED: string;
  };

  COURSE_SUBJECT: {
    NOT_EXIST: string;
    REQUIRED: string;
  };

  COURSE_DESCRIPTION: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };

  COURSE_IMAGE: {
    WRONG_FILE: string;
    REQUIRED: string;
  };

  COURSE_ADD_COMPLETE: string;
  COURSE_ADD_FAILED: string;
  COURSE_EDIT_NOT_FOUND: string;
  COURSE_EDIT_COMPLETE: string;
  COURSE_DELETE_COMPLETE: string;

  SYSTEM_ERROR: string;
}

export interface ICourseError {
  status: boolean;
  courseNameError: string | null;
  courseGradeError: string | null;
  courseSubjectError: string | null;
  courseDescriptionError: string | null;
  courseImageError: string | null;
  courseFileError?: string | null;
  systemError: string | null;
}
