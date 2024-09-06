import { Metadata } from 'next';
import ChildrenManager from '@/app/parent/child/childrenManager';
import { GetUserID } from '@/backend/feature/user/validate';
import { GetChildren } from '@/backend/feature/children';

export const metadata: Metadata = {
  title: 'Quản lý trẻ',
  description: 'Trang quản lý tài khoản của trẻ',
};

export default async function ChildrenManagerPage() {
  const user: string = await GetUserID();
  const children = await GetChildren(user);

  return <ChildrenManager parentUID={user} childrenList={children} />;
}
