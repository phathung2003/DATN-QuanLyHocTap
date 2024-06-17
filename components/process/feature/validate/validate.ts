import { cookies } from 'next/headers';

export async function CookieCheck() {
  // Access cookies from the context
  const hadLogin = cookies().get('token');
  // Redirect if user is already logged in
  console.log(hadLogin);
  if (hadLogin != undefined) {
    return false;
  } else {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokenID: hadLogin,
      }),
    });
    const errorMessage = await response.json();
    console.log(errorMessage);
    if (response.ok) {
      return false;
    } else {
      return true;
    }
  }
}
