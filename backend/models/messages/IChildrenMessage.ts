export interface IChildrenMessage {
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

  PASSWORD: {
    UNDER_MIN_VALUE: string;
    OVER_MAX_VALUE: string;
    REQUIRED: string;
  };

  RE_PASSWORD: {
    NO_MATCH: string;
    REQUIRED: string;
  };

  ACCOUNT_EXIST: string;

  REGISTER_COMPLETED: string;
  REGISTER_FAILED: string;
}
