import { Metadata } from 'next';
import { GetCourse } from '@/backend/feature/content/course';
import CourseManagement from '@/components/page/content/course/user/courseList';

export const metadata: Metadata = {
  title: 'Danh sách khóa học',
  description: 'Trang danh sách khóa học trên hệ thống',
};

export default async function Course() {
  const courseData = await GetCourse();
  return <CourseManagement courseList={courseData} />;
}
