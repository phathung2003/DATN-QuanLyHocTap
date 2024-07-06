'use client';

import ParentLayout from '@/components/Layouts/ParentLayout';
import Carousel from '@/components/Carousel/Carousel';
import LearningCourse from '@/components/LearningCourse/LearningCourse';

export default function ParentHome() {
  return (
    <>
      <ParentLayout>
        <Carousel />
        <LearningCourse />
      </ParentLayout>
    </>
  );
}
