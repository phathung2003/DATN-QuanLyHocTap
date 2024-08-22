'use client';
import React, { useState, useEffect } from 'react';
import { SearchChildren } from '@/backend/feature/children';
//Form
import RegisterChildrenForm from '@/components/form/children/addChildren';
import OverlapForm from '@/components/form/overlapForm';
//Button
import AddButton from '@/components/element/button/addButton';
import SearchBar from '@/components/element/field/searchBar';
import { IChildrenDB } from '@/backend/models/data/IChildren';

// DS khóa học hiện có
const ChildrenManager: React.FC<{
  parentUID: string;
  childrenList: IChildrenDB[];
}> = ({ parentUID, childrenList }) => {
  const [searchChildren, setSearchChildren] =
    useState<IChildrenDB[]>(childrenList);
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('Thêm tài khoản cho trẻ');
  const [currentForm, setCurrentForm] = useState<React.FC>(
    () => RegisterChildrenForm,
  );
  // const [deleteID, setDeleteID] = useState<string>('');

  //Tìm kiếm
  useEffect(() => {
    setSearchChildren(SearchChildren(search, childrenList));
  }, [search, childrenList]);

  //Add form
  const handleOpenModal = (FormComponent) => {
    setCurrentForm(() => <FormComponent parentID={parentUID} />);
    setIsModalOpen(true);
    setModalHeader('Thêm tài khoản cho trẻ');
  };

  // //Delete Form
  // const handleDelete = (ID: string) => {
  //   setIsDeleteModalOpen(true);
  //   setDeleteID(ID);
  // };

  // // Edit category Form
  // const handleOpenEditModal = (
  //   FormComponent: React.FC<EditCourseComponent>,
  //   courseID: string,
  //   contentData,
  // ) => {
  //   setCurrentForm(() => (
  //     <FormComponent courseID={courseID} data={contentData} />
  //   ));
  //   setIsModalOpen(true);
  //   setModalHeader('Chỉnh sửa khóa học');
  // };

  //state for Delete modal
  return (
    <section className="antialiase overflow-y-auto px-4 lg:px-8">
      <h2
        id="header"
        className="font-manrope mb-2 mt-2 text-center text-2xl font-bold text-black dark:text-white min-[890px]:text-left"
      >
        Quản lý trẻ
      </h2>

      <div className="x mt-3 grid grid-cols-1 gap-4 sm:mb-5 min-[890px]:grid-cols-2">
        <SearchBar onChange={(e) => setSearch(e.target.value)} />

        <div className="flex flex-col gap-2.5 min-[890px]:flex-row ">
          <AddButton
            onClick={() => handleOpenModal(RegisterChildrenForm)}
            buttonName="Thêm tài khoản"
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
              <th id="nameHead" className="w-[20rem] px-4 py-3">
                Họ và tên
              </th>
              <th id="subjectHead" className="w-[20rem] px-4 py-3">
                Tên đăng nhập
              </th>
              <th id="managerOptionHead" className="px-4 py-3"></th>
            </tr>
          </thead>

          {searchChildren.length == 0 ? (
            <tbody>
              <tr>
                <td colSpan={4}>
                  <p className="mt-4 flex w-full justify-center text-lg font-bold">
                    Chưa có tài khoản của trẻ
                  </p>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="h-[50px] items-center divide-y">
              {searchChildren.map((data, index) => (
                <tr
                  key={index}
                  className="dark:border-gray-700 border-b border-slate-200 text-sm text-slate-800 hover:bg-slate-300 dark:hover:bg-slate-600"
                >
                  <td id="name" className="w-[50px] text-center text-sm">
                    {index + 1}
                  </td>
                  <td id="name" className="w-[20rem] px-4 text-sm">
                    {data.name}
                  </td>

                  <td id="username" className="w-[20rem] px-4">
                    {data.username}
                  </td>

                  <td>
                    <div
                      id="managerOption"
                      className="flex items-center justify-end py-3"
                    >
                      <div>
                        {/* <EditButton
                          onClick={() =>
                            handleOpenEditModal(
                              EditCourseForm,
                              data.courseID ?? '',
                              data,
                            )
                          }
                        /> */}
                      </div>

                      <div className="ml-4">
                        {/* <DeleteButton
                          onClick={() => handleDelete(data.courseID ?? '')}
                        /> */}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* {DeleteForm(
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        async () => await DeleteCourse(deleteID, true),
      )} */}
      {OverlapForm(isModalOpen, setIsModalOpen, currentForm, modalHeader)}
    </section>
  );
};

export default ChildrenManager;
