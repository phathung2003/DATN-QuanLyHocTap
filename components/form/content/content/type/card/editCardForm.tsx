'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  ResetError,
  EditCardContent,
  DeleteCardContent,
} from '@/backend/feature/content/contentType/card';
import {
  CardEditDefaultValue,
  DefaultCardErrorMessage,
} from '@/backend/defaultData/content/card';
import { ICardContent } from '@/backend/models/data/Content/ICard';
import SchemaCard from '@/backend/validationSchema/content/card/cardSchema';
import FormikShowError from '@/components/element/notification/formikForm';
import BottomFormError from '@/components/element/notification/bottomForm';

//Button - Components
import SubmitButton from '@/components/element/button/submitButton';
import DeleteButton from '@/components/element/button/deleteButton';
import UploadIcon from '@/public/vector/upload.svg';

interface ContentProperties {
  courseID: string;
  unitID: string;
  taskID: string;
  contentID: string;
  data: ICardContent;
}

const AddCardForm: React.FC<ContentProperties> = ({
  courseID,
  unitID,
  taskID,
  contentID,
  data,
}) => {
  const [error, setError] = useState(DefaultCardErrorMessage());
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Formik
      initialValues={CardEditDefaultValue(data)}
      validationSchema={SchemaCard}
      onSubmit={(editData) =>
        EditCardContent(
          courseID,
          unitID,
          taskID,
          contentID,
          editData,
          data,
          setError,
        )
      }
    >
      {({ setFieldValue }) => (
        <Form>
          <p id="contentType" className="mb-3 text-sm font-medium">
            Dạng nội dung: Card
          </p>

          <div id="text_Add" className="w-full">
            <label
              htmlFor="text_AddInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Từ
            </label>

            <Field
              id="text_AddInput"
              name="text"
              type="text"
              placeholder="Điền từ..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(event, setFieldValue, setError, setPreview)
              }
              className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <FormikShowError
              type={'Add'}
              filedName={'text'}
              errorMessage={null}
            />
          </div>

          <div id="file_Add">
            <label
              htmlFor="file_AddInput"
              className="text-gray-900 mb-3 mt-3 block text-sm font-medium dark:text-white"
            >
              Hình ảnh
            </label>

            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="file_AddInput"
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
                    ) : data.image != null ? (
                      <div className="relative h-[200px] w-[500px]">
                        <Image
                          src={data.image}
                          alt="Current Image"
                          fill
                          style={{ objectFit: 'contain' }}
                          sizes="(max-width: 500px) 100vw, 500px"
                          loading="lazy"
                        />
                      </div>
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
                    id="file_AddInput"
                    type="file"
                    name="file"
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
              filedName={'file'}
              errorMessage={error.imageError}
            />
          </div>
          <BottomFormError type={'Add'} errorMessage={error.missingContent} />
          <BottomFormError type={'Add'} errorMessage={error.systemError} />
          <div className="mt-7 flex space-x-4">
            <SubmitButton buttonName="Cập nhật" />
            <DeleteButton
              onClick={async () =>
                await DeleteCardContent(
                  courseID,
                  unitID,
                  taskID,
                  contentID,
                  data,
                )
              }
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddCardForm;
