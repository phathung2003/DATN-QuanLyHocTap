'use client';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import SchemaUnit from '@/backend/validationSchema/unit/unitSchema';
import { DefaultUnitValue } from '@/backend/defaultData/unit';
import { AddUnit, ResetError } from '@/backend/feature/unit';

import { IUnitError } from '@/backend/models/messages/IUnitMessage';
import FormikShowError from '@/components/ErrorMessage/formikForm';
import BottomFormError from '@/components/ErrorMessage/bottomForm';

//Icon
import AddSubmitButton from '@/components/Button/addSubmitButton';

const DefaultErrorMessage: IUnitError = {
  status: false,
  courseIDError: null,
  unitNoError: null,
  systemError: null,
};

interface AddUnitFormProps {
  courseID: string;
}

const AddUnitForm: React.FC<AddUnitFormProps> = ({ courseID }) => {
  const [error, setError] = useState(DefaultErrorMessage);
  return (
    <Formik
      initialValues={DefaultUnitValue}
      validationSchema={SchemaUnit}
      onSubmit={(data) => AddUnit(courseID, data, setError)}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="flex gap-4">
            <div id="unitNo_Add" className="w-1/3">
              <label
                htmlFor="unitNo_AddInput"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Thứ tự bài học
              </label>

              <Field
                id="unitNo_AddInput"
                name="unitNo"
                type="text"
                placeholder="Điền số bài học..."
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  ResetError(event, setFieldValue, setError)
                }
                className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              />
              <FormikShowError
                type={'Add'}
                filedName={'unitNo'}
                errorMessage={error.unitNoError}
              />
            </div>

            <div id="unitName_Add" className="w-2/3">
              <label
                htmlFor="unitName_AddInput"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Tên bài học
              </label>

              <Field
                id="unitName_AddInput"
                name="unitName"
                type="text"
                placeholder="Điền tên bài học..."
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  ResetError(event, setFieldValue, setError)
                }
                className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              />
              <FormikShowError
                type={'Add'}
                filedName={'unitName'}
                errorMessage={null}
              />
            </div>
          </div>

          <div id="unitDescription_Add">
            <label
              htmlFor="unitDescription_AddInput"
              className="text-gray-900 mb-2 mt-3 block text-sm font-medium dark:text-white"
            >
              Mô tả
            </label>

            <Field
              id="unitDescription_AddInput"
              name="unitDescription"
              type="text"
              placeholder="Điền vào mô tả..."
              className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <FormikShowError
              type={'Add'}
              filedName={'unitDescription'}
              errorMessage={null}
            />
          </div>

          <BottomFormError type={'Add'} errorMessage={error.systemError} />
          <div className="mt-7">
            <AddSubmitButton buttonName="Thêm bài học mới" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddUnitForm;
