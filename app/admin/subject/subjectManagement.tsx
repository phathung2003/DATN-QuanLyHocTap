'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { ISubject } from '@/backend/models/data/ISubject';
import { ISubjectError } from '@/backend/models/messages/ISubjectMessage';
import { GetSubject, DeleteSubject } from '@/backend/feature/subject';
import AddSubjectForm from '@/app/admin/subject/addSubjectForm';
import EditSubjectForm from '@/app/admin/subject/editSubjectForm';
import OverlapForm from '@/components/Form/overlapForm';

//Button
import DeleteButton from '@/components/Button/deleteButton';
import EditButton from '@/components/Button/editButton';
import AddButton from '@/components/Button/addButton';

const DefaultErrorMessage: ISubjectError = {
  status: true,
  subjectIDError: null,
  subjectNameError: null,
  subjectFileError: null,
  systemError: null,
};

const SubjectManagement = ({ data }) => {
  const [grade, setGrade] = useState<ISubject[]>(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('Thêm môn học');
  const [currentForm, setCurrentForm] = useState<React.FC>(
    () => AddSubjectForm,
  );
  const [errorEdit, setErrorEdit] = useState(DefaultErrorMessage);
  console.log(errorEdit);
  //Get Data
  useEffect(() => {
    const fetchData = async () => {
      const gradeData = await GetSubject();
      setGrade(gradeData);
    };
    fetchData();
  }, []);

  // Add Category Form
  const handleAddModal = (FormComponent: React.FC) => {
    setCurrentForm(() => FormComponent);
    setIsModalOpen(true);
    setModalHeader('Thêm môn học');
  };

  // Edit category Form
  const handleEditModal = (
    FormComponent: React.FC<{ data: ISubject }>,
    subject,
  ) => {
    setCurrentForm(() => <FormComponent data={subject} />);
    setIsModalOpen(true);
    setModalHeader('Chỉnh sửa môn học');
  };

  return (
    <section className="antialiase overflow-y-auto px-4 pt-5 lg:px-8">
      <h2
        id="header"
        className="font-manrope text-center text-2xl font-bold text-black dark:text-white min-[890px]:text-left"
      >
        Quản lý môn học
      </h2>

      <div className="x grid grid-cols-1 gap-4 sm:mb-5 min-[890px]:grid-cols-2">
        <div />
        <div className="flex flex-col gap-2.5 min-[890px]:flex-row ">
          <AddButton
            onClick={() => handleAddModal(AddSubjectForm)}
            buttonName="Thêm Danh Mục"
          />
        </div>
      </div>

      <div className="relative max-h-[65vh] flex-col overflow-auto ">
        <table id="table" className="w-full">
          <thead className="text-gray-400 sticky top-0 bg-slate-200 text-left text-xs uppercase dark:bg-slate-700 dark:text-white">
            <tr>
              <th id="imageHead" className="w-[100px]  text-center">
                Hình ảnh
              </th>
              <th id="nameHead" className="px-4 py-3">
                Tên môn học
              </th>
              <th id="descriptionHead" className="w-[12rem] px-4 py-3">
                Mô tả
              </th>
              <th id="managerOptionHead" className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="h-[50px] items-center divide-y">
            {grade.map((gradeData, index) => (
              <tr
                key={index}
                className="dark:border-gray-700 border-b border-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600"
              >
                <td className="px-4 py-3">
                  <Image
                    id="image"
                    width={100}
                    height={0}
                    src={gradeData.subjectImage}
                    alt="hinhanh"
                    priority={true}
                  />
                </td>
                <td id="name" className="px-4">
                  {gradeData.subjectName}
                </td>
                <td id="description" className="px-4">
                  {gradeData.subjectDescription}
                </td>
                <td>
                  <div
                    id="managerOption"
                    className="flex items-center justify-end px-4 py-3"
                  >
                    <EditButton
                      onClick={() =>
                        handleEditModal(EditSubjectForm, gradeData)
                      }
                    />

                    <DeleteButton
                      onClick={async () =>
                        await DeleteSubject(gradeData.subjectID, setErrorEdit)
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {OverlapForm(isModalOpen, setIsModalOpen, currentForm, modalHeader)}
    </section>
  );
};

export default SubjectManagement;
