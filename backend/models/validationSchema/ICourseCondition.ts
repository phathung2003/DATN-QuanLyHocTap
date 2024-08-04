export default interface ICourseCondition {
  COURSE_NAME: {
    MAX: number;
    REQUIRED: boolean;
  };

  COURSE_GRADE: {
    REQUIRED: boolean;
  };

  COURSE_SUBJECT: {
    REQUIRED: boolean;
  };

  COURSE_DESCRIPTION: {
    MAX: number;
    REQUIRED: boolean;
  };

  COURSE_IMAGE: {
    REQUIRED: boolean;
  };
}
