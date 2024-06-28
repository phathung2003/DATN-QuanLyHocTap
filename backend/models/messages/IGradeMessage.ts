export interface IGradeMessage {
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
