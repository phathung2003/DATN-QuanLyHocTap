/*eslint-disable */
import { Metadata } from 'next';
import TrangChuPH from '@/components/page/parent/TrangChuPH';
import { GetUserID } from '@/backend/feature/user/validate';
import { GetChildren } from '@/backend/feature/children';
import { GetAssignmentList } from '@/backend/feature/assignment';

export const metadata: Metadata = {
  title: 'Trang chủ',
  description: 'Trang chủ người dùng',
};

export default async function ParentHome() {
  const user: string = await GetUserID();
  const children = await GetChildren(user);
  const assignment = await GetAssignmentList(user);

  return (
    <div>
      <TrangChuPH children={children} assignment={assignment} />
    </div>
  );
}
