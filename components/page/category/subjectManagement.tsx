'use client';
import React, { useState, useEffect } from 'react';
import { ISubject } from '@/backend/models/data/ISubject';
import { DeleteSubject, SearchSubject } from '@/backend/feature/subject';

//Form
import AddSubjectForm from '@/components/form/category/subject/addSubjectForm';
import EditSubjectForm from '@/components/form/category/subject/editSubjectForm';
import OverlapForm from '@/components/form/overlapForm';
import DeleteForm from '@/components/form/deleteModal';

//Button - Components
import DeleteButton from '@/components/element/button/deleteButton';
import EditButton from '@/components/element/button/editButton';
import AddButton from '@/components/element/button/addButton';
import SearchBar from '@/components/element/field/searchBar';

const SubjectManagement = ({ data }) => {
  const [searchSubject, setSearchSubject] = useState<ISubject[]>(data);
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('Thêm môn học');
  const [currentForm, setCurrentForm] = useState<React.FC>(
    () => AddSubjectForm,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteID, setDeleteID] = useState<string>('');

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

  //Delete Form
  const handleDelete = (ID: string) => {
    setIsDeleteModalOpen(true);
    setDeleteID(ID);
  };

  return (
    <section className="antialiase overflow-y-auto px-4 pt-1 lg:px-8">
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

          {searchSubject.length == 0 ? (
            <tbody>
              <tr>
                <td colSpan={4}>
                  <p className="mt-4 flex w-full justify-center text-lg font-bold">
                    Không có danh mục môn học nào
                  </p>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="h-[50px] items-center divide-y">
              {searchSubject.map((data, index) => (
                <tr
                  key={index}
                  className="dark:border-gray-700 border-b border-slate-200 text-slate-800 hover:bg-slate-300 dark:text-slate-200 dark:hover:bg-slate-600"
                >
                  <td
                    id="gradeID"
                    className="w-[30px] text-center text-sm dark:text-slate-200"
                  >
                    {index + 1}
                  </td>

                  <td
                    id="name"
                    className="px-4 text-slate-800 dark:text-slate-200"
                  >
                    {data.subjectName}
                  </td>
                  <td
                    id="description"
                    className="px-4 text-slate-800 dark:text-slate-200"
                  >
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
                        onClick={() => handleDelete(data.subjectID)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {DeleteForm(
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        async () => await DeleteSubject(deleteID),
      )}
      {OverlapForm(isModalOpen, setIsModalOpen, currentForm, modalHeader)}
    </section>
  );
};

export default SubjectManagement;
