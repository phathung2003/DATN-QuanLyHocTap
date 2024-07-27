import React from 'react';
import { GetSubject } from '@/backend/feature/subject';
import SubjectManagement from '@/app/admin/subject/subjectManagement';

export default async function Subject() {
  const subjectList = await GetSubject();
  return <SubjectManagement data={subjectList} />;
}
