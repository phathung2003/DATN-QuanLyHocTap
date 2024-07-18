export interface IContentMessage {
  CONTENT_TYPE: {
    REQUIRED: string;
  };

  CONTENT_TASKNO: {
    REQUIRED: string;
  };

  COURSE_NOT_FOUND: string;
  UNIT_NOT_FOUND: string;
  CONTENT_ADD_COMPLETE: string;
  CONTENT_ADD_FAILED: string;
  CONTENT_EDIT_COMPLETE: string;
  CONTENT_DELETE_COMPLETE: string;

  SYSTEM_ERROR: string;
}

export interface IContentError {
  status: boolean;
  courseIDError: string | null;
  contentUnitIDError: string | null;
  systemError: string | null;
}
