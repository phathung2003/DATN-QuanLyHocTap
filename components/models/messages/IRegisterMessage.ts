export interface IRegisterMessage {
  SYSTEM_ERROR: string;
  ACCOUNT_EXIST: string;
  REGISTER_COMPLETE: string;
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

export interface IRegisterError {
  status: boolean;
  usernameError: string | null;
  phoneNumberError: string | null;
  emailError: string | null;
  systemError: string | null;
}
