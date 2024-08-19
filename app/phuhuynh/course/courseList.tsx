'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { SearchCourse } from '@/backend/feature/course';
import ICourse from '@/backend/models/data/ICourse';

//Button
import SearchBar from '@/components/element/field/searchBar';
import PlusIcon from '@/public/vector/plus-bold.svg';
import DetailButton from '@/components/element/button/detailButton';
const DefaultAvatar = '/images/users/user01.png';

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
      <h2
        id="header"
        className="font-manrope mb-2 mt-2 text-center text-2xl font-bold text-black dark:text-white min-[890px]:text-left"
      >
        Danh sách khóa học
      </h2>

      <div className="x mt-3 grid grid-cols-1 gap-4 sm:mb-5 min-[890px]:grid-cols-2">
        <SearchBar onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="grid h-[58vh] grid-cols-1 gap-6 overflow-y-auto sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 ">
        {searchCourse.map((data, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl shadow-md "
          >
            <div className="relative">
              <div className="h-40 bg-slate-300">
                <div className="relative h-full w-full">
                  <Image
                    src={data.courseImage ?? ''}
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
                <span className="rounded bg-blue-700 px-2.5 py-0.5 text-sm font-semibold text-white ">
                  Toán
                </span>
                <span className="ml-2 rounded bg-orange-600 px-2.5 py-0.5 text-sm font-semibold text-white ">
                  Lớp mầm
                </span>
              </div>
            </div>

            <div className="bg-zinc-200 p-3 shadow-card dark:bg-slate-700">
              <h1 className="text-xl font-bold">Tiêu đề</h1>

              <p className="text-gray-600 dark:text-gray-300 mt-2">Mô tả</p>

              <div className="mt-4 flex items-center">
                <Image
                  src={DefaultAvatar}
                  alt="Avatar"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <div className="ml-2">
                  <p className="text-gray-900 dark:text-gray-100 text-sm">
                    Nguyễn Phát Hưng
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-xs">
                    20/01/2023
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <DetailButton buttonName={'Chi tiết'} link="/" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseManagement;
