import { Metadata } from 'next';
import { GetCourse } from '@/backend/feature/course';
import CourseManagement from '@/components/page/content/course/manager/courseManagement';

export const metadata: Metadata = {
  title: 'Quản lý khóa học',
  description: 'Trang quản lý khóa học',
};

export default async function Course() {
  const courseData = await GetCourse();
  return <CourseManagement courseList={courseData} />;
}
