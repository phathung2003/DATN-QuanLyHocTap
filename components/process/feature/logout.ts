import { signOut } from 'next-auth/react';
import { HomePage } from '@/components/process/routers/routers';

export async function LogOut() {
  await signOut({ redirect: false, callbackUrl: '/' });
  HomePage();
}
