'use client';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { ContentType } from '@/backend/globalVariable';
import { ResetError, AddContent } from '@/backend/feature/content';
import {
  DefaultContentValue,
  DefaultContentErrorValue,
} from '@/backend/defaultData/content';
import SchemaContent from '@/backend/validationSchema/content/contentSchema';
import FormikShowError from '@/components/ErrorMessage/formikForm';
import BottomFormError from '@/components/ErrorMessage/bottomForm';

//Button
import AddSubmitButton from '@/components/Button/addSubmitButton';

interface ContentProperties {
  courseID: string;
  unitID: string;
  taskID: string;
}

const AddContentForm: React.FC<ContentProperties> = ({
  courseID,
  unitID,
  taskID,
}) => {
  const [error, setError] = useState(DefaultContentErrorValue());

  return (
    <Formik
      initialValues={DefaultContentValue()}
      validationSchema={SchemaContent}
      onSubmit={(data) => AddContent(courseID, unitID, taskID, data, setError)}
    >
      {({ setFieldValue }) => (
        <Form>
          <div id="contentName_Add" className="w-full">
            <label
              htmlFor="contentName_AddInput"
              className="text-gray-900 mb-3 block text-sm font-medium dark:text-white"
            >
              Tên nội dung
            </label>

            <Field
              id="contentName_AddInput"
              name="contentName"
              type="text"
              placeholder="Điền tên nội dung..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(event, setFieldValue, setError)
              }
              className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <FormikShowError
              type={'Add'}
              filedName={'contentName'}
              errorMessage={null}
            />
          </div>

          <div id="contentType_Add">
            <label
              htmlFor="contentType_AddInput"
              className="text-gray-900 mb-3 block text-sm font-medium dark:text-white"
            >
              Loại nội dung
            </label>

            <Field
              id="contentType_AddInput"
              name="contentType"
              as="select"
              className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            >
              <option value="Default">Chọn loại nội dung</option>
              <option value={ContentType.FLASHCARD}>Flashcard</option>
              <option value={ContentType.CARD}>Card</option>
              <option value={ContentType.CALCULATE_TWO_NUMBER}>
                Tính toán 2 số
              </option>
            </Field>
            <div>
              <FormikShowError
                type={'Add'}
                filedName={'contentType'}
                errorMessage={null}
              />
            </div>
          </div>

          <div id="contentDescription_Add" className="w-full">
            <label
              htmlFor="contentDescription_AddInput"
              className="text-gray-900 mb-3 block text-sm font-medium dark:text-white"
            >
              Mô tả
            </label>

            <Field
              id="contentDescription_AddInput"
              name="contentDescription"
              type="text"
              placeholder="Điền mô tả..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(event, setFieldValue, setError)
              }
              className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <FormikShowError
              type={'Add'}
              filedName={'contentDescription'}
              errorMessage={null}
            />
          </div>

          <BottomFormError type={'Add'} errorMessage={error.systemError} />
          <div className="mt-7">
            <AddSubmitButton buttonName="Thêm danh mục nội dung" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddContentForm;
