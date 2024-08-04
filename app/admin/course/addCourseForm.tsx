'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Formik, Form, Field } from 'formik';
import SchemaCourse from '@/backend/validationSchema/course/courseSchema';
import { DefaultCourseValue } from '@/backend/defaultData/course';
import { AddCourse, ResetError } from '@/backend/feature/course';
import { ICourseError } from '@/backend/models/messages/ICourseMessage';
import { GetSubject, GetGrade } from '@/app/admin/qlbaihoc/process/getData';
import { ISubject } from '@/backend/models/data/ISubject';
import { IGrade } from '@/backend/models/data/IGrade';

//Icon
import UploadIcon from '@/public/vector/upload.svg';
import AddSubmitButton from '@/components/Button/addSubmitButton';
import FormikShowError from '@/components/ErrorMessage/formikForm';
import BottomFormError from '@/components/ErrorMessage/bottomForm';

const DefaultErrorMessage: ICourseError = {
  status: true,
  courseNameError: null,
  courseGradeError: null,
  courseSubjectError: null,
  courseDescriptionError: null,
  courseImageError: null,
  courseFileError: null,
  systemError: null,
};

const AddCourseForm: React.FC = () => {
  const [error, setError] = useState(DefaultErrorMessage);
  const [preview, setPreview] = useState<string | null>(null);
  const [gradeList, setGradeList] = useState<IGrade[]>();
  const [subjectList, setSubjectList] = useState<ISubject[]>();

  //Get Data
  useEffect(() => {
    const fetchData = async () => {
      const subjectData = await GetSubject();
      const gradeData = await GetGrade();
      setGradeList(gradeData);
      setSubjectList(subjectData);
    };
    fetchData();
  }, []);

  return (
    <Formik
      initialValues={DefaultCourseValue}
      validationSchema={SchemaCourse}
      onSubmit={(data) => AddCourse(data, setError)}
    >
      {({ setFieldValue }) => (
        <Form>
          <div id="gradeName_Add">
            <label
              htmlFor="courseName_AddInput"
              className="text-gray-900 mb-3 block text-sm font-medium dark:text-white"
            >
              Tên khóa học
            </label>

            <Field
              id="courseName_AddInput"
              name="courseName"
              type="text"
              placeholder="Điền tên khóa học..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(event, setFieldValue, setError, setPreview)
              }
              className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <FormikShowError
              type={'Add'}
              filedName={'courseName'}
              errorMessage={error.courseNameError}
            />
          </div>

          <div className=" grid gap-4 sm:grid-cols-2">
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
                {subjectList?.map((data) => {
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
                <option value="Default">Chọn khóa học</option>
                {gradeList?.map((data) => {
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

          <div id="courseDescription_Add">
            <label
              htmlFor="courseDescription_AddInput"
              className="text-gray-900 mt-3 block text-sm font-medium dark:text-white"
            >
              Mô tả
            </label>

            <Field
              id="courseDescription_AddInput"
              name="courseDescription"
              type="text"
              placeholder="Điền vào mô tả..."
              className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <FormikShowError
              type={'Add'}
              filedName={'courseDescription'}
              errorMessage={null}
            />
          </div>

          <div id="courseFile_Add">
            <label
              htmlFor="courseFile_AddInput"
              className="text-gray-900 mb-3 mt-3 block text-sm font-medium dark:text-white"
            >
              Hình ảnh
            </label>

            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="gradeFile_AddInput"
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
                      <div className="flex flex-col items-center justify-center">
                        <UploadIcon />
                        <p className="text-gray-500 dark:text-gray-400 mb-3 text-sm">
                          <span className="font-semibold">Ấn để tải hình</span>
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                          Định dạng theo PNG, JPG, JPEG
                        </p>
                      </div>
                    )}
                  </div>
                  <Field
                    id="courseFile_AddInput"
                    type="file"
                    name="courseFile"
                    value={undefined}
                    className="hidden"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      ResetError(event, setFieldValue, setError, setPreview);
                    }}
                  />
                </div>
              </label>
            </div>
            <FormikShowError
              type={'Add'}
              filedName={'courseFile'}
              errorMessage={error.courseFileError}
            />
          </div>

          <BottomFormError type={'Add'} errorMessage={error.systemError} />
          <div className="mt-4">
            <AddSubmitButton buttonName="Thêm danh mục mới" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddCourseForm;
