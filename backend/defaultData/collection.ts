import ICollection from '@/backend/models/data/ICollection';
import { ICollectionError } from '@/backend/models/messages/ICollectionMessage';

export const DefaultCollectionValue: ICollection = {
  collectionAuthor: '',
  collectionGrade: 'Default',
  collectionSubject: 'Default',
  collectionName: '',
  collectionDescription: '',
  collectionUploadDate: null,
  collectionLastDate: null,
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
