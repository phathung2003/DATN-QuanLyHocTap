'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  EditSubject,
  ResetError,
  DeleteSubject,
} from '@/backend/feature/subject';
import { ISubject } from '@/backend/models/data/ISubject';
import { SubjectEditDefaultValue } from '@/backend/defaultData/subject';
import { DefaultSubjectErrorValue } from '@/backend/defaultData/subject';
import SchemaSubject from '@/backend/validationSchema/subject/subjectSchema';
import FormikShowError from '@/components/element/notification/formikForm';
import BottomFormError from '@/components/element/notification/bottomForm';

//Icon
import SubmitButton from '@/components/element/button/submitButton';
import DeleteButton from '@/components/element/button/deleteButton';
import UploadIcon from '@/public/vector/upload.svg';

const EditSubjectForm: React.FC<{ data: ISubject }> = (subjectInfo) => {
  const [error, setError] = useState(DefaultSubjectErrorValue());
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Formik
      initialValues={SubjectEditDefaultValue(subjectInfo.data)}
      validationSchema={SchemaSubject}
      onSubmit={(editData) => EditSubject(editData, subjectInfo.data, setError)}
    >
      {({ setFieldValue }) => (
        <Form>
          <div id="subjectName_Edit">
            <label
              htmlFor="subjectName_EditInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Tên môn học <span className="text-rose-600" />
            </label>

            <Field
              id="subjectName_EditInput"
              name="subjectName"
              type="text"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(event, setFieldValue, setError, setPreview)
              }
              className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <FormikShowError
              type={'Edit'}
              filedName={'subjectName'}
              errorMessage={error.subjectNameError}
            />
          </div>

          <div id="subjectDescription_Edit">
            <label
              htmlFor="subjectDescription_EditInput"
              className="text-gray-900 mb-2 mt-2 block text-sm font-medium dark:text-white"
            >
              Mô tả
            </label>

            <Field
              id="subjectDescription_EditInput"
              name="subjectDescription"
              type="text"
              className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <FormikShowError
              type={'Edit'}
              filedName={'subjectDescription'}
              errorMessage={null}
            />
          </div>

          <div id="subjectImage_Edit">
            <label
              htmlFor="subjectImage_EditInput"
              className="text-gray-900 mb-2 mt-2 block text-sm font-medium dark:text-white"
            >
              Hình ảnh
            </label>

            <div className="mb-5 flex w-full items-center justify-center">
              <label
                htmlFor="subjectImage_EditInput"
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
                        className="max-h-60 object-cover"
                      />
                    ) : subjectInfo.data.subjectImage ==
                      process.env.NEXT_PUBLIC_SUBJECT_DEFAULT_IMAGE ? (
                      <div className="flex flex-col items-center justify-center">
                        <UploadIcon />
                        <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">
                          <span className="font-semibold">Ấn để tải hình</span>
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                          Định dạng theo PNG, JPG, JPEG
                        </p>
                      </div>
                    ) : (
                      <Image
                        src={subjectInfo.data.subjectImage}
                        alt="Current Image"
                        width={200}
                        height={240}
                        className="max-h-60"
                      />
                    )}
                  </div>
                  <Field
                    id="subjectImage_EditInput"
                    type="file"
                    name="subjectFile"
                    className="hidden"
                    value={undefined}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      ResetError(event, setFieldValue, setError, setPreview)
                    }
                  />
                </div>
              </label>
            </div>
            <FormikShowError
              type={'Edit'}
              filedName={'subjectFile'}
              errorMessage={error.subjectFileError}
            />
          </div>

          <BottomFormError type={'Edit'} errorMessage={error.systemError} />

          <div className="flex items-center space-x-4">
            <SubmitButton buttonName="Cập nhật" />
            <DeleteButton
              onClick={async () =>
                await DeleteSubject(subjectInfo.data.subjectID, setError)
              }
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditSubjectForm;
