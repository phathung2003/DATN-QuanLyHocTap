import ICollection from '@/backend/models/data/ICollection';

export default function CollectionData(dataInput): ICollection | null {
  try {
    const data: ICollection = {
      collectionAuthorID: '',
      collectionGrade: dataInput.collectionGrade,
      collectionSubject: dataInput.collectionSubject,
      collectionName: dataInput.collectionName,
      collectionDescription: dataInput.collectionDescription,
      collectionImage: dataInput.collectionImage,
    };
    return data;
  } catch {
    return null;
  }
}
