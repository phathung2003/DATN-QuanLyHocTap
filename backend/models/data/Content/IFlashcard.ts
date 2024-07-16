export interface IFlashcard {
  contentType: 'Flashcard';
  content: IFlashcardContent[];
}

export interface IFlashcardContent {
  position: number;
  firstSideText: string;
  firstSideImage: string;
  secondSideText: string;
  secondSideImage: string;
}
