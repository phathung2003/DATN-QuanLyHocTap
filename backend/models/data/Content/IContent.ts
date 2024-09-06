import { ICalculateTwoNumbersContent } from '@/backend/models/data/Content/ICalculateTwoNumbers';
import { ICardContent } from '@/backend/models/data/Content/ICard';
import { IFlashcardContent } from '@/backend/models/data/Content/IFlashcard';

export interface IContent {
  contentID?: string;
  contentNo: number;
  contentName: string;
  contentDescription: string;
  contentType: string;
  contentData:
    | ICalculateTwoNumbersContent
    | ICardContent
    | IFlashcardContent
    | null;
  contentCreateAt?: Date;
  contentLastEditDate?: Date | null;
}
export interface IContentList {
  contentID?: string;
  contentNo: number;
  contentName: string;
  contentDescription: string;
  contentType: string;
  contentData:
    | ICalculateTwoNumbersContent[]
    | ICardContent[]
    | IFlashcardContent[]
    | null;
  contentCreateAt?: Date;
  contentLastEditDate?: Date | null;
}

export interface IContentCourseList {
  courseID?: string;
  unitID?: string;
  unitName: string;
  unitNo: number;
  unitDescription: string | null;
  unitUploadDate?: Date | null;
  unitLastEditDate?: Date | null;
  task: IContentTaskList[];
}

export interface IContentTaskList {
  taskID?: string;
  taskNo: number;
  taskName: string;
  taskDescription: string;
  taskUploadDate?: Date;
  taskLastEditDate?: Date | null;
  content: IContentList;
}
