'use client';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LearningCourse from '@/components/LearningCourse/LearningCourse';
import SingleBlog from '@/components/Blog/SingleBlog';
import blogData from '@/components/Blog/blogData';
import Datepicker from '@/components/DatePicker/DatePicker';
import SelectGroupTwo from '@/components/SelectGroup/SelectGroupTwo';
import AddModal from '@/components/Modal/AddModal';
import FormLesson from '@/components/FormCRUD/FormLession';

const TrangChuPH = () => {
  // state cho Danh sách giao bài cho trẻ của PH
  const [giaobai] = useState([
    {
      src: '/images/qlbaihoc/baihoc1.jpg',
      date: '09/01/2024',
      name: 'Bài học số 1',
      description: 'This specification defines the features and syntax lorem',
      progress: 60,
    },
    {
      src: '/images/qlbaihoc/baihoc1.jpg',
      date: '09/01/2024',
      name: 'Bài học số 1',
      description: 'This specification defines the features and syntax',
      progress: 60,
    },
    {
      src: '/images/qlbaihoc/baihoc1.jpg',
      date: '09/01/2024',
      name: 'Bài học số 1',
      description: 'This specification defines the features and syntax',
      progress: 60,
    },
  ]);

  // state for modal Learning của trẻ
  const [isLearningModalOpen, setIsLearningModalOpen] = useState(false);
  const [currentFormComponent, setCurrentFormComponent] = useState<React.FC>(
    () => FormLesson,
  );
  const handleOpenLearningModal = (FormComponent: React.FC) => {
    setCurrentFormComponent(() => FormComponent);
    setIsLearningModalOpen(true);
  };

  return (
    <div>
      {/* Tổng quan */}
      <div>
        <div className="xs:grid-cols-1 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {/* phần 1 */}
          <div className="col-span-2 w-full bg-slate-50 py-5 antialiased shadow-xl dark:bg-black lg:px-4">
            <div className="z-20 flex flex-col items-center gap-2.5 md:flex-row xl:flex-row ">
              <span className="flex items-center text-xl font-extrabold dark:text-white sm:block">
                Hôm nay
              </span>
              <div>
                <Datepicker />
              </div>

              <h1 className="ml-5 flex items-center text-xl font-extrabold dark:text-white sm:block">
                Giao bài cho
              </h1>
              <div>
                <SelectGroupTwo />
              </div>
              <Link
                href="#"
                className="mx-5 inline-flex w-full items-center justify-center rounded-md bg-[#E90074] px-10 py-3 text-center font-medium text-white hover:bg-opacity-80 lg:w-1/6 lg:px-8 xl:px-10"
              >
                Kiểm tra
              </Link>
            </div>

            {/* table of danh sách giao bài */}
            <div className="mt-5 h-96 w-full overflow-auto">
              <table className="w-full text-left text-sm text-slate-700 dark:text-white">
                <tbody>
                  {giaobai.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-200 dark:border-slate-700"
                    >
                      <div className="my-10 grid max-w-2xl gap-4 sm:grid-cols-2">
                        <Image
                          alt="Image"
                          className="overflow-hidden rounded-lg border border-slate-200 object-fill duration-500 hover:scale-105 hover:shadow-lg dark:border-slate-800"
                          height={300}
                          src={item.src}
                          width={300}
                        />
                        <div className="relative grid w-full gap-4">
                          <div className="grid gap-1">
                            <h2 className="text-2xl font-bold">{item.name}</h2>
                            <p className="text-slate-500 dark:text-slate-400">
                              {item.description}
                            </p>
                          </div>
                          {/* thanh tiến độ */}
                          <div className="grid w-full gap-4">
                            <div className="h-2.5 w-full rounded-full bg-slate-500 dark:bg-slate-700">
                              <div className="h-2.5 w-2/3 rounded-full bg-lime-500"></div>
                            </div>
                          </div>
                          {/* edit & del */}
                          <div className="flex items-center space-x-1">
                            {/* button xem */}
                            <button
                              type="button"
                              onClick={() =>
                                handleOpenLearningModal(FormLesson)
                              }
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
                            {isLearningModalOpen && currentFormComponent && (
                              <AddModal
                                isOpen={isLearningModalOpen}
                                onClose={() => setIsLearningModalOpen(false)}
                                FormComponent={currentFormComponent}
                              />
                            )}

                            {/* button sửa */}
                            <button
                              type="button"
                              data-drawer-target="drawer-update-product"
                              data-modal-target="updateProductModal"
                              data-drawer-show="drawer-update-product"
                              aria-controls="drawer-update-product"
                              className="flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                                <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                              </svg>
                              Sửa
                            </button>

                            {/* button xóa */}
                            <button
                              type="button"
                              data-modal-target="delete-modal"
                              data-modal-toggle="delete-modal"
                              className="flex items-center gap-2 rounded-xl border border-rose-600 px-3 py-2 text-center text-sm font-medium text-rose-600 hover:bg-rose-800 hover:stroke-white hover:text-white focus:outline-none focus:ring-4 focus:ring-rose-300 dark:border-rose-500 dark:text-rose-500 dark:hover:bg-rose-600 dark:hover:text-white dark:focus:ring-rose-900"
                            >
                              <svg
                                className="stroke-current text-rose-700 hover:text-white dark:text-rose-500 dark:hover:text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#d01d02"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* phần 2 */}
          <div className="bg-slate-50 py-5 antialiased shadow-xl dark:bg-black lg:col-span-2 lg:px-4 xl:col-span-1">
            <div className="">
              <Link
                href="#"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-t-md bg-rose-700 px-3 py-3 text-center font-medium text-white duration-500 hover:scale-105 hover:bg-opacity-80 hover:shadow-lg lg:px-8 xl:px-10"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 21H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h5l2 3h9a2 2 0 0 1 2 2v2M19 15v6M16 18h6" />
                  </svg>
                </span>
                Giao bài hôm nay cho bé
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* top các khóa học cho PH */}
      <LearningCourse />

      {/* Các bài viết nổi bật */}
      <h1 className="mb-10 mt-20 flex items-center text-3xl font-extrabold dark:text-white">
        Top các bài viết nổi bật
        <span className="me-2 ms-2 rounded bg-blue-100 px-2.5 py-0.5 text-xl font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
          HOT
        </span>
      </h1>
      <div className="mx-auto grid w-5/6 grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
        {blogData.map((blog) => (
          <div key={blog.id} className="w-full">
            <SingleBlog blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrangChuPH;
