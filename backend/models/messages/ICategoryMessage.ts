export interface ICategoryMessage {
  CATEGORY_NAME: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };
  CATEGORY_TYPE: {
    REQUIRED: string;
  };
  CATEGORY_DESCRIPTION: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };
  CATEGORY_IMAGE: {
    WRONG_FILE: string;
    REQUIRED: string;
  };
  SYSTEM_ERROR: string;
}

export interface ICategoryError {
  status: boolean;
  categoryNameError: string | null;
  categoryImageError: string | null;
  systemError: string | null;
}
