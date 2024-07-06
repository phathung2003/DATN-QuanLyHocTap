'use client';

import ParentLayout from '@/components/Layouts/ParentLayout';
import { Metadata } from 'next';
import Carousel from '@/components/Carousel/Carousel';
import LearningCourse from '@/components/LearningCourse/LearningCourse';
import SingleBlog from '@/components/Blog/SingleBlog';
import blogData from '@/components/Blog/blogData';

// export const metadata: Metadata = {
//   title: 'HungThan01',
//   description: 'Đây là project của HungThanh',
// };

export default function ParentHome() {
  return (
    <>
      <ParentLayout>
        {/* slider lướt lướt */}
        <Carousel />

        {/* top các khóa học cho PH */}
        <LearningCourse />

        {/* Các bài viết nổi bật */}
        <h1 className="mb-10 mt-20 flex items-center text-3xl font-extrabold dark:text-white">
          Top các bài viết nổi bật
          <span className="me-2 ms-2 rounded bg-blue-100 px-2.5 py-0.5 text-xl font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
            HOT
          </span>
        </h1>
        <div className="mx-auto grid grid w-5/6 grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          {blogData.map((blog) => (
            <div key={blog.id} className="w-full">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>
      </ParentLayout>
    </>
  );
}
