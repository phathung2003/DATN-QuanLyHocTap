export default interface ISubjectCondition {
  SUBJECT_NAME: {
    MAX: number;
    REQUIRED: boolean;
  };

  SUBJECT_DESCRIPTION: {
    MAX: number;
    REQUIRED: boolean;
  };

  SUBJECT_IMAGE: {
    REQUIRED: boolean;
  };
}
