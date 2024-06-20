import { cookies } from 'next/headers';

export async function CookieCheck() {
  //Lấy cookie
  const cookie = cookies().get('token');
  const token = cookie?.value;
  if (!cookie) {
    return true;
  } else {
    const response = await fetch(
      `${process.env.BASE_URL}/api/authentication/token/checkToken`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenID: token,
        }),
      },
    );
    if (response.ok) {
      return false;
    } else {
      return true;
    }
  }
}
