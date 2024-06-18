'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import AddModal from '@/components/Modal/AddModal'
import FormAddCate from '@/components/FormCRUD/FormAddCate'
import EditModal from '@/components/Modal/EditModal';
import FormEditCate from '@/components/FormCRUD/FormEditCate';

const QlDanhMuc = () => {
  const [monHoc] = useState([
    {
      src: '/images/qldanhmuc/montoan.jpg',
      title: 'Môn Toán',
      rate: '5 sao',
      description: 'Toán dành cho tiểu học',
    },
    {
      src: '/images/qldanhmuc/montoan.jpg',
      title: 'Môn Anh',
      rate: '5 sao',
      description: 'Anh dành cho tiểu học',
    },
    {
      src: '/images/qldanhmuc/montoan.jpg',
      title: 'Môn Văn',
      rate: '5 sao',
      description: 'Văn dành cho tiểu học',
    },
    {
      src: '/images/qldanhmuc/montoan.jpg',
      title: 'Đếm số',
      rate: '5sao',
      description: 'Đếm số cơ bản',
    },
  ]);

  const [capDo] = useState([
    // Các mục hàng cho phần danh mục cấp độ
    {
      src: '/images/qldanhmuc/easy.jpg',
      title: 'Cấp Độ Dễ',
      rate: '1 sao',
      description: 'Cấp độ dễ nhất',
    },
    {
      src: '/images/qldanhmuc/easy.jpg',
      title: 'Cấp Độ Khá',
      rate: '2 sao',
      description: 'Cấp độ khá',
    },
    {
      src: '/images/qldanhmuc/easy.jpg',
      title: 'Trung Bình',
      rate: '3 sao',
      description: 'Cấp độ trung bình',
    },
    {
      src: '/images/qldanhmuc/easy.jpg',
      title: 'Cấp Độ Khó',
      rate: '5 sao',
      description: 'Cấp độ cao nhất & khó nhất',
    },
  ]);

  // modal Add category
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentFormComponent, setCurrentFormComponent] = useState<React.FC>(
    () => FormAddCate,
  );
  const handleOpenAddModal = (FormComponent: React.FC) => {
    setCurrentFormComponent(() => FormComponent);
    setIsAddModalOpen(true);    
  };

  // State for Edit modal
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [editAccountData, setEditAccountData] = useState<React.FC>(
  () => FormEditCate,
);

const handleEditClick = (FormComponent: React.FC) => {
  setEditAccountData(() => FormComponent);
  setIsEditModalOpen(true);
};

  // button pre & next
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsContainerRef = useRef(null);
  const handlePrevClick = () => {
    const newIndex = currentIndex === 0 ? monHoc.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const handleNextClick = () => {
    const newIndex = currentIndex === monHoc.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  

  return (
    <section className="bg-slate-50 dark:bg-black dark:pt-5 mx-auto w-full max-w-screen-xl pt-10 antialiased shadow-xl lg:px-4 py-2">
      {/* // ------------------------------ SECTION DANH MỤC MÔN HỌC ------------------------------------------------------------ */}
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-2 sm:grid-cols-1 gap-4 sm:mb-5">
            <div className="">
              <h2 className="font-manrope mb-6 text-2xl font-bold text-black dark:text-white max-xl:text-center">
                Danh Mục Môn Học
              </h2>
            </div>
            <div className="flex w-full flex-col justify-end gap-2.5 md:w-auto md:flex-row md:items-center">
              {/* button add product  */}
              <button
                type="button"
                className="bg-lime-600 hover:bg-lime-500 ml-auto inline-flex items-center gap-2.5 rounded-lg p-1.5 px-2 py-2 text-sm text-white dark:hover:text-white w-full items-center justify-center md:w-auto"
                onClick={() => handleOpenAddModal(FormAddCate)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span className="sr-only">Open modal</span>
                Thêm Danh Mục
              </button>

              {/* showing modal */}
              {isAddModalOpen && currentFormComponent && (
                <AddModal
                  isOpen={isAddModalOpen}
                  onClose={() => setIsAddModalOpen(false)}
                  FormComponent={currentFormComponent}
                />
              )}

              {/* button filter  */}
              <button
                id="filterDropdownButton"
                data-dropdown-toggle="filterDropdown"
                className="focus:ring-slate-200 dark:focus:ring-slate-700 flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 hover:text-slate-700 focus:z-10 focus:outline-none focus:ring-4 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-600 md:w-auto"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="text-slate-400 mr-2 h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clipRule="evenodd"
                  />
                </svg>
                Lọc
                <svg
                  className="-mr-1 ml-1.5 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="relative">
            <button
              onClick={handlePrevClick}
              className="bg-slate-200 hover:bg-slate-300 absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full p-2 shadow-md focus:outline-none"
            >
              &#8592;
            </button>

            <div
              className="grid grid-cols-1 gap-8 overflow-x-auto sm:grid-cols-2 xl:grid-cols-4"
              ref={itemsContainerRef}
            >
              {monHoc.map((monHocItem, index) => (
                <a
                  key={index}
                  href="javascript:;"
                  className="group relative mx-auto cursor-pointer overflow-hidden rounded-3xl bg-cover bg-center hover:shadow-lg sm:mx-0"
                >
                  <button 
                  type="button"
                  onClick={() => handleEditClick(FormEditCate)}
                  className="absolute right-0 top-0 group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-linejoin="bevel"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
                  </button>

                  {/* showing modal */} 
{isEditModalOpen && editAccountData && (
                <EditModal
                  isOpen={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                  FormComponent={editAccountData}
                />
              )}

                  <Image
                    width={500}
                    height={320}
                    src={monHocItem.src}
                    alt="hinhanh"
                  />
                  <div className="absolute bottom-3 left-0 z-10 mx-3 w-[calc(100%-24px)] rounded-xl bg-white p-3 shadow-sm shadow-transparent group-hover:bg-indigo-50 group-hover:shadow-indigo-200">
                    <div className="mb-2 flex items-center justify-between">
                      <h6 className="text-base font-semibold leading-7 text-black">
                        {monHocItem.title}
                      </h6>
                      <h6 className="text-right text-base font-semibold leading-7 text-indigo-600">
                        {monHocItem.rate}
                      </h6>
                    </div>
                    <p className="text-slate-500 text-xs leading-5">
                      {monHocItem.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <button
              onClick={handleNextClick}
              className="bg-slate-200 hover:bg-slate-300 absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full p-2 shadow-md focus:outline-none"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
      {/* ------------------------------ SECTION DANH MỤC MÔN HỌC ------------------------------------------------------------ */}

      {/* // ------------------------------ SECTION DANH MỤC CẤP ĐỘ ------------------------------------------------------------ */}
      <div>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-manrope mb-6 text-2xl font-bold text-black dark:text-white max-xl:text-center">
            Danh Mục Cấp độ
          </h2>
          <div className="relative">
            <button
              onClick={handlePrevClick}
              className="bg-slate-200 hover:bg-slate-300 absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full p-2 shadow-md focus:outline-none"
            >
              &#8592;
            </button>

            <div
              className="grid grid-cols-1 gap-8 overflow-x-auto sm:grid-cols-2 xl:grid-cols-4"
              ref={itemsContainerRef}
            >
              {capDo.map((capDoItem, index) => (
                <a
                  key={index}
                  href="javascript:;"
                  className="group relative mx-auto cursor-pointer overflow-hidden rounded-3xl bg-cover bg-center transition ease-in-out delay-150 hover:scale-95 hover:shadow-lg sm:mx-0"
                >
                  <div className="absolute right-0 top-0 group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-linejoin="bevel"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
                  </div>
                  <Image
                    width={500}
                    height={32}
                    src={capDoItem.src}
                    alt="hinhanh"
                  />
                  <div className="absolute bottom-3 left-0 z-10 mx-3 w-[calc(100%-24px)] rounded-xl bg-white p-3 shadow-sm shadow-transparent group-hover:bg-indigo-50 group-hover:shadow-indigo-200">
                    <div className="mb-2 flex items-center justify-between">
                      <h6 className="text-base font-semibold leading-7 text-black">
                        {capDoItem.title}
                      </h6>
                      <h6 className="text-right text-base font-semibold leading-7 text-indigo-600">
                        {capDoItem.rate}
                      </h6>
                    </div>
                    <p className="text-slate-500 text-xs leading-5">
                      {capDoItem.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <button
              onClick={handleNextClick}
              className="bg-slate-200 hover:bg-slate-300 absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full p-2 shadow-md focus:outline-none"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
      {/* // ------------------------------ SECTION DANH MỤC CẤP ĐỘ ------------------------------------------------------------ */}
    </section>
  );
};

export default QlDanhMuc;
