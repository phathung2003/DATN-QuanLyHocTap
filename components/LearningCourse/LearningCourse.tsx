import React from 'react';
import Image from 'next/image';

const courses = [
  {
    image: '/images/qldanhmuc/chucaiabc.jpg',
    category: 'Dễ',
    title: 'Khóa học chữ cái',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    time: '6 mins ago',
    comments: '39',
  },
  {
    image: '/images/qldanhmuc/sodem.jpg',
    category: 'Khó',
    title: 'Khóa học số đếm',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    time: '10 days ago',
    comments: '0',
  },
  {
    image: '/images/qldanhmuc/convat.jpg',
    category: 'Khó',
    title: 'Khóa học đồ vật',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    time: '16 hours ago',
    comments: '9',
  },
];

const Course = () => {
  return (
    <div>
      <h1 className="mb-10 mt-20 flex items-center text-3xl font-extrabold dark:text-white">
        Top các khóa học hiện có
        <span className="me-2 ms-2 rounded bg-blue-100 px-2.5 py-0.5 text-xl font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
          NEW
        </span>
      </h1>

      <div className="mx-auto grid w-5/6 grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
        {courses.map((course, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden rounded-2xl shadow-lg hover:shadow-xl dark:hover:shadow-xl"
          >
            <div className="relative">
              {/* img */}
              <a href="#">
                <Image
                  className="w-full"
                  src={course.image}
                  width={200}
                  height={120}
                  alt={course.title}
                />
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-slate-900 opacity-25 transition duration-300 hover:bg-transparent"></div>
              </a>
              {/* danh muc */}
              <a href="#!">
                <div className="absolute right-0 top-0 mr-3 mt-3 bg-[#FF0080] px-4 py-2 text-xs text-white transition duration-500 ease-in-out hover:bg-white hover:text-indigo-600">
                  {course.category}
                </div>
              </a>
            </div>

            <div className="mb-auto bg-white px-6 py-4 dark:bg-boxdark">
              <a
                href="#"
                className="mb-2 inline-block text-lg font-medium transition duration-500 ease-in-out hover:text-indigo-600 dark:text-white"
              >
                {course.title}
              </a>
              <p className="text-sm text-slate-500">{course.description}</p>
            </div>

            <div className="flex flex-row items-center justify-between bg-slate-100 px-6 py-3 dark:bg-black">
              <span className="font-regular mr-1 flex flex-row items-center py-1 text-xs text-slate-800 dark:text-white">
                <svg height="13px" width="13px" viewBox="0 0 512 512">
                  <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                </svg>
                <span className="ml-1 dark:text-white">{course.time}</span>
              </span>

              <span className="font-regular mr-1 flex flex-row items-center py-1 text-xs text-slate-800 dark:text-white">
                <svg
                  className="h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  ></path>
                </svg>
                <span className="ml-1 dark:text-white">
                  {course.comments} Comments
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
