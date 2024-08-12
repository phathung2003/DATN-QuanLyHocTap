export interface IFlashcard {
  contentType: 'Flashcard';
  contentNo: number;
  content: IFlashcardContent[];
}

export interface IFlashcardContent {
  position: number;
  firstSideText: string;
  firstSideImage: string | null;
  firstSideFile?: File;
  secondSideText: string;
  secondSideImage: string | null;
  secondSideFile?: File;
}
