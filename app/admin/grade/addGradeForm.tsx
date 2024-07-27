'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Formik, Form, Field } from 'formik';
import SchemaGrade from '@/backend/validationSchema/grade/gradeSchema';
import { DefaultGradeValue } from '@/backend/defaultData/grade';

import { AddGrade, ResetError } from '@/backend/feature/grade';

import { IGradeError } from '@/backend/models/messages/IGradeMessage';
import FormikShowError from '@/components/ErrorMessage/formikForm';
import BottomFormError from '@/components/ErrorMessage/bottomForm';
//Icon
import UploadIcon from '@/public/vector/upload.svg';
import AddSubmitButton from '@/components/Button/addSubmitButton';

const DefaultErrorMessage: IGradeError = {
  status: true,
  gradeIDError: null,
  gradeNameError: null,
  gradeImageError: null,
  gradeFileError: null,
  systemError: null,
};

const AddGradeForm: React.FC = () => {
  const [error, setError] = useState(DefaultErrorMessage);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Formik
      initialValues={DefaultGradeValue}
      validationSchema={SchemaGrade}
      onSubmit={(data) => AddGrade(data, setError)}
    >
      {({ setFieldValue }) => (
        <Form>
          <div id="gradeName_Add">
            <label
              htmlFor="gradeName_AddInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Tên cấp bậc học
            </label>

            <Field
              id="gradeName_AddInput"
              name="gradeName"
              type="text"
              placeholder="Điền tên của cấp bậc..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(event, setFieldValue, setError, setPreview)
              }
              className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <FormikShowError
              type={'Add'}
              filedName={'gradeName'}
              errorMessage={error.gradeNameError}
            />
          </div>

          <div id="gradeDescription_Add">
            <label
              htmlFor="gradeDescription_AddInput"
              className="text-gray-900 mb-2 mt-3 block text-sm font-medium dark:text-white"
            >
              Mô tả
            </label>

            <Field
              id="gradeDescription_AddInput"
              name="gradeDescription"
              type="text"
              placeholder="Điền vào mô tả..."
              className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <FormikShowError
              type={'Add'}
              filedName={'gradeDescription'}
              errorMessage={null}
            />
          </div>

          <div id="gradeFile_Add">
            <label
              htmlFor="gradeFile_AddInput"
              className="text-gray-900 mb-2 mt-3 block text-sm font-medium dark:text-white"
            >
              Hình ảnh
            </label>

            <div className="mb-2 flex w-full items-center justify-center">
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
                    id="gradeFile_AddInput"
                    type="file"
                    name="gradeFile"
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
              filedName={'gradeFile'}
              errorMessage={error.gradeFileError}
            />
          </div>

          <BottomFormError type={'Add'} errorMessage={error.systemError} />
          <div className="mt-7">
            <AddSubmitButton buttonName="Thêm danh mục mới" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddGradeForm;
