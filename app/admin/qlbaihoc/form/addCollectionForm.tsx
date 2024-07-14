'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import SchemaCollection from '@/backend/validationSchema/collection/collectionSchema';
import { DefaultCollectionValue } from '@/backend/defaultData/collection';
import {
  handelSubmit,
  ResetError,
} from '@/app/admin/qlbaihoc/process/collection';
import { ICollectionError } from '@/backend/models/messages/ICollectionMessage';

//Icon
import UploadIcon from '@/public/vector/upload.svg';
import PlusIcon from '@/public/vector/plus-black.svg';

const DefaultErrorMessage: ICollectionError = {
  status: true,
  collectionNameError: null,
  collectionGradeError: null,
  collectionSubjectError: null,
  collectionDescriptionError: null,
  collectionImageError: null,
  systemError: null,
};

const AddCollection: React.FC = () => {
  const [error, setError] = useState(DefaultErrorMessage);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Formik
      initialValues={DefaultCollectionValue}
      validationSchema={SchemaCollection}
      onSubmit={(data) => handelSubmit(data, setError)}
    >
      {({ setFieldValue }) => (
        <Form>
          <div id="collectionName_Add">
            <label
              htmlFor="collectionName_AddInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Tên danh mục bài học
            </label>

            <Field
              id="collectionName_AddInput"
              name="collectionName"
              type="text"
              placeholder="Điền vào tên danh mục bài học..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(event, setFieldValue, setError, setPreview)
              }
              className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <div>
              <p id="collectionName_AddError">{error.collectionNameError}</p>
              <ErrorMessage
                id="collectionName_AddError"
                name="collectionName"
              />
            </div>
          </div>

          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div id="collectionSubject_Add">
              <label
                htmlFor="collectionGrade_AddInput"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Môn học <span className="text-rose-600" />
              </label>

              <Field
                id="collectionSubject_AddInput"
                name="collectionSubject"
                as="select"
                className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              >
                <option value="Default">Chọn mục</option>
                <option value="Subject">Môn học</option>
                <option value="Grade">Cấp độ</option>
              </Field>
              <div>
                <ErrorMessage
                  id="collectionSubject_AddError"
                  name="collectionSubject"
                />
              </div>
            </div>

            <div id="collectionGrade_Add">
              <label
                htmlFor="collectionGrade_AddInput"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Trình độ
              </label>

              <Field
                id="collectionGrade_AddInput"
                name="collectionGrade"
                as="select"
                className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              >
                <option value="Default">Chọn mục</option>
                <option value="Subject">Môn học</option>
                <option value="Grade">Cấp độ</option>
              </Field>
              <div>
                <ErrorMessage
                  id="collectionGrade_AddError"
                  name="collectionGrade"
                />
              </div>
            </div>
          </div>

          <div id="collectionDescription_Add">
            <label
              htmlFor="collectionDescription_AddInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Mô tả
            </label>

            <Field
              id="collectionDescription_AddInput"
              name="collectionDescription"
              type="text"
              placeholder="Điền vào mô tả..."
              className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <div>
              <ErrorMessage
                id="collectionDescription_AddError"
                name="collectionDescription"
              />
            </div>
          </div>

          <div id="collectionImage_Add">
            <label
              htmlFor="collectionImage_AddInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Hình ảnh
            </label>

            <div className="mb-5 flex w-full items-center justify-center">
              <label
                htmlFor="collectionImage_AddInput"
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
                    id="collectionImage_AddInput"
                    type="file"
                    name="collectionImage"
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
              <p id="categoryImage_AddError">{error.collectionImageError}</p>
              <ErrorMessage
                id="collectionImage_AddError"
                name="collectionImage"
              />
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

export default AddCollection;
