import { Timestamp } from 'firebase/firestore';

export interface IUserRoom {
  userID: string;
  name: string;
  chatRoomID: string;
  lastMessage: string | null;
  lastUpdate: Timestamp;
  isRead: boolean;
  isOnline: boolean;
}

export interface IUserChatInfo {
  name: string;
  userID: string;
  isOnline: boolean;
  last_Login?: number;
}

export interface IMessage {
  message: string;
  uploadTime: Timestamp;
  isOwnMessage: boolean;
}
