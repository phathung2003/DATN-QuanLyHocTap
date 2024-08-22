'use client';
import React, { useState, useEffect } from 'react';
import { SearchCourse, DeleteCourse } from '@/backend/feature/content/course';
import ICourse from '@/backend/models/data/ICourse';

//Form
import AddCourseForm from '@/components/form/content/course/addCourseForm';
import EditCourseForm from '@/components/form/content/course/editCourseForm';
import OverlapForm from '@/components/form/overlapForm';
import DeleteForm from '@/components/form/deleteModal';

//Button
import AddButton from '@/components/element/button/addButton';
import DeleteButton from '@/components/element/button/deleteButton';
import DetailButton from '@/components/element/button/detailButton';
import EditButton from '@/components/element/button/editButton';
import SearchBar from '@/components/element/field/searchBar';

interface EditCourseComponent {
  courseID: string;
  data: ICourse;
}

const CourseManagement: React.FC<{ courseList: ICourse[] }> = ({
  courseList,
}) => {
  const [searchCourse, setSearchCourse] = useState<ICourse[]>(courseList);
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('Thêm cấp bậc học');
  const [currentForm, setCurrentForm] = useState<React.FC>(() => AddCourseForm);
  const [deleteID, setDeleteID] = useState<string>('');

  //Tìm kiếm
  useEffect(() => {
    setSearchCourse(SearchCourse(search, courseList));
  }, [search, courseList]);

  //Add form
  const handleOpenModal = (FormComponent: React.FC, title: string) => {
    setCurrentForm(() => FormComponent);
    setIsModalOpen(true);
    setModalHeader(title);
  };

  //Delete Form
  const handleDelete = (ID: string) => {
    setIsDeleteModalOpen(true);
    setDeleteID(ID);
  };

  // Edit category Form
  const handleOpenEditModal = (
    FormComponent: React.FC<EditCourseComponent>,
    courseID: string,
    contentData,
  ) => {
    setCurrentForm(() => (
      <FormComponent courseID={courseID} data={contentData} />
    ));
    setIsModalOpen(true);
    setModalHeader('Chỉnh sửa khóa học');
  };

  //state for Delete modal

  return (
    <section className="antialiase overflow-y-auto px-4 lg:px-8">
      <h2
        id="header"
        className="font-manrope mb-2 mt-2 text-center text-2xl font-bold text-black dark:text-white min-[890px]:text-left"
      >
        Quản lý khóa học
      </h2>

      <div className="x mt-3 grid grid-cols-1 gap-4 sm:mb-5 min-[890px]:grid-cols-2">
        <SearchBar onChange={(e) => setSearch(e.target.value)} />

        <div className="flex flex-col gap-2.5 min-[890px]:flex-row ">
          <AddButton
            onClick={() => handleOpenModal(AddCourseForm, 'Thêm khóa học')}
            buttonName="Thêm khóa học"
          />
        </div>
      </div>

      <div className="relative max-h-[65vh] flex-col overflow-auto">
        <table id="table" className="w-full">
          <thead className="text-gray-400 sticky top-0 bg-slate-200 text-left text-xs uppercase dark:bg-slate-700 dark:text-white">
            <tr>
              <th id="idHead" className="w-[30px] text-center">
                ID
              </th>
              <th id="nameHead" className="px-4 py-3">
                Tiêu đề
              </th>
              <th id="subjectHead" className="w-[12rem] px-4 py-3">
                Tác giả
              </th>
              <th id="gradeHead" className="w-[12rem] px-4 py-3">
                Ngày tạo
              </th>
              <th id="managerOptionHead" className="px-4 py-3"></th>
            </tr>
          </thead>

          {searchCourse.length == 0 ? (
            <tbody>
              <tr>
                <td colSpan={5}>
                  <p className="mt-4 flex w-full justify-center text-lg font-bold">
                    Không có khóa học nào
                  </p>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="h-[50px] items-center divide-y">
              {searchCourse.map((data, index) => (
                <tr
                  key={index}
                  className="dark:border-gray-700 border-b border-slate-200 text-sm text-slate-800 hover:bg-slate-300 dark:text-slate-200 dark:hover:bg-slate-600"
                >
                  <td id="gradeID" className="w-[50px] text-center text-sm">
                    {data.courseID}
                  </td>

                  <td id="name" className="px-4">
                    {data.courseName}
                  </td>

                  <td id="subject" className="px-4">
                    {data.courseAuthor}
                  </td>

                  <td id="grade" className="px-3">
                    {data.courseUploadDate != null ? (
                      <p>{`${data.courseUploadDate}`}</p>
                    ) : (
                      <p>Không xác định</p>
                    )}
                  </td>

                  <td>
                    <div
                      id="managerOption"
                      className="flex items-center justify-end py-3"
                    >
                      <div>
                        <EditButton
                          onClick={() =>
                            handleOpenEditModal(
                              EditCourseForm,
                              data.courseID ?? '',
                              data,
                            )
                          }
                        />
                      </div>

                      <DetailButton
                        link={`/admin/course/${data.courseID}`}
                        buttonName="Chi tiết"
                      />

                      <div className="ml-4">
                        <DeleteButton
                          onClick={() => handleDelete(data.courseID ?? '')}
                        />
                      </div>
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
        async () => await DeleteCourse(deleteID, true),
      )}
      {OverlapForm(isModalOpen, setIsModalOpen, currentForm, modalHeader)}
    </section>
  );
};

export default CourseManagement;
