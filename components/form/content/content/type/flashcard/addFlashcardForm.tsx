'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  ResetError,
  AddFlashcardContent,
} from '@/backend/feature/content/flashcard';
import {
  DefaultFlashcardValue,
  DefaultFlashcardErrorMessage,
} from '@/backend/defaultData/content/flashcard';
import SchemaFlashcard from '@/backend/validationSchema/content/flashcard/flashcardSchema';
import FormikShowError from '@/components/element/notification/formikForm';
import BottomFormError from '@/components/element/notification/bottomForm';

//Button - Icon
import AddSubmitButton from '@/components/element/button/addSubmitButton';
import UploadIcon from '@/public/vector/upload.svg';

interface ContentProperties {
  courseID: string;
  unitID: string;
  taskID: string;
  contentID: string;
}

const AddFlashcardForm: React.FC<ContentProperties> = ({
  courseID,
  unitID,
  taskID,
  contentID,
}) => {
  const [error, setError] = useState(DefaultFlashcardErrorMessage());
  const [firstPreview, setFirstPreview] = useState<string | null>(null);
  const [secondPreview, setSecondPreview] = useState<string | null>(null);
  return (
    <Formik
      initialValues={DefaultFlashcardValue()}
      validationSchema={SchemaFlashcard}
      onSubmit={(data) =>
        AddFlashcardContent(courseID, unitID, taskID, contentID, data, setError)
      }
    >
      {({ setFieldValue }) => (
        <Form>
          <p id="contentType" className="mb-3 text-sm font-medium">
            Dạng nội dung: Flashcard
          </p>

          <div id="firstSideText_Add" className="w-full">
            <label
              htmlFor="firstSideText_AddInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Từ mặt trước
            </label>

            <Field
              id="firstSideText_AddInput"
              name="firstSideText"
              type="text"
              placeholder="Điền từ..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(
                  event,
                  setFieldValue,
                  setError,
                  setFirstPreview,
                  setSecondPreview,
                )
              }
              className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <FormikShowError
              type={'Add'}
              filedName={'firstSideText'}
              errorMessage={null}
            />
          </div>

          <div id="firstSideFile_Add">
            <label
              htmlFor="firstSideFile_AddInput"
              className="text-gray-900 mb-3 mt-3 block text-sm font-medium dark:text-white"
            >
              Hình ảnh mặt trước
            </label>

            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="firstSideFile_AddInput"
                className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:hover:border-slate-500 dark:hover:bg-slate-600"
              >
                <div className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:hover:border-slate-500 dark:hover:bg-slate-600">
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    {firstPreview ? (
                      <div className="relative h-[200px] w-[500px]">
                        <Image
                          src={firstPreview}
                          alt="First Side Preview"
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
                    id="firstSideFile_AddInput"
                    type="file"
                    name="firstSideFile"
                    value={undefined}
                    className="hidden"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      ResetError(
                        event,
                        setFieldValue,
                        setError,
                        setFirstPreview,
                        setSecondPreview,
                      );
                    }}
                  />
                </div>
              </label>
            </div>
            <FormikShowError
              type={'Add'}
              filedName={'firstSideFile'}
              errorMessage={error.firstSideImageError}
            />
          </div>

          <BottomFormError
            type={'Add'}
            errorMessage={error.firstSideMissingContent}
          />

          <div className="mt-4">
            <div id="secondSideText_Add" className="mt-4 w-full">
              <label
                htmlFor="secondSideText_AddInput"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Từ mặt sau
              </label>

              <Field
                id="secondSideText_AddInput"
                name="secondSideText"
                type="text"
                placeholder="Điền từ..."
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  ResetError(
                    event,
                    setFieldValue,
                    setError,
                    setFirstPreview,
                    setSecondPreview,
                  )
                }
                className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              />
              <FormikShowError
                type={'Add'}
                filedName={'secondSideText'}
                errorMessage={null}
              />
            </div>

            <div id="secondSideFile_Add">
              <label
                htmlFor="secondSideFile_AddInput"
                className="text-gray-900 mb-3 mt-3 block text-sm font-medium dark:text-white"
              >
                Hình ảnh mặt sau
              </label>

              <div className="flex w-full items-center justify-center">
                <label
                  htmlFor="secondSideFile_AddInput"
                  className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:hover:border-slate-500 dark:hover:bg-slate-600"
                >
                  <div className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:hover:border-slate-500 dark:hover:bg-slate-600">
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      {secondPreview ? (
                        <div className="relative h-[200px] w-[500px]">
                          <Image
                            src={secondPreview}
                            alt="Second Side Preview"
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
                            <span className="font-semibold">
                              Ấn để tải hình
                            </span>
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs">
                            Định dạng theo PNG, JPG, JPEG
                          </p>
                        </div>
                      )}
                    </div>
                    <Field
                      id="secondSideFile_AddInput"
                      type="file"
                      name="secondSideFile"
                      value={undefined}
                      className="hidden"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        ResetError(
                          event,
                          setFieldValue,
                          setError,
                          setFirstPreview,
                          setSecondPreview,
                        );
                      }}
                    />
                  </div>
                </label>
              </div>
              <FormikShowError
                type={'Add'}
                filedName={'secondSideFile'}
                errorMessage={error.secondSideImageError}
              />
            </div>
          </div>
          <BottomFormError
            type={'Add'}
            errorMessage={error.secondSideMissingContent}
          />
          <BottomFormError type={'Add'} errorMessage={error.systemError} />
          <div className="mt-7">
            <AddSubmitButton buttonName="Thêm nội dung" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddFlashcardForm;
