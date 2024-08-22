'use server';
import { cookies } from 'next/headers';
import { Role } from '@/backend/globalVariable';
import { HomePage, UserPage } from '@/backend/routers';
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

export async function GetUserID() {
  //Kiểm tra phiên đăng nhập
  const token = await CookieGetInfo();
  if (token === null) {
    return await HomePage();
  }

  //Tạo phòng chat
  return token.accountID;
}

//Kiểm tra có phải là Admin không
export async function CheckIsAdmin() {
  const info = await CookieGetInfo();

  if (info === null) {
    return await HomePage();
  } else if (info.role != Role.ADMIN) {
    switch (info.role) {
      case Role.USER:
        return await UserPage();
      default:
        return await LogOut();
    }
  } else {
    return info;
  }
}

//Kiểm tra có phải là User không không
export async function CheckIsUser() {
  const info = await CookieGetInfo();
  if (info === null) {
    return await HomePage();
  }
  return info;
}

//Đăng xuất
export async function LogOut() {
  const cookie = cookies().get('token');
  const token = cookie?.value;
  if (!cookie) return true;
  const respone = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/logout`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tokenID: token,
      }),
    },
  );
  if (respone.ok) {
    cookies().delete('token');
    return await HomePage();
  }
}
