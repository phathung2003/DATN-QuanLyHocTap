export interface IFlashcard {
  contentType: 'Flashcard';
  contentNo: number;
  content: IFlashcardContent[];
}

export interface IFlashcardContent {
  position: number;
  firstSideText: string;
  firstSideImage: string;
  secondSideText: string;
  secondSideImage: string;
}
