'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { SearchCourse } from '@/backend/feature/course';
import ICourse from '@/backend/models/data/ICourse';
import { KeepDateOnly } from '@/backend/feature/general';
//Button
import SearchBar from '@/components/element/field/searchBar';
import PlusIcon from '@/public/vector/plus-bold.svg';

const DefaultAvatar = '/images/users/user01.png';
const DefaultImage = process.env.NEXT_PUBLIC_COURSE_DEFAULT_IMAGE;

const CourseManagement: React.FC<{ courseList: ICourse[] }> = ({
  courseList,
}) => {
  const [searchCourse, setSearchCourse] = useState<ICourse[]>(courseList);
  const [search, setSearch] = useState<string>('');

  //Tìm kiếm
  useEffect(() => {
    setSearchCourse(SearchCourse(search, courseList));
  }, [search, courseList]);

  return (
    <section className="antialiase px-4 lg:px-8">
      <div className="grid grid-cols-2">
        <h2
          id="header"
          className="font-manrope mb-5 mt-5 text-center text-2xl font-bold text-black dark:text-white min-[890px]:text-left"
        >
          Danh sách khóa học hiện có
        </h2>

        <div className="mt-5 flex w-5/6 justify-end sm:mb-5">
          <SearchBar onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="mt-5 grid h-auto grid-cols-1 gap-6 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {searchCourse.map((data, index) => (
          <Link
            href={`/phuhuynh/course/${data.courseID}`}
            key={index}
            className="relative cursor-pointer rounded-sm shadow-lg"
          >
            <div className="relative">
              <div className="h-40 bg-slate-300">
                <div className="relative h-full w-full">
                  <Image
                    src={data.courseImage ?? DefaultImage ?? ''}
                    alt="Course cover"
                    fill
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-white bg-opacity-20 dark:bg-black dark:bg-opacity-20"></div>{' '}
                  {/* Lớp phủ màu tối */}
                </div>
              </div>
              <button className="absolute right-2 top-0 flex h-10 w-10 items-center justify-center rounded-b-full bg-green-500">
                <PlusIcon />
              </button>
              <div className="absolute bottom-2 left-2">
                <span className="rounded-full bg-blue-700 px-2.5 py-1.5 text-sm font-semibold text-white ">
                  {data.courseSubjectName}
                </span>
                <span className="ml-2 rounded-full bg-orange-600 px-2.5 py-1.5 text-sm font-semibold text-white ">
                  {data.courseGradeName}
                </span>
              </div>
            </div>

            <div className="bg-zinc-200 p-3 shadow-card dark:bg-slate-700">
              <div className="h-[153px]">
                <h1 className="line-clamp-2 text-xl font-bold">
                  {data.courseName}
                </h1>

                <p className="mt-4 line-clamp-4 text-sm text-slate-600 dark:text-slate-300">
                  {data.courseDescription}
                </p>
              </div>

              <p className="mt-4 text-sm text-slate-800 dark:text-slate-300">
                Tổng số bài: <span className="font-bold">{data.unit ?? 0}</span>
              </p>
              <p className="mt-4 text-sm text-slate-800 dark:text-slate-300">
                Đăng bởi
              </p>
              <div className="mt-4 flex items-center">
                <Image
                  src={DefaultAvatar}
                  alt="Avatar"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <div className="ml-2">
                  <p className="text-sm text-slate-900 dark:text-slate-100">
                    {data.courseAuthor}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {data.courseLastEditDate
                      ? KeepDateOnly(data.courseLastEditDate)
                      : data.courseUploadDate
                        ? KeepDateOnly(data.courseUploadDate)
                        : 'Không xác định'}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CourseManagement;
