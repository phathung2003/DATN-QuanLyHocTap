import { IContentError } from '@/backend/models/messages/IContentMessage';

export const DefaultContentErrorValue: IContentError = {
  status: true,
  contentNoError: null,
  contentPositionError: null,
  systemError: null,
};
