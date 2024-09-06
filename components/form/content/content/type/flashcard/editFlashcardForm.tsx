'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { IFlashcardContent } from '@/backend/models/data/Content/IFlashcard';
import {
  ResetError,
  EditFlashcardContent,
  DeleteFlashcardContent,
} from '@/backend/feature/content/contentType/flashcard';
import {
  FlashcardEditDefaultValue,
  DefaultFlashcardErrorMessage,
} from '@/backend/defaultData/content/flashcard';
import SchemaFlashcard from '@/backend/validationSchema/content/flashcard/flashcardSchema';
import FormikShowError from '@/components/element/notification/formikForm';
import BottomFormError from '@/components/element/notification/bottomForm';

//Button - Icon
import SubmitButton from '@/components/element/button/submitButton';
import DeleteButton from '@/components/element/button/deleteButton';
import UploadIcon from '@/public/vector/upload.svg';

interface ContentProperties {
  courseID: string;
  unitID: string;
  taskID: string;
  contentID: string;
  data: IFlashcardContent;
}

const EditFlashcardForm: React.FC<ContentProperties> = ({
  courseID,
  unitID,
  taskID,
  contentID,
  data,
}) => {
  const [error, setError] = useState(DefaultFlashcardErrorMessage());
  const [firstPreview, setFirstPreview] = useState<string | null>(null);
  const [secondPreview, setSecondPreview] = useState<string | null>(null);
  return (
    <Formik
      initialValues={FlashcardEditDefaultValue(data)}
      validationSchema={SchemaFlashcard}
      onSubmit={(editData) =>
        EditFlashcardContent(
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
            Dạng nội dung: Flashcard
          </p>

          <div id="firstSideText_Add" className="w-full">
            <label
              htmlFor="firstSideText_EditInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Từ mặt trước
            </label>

            <Field
              id="firstSideText_EditInput"
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
              type={'Edit'}
              filedName={'firstSideText'}
              errorMessage={null}
            />
          </div>

          <div id="firstSideFile_Add">
            <label
              htmlFor="firstSideFile_EditInput"
              className="text-gray-900 mb-3 mt-3 block text-sm font-medium dark:text-white"
            >
              Hình ảnh mặt trước
            </label>

            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="firstSideFile_EditInput"
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
                    ) : data.firstSideImage ==
                        process.env.NEXT_PUBLIC_GRADE_DEFAULT_IMAGE ||
                      !data.firstSideImage ? (
                      <div className="flex flex-col items-center justify-center">
                        <UploadIcon />
                        <p className="text-gray-500 dark:text-gray-400 mb-3 text-sm">
                          <span className="font-semibold">Ấn để tải hình</span>
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                          Định dạng theo PNG, JPG, JPEG
                        </p>
                      </div>
                    ) : (
                      <div className="relative h-[200px] w-[500px]">
                        <Image
                          src={data.firstSideImage}
                          alt="Current First Side Image"
                          fill
                          style={{ objectFit: 'contain' }}
                          sizes="(max-width: 500px) 100vw, 500px"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                  <Field
                    id="firstSideFile_EditInput"
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
              type={'Edit'}
              filedName={'firstSideFile'}
              errorMessage={error.firstSideImageError}
            />
          </div>

          <BottomFormError
            type={'Edit'}
            errorMessage={error.firstSideMissingContent}
          />

          <div className="mt-4">
            <div id="secondSideText_Add" className="mt-4 w-full">
              <label
                htmlFor="secondSideText_EditInput"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Từ mặt sau
              </label>

              <Field
                id="secondSideText_EditInput"
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
                type={'Edit'}
                filedName={'secondSideText'}
                errorMessage={null}
              />
            </div>

            <div id="secondSideFile_Add">
              <label
                htmlFor="secondSideFile_EditInput"
                className="text-gray-900 mb-3 mt-3 block text-sm font-medium dark:text-white"
              >
                Hình ảnh mặt sau
              </label>

              <div className="flex w-full items-center justify-center">
                <label
                  htmlFor="secondSideFile_EditInput"
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
                      ) : data.secondSideImage ==
                          process.env.NEXT_PUBLIC_GRADE_DEFAULT_IMAGE ||
                        !data.secondSideImage ? (
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
                      ) : (
                        <div className="relative h-[200px] w-[500px]">
                          <Image
                            src={data.secondSideImage}
                            alt="Current Second Side Image"
                            fill
                            style={{ objectFit: 'contain' }}
                            sizes="(max-width: 500px) 100vw, 500px"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                    <Field
                      id="secondSideFile_EditInput"
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
                type={'Edit'}
                filedName={'secondSideFile'}
                errorMessage={error.secondSideImageError}
              />
            </div>
          </div>
          <BottomFormError
            type={'Edit'}
            errorMessage={error.secondSideMissingContent}
          />
          <BottomFormError type={'Edit'} errorMessage={error.systemError} />
          <div className="mt-7 flex space-x-4">
            <SubmitButton buttonName="Cập nhật" />
            <DeleteButton
              onClick={async () =>
                await DeleteFlashcardContent(
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

export default EditFlashcardForm;
