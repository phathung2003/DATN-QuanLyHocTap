export interface ISessionMessage {
  INVALID_TOKEN: string;
  SESSION_TIME_OUT: string;
  INFO_NOT_FOUND: string;
  VALID_TOKEN: string;
  SYSTEM_ERROR: string;
  LOG_OUT: string;
}

export interface ISessionError {
  status: boolean;
  message: string | null;
}
