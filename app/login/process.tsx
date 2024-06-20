import { ILogin } from '@/backend/models/data/ILogin';
import { HomePage } from '@/backend/routers';
import LoginMessage from '@/backend/messages/loginMessage';

export async function handelSubmit(
  data: ILogin,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
) {
  console.log('Hi');
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          info: data.info,
          password: data.password,
        }),
      },
    );

    //const errorMessage = await response.json();
    if (response.ok) {
      return HomePage();
    }
    const errorMessage = await response.json();
    console.log(errorMessage);
    setErrorMessage(errorMessage.message);
  } catch (e) {
    console.log(e);
    setErrorMessage(LoginMessage.SYSTEM_ERROR);
  }
}
