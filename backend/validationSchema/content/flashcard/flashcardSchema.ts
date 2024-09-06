import * as Yup from 'yup';
import FlashcardMessage from '@/backend/messages/content/flashcardMessage';
import FlashcardCondition from '@/backend/validationSchema/content/flashcard/flashcardCondition';

const SchemaFlashcard = Yup.object().shape({
  //Kiểm tra chữ mặt trên
  firstSideText: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (FlashcardCondition.FIRST_SIDE_TEXT.MAX > 0) {
      baseSchema = baseSchema.max(
        FlashcardCondition.FIRST_SIDE_TEXT.MAX,
        FlashcardMessage.FIRST_SIDE_TEXT.OVER_MAX_CHARACTER,
      );
    }

    if (FlashcardCondition.FIRST_SIDE_TEXT.REQUIRED) {
      baseSchema = baseSchema.required(
        FlashcardMessage.FIRST_SIDE_TEXT.REQUIRED,
      );
    }
    return baseSchema;
  }),

  //Kiểm tra hình mặt trên
  firstSideFile: Yup.mixed().when([], (isRequired, schema) => {
    let baseSchema = schema.test(
      'fileType',
      FlashcardMessage.FIRST_SIDE_IMAGE.WRONG_FILE,
      (value) => {
        if (value && value instanceof File) {
          const fileType = value.type;
          return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(
            fileType,
          );
        } else {
          return true;
        }
      },
    );
    if (FlashcardCondition.FIRST_SIDE_IMAGE.REQUIRED) {
      baseSchema = baseSchema.required(
        FlashcardMessage.FIRST_SIDE_IMAGE.REQUIRED,
      );
    }
    return baseSchema;
  }),

  //Kiểm tra chữ mặt trên
  secondSideText: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;

    if (FlashcardCondition.SECOND_SIDE_TEXT.MAX > 0) {
      baseSchema = baseSchema.max(
        FlashcardCondition.SECOND_SIDE_TEXT.MAX,
        FlashcardMessage.SECOND_SIDE_TEXT.OVER_MAX_CHARACTER,
      );
    }

    if (FlashcardCondition.SECOND_SIDE_TEXT.REQUIRED) {
      baseSchema = baseSchema.required(
        FlashcardMessage.SECOND_SIDE_TEXT.REQUIRED,
      );
    }
    return baseSchema;
  }),

  //Kiểm tra hình mặt sau
  secondSideFile: Yup.mixed().when([], (isRequired, schema) => {
    let baseSchema = schema.test(
      'fileType',
      FlashcardMessage.SECOND_SIDE_IMAGE.WRONG_FILE,
      (value) => {
        if (value && value instanceof File) {
          const fileType = value.type;
          return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(
            fileType,
          );
        } else {
          return true;
        }
      },
    );
    if (FlashcardCondition.SECOND_SIDE_IMAGE.REQUIRED) {
      baseSchema = baseSchema.required(
        FlashcardMessage.SECOND_SIDE_IMAGE.REQUIRED,
      );
    }
    return baseSchema;
  }),
});

export default SchemaFlashcard;
