import { Timestamp } from 'firebase/firestore';

export interface IUserRoom {
  userID: string;
  name: string;
  chatRoomID: string;
  lastMessage: string | null;
  lastUpdate: Timestamp;
  isRead: boolean;
}

export interface IUserChatInfo {
  name: string;
  userID: string;
}

export interface IMessage {
  message: string;
  uploadTime: Timestamp;
  isOwnMessage: boolean;
}
