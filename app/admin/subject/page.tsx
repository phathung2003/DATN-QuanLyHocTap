import { Metadata } from 'next';
import { GetSubject } from '@/backend/feature/category/subject';
import SubjectManagement from '@/components/page/category/subjectManagement';

export const metadata: Metadata = {
  title: 'Quản lý môn học',
  description: 'Trang quản lý danh mục môn học',
};

export default async function Subject() {
  const subjectList = await GetSubject();
  return <SubjectManagement data={subjectList} />;
}
