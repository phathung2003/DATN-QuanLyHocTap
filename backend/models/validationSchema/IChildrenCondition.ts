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

  PASSWORD: {
    MIN: number;
    MAX: number;
    REQUIRED: boolean;
  };

  RE_PASSWORD: {
    REQUIRED: boolean;
  };
}
