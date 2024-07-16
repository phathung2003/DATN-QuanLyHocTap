export default interface ICategory {
  collectionID?: string;
  collectionAuthor?: string;
  collectionAuthorID: string;
  collectionGrade: string;
  collectionSubject: string;
  collectionName: string;
  collectionDescription: string | null;
  collectionImage: string | null;
  collectionFile?: File | string;
  collectionUploadDate?: Date | null;
  collectionLastEditDate?: Date | null;
}
