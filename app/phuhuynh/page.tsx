
"use client";

import ParentLayout from "@/components/Layouts/ParentLayout";
import { Metadata } from 'next';
import Carousel from '@/components/Carousel/Carousel'
import LearningCourse from '@/components/LearningCourse/LearningCourse'

// export const metadata: Metadata = {
//   title: 'HungThan01',
//   description: 'Đây là project của HungThanh',
// };

export default function ParentHome() {
  return (
    <>
      <ParentLayout>
        <Carousel />
        <LearningCourse/>
      </ParentLayout>
    </>
  );
}
