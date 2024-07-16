import { IContentError } from '@/backend/models/messages/IContentMessage';

export const DefaultContentErrorValue: IContentError = {
  status: true,
  contentCollectionIDError: null,
  contentUnitIDError: null,
  systemError: null,
};
