import { ICalculateTwoNumbersContent } from '@/backend/models/data/Content/ICalculateTwoNumbers';
import { ICardContent } from '@/backend/models/data/Content/ICard';
import { IFlashcardContent } from '@/backend/models/data/Content/IFlashcard';

export default interface IContent {
  contentID?: string;
  contentNo: number;
  contentName: string;
  contentDescription: string;
  contentType: string;
  contentData: ICalculateTwoNumbersContent | ICardContent | IFlashcardContent;
  contentCreateAt?: Date;
  contentLastEditDate?: Date | null;
}
