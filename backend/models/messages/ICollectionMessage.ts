export interface ICollectionMessage {
  COLLECTION_NAME: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };

  COLLECTION_GRADE: {
    NOT_EXIST: string;
    REQUIRED: string;
  };

  COLLECTION_SUBJECT: {
    NOT_EXIST: string;
    REQUIRED: string;
  };

  COLLECTION_DESCRIPTION: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };

  COLLECTION_IMAGE: {
    WRONG_FILE: string;
    REQUIRED: string;
  };

  COLLECTION_ADD_COMPLETE: string;
  COLLECTION_ADD_FAILED: string;
  COLLECTION_EDIT_NOT_FOUND: string;
  COLLECTION_EDIT_COMPLETE: string;
  COLLECTION_DELETE_COMPLETE: string;

  SYSTEM_ERROR: string;
}

export interface ICollectionError {
  status: boolean;
  collectionNameError: string | null;
  collectionGradeError: string | null;
  collectionSubjectError: string | null;
  collectionDescriptionError: string | null;
  collectionImageError: string | null;
  systemError: string | null;
}
