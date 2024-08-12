'use client';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';

import AddCollection from '@/app/admin/qlbaihoc/form/addCollectionForm';
import OverlapForm from '@/components/Form/overlapForm';

//Icon
import AddFolderIcon from '@/public/vector/add-folder.svg';

const QlBaiHoc = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('Thêm bài học');
  const [currentForm, setCurrentForm] = useState<React.FC>(() => AddCollection);

  //Add Content
  const handleOpenAddModal = (FormComponent: React.FC) => {
    setCurrentForm(() => FormComponent);
    setIsModalOpen(true);
    setModalHeader('Thêm bài học');
  };

  const [baiHoc] = useState([
    {
      src: '/images/qlbaihoc/baihoc1.jpg',
      author: 'Jessica',
      name: 'Bài học số 1',
      description: 'This specification defines the features and syntax',
    },
    {
      src: '/images/qlbaihoc/baihoc1.jpg',
      author: 'Sukhidaha',
      name: 'Bài học số 2',
      description: 'This specification defines the features and syntax',
    },
    {
      src: '/images/qlbaihoc/baihoc1.jpg',
      author: 'Nguyễn minh',
      name: 'Bài học số 3',
      description: 'This specification defines the features and syntax',
    },
  ]);

  return (
    <section className="mx-auto w-full max-w-screen-xl flex-1 bg-slate-50 py-10 antialiased shadow-xl dark:bg-black lg:px-4">
      <div className="flex justify-between gap-14 sm:grid-cols-1 sm:gap-4 md:grid-cols-2 lg:grid-cols-2">
        <div className="sx:text-center">
          <h2 className="font-manrope xs:text-center mb-2 text-2xl font-bold text-black dark:text-white max-xl:text-left sm:text-center md:text-center lg:text-left">
            Danh Sách Bài Học
          </h2>
        </div>
        <div className="xs:w-full sm:text-center md:text-center lg:text-right xl:text-right">
          <button
            type="button"
            className="xs:w-full inline-flex items-center justify-center gap-2.5 rounded-lg bg-lime-500 px-2 py-2 font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={() => handleOpenAddModal(AddCollection)}
          >
            <span>
              <AddFolderIcon />
            </span>
            Tạo Bài Học Mới
          </button>
        </div>
      </div>

      {OverlapForm(isModalOpen, setIsModalOpen, currentForm, modalHeader)}

      {/* ---------------- SECTION BÀI HỌC ------------------------------------------------- */}
      <div className="sx:grid-cols-1 sx:w-full mx-auto mb-15 mt-10 grid w-fit grid-cols-1 justify-center justify-items-center gap-x-20 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
        {baiHoc.map((item, index) => (
          <div
            key={index}
            className="w-72 rounded-xl bg-white shadow-md duration-500 hover:scale-105 hover:shadow-xl"
          >
            <a href="#">
              <Image
                src={item.src}
                alt={item.name}
                width={288}
                height={160}
                className="ease h-40 w-72 rounded-t-xl object-contain object-center transition-all duration-300 group-hover:scale-105"
              />
              <div className="w-72 px-4 py-3">
                <span className="text-gray-400 mr-3 text-xs uppercase">
                  {item.author}
                </span>
                <p className="block truncate text-lg font-bold capitalize text-black">
                  {item.name}
                </p>
                <div className="flex items-center">
                  <p className="text-gray-600 my-3 cursor-auto text-sm font-semibold">
                    {item.description}
                  </p>
                  {/* <del>
                      <p className="text-gray-600 ml-2 cursor-auto text-sm">
                        {item.des}
                      </p>
                    </del> */}
                  <div className="ml-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#f58f23"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                      <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QlBaiHoc;
