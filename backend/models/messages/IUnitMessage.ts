export interface IUnitMessage {
  UNIT_NO: {
    NOT_A_NUMBER: string;
    NEGATIVE_NUMBER: string;
    ALREADY_EXIST: string;
    REQUIRED: string;
  };

  UNIT_NAME: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };

  UNIT_DESCRIPTION: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };

  UNIT_NOT_FOUND: string;

  UNIT_ADD_COMPLETED: string;
  UNIT_ADD_FAILED: string;

  UNIT_EDIT_COMPLETED: string;
  UNIT_EDIT_FAILED: string;

  UNIT_DELETE_COMPLETED: string;
  UNIT_DELETE_FAILED: string;
}

export interface IUnitError {
  status: boolean;
  courseIDError: string | null;
  unitNoError: string | null;
  systemError: string | null;
}
