'use client';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  ResetError,
  EditCalculate_Two_Number,
} from '@/backend/feature/content/calculate_Two_Number';
import {
  Calculate_Two_NumberEditDefaultValue,
  DefaultCalculate_Two_NumberError,
} from '@/backend/defaultData/content/calculate_Two_Number';
import { DeleteContentDetail } from '@/backend/feature/content';
import FormikShowError from '@/components/ErrorMessage/formikForm';
import BottomFormError from '@/components/ErrorMessage/bottomForm';
import SchemaCalculate_Two_Number from '@/backend/validationSchema/content/calculate_Two_Number/Calculate_Two_NumberSchema';

//Button
import SubmitButton from '@/components/Button/submitButton';
import DeleteButton from '@/components/Button/deleteButton';
import { ICalculateTwoNumbersContent } from '@/backend/models/data/Content/ICalculateTwoNumbers';

interface ContentProperties {
  courseID: string;
  unitID: string;
  taskID: string;
  contentID: string;
  data: ICalculateTwoNumbersContent;
}

const EditCalculate_Two_NumberForm: React.FC<ContentProperties> = ({
  courseID,
  unitID,
  taskID,
  contentID,
  data,
}) => {
  const [error, setError] = useState(DefaultCalculate_Two_NumberError());

  return (
    <Formik
      initialValues={Calculate_Two_NumberEditDefaultValue(data)}
      validationSchema={SchemaCalculate_Two_Number}
      onSubmit={(editData) =>
        EditCalculate_Two_Number(
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
            Dạng nội dung: Tính toán 2 số
          </p>

          <div className=" grid gap-4 sm:grid-cols-3">
            <div id="firstNumber_Add" className="w-full">
              <label
                htmlFor="firstNumber_EditInput"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Số thứ nhất
              </label>

              <Field
                id="firstNumber_EditInput"
                name="firstNumber"
                type="text"
                placeholder="Điền số thứ nhất..."
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  ResetError(event, setFieldValue, setError)
                }
                className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              />
              <FormikShowError
                type={'Edit'}
                filedName={'firstNumber'}
                errorMessage={null}
              />
            </div>

            <div id="operator_Add">
              <label
                htmlFor="operator_EditInput"
                className="text-gray-900 mb-3 block text-sm font-medium dark:text-white"
              >
                Toán tử
              </label>

              <Field
                id="operator_EditInput"
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
                  type={'Edit'}
                  filedName={'operator'}
                  errorMessage={error.operatorError}
                />
              </div>
            </div>

            <div id="secondNumber_Add" className="w-full">
              <label
                htmlFor="secondNumber_EditInput"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Số thứ hai
              </label>

              <Field
                id="secondNumber_EditInput"
                name="secondNumber"
                type="text"
                placeholder="Điền số thứ hai..."
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  ResetError(event, setFieldValue, setError)
                }
                className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              />
              <FormikShowError
                type={'Edit'}
                filedName={'secondNumber'}
                errorMessage={null}
              />
            </div>
          </div>

          <BottomFormError type={'Edit'} errorMessage={error.systemError} />
          <div className="mt-7 flex space-x-4">
            <SubmitButton buttonName="Cập nhật" />
            <DeleteButton
              onClick={async () =>
                await DeleteContentDetail(
                  courseID,
                  unitID,
                  taskID,
                  contentID,
                  data.position,
                )
              }
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditCalculate_Two_NumberForm;
