'use client';
import React, { useState, useEffect } from 'react';

import { ISubject } from '@/backend/models/data/ISubject';
import { DeleteSubject, SearchSubject } from '@/backend/feature/subject';
import AddSubjectForm from '@/app/admin/subject/addSubjectForm';
import EditSubjectForm from '@/app/admin/subject/editSubjectForm';
import OverlapForm from '@/components/Form/overlapForm';
import { DefaultSubjectErrorValue } from '@/backend/defaultData/subject';
//Button
import DeleteButton from '@/components/Button/deleteButton';
import EditButton from '@/components/Button/editButton';
import AddButton from '@/components/Button/addButton';

import SearchBar from '@/components/Field/searchBar';

const SubjectManagement = ({ data }) => {
  const [searchSubject, setSearchSubject] = useState<ISubject[]>(data);
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('Thêm môn học');
  const [currentForm, setCurrentForm] = useState<React.FC>(
    () => AddSubjectForm,
  );
  // eslint-disable-next-line
  const [errorEdit, setErrorEdit] = useState(DefaultSubjectErrorValue());

  //Tìm kiếm
  useEffect(() => {
    setSearchSubject(SearchSubject(search, data));
  }, [search, data]);

  // Add Subject Form
  const handleOpenAddModal = (FormComponent: React.FC) => {
    setCurrentForm(() => FormComponent);
    setIsModalOpen(true);
    setModalHeader('Thêm môn học');
  };

  // Edit Subject Form
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
        className="font-manrope mb-2 mt-2 text-center text-2xl font-bold text-black dark:text-white min-[890px]:text-left"
      >
        Quản lý môn học
      </h2>

      <div className="x mt-3 grid grid-cols-1 gap-4 sm:mb-5 min-[890px]:grid-cols-2">
        <SearchBar onChange={(e) => setSearch(e.target.value)} />

        <div className="flex flex-col gap-2.5 min-[890px]:flex-row ">
          <AddButton
            onClick={() => handleOpenAddModal(AddSubjectForm)}
            buttonName="Thêm môn học"
          />
        </div>
      </div>

      <div className="relative max-h-[65vh] flex-col overflow-auto">
        <table id="table" className="w-full">
          <thead className="text-gray-400 sticky top-0 bg-slate-200 text-left text-xs uppercase dark:bg-slate-700 dark:text-white">
            <tr>
              <th id="idHead" className="w-[30px] text-center">
                STT
              </th>
              <th id="nameHead" className="px-4 py-3">
                Tên môn học
              </th>
              <th id="createAtHead" className="w-[30rem] px-4 py-3">
                Mô tả
              </th>
              <th id="managerOptionHead" className="w-[10rem] px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="h-[50px] items-center divide-y">
            {searchSubject.map((data, index) => (
              <tr
                key={index}
                className="dark:border-gray-700 border-b border-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600"
              >
                <td id="gradeID" className="w-[30px] text-center">
                  {index + 1}
                </td>

                <td id="name" className="px-4">
                  {data.subjectName}
                </td>
                <td id="description" className="px-4">
                  {data.subjectDescription}
                </td>
                <td>
                  <div
                    id="managerOption"
                    className="flex items-center justify-end px-4 py-3"
                  >
                    <EditButton
                      onClick={() => handleEditModal(EditSubjectForm, data)}
                    />

                    <DeleteButton
                      onClick={async () =>
                        await DeleteSubject(data.subjectID, setErrorEdit)
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
