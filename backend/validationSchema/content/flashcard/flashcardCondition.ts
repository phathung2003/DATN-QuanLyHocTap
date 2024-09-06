import IFlashcardCondition from '@/backend/models/validationSchema/content/IFlashcardCondition';

//MAX: 0 = No max characters requirement
const FlashcardCondition: IFlashcardCondition = {
  FIRST_SIDE_TEXT: {
    MAX: 0,
    REQUIRED: false,
  },

  FIRST_SIDE_IMAGE: {
    REQUIRED: false,
  },

  SECOND_SIDE_TEXT: {
    MAX: 0,
    REQUIRED: false,
  },

  SECOND_SIDE_IMAGE: {
    REQUIRED: false,
  },
};

export default FlashcardCondition;
