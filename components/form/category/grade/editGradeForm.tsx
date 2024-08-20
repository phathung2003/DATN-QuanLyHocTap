'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { IGrade } from '@/backend/models/data/IGrade';
import { GradeEditDefaultValue } from '@/backend/defaultData/grade';
import { EditGrade, ResetError, DeleteGrade } from '@/backend/feature/grade';
import { DefaultGradeErrorValue } from '@/backend/defaultData/grade';
import SchemaGrade from '@/backend/validationSchema/grade/gradeSchema';
import FormikShowError from '@/components/element/notification/formikForm';
import BottomFormError from '@/components/element/notification/bottomForm';

//Icon
import SubmitButton from '@/components/element/button/submitButton';
import DeleteButton from '@/components/element/button/deleteButton';
import UploadIcon from '@/public/vector/upload.svg';

const EditGradeForm: React.FC<{ data: IGrade }> = (gradeInfo) => {
  const [error, setError] = useState(DefaultGradeErrorValue());
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Formik
      initialValues={GradeEditDefaultValue(gradeInfo.data)}
      validationSchema={SchemaGrade}
      onSubmit={(editData) => EditGrade(editData, gradeInfo.data, setError)}
    >
      {({ setFieldValue }) => (
        <Form>
          <div id="gradeName_Edit">
            <label
              htmlFor="gradeName_EditInput"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Tên cấp bậc học
            </label>

            <Field
              id="gradeName_EditInput"
              name="gradeName"
              type="text"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(event, setFieldValue, setError, setPreview)
              }
              className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <FormikShowError
              type={'Edit'}
              filedName={'gradeName'}
              errorMessage={error.gradeNameError}
            />
          </div>

          <div id="gradeDescription_Edit">
            <label
              htmlFor="gradeDescription_EditInput"
              className="text-gray-900 mb-2 mt-2 block text-sm font-medium dark:text-white"
            >
              Mô tả
            </label>

            <Field
              id="gradeDescription_EditInput"
              name="gradeDescription"
              type="text"
              className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <FormikShowError
              type={'Edit'}
              filedName={'gradeDescription'}
              errorMessage={null}
            />
          </div>

          <div id="gradeImage_Edit">
            <label
              htmlFor="gradeImage_EditInput"
              className="text-gray-900 mb-2 mt-2 block text-sm font-medium dark:text-white"
            >
              Hình ảnh
            </label>

            <div className="mb-4 flex w-full items-center justify-center">
              <label
                htmlFor="gradeImage_EditInput"
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
                      <div className="relative h-[200px] w-[500px]">
                        <Image
                          src={gradeInfo.data.gradeImage}
                          alt="Current Image"
                          fill
                          style={{ objectFit: 'contain' }}
                          sizes="(max-width: 500px) 100vw, 500px"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                  <Field
                    id="gradeImage_EditInput"
                    type="file"
                    name="gradeFile"
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
              filedName={'gradeFile'}
              errorMessage={error.gradeFileError}
            />
          </div>

          <BottomFormError type={'Edit'} errorMessage={error.systemError} />

          <div className="flex space-x-4">
            <SubmitButton buttonName="Cập nhật" />
            <DeleteButton
              onClick={async () =>
                await DeleteGrade(gradeInfo.data.gradeID, setError)
              }
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditGradeForm;
