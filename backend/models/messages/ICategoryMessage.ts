export interface ICategoryMessage {
  CATEGORY_EXIST: string;
  CATEGORY_ID_EXIST: string;
  CATEGORY_NAME_EXIST: string;
  CATEGORY_ADD_COMPLETE: string;
  SYSTEM_ERROR: string;
}

export interface ICategoryError {
  status: boolean;
  categoryIDError: string | null;
  categoryNameError: string | null;
  systemError: string | null;
}
