export default interface IGradeCondition {
  GRADE_NAME: {
    MAX: number;
    REQUIRED: boolean;
  };

  GRADE_DESCRIPTION: {
    MAX: number;
    REQUIRED: boolean;
  };

  GRADE_IMAGE: {
    REQUIRED: boolean;
  };
}
