'use client';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import Image from 'next/image';
import { IGrade } from '@/backend/models/data/IGrade';
import { ISubject } from '@/backend/models/data/ISubject';
import { CourseEditDefaultValue } from '@/backend/defaultData/course';
import { EditCourse, ResetError, DeleteCourse } from '@/backend/feature/course';
import SchemaCourse from '@/backend/validationSchema/course/courseSchema';
import FormikShowError from '@/components/ErrorMessage/formikForm';
import BottomFormError from '@/components/ErrorMessage/bottomForm';
import ICourse from '@/backend/models/data/ICourse';
import IUnit from '@/backend/models/data/IUnit';
import { SearchUnit, DeleteUnit } from '@/backend/feature/unit';
import AddUnitForm from '@/app/admin/course/[courseID]/addUnitForm';
import OverlapForm from '@/components/Form/overlapForm';
import { DefaultCourseErrorValue } from '@/backend/defaultData/course';
//Icon
import SubmitButton from '@/components/Button/submitButton';

//Button
import DeleteButton from '@/components/Button/deleteButton';
import AddButton from '@/components/Button/addButton';
import SearchBar from '@/components/Field/searchBar';
import DetailButton from '@/components/Button/detailButton';

interface UnitProperties {
  courseID: string;
}

const CourseDetail: React.FC<{
  courseID: string;
  courseInfo: ICourse;
  unitList: IUnit[];
  grade: IGrade[];
  subject: ISubject[];
}> = ({ courseID, courseInfo, unitList, grade, subject }) => {
  const [error, setError] = useState(DefaultCourseErrorValue());
  const [preview, setPreview] = useState<string | null>(null);
  const [searchUnit, setSearchUnit] = useState<IUnit[]>(unitList);
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('Thêm cấp bậc học');
  const [currentForm, setCurrentForm] = useState<React.FC>(() => AddUnitForm);

  //Tìm kiếm
  useEffect(() => {
    setSearchUnit(SearchUnit(search, unitList));
  }, [search, unitList]);

  // Add Unit Form
  const handleOpenAddModal = (FormComponent: React.FC<UnitProperties>) => {
    const WrappedFormComponent = () => <FormComponent courseID={courseID} />;
    setCurrentForm(() => WrappedFormComponent);
    setIsModalOpen(true);
    setModalHeader('Thêm bài học');
  };

  return (
    <section className="antialiase overflow-y-auto px-4 lg:px-8">
      <div className="mb-3 flex items-center justify-between">
        <h2
          id="header"
          className="font-manrope text-2xl font-bold text-black dark:text-white"
        >
          Chi tiết khóa học
        </h2>
        <h1 id="courseID" className="text-black dark:text-white">
          Mã khóa học: {courseID}
        </h1>
      </div>

      <div>
        <Formik
          initialValues={CourseEditDefaultValue(courseInfo)}
          validationSchema={SchemaCourse}
          onSubmit={(editData) => EditCourse(editData, courseInfo, setError)}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="flex">
                {/* Nửa trái */}
                <div className="flex w-[40%] items-start">
                  <div className="relative w-full">
                    <div id="courseImage_Edit">
                      <div className="mb-4 flex w-full items-center justify-center">
                        <label
                          htmlFor="courseImage_EditInput"
                          className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:hover:border-slate-500 dark:hover:bg-slate-600"
                        >
                          <div className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:hover:border-slate-500 dark:hover:bg-slate-600">
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                              {preview ? (
                                <Image
                                  src={preview}
                                  alt="Preview"
                                  width={200}
                                  height={240}
                                  className="max-h-60"
                                />
                              ) : (
                                <Image
                                  src={
                                    courseInfo.courseImage
                                      ? courseInfo.courseImage
                                      : ''
                                  }
                                  alt="Current Image"
                                  width={200}
                                  height={240}
                                  className="max-h-60"
                                />
                              )}
                            </div>
                            <Field
                              id="courseImage_EditInput"
                              type="file"
                              name="courseImage"
                              className="hidden"
                              value={undefined}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>,
                              ) =>
                                ResetError(
                                  event,
                                  setFieldValue,
                                  setError,
                                  setPreview,
                                )
                              }
                            />
                          </div>
                        </label>
                      </div>
                      <FormikShowError
                        type={'Edit'}
                        filedName={'courseImage'}
                        errorMessage={error.courseImageError}
                      />
                    </div>
                    <p id="authorName">Người tạo: {courseInfo.courseAuthor}</p>
                    <p id="createDate">
                      Tạo lúc: {` ${courseInfo.courseUploadDate}`}
                    </p>
                    <p id="lastUpdateDate">
                      Chỉnh sửa lần cuối:
                      {courseInfo.courseLastEditDate
                        ? `${courseInfo.courseLastEditDate}`
                        : ' Chưa thực hiện chỉnh sửa'}
                    </p>
                  </div>
                </div>

                {/* Nửa phải */}
                <div className="ml-2 flex w-[60%]">
                  <div className="relative w-full">
                    <div id="courseName_Edit">
                      <label
                        htmlFor="courseName_EditInput"
                        className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                      >
                        Tên khóa học
                      </label>

                      <Field
                        id="courseName_EditInput"
                        name="courseName"
                        type="text"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) =>
                          ResetError(event, setFieldValue, setError, setPreview)
                        }
                        className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
                      />
                      <FormikShowError
                        type={'Edit'}
                        filedName={'courseName'}
                        errorMessage={error.courseNameError}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div id="courseSubject_Add">
                        <label
                          htmlFor="courseGrade_AddInput"
                          className="text-gray-900 mb-3 block text-sm font-medium dark:text-white"
                        >
                          Môn học
                        </label>

                        <Field
                          id="courseSubject_AddInput"
                          name="courseSubject"
                          as="select"
                          className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
                        >
                          <option value="Default">Chọn môn học</option>
                          {subject?.map((data) => {
                            return (
                              <option
                                id={data.subjectName}
                                key={data.subjectID}
                                value={data.subjectID}
                              >
                                {data.subjectName}
                              </option>
                            );
                          })}
                        </Field>
                        <div>
                          <FormikShowError
                            type={'Add'}
                            filedName={'courseSubject'}
                            errorMessage={null}
                          />
                        </div>
                      </div>

                      <div id="courseGrade_Add">
                        <label
                          htmlFor="courseGrade_AddInput"
                          className="text-gray-900 mb-3 block text-sm font-medium dark:text-white"
                        >
                          Cấp độ
                        </label>

                        <Field
                          id="courseGrade_AddInput"
                          name="courseGrade"
                          as="select"
                          className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
                        >
                          <option value="Default">Chọn cấp độ</option>
                          {grade?.map((data) => {
                            return (
                              <option
                                id={data.gradeName}
                                key={data.gradeID}
                                value={data.gradeID}
                              >
                                {data.gradeName}
                              </option>
                            );
                          })}
                        </Field>
                        <div>
                          <FormikShowError
                            type={'Add'}
                            filedName={'courseGrade'}
                            errorMessage={null}
                          />
                        </div>
                      </div>
                    </div>

                    <div id="courseDescription_Edit">
                      <label
                        htmlFor="courseDescription_EditInput"
                        className="text-gray-900 mb-2 mt-2 block text-sm font-medium dark:text-white"
                      >
                        Mô tả
                      </label>

                      <Field
                        id="courseDescription_EditInput"
                        name="courseDescription"
                        type="text"
                        className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                      />
                      <FormikShowError
                        type={'Edit'}
                        filedName={'courseDescription'}
                        errorMessage={error.courseDescriptionError}
                      />
                    </div>

                    <BottomFormError
                      type={'Edit'}
                      errorMessage={error.systemError}
                    />

                    <div className="flex justify-end space-x-4">
                      <SubmitButton buttonName="Cập nhật" />
                      <DeleteButton
                        onClick={async () =>
                          await DeleteCourse(courseID, setError)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="mt-10">
        <div>
          <h2
            id="header"
            className="font-manrope my-3 text-2xl font-bold text-black dark:text-white"
          >
            Danh sách bài học
          </h2>
        </div>
        <div className="x mt-3 grid grid-cols-1 gap-4 sm:mb-5 min-[890px]:grid-cols-2">
          <SearchBar onChange={(e) => setSearch(e.target.value)} />

          <div className="flex flex-col gap-2.5 min-[890px]:flex-row ">
            <AddButton
              onClick={() => handleOpenAddModal(AddUnitForm)}
              buttonName="Thêm Bài Học"
            />
          </div>
        </div>
        <div className="flex max-h-[65vh] flex-col overflow-auto">
          <table id="table" className="w-full">
            <thead className="text-gray-400 sticky top-0 bg-slate-200 text-left text-xs uppercase dark:bg-slate-700 dark:text-white">
              <tr>
                <th id="idHead" className="w-[30px] text-center">
                  STT
                </th>
                <th id="nameHead" className="px-4 py-3">
                  Tên bài học
                </th>
                <th id="createAtHead" className="w-[13rem] px-4 py-3">
                  Ngày tạo
                </th>
                <th id="LastUpdateHead" className="w-[13rem] px-4 py-3">
                  Chỉnh sửa lần cuối
                </th>
                <th id="managerOptionHead" className="w-[12rem] px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="h-[50px] items-center divide-y">
              {searchUnit.map((unitData, index) => (
                <tr
                  key={index}
                  className="dark:border-gray-700 border-b border-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600"
                >
                  <td id="unitID" className="w-[30px] text-center">
                    {index}
                  </td>

                  <td id="name" className="px-4">
                    {unitData.unitName}
                  </td>
                  <td id="createAt" className="px-4">
                    {`${unitData.unitUploadDate}`}
                  </td>
                  <td id="editAt" className="px-4">
                    {!unitData.unitLastEditDate
                      ? 'Chưa chỉnh sửa'
                      : `${unitData.unitLastEditDate}`}
                  </td>
                  <td>
                    <div
                      id="managerOption"
                      className="flex items-center justify-end px-4 py-3"
                    >
                      <DetailButton
                        link={`/admin/course/${courseID}/unit/${unitData.unitID}`}
                        buttonName="Chi tiết"
                      />
                      <div className="ml-4">
                        <DeleteButton
                          onClick={async () =>
                            await DeleteUnit(
                              courseID,
                              unitData.unitID ?? '',
                              null,
                            )
                          }
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {OverlapForm(isModalOpen, setIsModalOpen, currentForm, modalHeader)}
    </section>
  );
};

export default CourseDetail;
