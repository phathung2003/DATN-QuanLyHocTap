'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import AddQuestion from '@/app/admin/qlbaihoc/form/addQuestionForm';
import OverlapForm from '@/components/Form/overlapForm';

const ThemBaiHoc = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      description: 'Bé cùng học chữ cái',
      frontWord: 'chữ A',
      backWord: 'Apple',
      isFlipped: false,
    },
    {
      id: 2,
      description: 'Bé cùng học chữ cái',
      frontWord: 'chữ B',
      backWord: 'Banana',
      isFlipped: false,
    },
    // Add more initial items if needed
  ]);

  const handleFlip = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isFlipped: !item.isFlipped } : item,
      ),
    );
  };

  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('Thêm câu hỏi mới');
  const [currentForm, setCurrentForm] = useState<React.FC>(() => AddQuestion);

  // hàm add
  // Add Category Form
  const handleOpenAddModal = (FormComponent: React.FC) => {
    setCurrentForm(() => FormComponent);
    setIsModalOpen(true);
    setModalHeader('Thêm câu hỏi');
  };

  return (
    <div className="flex flex-col gap-9">
      {OverlapForm(isModalOpen, setIsModalOpen, currentForm, modalHeader)}
      {/* <!-- Contact Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="text-center text-xl font-semibold text-black dark:text-white">
            Tạo nội dung chi tiết bài học
          </h3>
        </div>
        {/* form hoàn thành bài học */}
        <div>
          <div className="p-6.5">
            {/* hiện thị các nội dung ở modal đã điền */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="col-span-2 w-full xl:w-1/2">
                <div className="flex">
                  <h1 className="mb-5 inline-block w-24 max-w-32 text-sm font-extrabold text-black dark:text-white">
                    Tên bài học:
                  </h1>
                  <p className="ml-5 text-sm text-black dark:text-white">
                    Bài học số 01
                  </p>
                </div>
                <div className="flex">
                  <h1 className="mb-5 inline-block w-24 max-w-32 text-sm font-extrabold text-black dark:text-white">
                    Khóa học:
                  </h1>
                  <p className="ml-5 text-sm text-black dark:text-white">
                    Khóa học chữ cái
                  </p>
                </div>
                <div className="flex">
                  <h1 className="mb-5 inline-block w-24 max-w-32 text-sm font-extrabold text-black dark:text-white">
                    Trình độ:
                  </h1>
                  <p className="ml-5 text-sm text-black dark:text-white">
                    Trung bình
                  </p>
                </div>
                <div className="flex">
                  <h1 className="mb-5 inline-block w-24 max-w-32 text-sm font-extrabold text-black dark:text-white">
                    Ngày tạo
                  </h1>
                  <p className="ml-5 text-sm text-black dark:text-white">
                    13:00 15/07/2024
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-sm font-extrabold text-black dark:text-white">
                  Ảnh minh họa:
                </label>
                <Image
                  width={120}
                  height={50}
                  src={'/images/qlbaihoc/baihoc1.jpg'}
                  alt="Logo"
                />
              </div>
            </div>

            {/* tạo nội dung chi tiết của bài học */}
            <div className="mb-5">
              <div className="w-full rounded-lg border border-slate-200 bg-white p-4 shadow dark:border-slate-700 dark:bg-slate-800 sm:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <h5 className="text-xl font-bold leading-none text-slate-900 dark:text-white">
                    Nội dung chi tiết bài học
                  </h5>
                  <button
                    type="button"
                    onClick={() => handleOpenAddModal(AddQuestion)}
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Thêm câu mới
                  </button>
                </div>
                <div className="">
                  <ul
                    role="list"
                    className="divide-y divide-slate-200 dark:divide-slate-700"
                  >
                    {items.map((item) => (
                      <li key={item.id} className="py-3 sm:py-4">
                        <div className="grid grid-cols-2 items-center sm:grid-cols-5">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                              Câu: <span>{item.id}</span>
                            </p>
                            <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                              {item.description}
                            </p>
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                              Từ mặt trước
                            </p>
                            <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                              {item.frontWord}
                            </p>
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                              Từ mặt sau
                            </p>
                            <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                              {item.backWord}
                            </p>
                          </div>

                          <div>
                            <div
                              className={`perspective m-4 h-16 w-24`}
                              onClick={() => handleFlip(item.id)}
                            >
                              <div
                                className={`transform-style preserve-3d relative h-full w-full duration-700 ${item.isFlipped ? 'rotate-y-180' : ''}`}
                              >
                                <div className="backface-hidden absolute flex h-full w-full items-center justify-center bg-rose-300 text-2xl text-white">
                                  {item.frontWord}
                                </div>
                                <div className="rotate-y-180 backface-hidden absolute flex h-full w-full items-center justify-center bg-green-500 text-2xl text-white">
                                  {item.backWord}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="inline-flex items-center">
                            <button
                              type="button"
                              className="mr-4 flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600"
                            >
                              Sửa
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* button hoàn tất */}
            <button className="flex w-full justify-center rounded bg-[#FF5580] p-3 text-sm font-medium text-white hover:bg-opacity-90 dark:text-slate-800">
              Hoàn Tất Bài Học
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemBaiHoc;
