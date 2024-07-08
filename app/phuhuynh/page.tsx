'use client';

import ParentLayout from '@/components/Layout/ParentLayout';
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
