'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { GetSubject, GetGrade } from '@/app/admin/qldanhmuc/process/getData';
import { ISubject } from '@/backend/models/data/ISubject';
import { IGrade } from '@/backend/models/data/IGrade';

import AddFormLayout from '@/app/admin/qldanhmuc/form/addFormLayout';
import AddCategory from '@/app/admin/qldanhmuc/form/addCategoryForm';
import EditFormLayout from '@/app/admin/qldanhmuc/form/editFormLayout';
import EditGradeForm from '@/app/admin/qldanhmuc/form/editGradeForm';
import EditSubjectForm from '@/app/admin/qldanhmuc/form/editSubjectForm';

//Icon
import PlusIcon from '@/asset/vector/plus-white.svg';
import FunnelIcon from '@/asset/vector/funnel-black.svg';
import DropdownIcon from '@/asset/vector/dropdown-black.svg';
import EditIcon from '@/asset/vector/pencil-white.svg';

export default function QlDanhMuc() {
  const [subject, setSubject] = useState<ISubject[]>([]);
  const [grade, setGrade] = useState<IGrade[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const subjectData = await GetSubject();
      const gradeData = await GetGrade();
      setSubject(subjectData);
      setGrade(gradeData);
    };
    fetchData();
  }, []);

  // modal Add category
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentFormComponent, setCurrentFormComponent] = useState<React.FC>(
    () => AddCategory,
  );
  const handleOpenAddModal = (FormComponent: React.FC) => {
    setCurrentFormComponent(() => FormComponent);
    setIsAddModalOpen(true);
  };

  // State for Edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editAccountData, setEditAccountData] = useState<React.FC>(
    () => EditGradeForm,
  );

  const handleSubjectEditClick = (
    FormComponent: React.FC<{ data: ISubject }>,
    subject,
  ) => {
    setEditAccountData(() => <FormComponent data={subject} />);
    setIsEditModalOpen(true);
  };

  const handleGradeEditClick = (
    FormComponent: React.FC<{ data: IGrade }>,
    grade,
  ) => {
    setEditAccountData(() => <FormComponent data={grade} />);
    setIsEditModalOpen(true);
  };
  // button pre & next
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsContainerRef = useRef(null);
  const handlePrevClick = () => {
    const newIndex = currentIndex === 0 ? subject.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const handleNextClick = () => {
    const newIndex = currentIndex === subject.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <section className="mx-auto w-full max-w-screen-xl bg-slate-50 py-2 pt-10 antialiased shadow-xl dark:bg-black dark:pt-5 lg:px-4">
      {/* // ------------------------------ SECTION DANH MỤC MÔN HỌC ------------------------------------------------------------ */}
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:mb-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
            <div className="">
              <h2
                id="subject_header"
                className="font-manrope mb-6 text-2xl font-bold text-black dark:text-white max-xl:text-center"
              >
                Danh Mục Môn Học
              </h2>
            </div>
            <div className="flex w-full flex-col justify-end gap-2.5 md:w-auto md:flex-row md:items-center">
              {/* button add product  */}
              <button
                type="button"
                className="ml-auto inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-lime-600 p-1.5 px-2 py-2 text-sm text-white hover:bg-lime-500 dark:hover:text-white md:w-auto"
                onClick={() => handleOpenAddModal(AddCategory)}
              >
                <PlusIcon />
                <span className="sr-only">Open modal</span>
                Thêm Danh Mục
              </button>

              {/* button filter  */}
              <button
                id="filterDropdownButton"
                data-dropdown-toggle="filterDropdown"
                className="flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 hover:text-slate-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-600 dark:focus:ring-slate-700 md:w-auto"
                type="button"
              >
                <FunnelIcon className="mr-2 h-4 w-4 text-slate-400" />
                Lọc
                <DropdownIcon className="-mr-1 ml-1.5 h-5 w-5" />
              </button>
            </div>
          </div>

          {/* showing Edit */}
          {isAddModalOpen && currentFormComponent && (
            <AddFormLayout
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
              FormComponent={currentFormComponent}
            />
          )}

          {/* ------------------------------ SECTION DANH MỤC MÔN HỌC ------------------------------------------------------------ */}

          <div className="relative">
            <button
              onClick={handlePrevClick}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-slate-200 p-2 shadow-md hover:bg-slate-300 focus:outline-none"
            >
              &#8592;
            </button>

            <div
              className="grid grid-cols-1 gap-8 overflow-x-auto sm:grid-cols-2 xl:grid-cols-4"
              id="subjectList"
              ref={itemsContainerRef}
            >
              {subject.map((monHocItem, index) => {
                return (
                  <a
                    key={index}
                    className="group relative mx-auto cursor-pointer overflow-hidden rounded-3xl bg-cover bg-center hover:shadow-lg sm:mx-0"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        handleSubjectEditClick(EditSubjectForm, monHocItem)
                      }
                      className="group absolute right-0 top-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br"
                    >
                      <EditIcon />
                    </button>
                    <Image
                      width={500}
                      height={320}
                      src={monHocItem.subjectImage}
                      alt="hinhanh"
                      priority={true}
                    />
                    <div className="absolute bottom-3 left-0 z-10 mx-3 w-[calc(100%-24px)] rounded-xl bg-white p-3 shadow-sm shadow-transparent group-hover:bg-indigo-50 group-hover:shadow-indigo-200">
                      <div className="mb-2 flex items-center justify-between">
                        <h6 className="text-base font-semibold leading-7 text-black">
                          {monHocItem.subjectName}
                        </h6>
                        {/* <h6 className='text-right text-base font-semibold leading-7 text-indigo-600'>
                          {monHocItem.}
                        </h6> */}
                      </div>
                      <p className="text-xs leading-5 text-slate-500">
                        {monHocItem.subjectDescription}
                      </p>
                    </div>
                  </a>
                );
              })}

              {/* showing modal */}
              {isEditModalOpen && editAccountData && (
                <EditFormLayout
                  isOpen={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                  FormComponent={editAccountData}
                />
              )}
            </div>

            <button
              onClick={handleNextClick}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-slate-200 p-2 shadow-md hover:bg-slate-300 focus:outline-none"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>

      {/* // ------------------------------ SECTION DANH MỤC CẤP ĐỘ ------------------------------------------------------------ */}
      <div>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-manrope mb-6 text-2xl font-bold text-black dark:text-white max-xl:text-center">
            Danh Mục Cấp độ
          </h2>
          <div className="relative">
            <button
              onClick={handlePrevClick}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-slate-200 p-2 shadow-md hover:bg-slate-300 focus:outline-none"
            >
              &#8592;
            </button>

            <div
              className="grid grid-cols-1 gap-8 overflow-x-auto sm:grid-cols-2 xl:grid-cols-4"
              ref={itemsContainerRef}
            >
              {grade.map((capDoItem, index) => (
                <a
                  key={index}
                  className="group relative mx-auto cursor-pointer overflow-hidden rounded-3xl bg-cover bg-center hover:shadow-lg sm:mx-0"
                >
                  <button
                    type="button"
                    onClick={() =>
                      handleGradeEditClick(EditGradeForm, capDoItem)
                    }
                    className="group absolute right-0 top-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br"
                  >
                    <EditIcon />
                  </button>

                  <Image
                    width={500}
                    height={320}
                    src={capDoItem.gradeImage}
                    alt="hinhanh"
                    priority={true}
                  />
                  <div className="absolute bottom-3 left-0 z-10 mx-3 w-[calc(100%-24px)] rounded-xl bg-white p-3 shadow-sm shadow-transparent group-hover:bg-indigo-50 group-hover:shadow-indigo-200">
                    <div className="mb-2 flex items-center justify-between">
                      <h6 className="text-base font-semibold leading-7 text-black">
                        {capDoItem.gradeName}
                      </h6>
                      {/* <h6 className='text-right text-base font-semibold leading-7 text-indigo-600'>
                        {monHocItem.}
                      </h6> */}
                    </div>
                    <p className="text-xs leading-5 text-slate-500">
                      {capDoItem.gradeDescription}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <button
              onClick={handleNextClick}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-slate-200 p-2 shadow-md hover:bg-slate-300 focus:outline-none"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
