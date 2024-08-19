import React from 'react';
import { GetCourse } from '@/backend/feature/course';
import CourseManagement from '@/app/phuhuynh/course/courseList';

export default async function Course() {
  const courseData = await GetCourse();
  return <CourseManagement courseList={courseData} />;
}
