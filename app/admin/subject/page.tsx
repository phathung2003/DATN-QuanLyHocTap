import React from 'react';
import { Metadata } from 'next';
import { GetSubject } from '@/backend/feature/subject';
import SubjectManagement from '@/components/page/category/subjectManagement';

export const metadata: Metadata = {
  title: 'Quản lý môn học',
  description: 'Quản lý môn học',
};

export default async function Subject() {
  const subjectList = await GetSubject();
  return <SubjectManagement data={subjectList} />;
}
