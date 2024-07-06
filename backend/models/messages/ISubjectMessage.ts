export interface ISubjectMessage {
  SUBJECT_EXIST: string;
  SUBJECT_ID_EXIST: string;
  SUBJECT_NAME_EXIST: string;
  SUBJECT_ADD_COMPLETE: string;
  SUBJECT_EDIT_NOT_FOUND: string;
  SUBJECT_EDIT_COMPLETE: string;
  SUBJECT_DELETE_COMPLETE: string;
  SYSTEM_ERROR: string;
}

export interface ISubjectError {
  status: boolean;
  subjectIDError: string | null;
  subjectNameError: string | null;
  systemError: string | null;
}
