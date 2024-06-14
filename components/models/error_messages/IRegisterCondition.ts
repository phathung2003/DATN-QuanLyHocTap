export interface IRegisterCondition {
  NAME: {
    MIN: number;
    MAX: number;
    REQUIRED: boolean;
  };

  USERNAME: {
    MIN: number;
    MAX: number;
    REQUIRED: boolean;
  };

  PHONE_NUMBER: {
    LENGTH: number;
    ALLOWED_CHARACTERS: boolean;
    REGEX_HAVE_CHARACTER: RegExp;
    REGEX_NO_CHARACTER: RegExp;
    REQUIRED: boolean;
  };

  EMAIL: {
    REQUIRED: boolean;
  };

  PASSWORD: {
    MIN: number;
    MAX: number;
    REQUIRED: boolean;
  };

  RE_PASSWORD: {
    REQUIRED: boolean;
  };
}

export interface IRegisterErrorMessage {
  SYSTEM_ERROR: string;

  NAME: {
    UNDER_MIN_VALUE: string;
    OVER_MAX_VALUE: string;
    REQUIRED: string;
  };

  USERNAME: {
    UNDER_MIN_VALUE: string;
    OVER_MAX_VALUE: string;
    USERNAME_EXIST: string;
    REQUIRED: string;
  };

  PHONE_NUMBER: {
    UNDER_LENGTH_VALUE: string;
    DONT_ALLOWED_CHARACTERS: string;
    HAVE_BANNED_CHARACTERS: string;
    PHONE_NUMBER_EXIST: string;
    REQUIRED: string;
  };

  EMAIL: {
    WRONG_EMAIL_FORMAT: string;
    EMAIL_EXIST: string;
    REQUIRED: string;
  };

  PASSWORD: {
    UNDER_MIN_VALUE: string;
    OVER_MAX_VALUE: string;
    REQUIRED: string;
  };

  RE_PASSWORD: {
    NO_MATCH: string;
    REQUIRED: string;
  };
}
