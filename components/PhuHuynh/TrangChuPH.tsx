/*eslint-disable */
'use client';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

//components
import LearningCourse from '@/components/LearningCourse/LearningCourse';
import Datepicker from '@/components/element/other/datePicker';
import SelectGroupTwo from '@/components/SelectGroup/SelectGroupTwo';

// import ChartTwo from '../Charts/ChartTwo';
//button
import EditButton from '@/components/element/button/editButton';
import DeleteButton from '@/components/element/button/deleteButton';

interface GiaoBai {
  src: string;
  date: string;
  deadline: string;
  name: string;
  timeremain: number;
  progress: number;
}

const TrangChuPH = () => {
  // state cho Danh sách giao bài cho trẻ của PH
  const [giaobai] = useState<GiaoBai[]>([
    {
      src: '/images/qlbaihoc/baihoc1.jpg',
      date: '15/08/2024',
      deadline: '16/08/2024',
      name: 'Bài học chữ cái 01',
      timeremain: 5,
      progress: 60,
    },
    {
      src: '/images/qlbaihoc/baihoc1.jpg',
      date: '15/08/2024',
      deadline: '17/08/2024',
      name: 'Bài bài chữ cái 02',
      timeremain: 1,
      progress: 60,
    },
    {
      src: '/images/qlbaihoc/baihoc1.jpg',
      date: '15/08/2024',
      deadline: '18/08/2024',
      name: 'Bài học chữ cái 03',
      timeremain: 6,
      progress: 60,
    },
  ]);

  // state for show modal Learning của trẻ
  const [isLearningModalOpen, setIsLearningModalOpen] = useState(false);
  // const [currentFormComponent, setCurrentFormComponent] = useState<React.FC>(
  //   () => FormLesson,
  // );
  const handleOpenLearningModal = (FormComponent: React.FC) => {
    // setCurrentFormComponent(() => FormComponent);
    setIsLearningModalOpen(true);
  };

  return (
    <section className="dark:bg-black">
      {/* Tổng quan */}
      <div className="dark:bg-black">
        <div className="grid grid-cols-1 gap-4">
          <div className="w-full rounded-lg bg-slate-50 py-5 antialiased shadow-xl dark:bg-black lg:px-4">
            {/* nav */}
            <div className="z-20 flex flex-col items-center gap-1.5 rounded-xl bg-rose-100 p-2 dark:bg-slate-800 md:flex-row md:justify-around">
              <span className="items-center text-sm font-extrabold dark:text-white sm:block">
                Ngày
              </span>
              <div className="z-999 -translate-x-8 transform">
                <Datepicker />
              </div>
              <h1 className="items-center text-sm font-extrabold dark:text-white sm:block">
                Giao bài cho
              </h1>
              <div className="-translate-x-8 transform">
                <SelectGroupTwo />
              </div>
              <Link
                href="#"
                className="inline-flex w-1/6 items-center justify-center rounded-md bg-rose-700 py-3 text-center font-medium text-white hover:bg-opacity-80 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:bg-slate-700 dark:hover:bg-graydark/80"
              >
                <span className="text-sm">Kiểm tra</span>
              </Link>
              {/* btn thêm giao bài mới */}
              <Link
                href="/phuhuynh/giaobai"
                className="me-2 inline-flex items-center gap-2 rounded-lg bg-rose-700 p-2.5 text-center text-sm font-medium text-white hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h6" />
                  <path d="M14 3v5h5M18 21v-6M15 18h6" />
                </svg>
                <span className="text-sm">Giao bài mới</span>
              </Link>
            </div>

            {/* table of danh sách giao bài */}
            <div className="mt-5 h-96 w-full overflow-auto">
              <table className="w-full text-left text-sm text-slate-700 dark:text-white">
                <tbody>
                  {giaobai.length === 0 ? (
                    <tr>
                      <td colSpan={4}>
                        <p className="mt-4 flex w-full justify-center text-lg font-bold text-rose-500">
                          Chưa giao bài học nào cho bé
                        </p>
                      </td>
                    </tr>
                  ) : (
                    giaobai.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-200 dark:border-slate-700"
                      >
                        <td className="my-8 grid max-w-2xl gap-4 sm:grid-cols-2">
                          <Image
                            alt="Image"
                            className="overflow-hidden rounded-lg border border-slate-200 object-fill duration-500 hover:scale-105 hover:shadow-lg dark:border-slate-800"
                            height={300}
                            src={item.src}
                            width={300}
                          />
                          <div className="relative grid w-full gap-4">
                            <div className="">
                              <h2 className="text-2xl font-bold">
                                {item.name}
                              </h2>
                              <p className="mt-2 text-slate-700 dark:text-slate-400">
                                Thời hạn: <span>{item.deadline}</span>{' '}
                              </p>
                              <p className="text-slate-7 00 mt-2 dark:text-slate-400">
                                Còn lại:{' '}
                                <span className="text-rose-900 dark:text-rose-500">
                                  {item.timeremain} giờ
                                </span>
                              </p>
                            </div>
                            {/* thanh tiến độ */}
                            <div className="grid w-full gap-4">
                              <div className="h-2.5 w-full rounded-full bg-slate-500 dark:bg-slate-700">
                                <div
                                  className="h-2.5 rounded-full bg-lime-500"
                                  style={{ width: `${item.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            {/* edit & del */}
                            <div className="flex items-center gap-2.5 space-x-1">
                              {/* button xem trước (preview)*/}
                              <button
                                type="button"
                                // onClick={() =>
                                //   handleOpenLearningModal(FormLesson)
                                // }
                                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-[#E90074] px-3 py-2 text-center text-sm font-medium text-white hover:bg-opacity-80 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:hover:text-white dark:focus:ring-slate-700"
                              >
                                <svg
                                  className="stroke-current dark:text-white dark:hover:text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#4a4a4a"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                Xem trước
                              </button>
                              {/* showing modal */}
                              {/* {isLearningModalOpen && currentFormComponent && (
                                <AddModal
                                  isOpen={isLearningModalOpen}
                                  onClose={() => setIsLearningModalOpen(false)}
                                  FormComponent={currentFormComponent}
                                />
                              )} */}
                              {/* button sửa */}
                              <EditButton
                                onClick={() => console.log('Edit:')}
                              />
                              {/* button xóa */}
                              <DeleteButton
                                onClick={() => console.log('Delete:')}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* top các khóa học cho PH */}
      <LearningCourse />
    </section>
  );
};

export default TrangChuPH;
