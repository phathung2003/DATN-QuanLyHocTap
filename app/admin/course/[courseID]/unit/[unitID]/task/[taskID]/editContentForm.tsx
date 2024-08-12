'use client';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  ResetError,
  EditContent,
  DeleteContent,
} from '@/backend/feature/content';
import {
  ContentEditDefaultValue,
  DefaultContentErrorValue,
} from '@/backend/defaultData/content';
import SchemaContent from '@/backend/validationSchema/content/contentSchema';
import FormikShowError from '@/components/ErrorMessage/formikForm';
import BottomFormError from '@/components/ErrorMessage/bottomForm';

//Button
import SubmitButton from '@/components/Button/submitButton';
import DeleteButton from '@/components/Button/deleteButton';
import { IContentList } from '@/backend/models/data/Content/IContent';

interface ContentProperties {
  courseID: string;
  unitID: string;
  taskID: string;
  contentID: string;
  data: IContentList;
}

const EditContentForm: React.FC<ContentProperties> = ({
  courseID,
  unitID,
  taskID,
  contentID,
  data,
}) => {
  const [error, setError] = useState(DefaultContentErrorValue());

  return (
    <Formik
      initialValues={ContentEditDefaultValue(data)}
      validationSchema={SchemaContent}
      onSubmit={(editData) =>
        EditContent(
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
          <div id="contentName_Add" className="w-full">
            <label
              htmlFor="contentName_EditInput"
              className="text-gray-900 mb-3 block text-sm font-medium dark:text-white"
            >
              Tên nội dung
            </label>

            <Field
              id="contentName_EditInput"
              name="contentName"
              type="text"
              placeholder="Điền tên nội dung..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(event, setFieldValue, setError)
              }
              className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <FormikShowError
              type={'Edit'}
              filedName={'contentName'}
              errorMessage={null}
            />
          </div>

          <div id="contentDescription_Add" className="w-full">
            <label
              htmlFor="contentDescription_EditInput"
              className="text-gray-900 mb-3 block text-sm font-medium dark:text-white"
            >
              Mô tả
            </label>

            <Field
              id="contentDescription_EditInput"
              name="contentDescription"
              type="text"
              placeholder="Điền mô tả..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(event, setFieldValue, setError)
              }
              className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <FormikShowError
              type={'Edit'}
              filedName={'contentDescription'}
              errorMessage={null}
            />
          </div>

          <BottomFormError type={'Edit'} errorMessage={error.systemError} />
          <div className="mt-7 flex space-x-4">
            <SubmitButton buttonName="Cập nhật" />
            <DeleteButton
              onClick={async () =>
                await DeleteContent(courseID, unitID, taskID, contentID)
              }
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditContentForm;
