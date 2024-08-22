'use client';
import React, { useState, useEffect } from 'react';
import { IGrade } from '@/backend/models/data/IGrade';
import { DeleteGrade, SearchGrade } from '@/backend/feature/grade';

//Form
import AddGradeForm from '@/components/form/category/grade/addGradeForm';
import EditGradeForm from '@/components/form/category/grade/editGradeForm';
import OverlapForm from '@/components/form/overlapForm';
import DeleteForm from '@/components/form/deleteModal';

//Button - Components
import DeleteButton from '@/components/element/button/deleteButton';
import EditButton from '@/components/element/button/editButton';
import AddButton from '@/components/element/button/addButton';
import SearchBar from '@/components/element/field/searchBar';

const GradeManagement = ({ data }) => {
  const [searchGrade, setSearchGrade] = useState<IGrade[]>(data);
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('Thêm cấp bậc học');
  const [currentForm, setCurrentForm] = useState<React.FC>(() => AddGradeForm);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteID, setDeleteID] = useState<string>('');

  //Tìm kiếm
  useEffect(() => {
    setSearchGrade(SearchGrade(search, data));
  }, [search, data]);

  // Add Category Form
  const handleOpenModal = (FormComponent: React.FC, title: string) => {
    setCurrentForm(() => FormComponent);
    setIsModalOpen(true);
    setModalHeader(title);
  };

  // Edit category Form
  const handleGradeEditClick = (
    FormComponent: React.FC<{ data: IGrade }>,
    grade,
  ) => {
    setCurrentForm(() => <FormComponent data={grade} />);
    setIsModalOpen(true);
    setModalHeader('Chỉnh sửa cấp bậc');
  };

  //Delete Form
  const handleDelete = (ID: string) => {
    setIsDeleteModalOpen(true);
    setDeleteID(ID);
  };

  return (
    <section className="antialiase overflow-y-auto px-4 lg:px-8">
      <h2
        id="header"
        className="font-manrope mb-2 mt-1 text-center text-2xl font-bold text-black dark:text-white min-[890px]:text-left"
      >
        Quản lý cấp độ
      </h2>

      <div className="x mt-3 grid grid-cols-1 gap-4 sm:mb-5 min-[890px]:grid-cols-2">
        <SearchBar onChange={(e) => setSearch(e.target.value)} />

        <div className="flex flex-col gap-2.5 min-[890px]:flex-row ">
          <AddButton
            onClick={() => handleOpenModal(AddGradeForm, 'Thêm cấp bậc học')}
            buttonName="Thêm cấp bậc"
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
                Tên cấp bậc
              </th>
              <th id="createAtHead" className="w-[30rem] px-4 py-3">
                Mô tả
              </th>
              <th id="managerOptionHead" className="w-[10rem] px-4 py-3"></th>
            </tr>
          </thead>

          {searchGrade.length == 0 ? (
            <tbody>
              <tr>
                <td colSpan={4}>
                  <p className="mt-4 flex w-full justify-center text-lg font-bold">
                    Không có danh mục cấp độ nào
                  </p>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="h-[50px] items-center divide-y">
              {searchGrade.map((gradeData, index) => (
                <tr
                  key={index}
                  className="dark:border-gray-700 border-b border-slate-200 text-slate-800 hover:bg-slate-300 dark:text-slate-200 dark:hover:bg-slate-600"
                >
                  <td id="gradeID" className="w-[30px] text-center text-sm">
                    {index + 1}
                  </td>

                  <td id="name" className="px-4">
                    {gradeData.gradeName}
                  </td>
                  <td id="description" className="px-4">
                    {gradeData.gradeDescription}
                  </td>
                  <td>
                    <div
                      id="managerOption"
                      className="flex items-center justify-end px-4 py-3"
                    >
                      <EditButton
                        onClick={() =>
                          handleGradeEditClick(EditGradeForm, gradeData)
                        }
                      />
                      <DeleteButton
                        onClick={() => handleDelete(gradeData.gradeID)}
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
        async () => await DeleteGrade(deleteID),
      )}
      {OverlapForm(isModalOpen, setIsModalOpen, currentForm, modalHeader)}
    </section>
  );
};

export default GradeManagement;
