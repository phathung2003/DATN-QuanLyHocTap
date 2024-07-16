import ICollection from '@/backend/models/data/ICollection';
import { ICollectionError } from '@/backend/models/messages/ICollectionMessage';

export const DefaultCollectionValue: ICollection = {
  collectionAuthorID: '',
  collectionGrade: 'Default',
  collectionSubject: 'Default',
  collectionName: '',
  collectionDescription: '',
  collectionImage: null,
  collectionUploadDate: null,
  collectionLastEditDate: null,
};

export const DefaultCollectionErrorValue: ICollectionError = {
  status: true,
  collectionNameError: null,
  collectionGradeError: null,
  collectionSubjectError: null,
  collectionDescriptionError: null,
  collectionImageError: null,
  systemError: null,
};
