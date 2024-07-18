export interface IUnitMessage {
  UNIT_NAME: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };

  UNIT_DESCRIPTION: {
    OVER_MAX_CHARACTER: string;
    REQUIRED: string;
  };

  COURSE_NOT_FOUND: string;
  UNIT_ADD_COMPLETE: string;
  UNIT_ADD_FAILED: string;
  UNIT_EDIT_NOT_FOUND: string;
  UNIT_EDIT_COMPLETE: string;
  UNIT_DELETE_COMPLETE: string;

  SYSTEM_ERROR: string;
}

export interface IUnitError {
  status: boolean;
  courseIDError: string | null;
  unitNameError: string | null;
  unitDescriptionError: string | null;
  systemError: string | null;
}