/* eslint-disable */
export enum Status {
  NOT_FOUND = 'NOT_FOUND',
  SYSTEM_ERROR = 'SYSTEM_ERROR',
}

export enum TableName {
  CHAT = 'chatroom',
  MESSAGE = 'message',
  TASK = 'task',
  COURSE = 'course',
  UNIT = 'unit',
  CONTENT = 'content',
  GRADE = 'grade',
  SUBJECT = 'subject',
  USER = 'user',
  SESSION = 'session',
}

export enum ContentType {
  FLASHCARD = 'FLASHCARD',
  CALCULATE_TWO_NUMBER = 'CALCULATE_TWO_NUMBER',
  CARD = 'CARD',
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
