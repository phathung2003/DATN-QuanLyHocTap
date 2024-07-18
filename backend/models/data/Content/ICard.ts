export interface ICard {
  contentType: 'Card';
  content: ICardContent[];
}

export interface ICardContent {
  position: number;
  image: string;
  text: string;
}
