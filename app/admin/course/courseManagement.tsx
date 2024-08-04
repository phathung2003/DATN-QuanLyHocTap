'use client';
import React, { useState, useEffect } from 'react';
import AddCourseForm from '@/app/admin/course/addCourseForm';
import DeleteModal from '@/components/Modal/DeleteModal';

import ICourse from '@/backend/models/data/ICourse';
import OverlapForm from '@/components/Form/overlapForm';
import { SearchCourse } from '@/backend/feature/course';
//Icon
import SearchBar from '@/components/Field/searchBar';
import AddButton from '@/components/Button/addButton';
import DeleteButton from '@/components/Button/deleteButton';
import DetailButton from '@/components/Button/detailButton';
// import EditButton from '@/components/Button/editButton';

const CourseManagement: React.FC<{ courseList: ICourse[] }> = ({
  courseList,
}) => {
  const [searchCourse, setSearchCourse] = useState<ICourse[]>(courseList);
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('Thêm cấp bậc học');
  const [currentForm, setCurrentForm] = useState<React.FC>(() => AddCourseForm);

  //Tìm kiếm
  useEffect(() => {
    setSearchCourse(SearchCourse(search, courseList));
  }, [search, courseList]);

  // Add Category Form
  const handleOpenAddModal = (FormComponent: React.FC) => {
    setCurrentForm(() => FormComponent);
    setIsModalOpen(true);
    setModalHeader('Thêm khóa học');
  };

  // Edit category Form
  // eslint-disable-next-line
  const handleCourseEditClick = (
    FormComponent: React.FC<{ data: ICourse }>,
    course,
  ) => {
    setCurrentForm(() => <FormComponent data={course} />);
    setIsModalOpen(true);
    setModalHeader('Chỉnh sửa cấp bậc');
  };

  //state for Delete modal
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const handleDelete = () => {
    setIsDelModalOpen(true);
  };

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
            onClick={() => handleOpenAddModal(AddCourseForm)}
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

          <tbody className="h-[50px] items-center divide-y">
            {searchCourse.map((data, index) => (
              <tr
                key={index}
                className="dark:border-gray-700 border-b border-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600"
              >
                <td id="gradeID" className="w-[30px] text-center">
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
                    {/* <div>
                      <EditButton
                        onClick={() => handleEditClick(FormEditBlog)}
                      />
                    </div> */}

                    <DetailButton
                      link={`/admin/course/${data.courseID}`}
                      buttonName="Chi tiết"
                    />

                    <div className="ml-4">
                      <DeleteButton onClick={() => handleDelete()} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {OverlapForm(isModalOpen, setIsModalOpen, currentForm, modalHeader)}
      <DeleteModal
        isOpen={isDelModalOpen}
        onClose={() => setIsDelModalOpen(false)}
      />
    </section>
  );
};

export default CourseManagement;
