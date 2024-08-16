import React from 'react';
import { GetCourse } from '@/backend/feature/course';
import CourseManagement from '@/components/page/content/course/courseManagement';

export default async function Course() {
  const courseData = await GetCourse();
  return <CourseManagement courseList={courseData} />;
}
