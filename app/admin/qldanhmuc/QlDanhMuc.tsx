'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GetSubject, GetGrade } from '@/app/admin/qldanhmuc/process/getData';
import { ISubject } from '@/backend/models/data/ISubject';
import { IGrade } from '@/backend/models/data/IGrade';

import AddCategory from '@/app/admin/qldanhmuc/form/addCategoryForm';
import EditGradeForm from '@/app/admin/qldanhmuc/form/editGradeForm';
import EditSubjectForm from '@/app/admin/qldanhmuc/form/editSubjectForm';
import OverlapForm from '@/components/Form/overlapForm';

//Icon
import PlusIcon from '@/public/vector/plus-white.svg';
import FunnelIcon from '@/public/vector/funnel-black.svg';
import DropdownIcon from '@/public/vector/dropdown-black.svg';
import EditIcon from '@/public/vector/pencil-white.svg';

export default function QlDanhMuc() {
  const [subject, setSubject] = useState<ISubject[]>([]);
  const [grade, setGrade] = useState<IGrade[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('Thêm danh mục');
  const [currentForm, setCurrentForm] = useState<React.FC>(() => AddCategory);
  //Get Data
  useEffect(() => {
    const fetchData = async () => {
      const subjectData = await GetSubject();
      const gradeData = await GetGrade();
      setSubject(subjectData);
      setGrade(gradeData);
    };
    fetchData();
  }, []);

  // Add Category Form
  const handleOpenAddModal = (FormComponent: React.FC) => {
    setCurrentForm(() => FormComponent);
    setIsModalOpen(true);
    setModalHeader('Thêm danh mục');
  };

  // Edit category Form
  const handleSubjectEditClick = (
    FormComponent: React.FC<{ data: ISubject }>,
    subject,
  ) => {
    setCurrentForm(() => <FormComponent data={subject} />);
    setIsModalOpen(true);
    setModalHeader('Chỉnh sửa môn học');
  };

  // const handleGradeEditClick = (
  //   FormComponent: React.FC<{ data: IGrade }>,
  //   grade,
  // ) => {
  //   setCurrentForm(() => <FormComponent data={grade} />);
  //   setIsModalOpen(true);
  //   setModalHeader('Chỉnh sửa lớp học');
  // };

  return (
    <section className="mx-auto w-full max-w-screen-xl bg-slate-50 py-2 pt-10 antialiased shadow-xl dark:bg-black dark:pt-5 lg:px-4">
      {/* // ------------------------------ SECTION DANH MỤC MÔN HỌC ------------------------------------------------------------ */}

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

        {OverlapForm(isModalOpen, setIsModalOpen, currentForm, modalHeader)}

        {/* ------------------------------ SECTION DANH MỤC MÔN HỌC ------------------------------------------------------------ */}

        <div className="relative">
          <table className="w-full text-left text-sm text-slate-700 dark:text-slate-600">
            <thead className="text-gray-400 bg-slate-200 text-xs uppercase dark:bg-slate-700 dark:text-white">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Hình ảnh
                </th>
                <th scope="col" className="px-4 py-3">
                  Tên danh mục
                </th>
                <th scope="col" className="px-4 py-3">
                  Mô tả
                </th>
                <th scope="col" className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {subject.map((monHocItem, index) => (
                <tr
                  key={index}
                  className="dark:border-gray-700 border-b border-slate-200"
                >
                  <td className="px-4 py-3">
                    <Image
                      width={80}
                      height={30}
                      src={monHocItem.subjectImage}
                      alt="hinhanh"
                      priority={true}
                    />
                  </td>
                  <td className="px-4 py-3 dark:text-white">
                    {monHocItem.subjectName}
                  </td>
                  <td className="max-w-[12rem] truncate px-4 py-3 dark:text-white">
                    {monHocItem.subjectDescription}
                  </td>
                  <td className="flex items-center justify-end px-4 py-3">
                    {/* button edit */}
                    <button
                      type="button"
                      onClick={() =>
                        handleSubjectEditClick(EditSubjectForm, monHocItem)
                      }
                      className="mr-4 flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600"
                    >
                      <EditIcon />
                      Sửa
                    </button>

                    {/* button Xóa */}
                    <button
                      type="button"
                      data-modal-target="delete-modal"
                      data-modal-toggle="delete-modal"
                      className="focus:ring-red-300 dark:hover:bg-red-600 dark:focus:ring-red-900 mr-4 flex items-center gap-2 rounded-lg border border-rose-600 px-3 py-2 text-center text-sm font-medium text-rose-600 hover:bg-rose-800 hover:stroke-white hover:text-white focus:outline-none focus:ring-4 dark:border-rose-500 dark:text-rose-500 dark:hover:text-white"
                    >
                      <svg
                        className="text-red-700 dark:text-red-500 stroke-current hover:text-white dark:hover:text-white"
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* // ------------------------------ SECTION DANH MỤC CẤP ĐỘ ------------------------------------------------------------ */}
      <div>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-manrope mb-6 text-2xl font-bold text-black dark:text-white max-xl:text-center">
            Danh Mục Cấp độ
          </h2>
          <div className="relative">
            <table className="w-full text-left text-sm text-slate-700 dark:text-slate-600">
              <thead className="text-gray-400 bg-slate-200 text-xs uppercase dark:bg-slate-700 dark:text-white">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Hình ảnh
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Tên danh mục
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Mô tả
                  </th>
                  <th scope="col" className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {grade.map((capDoItem, index) => (
                  <tr
                    key={index}
                    className="dark:border-gray-700 border-b border-slate-200"
                  >
                    <td className="px-4 py-3">
                      <Image
                        width={80}
                        height={30}
                        src={capDoItem.gradeImage}
                        alt="hinhanh"
                        priority={true}
                      />
                    </td>
                    <td className="px-4 py-3 dark:text-white">
                      {capDoItem.gradeName}
                    </td>
                    <td className="max-w-[12rem] truncate px-4 py-3 dark:text-white">
                      {capDoItem.gradeDescription}
                    </td>
                    <td className="flex items-center justify-end px-4 py-3">
                      {/* button edit */}
                      <button
                        type="button"
                        onClick={() =>
                          handleSubjectEditClick(EditGradeForm, capDoItem)
                        }
                        className="mr-4 flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600"
                      >
                        <EditIcon />
                        Sửa
                      </button>

                      {/* button Xóa */}
                      <button
                        type="button"
                        data-modal-target="delete-modal"
                        data-modal-toggle="delete-modal"
                        className="focus:ring-red-300 dark:hover:bg-red-600 dark:focus:ring-red-900 mr-4 flex items-center gap-2 rounded-lg border border-rose-600 px-3 py-2 text-center text-sm font-medium text-rose-600 hover:bg-rose-800 hover:stroke-white hover:text-white focus:outline-none focus:ring-4 dark:border-rose-500 dark:text-rose-500 dark:hover:text-white"
                      >
                        <svg
                          className="text-red-700 dark:text-red-500 stroke-current hover:text-white dark:hover:text-white"
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
