'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { DefaultSubjectValue } from '@/backend/defaultData/subject';
import { AddSubject, ResetError } from '@/backend/feature/subject';
import { DefaultSubjectErrorValue } from '@/backend/defaultData/subject';
import SchemaSubject from '@/backend/validationSchema/subject/subjectSchema';
import FormikShowError from '@/components/element/notification/formikForm';
import BottomFormError from '@/components/element/notification/bottomForm';

//Icon
import UploadIcon from '@/public/vector/upload.svg';
import AddSubmitButton from '@/components/element/button/addSubmitButton';

const AddSubjectForm: React.FC = () => {
  const [error, setError] = useState(DefaultSubjectErrorValue());
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Formik
      initialValues={DefaultSubjectValue()}
      validationSchema={SchemaSubject}
      onSubmit={(data) => AddSubject(data, setError)}
    >
      {({ setFieldValue }) => (
        <Form>
          <div id="subjectName_Add">
            <label
              htmlFor="subjectName_AddInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Tên môn học
            </label>

            <Field
              id="subjectName_AddInput"
              name="subjectName"
              type="text"
              placeholder="Điền tên môn học..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(event, setFieldValue, setError, setPreview)
              }
              className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <FormikShowError
              type={'Add'}
              filedName={'subjectName'}
              errorMessage={error.subjectNameError}
            />
          </div>

          <div id="subjectDescription_Add">
            <label
              htmlFor="subjectDescription_AddInput"
              className="text-gray-900 mb-2 mt-3 block text-sm font-medium dark:text-white"
            >
              Mô tả
            </label>

            <Field
              id="subjectDescription_AddInput"
              name="subjectDescription"
              type="text"
              placeholder="Điền vào mô tả..."
              className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <FormikShowError
              type={'Add'}
              filedName={'subjectDescription'}
              errorMessage={null}
            />
          </div>

          <div id="subjectFile_Add">
            <label
              htmlFor="subjectFile_AddInput"
              className="text-gray-900 mb-2 mt-3 block text-sm font-medium dark:text-white"
            >
              Hình ảnh
            </label>

            <div className="mb-2 flex w-full items-center justify-center">
              <label
                htmlFor="subjectFile_AddInput"
                className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:hover:border-slate-500 dark:hover:bg-slate-600"
              >
                <div className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:hover:border-slate-500 dark:hover:bg-slate-600">
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    {preview ? (
                      <div className="relative h-[200px] w-[500px]">
                        <Image
                          src={preview}
                          alt="Preview"
                          fill
                          style={{ objectFit: 'contain' }}
                          sizes="(max-width: 500px) 100vw, 500px"
                          loading="lazy"
                        />
                      </div>
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
                    id="subjectFile_AddInput"
                    type="file"
                    name="subjectFile"
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
              filedName={'subjectFile'}
              errorMessage={error.subjectFileError}
            />
          </div>

          <BottomFormError type={'Add'} errorMessage={error.systemError} />
          <div className="mt-7">
            <AddSubmitButton buttonName="Thêm môn học mới" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddSubjectForm;
