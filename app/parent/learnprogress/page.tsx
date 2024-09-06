/* eslint-disable */
import { Metadata } from 'next';
import LearnManager from '@/app/parent/learnprogress/learnManager';
import { GetUserID } from '@/backend/feature/user/validate';
import { GetChildren } from '@/backend/feature/children';
import { GetAssignmentList } from '@/backend/feature/assignment';

export const metadata: Metadata = {
  title: 'Quản lý học tập',
  description: 'Trang quản lý tiến độ học của trẻ',
};

export default async function ChildrenManagerPage() {
  const user: string = await GetUserID();
  const children = await GetChildren(user);
  const assignment = await GetAssignmentList(user);

  return <LearnManager children={children} assignment={assignment} />;
}
