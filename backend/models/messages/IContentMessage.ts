export interface IContentMessage {
  CONTENT_TYPE: {
    REQUIRED: string;
    NOT_EXIST: string;
  };

  CONTENT_NO: {
    NOT_A_NUMBER: string;
    NEGATIVE_NUMBER: string;
    ALREADY_EXIST: string;
    REQUIRED: string;
  };

  CONTENT_POSITION: {
    NOT_A_NUMBER: string;
    NEGATIVE_NUMBER: string;
    ALREADY_EXIST: string;
    REQUIRED: string;
  };

  CONTENT_NOT_FOUND: string;

  CONTENT_ADD_COMPLETE: string;
  CONTENT_ADD_FAILED: string;

  CONTENT_EDIT_COMPLETE: string;
  CONTENT_EDIT_FAILED: string;

  CONTENT_DELETE_COMPLETE: string;

  SYSTEM_ERROR: string;
}

export interface IContentError {
  status: boolean;
  contentNoError: string | null;
  contentPositionError: string | null;
  systemError: string | null;
}
