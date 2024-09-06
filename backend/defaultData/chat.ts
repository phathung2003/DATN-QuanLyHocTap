import { IUserChatInfo } from '@/backend/models/data/IChat';

export function DefaultUserChatValue(): IUserChatInfo {
  return {
    name: '',
    userID: '',
    isOnline: false,
  };
}
