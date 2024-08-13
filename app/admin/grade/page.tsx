import React from 'react';
import { GetGrade } from '@/backend/feature/grade';
import GradeManagement from '@/components/pages/categoryManagement/gradeManagement';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý cấp bậc',
  description: 'Quản lý cấp bậc học của trẻ',
};

export default async function Grade() {
  const gradeList = await GetGrade();
  return <GradeManagement data={gradeList} />;
}
