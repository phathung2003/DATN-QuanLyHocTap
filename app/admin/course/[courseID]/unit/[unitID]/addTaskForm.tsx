'use client';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

import { DefaultTaskValue } from '@/backend/defaultData/task';

import { ITaskError } from '@/backend/models/messages/ITaskMessage';
import FormikShowError from '@/components/ErrorMessage/formikForm';
import BottomFormError from '@/components/ErrorMessage/bottomForm';
import { ResetError, AddTask } from '@/backend/feature/task';
//Icon
import AddSubmitButton from '@/components/Button/addSubmitButton';
import SchemaTask from '@/backend/validationSchema/task/taskSchema';

const DefaultErrorMessage: ITaskError = {
  status: false,
  taskNoError: null,
  systemError: null,
};

interface AddTaskFormProps {
  courseID: string;
  unitID: string;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ courseID, unitID }) => {
  const [error, setError] = useState(DefaultErrorMessage);
  return (
    <Formik
      initialValues={DefaultTaskValue}
      validationSchema={SchemaTask}
      onSubmit={(data) => AddTask(courseID, unitID, data, setError)}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="flex gap-4">
            <div id="taskNo_Add" className="w-1/3">
              <label
                htmlFor="taskNo_AddInput"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Thứ tự bài
              </label>

              <Field
                id="taskNo_AddInput"
                name="taskNo"
                type="text"
                placeholder="Điền thứ tự học..."
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  ResetError(event, setFieldValue, setError)
                }
                className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              />
              <FormikShowError
                type={'Add'}
                filedName={'taskNo'}
                errorMessage={error.taskNoError}
              />
            </div>

            <div id="taskName_Add" className="w-2/3">
              <label
                htmlFor="taskName_AddInput"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Tên bài
              </label>

              <Field
                id="taskName_AddInput"
                name="taskName"
                type="text"
                placeholder="Điền tên bài..."
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  ResetError(event, setFieldValue, setError)
                }
                className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              />
              <FormikShowError
                type={'Add'}
                filedName={'taskName'}
                errorMessage={null}
              />
            </div>
          </div>

          <div id="taskDescription_Add">
            <label
              htmlFor="taskDescription_AddInput"
              className="text-gray-900 mb-2 mt-3 block text-sm font-medium dark:text-white"
            >
              Mô tả
            </label>

            <Field
              id="taskDescription_AddInput"
              name="taskDescription"
              type="text"
              placeholder="Điền vào mô tả..."
              className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <FormikShowError
              type={'Add'}
              filedName={'taskDescription'}
              errorMessage={null}
            />
          </div>

          <BottomFormError type={'Add'} errorMessage={error.systemError} />
          <div className="mt-7">
            <AddSubmitButton buttonName="Thêm bài mới" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddTaskForm;
