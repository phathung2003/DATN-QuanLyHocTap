import React from 'react';
import { GetSubject } from '@/backend/feature/subject';
import SubjectManagement from '@/components/pages/categoryManagement/subjectManagement';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý môn học',
  description: 'Quản lý môn học',
};

export default async function Subject() {
  const subjectList = await GetSubject();
  return <SubjectManagement data={subjectList} />;
}
