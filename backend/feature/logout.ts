import { signOut } from 'next-auth/react';
import { HomePage } from '@/backend/routers';

export async function LogOut() {
  await signOut({ redirect: false, callbackUrl: '/' });
  HomePage();
}
