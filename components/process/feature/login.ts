import { ILogin } from '@/components/models/data/ILogin';
import { HomePage } from '@/components/process/routers/routers';

export async function handelSubmit(
  data: ILogin,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
) {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        info: data.info,
        password: data.password,
      }),
    });

    //const errorMessage = await response.json();
    if (response.ok) {
      HomePage();
    } else {
      const errorMessage = await response.json();
      setErrorMessage(errorMessage.message);
    }
  } catch (error) {
    setErrorMessage('Hi');
  }
}
