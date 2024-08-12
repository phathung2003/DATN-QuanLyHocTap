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

  CONTENT_NAME: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };

  CONTENT_DESCRIPTION: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };

  CONTENT_NOT_FOUND: string;

  CONTENT_ADD_COMPLETED: string;
  CONTENT_ADD_FAILED: string;

  CONTENT_EDIT_COMPLETED: string;
  CONTENT_EDIT_FAILED: string;

  CONTENT_DELETE_COMPLETED: string;
  CONTENT_DELETE_FAILED: string;
}

export interface IContentError {
  status: boolean;
  contentNoError: string | null;
  contentPositionError: string | null;
  systemError: string | null;
}
