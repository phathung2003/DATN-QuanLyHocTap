'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import SchemaCourse from '@/backend/validationSchema/course/courseSchema';
import { DefaultCourseValue } from '@/backend/defaultData/course';
import { handelSubmit, ResetError } from '@/app/admin/qlbaihoc/process/course';
import { ICourseError } from '@/backend/models/messages/ICourseMessage';

//Icon
import UploadIcon from '@/public/vector/upload.svg';
import PlusIcon from '@/public/vector/plus-black.svg';

const DefaultErrorMessage: ICourseError = {
  status: true,
  courseNameError: null,
  courseGradeError: null,
  courseSubjectError: null,
  courseDescriptionError: null,
  courseImageError: null,
  systemError: null,
};

const AddCollection: React.FC = () => {
  const [error, setError] = useState(DefaultErrorMessage);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Formik
      initialValues={DefaultCourseValue}
      validationSchema={SchemaCourse}
      onSubmit={(data) => handelSubmit(data, setError)}
    >
      {({ setFieldValue }) => (
        <Form>
          <div id="courseName_Add" className="mb-5">
            <label
              htmlFor="courseName_AddInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Tên bài học
            </label>

            <Field
              id="courseName_AddInput"
              name="courseName"
              type="text"
              placeholder="Điền vào tên danh mục bài học..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(event, setFieldValue, setError, setPreview)
              }
              className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <div>
              <p id="courseName_AddError">{error.courseNameError}</p>
              <ErrorMessage id="courseName_AddError" name="courseName" />
            </div>
          </div>

          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div id="courseSubject_Add">
              <label
                htmlFor="courseGrade_AddInput"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Trình độ <span className="text-rose-600" />
              </label>

              <Field
                id="courseSubject_AddInput"
                name="courseSubject"
                as="select"
                className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              >
                <option value="Default">Chọn mục</option>
                <option value="Subject">Dễ</option>
                <option value="Grade">Khó</option>
              </Field>
              <div>
                <ErrorMessage
                  id="courseSubject_AddError"
                  name="courseSubject"
                />
              </div>
            </div>

            <div id="courseGrade_Add">
              <label
                htmlFor="courseGrade_AddInput"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Khóa học
              </label>

              <Field
                id="courseGrade_AddInput"
                name="courseGrade"
                as="select"
                className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              >
                <option value="Default">Chọn khóa học</option>
                <option value="Subject">Khóa học chữ số</option>
                <option value="Grade">Khóa học chữ cái</option>
              </Field>
              <div>
                <ErrorMessage id="courseGrade_AddError" name="courseGrade" />
              </div>
            </div>
          </div>

          <div id="courseDescription_Add">
            <label
              htmlFor="courseDescription_AddInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
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
            <div>
              <ErrorMessage
                id="courseDescription_AddError"
                name="courseDescription"
              />
            </div>
          </div>

          <div id="courseImage_Add">
            <label
              htmlFor="courseImage_AddInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Hình ảnh
            </label>

            <div className="mb-5 flex w-full items-center justify-center">
              <label
                htmlFor="courseImage_AddInput"
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
                        <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">
                          <span className="font-semibold">Ấn để tải hình</span>
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                          Định dạng theo PNG, JPG, JPEG
                        </p>
                      </div>
                    )}
                  </div>
                  <Field
                    id="courseImage_AddInput"
                    type="file"
                    name="courseImage"
                    value={undefined}
                    className="hidden"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      ResetError(event, setFieldValue, setError, setPreview);
                    }}
                  />
                </div>
              </label>
            </div>
            <div>
              <p id="categoryImage_AddError">{error.courseImageError}</p>
              <ErrorMessage id="courseImage_AddError" name="courseImage" />
            </div>
          </div>
          <p>{error.systemError}</p>

          <Link href="/admin/qlbaihoc/add" className="">
            <button
              id="sumbit_Add"
              type="submit"
              className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-2 inline-flex items-center rounded-lg bg-lime-500 px-5 py-2.5 text-center text-sm font-medium text-slate-800 hover:bg-lime-800 focus:outline-none focus:ring-4"
            >
              <PlusIcon className="-ml-1 mr-1 h-6 w-6" />
              Tiếp tục thêm nội dung bài học mới
            </button>
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default AddCollection;