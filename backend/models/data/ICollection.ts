export default interface ICategory {
  collectionAuthor: string;
  collectionGrade: string;
  collectionSubject: string;
  collectionName: string;
  collectionDescription: string | null;
  collectionImage?: File | string;
  collectionUploadDate: Date | null;
  collectionLastDate: Date | null;
}
