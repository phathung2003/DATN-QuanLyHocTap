import { ICardContent } from '@/backend/models/data/Content/ICard';
import { ICardError } from '@/backend/models/messages/content/ICardMessage';

export function DefaultCardValue(): ICardContent {
  return {
    position: NaN,
    text: '',
    image: null,
  };
}

export function DefaultCardErrorMessage(): ICardError {
  return {
    status: true,
    imageError: null,
    missingContent: null,
    systemError: null,
  };
}

export function CardEditDefaultValue(data: ICardContent): ICardContent {
  return {
    position: data.position,
    text: data.text,
    image: data.image,
  };
}
