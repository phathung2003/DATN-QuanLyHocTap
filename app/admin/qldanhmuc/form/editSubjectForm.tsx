'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import SchemaSubject from '@/backend/validationSchema/category/subjectSchema';
import {
  EditSubject,
  ResetError,
  DeleteCategory,
} from '@/app/admin/qldanhmuc/process/category';
import { ISubject } from '@/backend/models/data/ISubject';
import { SubjectEditDefaultValue } from '@/backend/defaultData/subject';
import { ICategoryError } from '@/backend/models/messages/ICategoryMessage';

//Icon
import DeleteIcon from '@/asset/vector/trashcan-red.svg';
import UploadIcon from '@/asset/vector/upload.svg';

const DefaultErrorMessage: ICategoryError = {
  status: true,
  categoryNameError: null,
  categoryImageError: null,
  systemError: null,
};

const EditSubjectForm: React.FC<{ data: ISubject }> = (subjectInfo) => {
  const [errorEdit, setErrorEdit] = useState(DefaultErrorMessage);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Formik
      initialValues={SubjectEditDefaultValue(subjectInfo.data)}
      validationSchema={SchemaSubject}
      onSubmit={(editData) =>
        EditSubject(editData, subjectInfo.data, setErrorEdit)
      }
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
                ResetError(event, setFieldValue, setErrorEdit, setPreview)
              }
              className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <div>
              <p id="subjectName_ErrorText">{errorEdit.categoryNameError}</p>
              <ErrorMessage id="subjectName_EditError" name="subjectName" />
            </div>
          </div>

          <div id="subjectDescription_Edit">
            <label
              htmlFor="subjectDescription_EditInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Mô tả
            </label>

            <Field
              id="subjectDescription_EditInput"
              name="subjectDescription"
              type="text"
              className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <div>
              <ErrorMessage
                id="subjectDescription_EditError"
                name="subjectDescription"
              />
            </div>
          </div>

          <div id="subjectImage_Edit">
            <label
              htmlFor="subjectImage_EditInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
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
                        className="max-h-60"
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
                      ResetError(event, setFieldValue, setErrorEdit, setPreview)
                    }
                  />
                </div>
              </label>
            </div>
            <div>
              <p id="subjectImage_EditError">{errorEdit.categoryImageError}</p>
              <ErrorMessage id="subjectImage_EditError" name="subjectFile" />
            </div>
          </div>
          <p>{errorEdit.systemError}</p>

          <div className="flex items-center space-x-4">
            <button
              id="subject_EditSumbitButton"
              type="submit"
              className="focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Cập nhật
            </button>
            <button
              type="button"
              id="subject_DeleteButton"
              onClick={async () =>
                await DeleteCategory(
                  subjectInfo.data.subjectID,
                  'subject',
                  setErrorEdit,
                )
              }
              className="inline-flex items-center rounded-lg border border-rose-600 px-5 py-2.5 text-center text-sm font-medium text-rose-600 hover:bg-rose-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-rose-300 dark:border-rose-500 dark:text-rose-500 dark:hover:bg-rose-600 dark:hover:text-white dark:focus:ring-rose-900"
            >
              <DeleteIcon className="hover:text-whitedark:text-rose-500 stroke-current text-rose-700 dark:hover:text-white" />
              Xóa
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditSubjectForm;
