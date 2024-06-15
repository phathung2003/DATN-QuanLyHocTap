export interface ISession {
  tokenID: string;
  accountID: string;
  expiresAt: Date;
  createAt: Date;
}

export interface IError {
  status: boolean;
  message: string | null;
}
