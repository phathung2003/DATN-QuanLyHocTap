'use client';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { ResetError, EditTask, DeleteTask } from '@/backend/feature/task';
import {
  TaskEditDefaultValue,
  DefaultTaskErrorValue,
} from '@/backend/defaultData/task';
import FormikShowError from '@/components/ErrorMessage/formikForm';
import BottomFormError from '@/components/ErrorMessage/bottomForm';
import SchemaTask from '@/backend/validationSchema/task/taskSchema';
import ITask from '@/backend/models/data/ITask';

//Button
import SubmitButton from '@/components/button/submitButton';
import DeleteButton from '@/components/button/deleteButton';

interface EditTaskFormProps {
  courseID: string;
  unitID: string;
  taskID: string;
  data: ITask;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({
  courseID,
  unitID,
  taskID,
  data,
}) => {
  const [error, setError] = useState(DefaultTaskErrorValue());
  return (
    <Formik
      initialValues={TaskEditDefaultValue(data)}
      validationSchema={SchemaTask}
      onSubmit={(editData) =>
        EditTask(courseID, unitID, taskID, editData, data, setError)
      }
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="flex gap-4">
            <div id="taskName_Edit" className="w-full">
              <label
                htmlFor="taskName_EditInput"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Tên phần nội dung
              </label>

              <Field
                id="taskName_EditInput"
                name="taskName"
                type="text"
                placeholder="Điền tên bài..."
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  ResetError(event, setFieldValue, setError)
                }
                className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              />
              <FormikShowError
                type={'Edit'}
                filedName={'taskName'}
                errorMessage={null}
              />
            </div>
          </div>

          <div id="taskDescription_Edit">
            <label
              htmlFor="taskDescription_EditInput"
              className="text-gray-900 mb-2 mt-3 block text-sm font-medium dark:text-white"
            >
              Mô tả
            </label>

            <Field
              id="taskDescription_EditInput"
              name="taskDescription"
              type="text"
              placeholder="Điền vào mô tả..."
              className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <FormikShowError
              type={'Edit'}
              filedName={'taskDescription'}
              errorMessage={null}
            />
          </div>

          <BottomFormError type={'Edit'} errorMessage={error.systemError} />
          <div className="mb-2 mt-7 flex space-x-4">
            <SubmitButton buttonName="Cập nhật" />
            <DeleteButton
              onClick={async () =>
                await DeleteTask(courseID, unitID, taskID, true)
              }
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditTaskForm;
