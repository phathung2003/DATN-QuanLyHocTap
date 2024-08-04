export interface ICard {
  contentType: 'Card';
  contentNo: number;
  content: ICardContent[];
}

export interface ICardContent {
  position: number;
  image: string;
  text: string;
}
