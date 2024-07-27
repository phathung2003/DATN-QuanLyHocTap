import React from 'react';
import { GetGrade } from '@/backend/feature/grade';
import GradeManagement from '@/app/admin/grade/gradeManagement';

export default async function Grade() {
  const gradeList = await GetGrade();
  return <GradeManagement data={gradeList} />;
}
