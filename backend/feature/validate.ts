import { cookies } from 'next/headers';

export async function CookieCheck() {
  //Lấy cookie = True: Cho vào trang | False: Cho chuyển trang
  const response = await PostAPI();
  if (response == true) return true;
  if (response.ok) {
    return false;
  } else {
    return true;
  }
}

export async function CookieGetInfo() {
  const response = await PostAPI();
  if (response == true) return null;
  if (response.ok) {
    const info = await response.json();
    return info.userInfo;
  } else {
    return null;
  }
}

async function PostAPI() {
  const cookie = cookies().get('token');
  const token = cookie?.value;
  if (!cookie) {
    return true;
  }
  return await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/checkToken`,
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
}
