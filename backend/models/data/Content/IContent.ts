import { ICalculateTwoNumbers } from '@/backend/models/data/Content/ICalculateTwoNumbers';
import { ICard } from '@/backend/models/data/Content/ICard';
import { IFlashcard } from '@/backend/models/data/Content/IFlashcard';

export default interface IContent {
  taskNo: number;
  taskName: string;
  taskDescription: string;
  content: ICalculateTwoNumbers[] | ICard[] | IFlashcard[];
}
