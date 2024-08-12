import { ILogin } from '@/backend/models/data/ILogin';
import { AdminPage } from '@/backend/routers';
import SystemMessage from '@/backend/messages/systemMessage';

export async function handelSubmit(
  data: ILogin,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          info: data.info,
          password: data.password,
        }),
      },
    );
    if (response.ok) {
      return AdminPage();
    }
    const errorMessage = await response.json();
    setErrorMessage(errorMessage.message);
  } catch {
    setErrorMessage(SystemMessage.SYSTEM_ERROR);
  }
}
