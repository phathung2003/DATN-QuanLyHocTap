import { IFlashcardContent } from '@/backend/models/data/Content/IFlashcard';
import { IFlashcardError } from '@/backend/models/messages/content/IFlashcardMessage';

export function DefaultFlashcardValue(): IFlashcardContent {
  return {
    position: NaN,
    firstSideText: '',
    firstSideImage: null,
    secondSideText: '',
    secondSideImage: null,
  };
}

export function DefaultFlashcardErrorMessage(): IFlashcardError {
  return {
    status: true,
    firstSideImageError: null,
    secondSideImageError: null,
    firstSideMissingContent: null,
    secondSideMissingContent: null,
    systemError: null,
  };
}

export function FlashcardEditDefaultValue(
  data: IFlashcardContent,
): IFlashcardContent {
  return {
    position: data.position,
    firstSideText: data.firstSideText,
    firstSideImage: data.firstSideImage,
    secondSideText: data.secondSideText,
    secondSideImage: data.secondSideImage,
  };
}
