export default interface ICategoryCondition {
  CATEGORY_NAME: {
    MAX: number;
    REQUIRED: boolean;
  };

  CATEGORY_DESCRIPTION: {
    MAX: number;
    REQUIRED: boolean;
  };

  CATEGORY_IMAGE: {
    REQUIRED: boolean;
  };
}
