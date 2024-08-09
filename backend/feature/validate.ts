'use server';
import { cookies } from 'next/headers';
import SessionMessage from '@/backend/messages/sessionMessage';

export async function CookieCheck() {
  //Lấy cookie = True: Cho vào trang | False: Cho chuyển trang
  const response = await PostAPI();
  if (response == true) return true;
  return !response.ok;
}

export async function CookieGetInfo() {
  const response = await PostAPI();
  if (response == true) return null;
  if (response.ok) {
    const info = await response.json();
    return info.userInfo;
  }
  return null;
}

export async function GetToken() {
  const cookie = cookies().get('token');
  const token = cookie?.value;
  if (!cookie) {
    return { message: SessionMessage.INVALID_TOKEN };
  }
  return await PostAPICheckSession(token);
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tokenID: token,
      }),
    },
  );
}

async function PostAPICheckSession(cookie: string | undefined) {
  if (!cookie) {
    return { message: SessionMessage.INVALID_TOKEN };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/checkToken`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tokenID: cookie,
      }),
    },
  );

  if (response.ok) {
    return cookie;
  }

  const info = await response.json();
  return { message: info.message };
}
