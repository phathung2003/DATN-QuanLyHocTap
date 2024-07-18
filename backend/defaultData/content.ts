import { IContentError } from '@/backend/models/messages/IContentMessage';

export const DefaultContentErrorValue: IContentError = {
  status: true,
  courseIDError: null,
  contentUnitIDError: null,
  systemError: null,
};
