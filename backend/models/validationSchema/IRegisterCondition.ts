export default interface IRegisterCondition {
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
