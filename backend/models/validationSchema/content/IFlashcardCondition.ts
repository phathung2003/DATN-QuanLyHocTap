export default interface IFlashcardCondition {
  FIRST_SIDE_TEXT: {
    MAX: number;
    REQUIRED: boolean;
  };

  FIRST_SIDE_IMAGE: {
    REQUIRED: boolean;
  };

  SECOND_SIDE_TEXT: {
    MAX: number;
    REQUIRED: boolean;
  };

  SECOND_SIDE_IMAGE: {
    REQUIRED: boolean;
  };
}
