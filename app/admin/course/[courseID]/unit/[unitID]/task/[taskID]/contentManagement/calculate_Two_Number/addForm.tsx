'use client';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  ResetError,
  AddCalculate_Two_Number,
} from '@/backend/feature/content/calculate_Two_Number';
import {
  DefaultCalculate_Two_NumberValue,
  DefaultCalculate_Two_NumberError,
} from '@/backend/defaultData/content/calculate_Two_Number';
import SchemaCalculate_Two_Number from '@/backend/validationSchema/content/calculate_Two_Number/Calculate_Two_NumberSchema';
import FormikShowError from '@/components/ErrorMessage/formikForm';
import BottomFormError from '@/components/ErrorMessage/bottomForm';

//Button
import AddSubmitButton from '@/components/Button/addSubmitButton';

interface ContentProperties {
  courseID: string;
  unitID: string;
  taskID: string;
  contentID: string;
}

const AddCalculate_Two_NumberForm: React.FC<ContentProperties> = ({
  courseID,
  unitID,
  taskID,
  contentID,
}) => {
  const [error, setError] = useState(DefaultCalculate_Two_NumberError());

  return (
    <Formik
      initialValues={DefaultCalculate_Two_NumberValue()}
      validationSchema={SchemaCalculate_Two_Number}
      onSubmit={(data) =>
        AddCalculate_Two_Number(
          courseID,
          unitID,
          taskID,
          contentID,
          data,
          setError,
        )
      }
    >
      {({ setFieldValue }) => (
        <Form>
          <p id="contentType" className="mb-3 text-sm font-medium">
            Dạng nội dung: Tính toán 2 số
          </p>

          <div className=" grid gap-4 sm:grid-cols-3">
            <div id="firstNumber_Add" className="w-full">
              <label
                htmlFor="firstNumber_AddInput"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Số thứ nhất
              </label>

              <Field
                id="firstNumber_AddInput"
                name="firstNumber"
                type="text"
                placeholder="Điền số thứ nhất..."
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  ResetError(event, setFieldValue, setError)
                }
                className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              />
              <FormikShowError
                type={'Add'}
                filedName={'firstNumber'}
                errorMessage={null}
              />
            </div>

            <div id="operator_Add">
              <label
                htmlFor="operator_AddInput"
                className="text-gray-900 mb-3 block text-sm font-medium dark:text-white"
              >
                Toán tử
              </label>

              <Field
                id="operator_AddInput"
                name="operator"
                as="select"
                className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              >
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
              </Field>
              <div>
                <FormikShowError
                  type={'Add'}
                  filedName={'operator'}
                  errorMessage={error.operatorError}
                />
              </div>
            </div>

            <div id="secondNumber_Add" className="w-full">
              <label
                htmlFor="secondNumber_AddInput"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Số thứ hai
              </label>

              <Field
                id="secondNumber_AddInput"
                name="secondNumber"
                type="text"
                placeholder="Điền số thứ hai..."
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  ResetError(event, setFieldValue, setError)
                }
                className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              />
              <FormikShowError
                type={'Add'}
                filedName={'secondNumber'}
                errorMessage={null}
              />
            </div>
          </div>

          <BottomFormError type={'Add'} errorMessage={error.systemError} />
          <div className="mt-7">
            <AddSubmitButton buttonName="Thêm nội dung" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddCalculate_Two_NumberForm;
