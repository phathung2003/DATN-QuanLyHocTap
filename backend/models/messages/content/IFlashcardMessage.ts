export interface IFlashcardMessage {
  FIRST_SIDE_TEXT: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };

  FIRST_SIDE_IMAGE: {
    WRONG_FILE: string;
    REQUIRED: string;
  };

  SECOND_SIDE_TEXT: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };

  SECOND_SIDE_IMAGE: {
    WRONG_FILE: string;
    REQUIRED: string;
  };

  MISING_BOTH_INFO: string;
}

export interface IFlashcardError {
  status: boolean;
  firstSideImageError: string | null;
  secondSideImageError: string | null;
  firstSideMissingContent: string | null;
  secondSideMissingContent: string | null;
  systemError: string | null;
}
