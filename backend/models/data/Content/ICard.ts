export interface ICard {
  contentType: 'Card';
  contentNo: number;
  content: ICardContent[];
}

export interface ICardContent {
  position: number;
  text: string;
  image: string | null;
  file?: File;
}
