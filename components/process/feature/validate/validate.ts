import { cookies } from 'next/headers';

export async function CookieCheck() {
  // Access cookies from the context
  const cookie = cookies().get('token');
  // Redirect if user is already logged in
  const token = cookie?.value;
  if (!cookie) {
    return true;
  } else {
    const response = await fetch(
      `${process.env.BASE_URL}/api/token/checkToken`,
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
    const errorMessage = await response.json();
    console.log(errorMessage.message);
    if (response.ok) {
      return false;
    } else {
      return true;
    }
  }
}
