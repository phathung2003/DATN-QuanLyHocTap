'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import SchemaCategory from '@/backend/validationSchema/category/categorySchema';
import { DefaultCategoryValue } from '@/backend/defaultData/category';

import UploadIcon from '@/asset/vector/upload.svg';
import PlusIcon from '@/asset/vector/plus-black.svg';
import {
  handelSubmit,
  ResetError,
} from '@/app/admin/qldanhmuc/process/category';
import { ICategoryError } from '@/backend/models/messages/ICategoryMessage';

const DefaultErrorMessage: ICategoryError = {
  status: true,
  categoryNameError: null,
  categoryImageError: null,
  systemError: null,
};

const AddCategory: React.FC = () => {
  const [error, setError] = useState(DefaultErrorMessage);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Formik
      initialValues={DefaultCategoryValue}
      validationSchema={SchemaCategory}
      onSubmit={(data) => handelSubmit(data, setError)}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div id="categoyName_Add">
              <label
                htmlFor="categoyName_AddInput"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Tên danh mục: <span className="text-rose-600">*</span>
              </label>

              <Field
                id="categoyName_AddInput"
                name="categoryName"
                type="text"
                placeholder="Điền vào danh mục..."
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  ResetError(event, setFieldValue, setError, setPreview)
                }
                className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              />
              <div>
                <p id="categoyName_AddErro">{error.categoryNameError}</p>
                <ErrorMessage id="categoyName_AddError" name="categoryName" />
              </div>
            </div>

            <div id="categoryType_Add">
              <label
                htmlFor="categoryType_AddInput"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Thuộc: <span className="text-rose-600">*</span>
              </label>

              <Field
                id="categoryType_AddInput"
                name="categoryType"
                as="select"
                className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              >
                <option value="Default">Chọn mục</option>
                <option value="Subject">Môn học</option>
                <option value="Grade">Cấp độ</option>
              </Field>
              <div>
                <ErrorMessage id="categoryType_AddError" name="categoryType" />
              </div>
            </div>
          </div>

          <div id="categoryDescription_Add">
            <label
              htmlFor="categoryDescription_AddInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Mô tả: <span className="text-rose-600">*</span>
            </label>

            <Field
              id="categoryDescription_AddInput"
              name="categoryDescription"
              type="text"
              placeholder="Điền vào mô tả..."
              className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <div>
              <ErrorMessage
                id="categoryDescription_AddError"
                name="categoryDescription"
              />
            </div>
          </div>

          <div id="categoryImage_Add">
            <label
              htmlFor="categoryImage_AddInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Hình ảnh
            </label>

            <div className="mb-5 flex w-full items-center justify-center">
              <label
                htmlFor="categoryImage_AddInput"
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
                    id="categoryImage_AddInput"
                    type="file"
                    name="categoryImage"
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
              <p id="categoryImage_AddError">{error.categoryImageError}</p>
              <ErrorMessage id="categoryImage_AddError" name="categoryImage" />
            </div>
          </div>
          <p>{error.systemError}</p>

          <button
            id="sumbit_Add"
            type="submit"
            className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-2 inline-flex items-center rounded-lg bg-lime-500 px-5 py-2.5 text-center text-sm font-medium text-slate-800 hover:bg-lime-800 focus:outline-none focus:ring-4"
          >
            <PlusIcon className="-ml-1 mr-1 h-6 w-6" />
            Thêm danh mục mới
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddCategory;
