'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import SchemaGrade from '@/backend/validationSchema/category/gradeSchema';
import {
  EditGrade,
  ResetError,
  DeleteCategory,
} from '@/app/admin/qldanhmuc/process/category';
import { IGrade } from '@/backend/models/data/IGrade';
import { GradeEditDefaultValue } from '@/backend/defaultData/grade';
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

const EditGradeForm: React.FC<{ data: IGrade }> = (gradeInfo) => {
  const [errorEdit, setErrorEdit] = useState(DefaultErrorMessage);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Formik
      initialValues={GradeEditDefaultValue(gradeInfo.data)}
      validationSchema={SchemaGrade}
      onSubmit={(editData) => EditGrade(editData, gradeInfo.data, setErrorEdit)}
    >
      {({ setFieldValue }) => (
        <Form>
          <div id="gradeName_Edit">
            <label
              htmlFor="gradeName_EditInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Tên cấp độ <span className="text-rose-600" />
            </label>

            <Field
              id="gradeName_EditInput"
              name="gradeName"
              type="text"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(event, setFieldValue, setErrorEdit, setPreview)
              }
              className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <div>
              <p id="gradeName_ErrorText">{errorEdit.categoryNameError}</p>
              <ErrorMessage id="gradeName_EditError" name="gradeName" />
            </div>
          </div>

          <div id="gradeDescription_Edit">
            <label
              htmlFor="gradeDescription_EditInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Mô tả
            </label>

            <Field
              id="gradeDescription_EditInput"
              name="gradeDescription"
              type="text"
              className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <div>
              <ErrorMessage
                id="gradeDescription_EditError"
                name="gradeDescription"
              />
            </div>
          </div>

          <div id="gradeImage_Edit">
            <label
              htmlFor="gradeImage_EditInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Hình ảnh
            </label>

            <div className="mb-5 flex w-full items-center justify-center">
              <label
                htmlFor="gradeImage_EditInput"
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
                    ) : gradeInfo.data.gradeImage ==
                      process.env.NEXT_PUBLIC_GRADE_DEFAULT_IMAGE ? (
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
                        src={gradeInfo.data.gradeImage}
                        alt="Current Image"
                        width={200}
                        height={240}
                        className="max-h-60"
                      />
                    )}
                  </div>
                  <Field
                    id="gradeImage_EditInput"
                    type="file"
                    name="gradeFile"
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
              <p id="gradeImage_EditError">{errorEdit.categoryImageError}</p>
              <ErrorMessage id="gradeImage_EditError" name="gradeFile" />
            </div>
          </div>
          <p>{errorEdit.systemError}</p>

          <div className="flex items-center space-x-4">
            <button
              id="grade_EditSumbitButton"
              type="submit"
              className="focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Cập nhật
            </button>
            <button
              type="button"
              id="grade_DeleteButton"
              onClick={async () =>
                await DeleteCategory(
                  gradeInfo.data.gradeID,
                  'grade',
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

export default EditGradeForm;
