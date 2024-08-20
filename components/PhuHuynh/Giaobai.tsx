'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Datepicker from '@/components/element/other/datePicker';
import SelectGroupTwo from '@/components/SelectGroup/SelectGroupTwo';

//Button - Icon
import DropdownIcon from '@/public/vector/down-list-content.svg';

// DS khóa học hiện có
const listCourse = [
  {
    id: 1,
    img: '/images/courses/number-course.jpg',
    title: 'Khóa Học Đếm Số',
    amount: 5,
    content: [
      {
        id: 1,
        name: 'Bài 1: Đếm số từ 1-10',
        description: 'Học đếm các số từ 1 đến 10',
      },
      {
        id: 2,
        name: 'Bài 2: Đếm số từ 11-20',
        description: 'Học đếm các số từ 11 đến 20',
      },
      {
        id: 3,
        name: 'Bài 3: Đếm số từ 21-30',
        description: 'Học đếm các số từ 21 đến 30',
      },
      {
        id: 4,
        name: 'Bài 4: Đếm số từ 31-40',
        description: 'Học đếm các số từ 31 đến 40',
      },
      {
        id: 5,
        name: 'Bài 5: Đếm số từ 41-50',
        description: 'Học đếm các số từ 41 đến 50',
      },
    ],
  },
  {
    id: 2,
    img: '/images/courses/english-course.jpg',
    title: 'Khóa Học Tiếng Anh',
    amount: 2,
    content: [
      {
        id: 3,
        name: 'Bài 1: Học từ vựng cơ bản',
        description: 'Những từ vựng tiếng Anh cơ bản',
      },
      {
        id: 4,
        name: 'Bài 2: Học câu đơn giản',
        description: 'Các câu giao tiếp đơn giản',
      },
    ],
  },
  {
    id: 3,
    img: '/images/courses/abc-course.jpg',
    title: 'Khóa Học Chữ Cái',
    amount: 3,
    content: [
      {
        id: 5,
        name: 'Bài 1: Học bảng chữ cái',
        description: 'Giới thiệu bảng chữ cái tiếng Việt',
      },
      {
        id: 6,
        name: 'Bài 2: Tập viết chữ cái',
        description: 'Hướng dẫn viết các chữ cái',
      },
      {
        id: 7,
        name: 'Bài 3: Tập viết chữ cái (tt)',
        description: 'Hướng dẫn viết các chữ cái tiếp theo',
      },
    ],
  },
];

const Giaobai = () => {
  // item đang mở
  const [openItem, setOpenItem] = useState<string | number | null>(null);

  // bài học được chọn
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);

  // thu danh sách
  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  // bài học được chọn
  const handleLessonSelect = (courseId, lessonId) => {
    const lessonKey = `${courseId}-${lessonId}`;
    setSelectedLessons((prevSelectedLessons) => {
      if (prevSelectedLessons.includes(lessonKey)) {
        return prevSelectedLessons.filter((key) => key !== lessonKey);
      } else {
        return [...prevSelectedLessons, lessonKey];
      }
    });
  };

  // bỏ chọn hết các bài học đã chọn
  const handleDeselectAll = () => {
    setSelectedLessons([]);
  };

  return (
    <section>
      <div className="h-auto p-6">
        <h1
          id="header"
          className="font-manrope mb-6 text-2xl font-bold text-black dark:text-white"
        >
          Giao Bài Học Mới Cho Bé
        </h1>

        <div className="z-20 my-10 flex flex-col items-center gap-1.5 rounded-xl bg-rose-100 p-2 dark:bg-slate-800 md:flex-row md:justify-around">
          <span className="items-center text-sm font-extrabold dark:text-white sm:block">
            Chọn Ngày
          </span>
          <div className="z-999 -translate-x-10 transform">
            <Datepicker />
          </div>
          <h1 className="items-center text-sm font-extrabold dark:text-white sm:block">
            Giao Bài Cho
          </h1>
          <div className="-translate-x-10 transform">
            <SelectGroupTwo />
          </div>
          <Link
            href="#"
            className="inline-flex w-full items-center justify-center rounded-md bg-rose-700 px-1.5 py-3 text-center text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:bg-slate-700 dark:hover:bg-graydark/80 lg:w-1/6 lg:px-8 xl:px-5"
          >
            Hoàn tất giao bài
          </Link>
        </div>

        {/* Chọn bài học từ list khóa học */}
        <div id="listKhoaHoc">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-manrope text-lg font-bold text-black dark:text-white">
              Chọn bài học
            </h2>
            <div className="flex items-center space-x-2">
              <span className="font-manrope text-sm text-slate-500 dark:text-slate-400">
                Số bài học đã chọn:
              </span>
              <button className="rounded-lg bg-blue-500 px-3 py-1 text-sm text-white">
                {selectedLessons.length}
              </button>
              <button
                onClick={handleDeselectAll}
                className="rounded-lg bg-rose-500 px-3 py-1 text-sm text-white"
              >
                Bỏ chọn tất cả
              </button>
            </div>
          </div>
          <div id="accordionExample" className="space-y-4">
            {listCourse.map((item) => (
              <div
                className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-500 dark:bg-graydark"
                key={item.id}
              >
                <div className="flex items-center space-x-4">
                  <Image
                    className="rounded-xl"
                    src={item.img}
                    width={100}
                    height={100}
                    alt={item.title}
                  />
                  <div className="w-full">
                    <div className="accordion-header flex justify-between">
                      <div>
                        <button
                          className={`accordion-button ${openItem === item.id ? '' : 'collapsed'} text-md w-full px-4 py-2 text-left font-bold text-slate-700 focus:outline-none dark:text-white`}
                          type="button"
                          onClick={() => toggleItem(item.id)}
                          aria-expanded={
                            openItem === item.id ? 'true' : 'false'
                          }
                          aria-controls={`collapse${item.id}`}
                        >
                          {item.title}
                        </button>
                        <div className="px-4 py-2 text-left text-sm text-slate-600 dark:text-white">
                          Số lượng bài: {item.amount}
                        </div>
                      </div>
                      <div className="me-2 flex items-center justify-center space-x-4">
                        <button
                          type="button"
                          onClick={() => toggleItem(item.id)}
                          className={`rounded-lg bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 px-2.5 py-1.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-rose-300 dark:focus:ring-rose-800 `}
                        >
                          <div>
                            <DropdownIcon
                              className={`${!openItem && 'rotate-180'} duration-300`}
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                    <div
                      id={`collapse${item.id}`}
                      className={`accordion-collapse ${openItem === item.id ? 'block' : 'hidden'}`}
                      aria-labelledby={`heading${item.id}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body p-4 text-slate-500">
                        <ul className="space-y-2">
                          {item.content.map((lesson) => {
                            const lessonKey = `${item.id}-${lesson.id}`;
                            return (
                              <li key={lesson.id} className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="mr-5 h-4 w-4 rounded border-slate-300 bg-slate-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:ring-offset-slate-800 dark:focus:ring-blue-600"
                                  checked={selectedLessons.includes(lessonKey)}
                                  onChange={() =>
                                    handleLessonSelect(item.id, lesson.id)
                                  }
                                />
                                <div>
                                  <div className="font-semibold text-slate-700 dark:text-white">
                                    {lesson.name}
                                  </div>
                                  <div className="text-slate-500">
                                    {lesson.description}
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Giaobai;
