import { IFlashcardMessage } from '@/backend/models/messages/content/IFlashcardMessage';
import FlashcardCondition from '@/backend/validationSchema/content/flashcard/flashcardCondition';

const FlashcardMessage: IFlashcardMessage = {
  FIRST_SIDE_TEXT: {
    REQUIRED: 'Xin hãy nhập từ mặt trước',
    OVER_MAX_CHARACTER: `Từ dài quá ${FlashcardCondition.FIRST_SIDE_TEXT.MAX} ký tự`,
  },

  FIRST_SIDE_IMAGE: {
    WRONG_FILE: 'Tệp phải là hình ảnh (jpeg, jpg, png, gif).',
    REQUIRED: 'Xin hãy tải hình mặt trước',
  },

  SECOND_SIDE_TEXT: {
    OVER_MAX_CHARACTER: `Từ dài quá ${FlashcardCondition.SECOND_SIDE_TEXT.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập từ mặt sau',
  },

  SECOND_SIDE_IMAGE: {
    WRONG_FILE: 'Tệp phải là hình ảnh (jpeg, jpg, png, gif).',
    REQUIRED: 'Xin hãy tải hình mặt sau',
  },

  MISING_BOTH_INFO: 'Có ít nhất 1 trường dữ liệu được nhập',
};

export default FlashcardMessage;
