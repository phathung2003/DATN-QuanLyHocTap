'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LogOut() {
  const cookie = cookies().get('token');
  const token = cookie?.value;
  if (!cookie) return true;
  const respone = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/logout`,
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
  if (respone.ok) {
    cookies().delete('token');
    return redirect(`/`);
  }
}
