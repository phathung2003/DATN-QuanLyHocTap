import { IContentError } from '@/backend/models/messages/IContentMessage';

export function DefaultContentErrorValue(): IContentError {
  return {
    status: true,
    contentNoError: null,
    contentPositionError: null,
    systemError: null,
  };
}
