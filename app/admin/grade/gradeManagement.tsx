'use client';
import React, { useState, useEffect } from 'react';
/* eslint-disable */
import { IGrade } from '@/backend/models/data/IGrade';
import { IGradeError } from '@/backend/models/messages/IGradeMessage';
import { DeleteGrade, SearchGrade } from '@/backend/feature/grade';
import AddGradeForm from '@/app/admin/grade/addGradeForm';
import EditGradeForm from '@/app/admin/grade/editGradeForm';
import OverlapForm from '@/components/Form/overlapForm';

//Button
import DeleteButton from '@/components/Button/deleteButton';
import EditButton from '@/components/Button/editButton';
import AddButton from '@/components/Button/addButton';

import SearchBar from '@/components/Field/searchBar';

const DefaultErrorMessage: IGradeError = {
  status: true,
  gradeIDError: null,
  gradeNameError: null,
  gradeImageError: null,
  gradeFileError: null,
  systemError: null,
};

const GradeManagement = ({ data }) => {
  const [searchGrade, setSearchGrade] = useState<IGrade[]>(data);
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('Thêm cấp bậc học');
  const [currentForm, setCurrentForm] = useState<React.FC>(() => AddGradeForm);
  // eslint-disable-next-line
  const [errorEdit, setErrorEdit] = useState(DefaultErrorMessage);

  //Tìm kiếm
  useEffect(() => {
    setSearchGrade(SearchGrade(search, data));
  }, [search, data]);

  // Add Category Form
  const handleOpenAddModal = (FormComponent: React.FC) => {
    setCurrentForm(() => FormComponent);
    setIsModalOpen(true);
    setModalHeader('Thêm cấp bậc học');
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

  return (
    <section className="antialiase overflow-y-auto px-4 lg:px-8">
      <h2
        id="header"
        className="font-manrope mb-2 mt-2 text-center text-2xl font-bold text-black dark:text-white min-[890px]:text-left"
      >
        Quản lý cấp độ
      </h2>

      <div className="x mt-3 grid grid-cols-1 gap-4 sm:mb-5 min-[890px]:grid-cols-2">
        <SearchBar onChange={(e) => setSearch(e.target.value)} />

        <div className="flex flex-col gap-2.5 min-[890px]:flex-row ">
          <AddButton
            onClick={() => handleOpenAddModal(AddGradeForm)}
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
          <tbody className="h-[50px] items-center divide-y">
            {searchGrade.map((gradeData, index) => (
              <tr
                key={index}
                className="dark:border-gray-700 border-b border-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600"
              >
                <td id="gradeID" className="w-[30px] text-center">
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
                      onClick={async () =>
                        await DeleteGrade(gradeData.gradeID, setErrorEdit)
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

export default GradeManagement;
