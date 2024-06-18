import { SessionErrorMessage } from '@/components/process/feature/validate/validateErrorMessage';
import { DeleteToken } from '@/app/api/checkToken/deleteToken';

//Đăng xuất
export async function POST(request: Request) {
  const data = await request.json();
  const { tokenID } = data;
  return DeleteToken(tokenID, SessionErrorMessage.LOG_OUT, 204);
}
