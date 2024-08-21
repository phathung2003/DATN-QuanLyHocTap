import { GetGrade } from '@/backend/feature/grade';
import { Metadata } from 'next';
import GradeManagement from '@/components/page/category/gradeManagement';

export const metadata: Metadata = {
  title: 'Quản lý cấp bậc',
  description: 'Trang quản lý danh mục cấp bậc',
};

export default async function Grade() {
  const gradeList = await GetGrade();
  return <GradeManagement data={gradeList} />;
}
