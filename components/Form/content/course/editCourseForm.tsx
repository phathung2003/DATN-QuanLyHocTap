'use client';
import Image from 'next/image';
import { Formik, Form, Field } from 'formik';
import React, { useState, useEffect } from 'react';
import { IGrade } from '@/backend/models/data/IGrade';
import { GetGrade } from '@/backend/feature/grade';
import { ISubject } from '@/backend/models/data/ISubject';
import { GetSubject } from '@/backend/feature/subject';
import {
  CourseEditDefaultValue,
  DefaultCourseErrorValue,
} from '@/backend/defaultData/course';
import { EditCourse, DeleteCourse, ResetError } from '@/backend/feature/course';
import ICourse from '@/backend/models/data/ICourse';
import SchemaCourse from '@/backend/validationSchema/course/courseSchema';
import FormikShowError from '@/components/element/notification/formikForm';
import BottomFormError from '@/components/element/notification/bottomForm';

//Icon
import SubmitButton from '@/components/element/button/submitButton';
import DeleteButton from '@/components/element/button/deleteButton';
import UploadIcon from '@/public/vector/upload.svg';

interface EditCourseComponents {
  courseID: string;
  data: ICourse;
}

const EditCourseForm: React.FC<EditCourseComponents> = ({ courseID, data }) => {
  const [error, setError] = useState(DefaultCourseErrorValue());
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
      initialValues={CourseEditDefaultValue(data)}
      validationSchema={SchemaCourse}
      onSubmit={(editData) => EditCourse(editData, data, setError)}
    >
      {({ setFieldValue }) => (
        <Form>
          <div id="gradeName_Edit">
            <label
              htmlFor="courseName_EditInput"
              className="text-gray-900 mb-3 block text-sm font-medium dark:text-white"
            >
              Tên khóa học
            </label>

            <Field
              id="courseName_EditInput"
              name="courseName"
              type="text"
              placeholder="Điền tên khóa học..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(event, setFieldValue, setError, setPreview)
              }
              className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <FormikShowError
              type={'Edit'}
              filedName={'courseName'}
              errorMessage={error.courseNameError}
            />
          </div>

          <div className=" grid gap-4 sm:grid-cols-2">
            <div id="courseSubject_Edit">
              <label
                htmlFor="courseGrade_EditInput"
                className="text-gray-900 mb-3 block text-sm font-medium dark:text-white"
              >
                Môn học
              </label>

              <Field
                id="courseSubject_EditInput"
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
                  type={'Edit'}
                  filedName={'courseSubject'}
                  errorMessage={null}
                />
              </div>
            </div>

            <div id="courseGrade_Edit">
              <label
                htmlFor="courseGrade_EditInput"
                className="text-gray-900 mb-3 block text-sm font-medium dark:text-white"
              >
                Cấp độ
              </label>

              <Field
                id="courseGrade_EditInput"
                name="courseGrade"
                as="select"
                className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              >
                <option value="Default">Chọn cấp độ</option>
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
                  type={'Edit'}
                  filedName={'courseGrade'}
                  errorMessage={null}
                />
              </div>
            </div>
          </div>

          <div id="courseDescription_Edit">
            <label
              htmlFor="courseDescription_EditInput"
              className="text-gray-900 mt-3 block text-sm font-medium dark:text-white"
            >
              Mô tả
            </label>

            <Field
              id="courseDescription_EditInput"
              name="courseDescription"
              type="text"
              placeholder="Điền vào mô tả..."
              className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <FormikShowError
              type={'Edit'}
              filedName={'courseDescription'}
              errorMessage={null}
            />
          </div>

          <div id="courseFile_Edit">
            <label
              htmlFor="courseFile_EditInput"
              className="text-gray-900 mb-3 mt-3 block text-sm font-medium dark:text-white"
            >
              Hình ảnh
            </label>

            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="courseFile_EditInput"
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
                        className="max-h-60 object-contain"
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
                    id="courseFile_EditInput"
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
              type={'Edit'}
              filedName={'courseFile'}
              errorMessage={error.courseFileError}
            />
          </div>

          <BottomFormError type={'Edit'} errorMessage={error.systemError} />
          <div className="mb-2 mt-7 flex space-x-4">
            <SubmitButton buttonName="Cập nhật" />
            <DeleteButton
              onClick={async () => await DeleteCourse(courseID, true)}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditCourseForm;
