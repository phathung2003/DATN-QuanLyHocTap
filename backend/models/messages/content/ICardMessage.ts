export interface ICardMessage {
  TEXT: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };

  IMAGE: {
    WRONG_FILE: string;
    REQUIRED: string;
  };

  MISING_BOTH_INFO: string;
}

export interface ICardError {
  status: boolean;
  imageError: string | null;
  missingContent: string | null;
  systemError: string | null;
}
