import { CheckSession, GetUserIDFromSession } from '@/backend/database/session';
import SessionMessage from '@/backend/messages/sessionMessage';
import { DeleteToken } from '@/app/api/user/checkToken/deleteToken';

export async function CheckDataInputNeedLogin(
  request: Request,
  notNullVariable: string[] | null,
  canNullVariable: string[] | null,
) {
  //Phiên đăng nhập
  const tokenID = request.headers.get('Authorization');
  if (!tokenID) {
    return false;
  }

  const dataInput = await request.json();
  //Các trường có thể null
  if (!CheckVariable(canNullVariable, dataInput, false)) {
    return false;
  }

  //Các trường không được null
  if (!CheckVariable(notNullVariable, dataInput, true)) {
    return false;
  }

  return { token: tokenID, data: dataInput };
}

export async function CheckToken(tokenID: string) {
  const result = await CheckSession(tokenID);
  if (result.status === false) {
    const errorCode =
      result.message === SessionMessage.SYSTEM_ERROR ? 404 : 401;
    return DeleteToken(tokenID, result.message, errorCode);
  }
  return true;
}

export async function GetUserID(tokenID: string) {
  const result = await GetUserIDFromSession(tokenID);
  if (typeof result != 'string') {
    const errorCode =
      result.message === SessionMessage.SYSTEM_ERROR ? 404 : 401;
    return DeleteToken(tokenID, result.message, errorCode);
  }
  return result;
}

//Nội bộ
function CheckVariable(
  variable: string[] | null,
  dataInput,
  nullable: boolean,
) {
  if (!variable) {
    return true;
  }

  for (const field of variable) {
    if (!(field in dataInput)) {
      return false;
    }
    //Kiểm tra các trường không được phép null
    if (nullable === true && !dataInput[field]) {
      return false;
    }
  }

  return true;
}

export function CheckDataInputTrueFalse(
  dataInput,
  notNullVariable: string[] | null,
  canNullVariable: string[] | null,
): boolean {
  //Các trường có thể null

  if (!CheckVariable(canNullVariable, dataInput, false)) {
    return false;
  }

  //Các trường không được null
  if (!CheckVariable(notNullVariable, dataInput, true)) {
    return false;
  }
  return true;
}

export function LoginSession(request): string | false {
  const tokenID = request.headers.get('Authorization');
  if (!tokenID) {
    return false;
  }
  return tokenID;
}
