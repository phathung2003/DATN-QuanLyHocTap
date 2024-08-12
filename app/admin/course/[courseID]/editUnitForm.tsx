'use client';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { EditUnit, DeleteUnit, ResetError } from '@/backend/feature/unit';
import {
  UnitEditDefaultValue,
  DefaultUnitErrorValue,
} from '@/backend/defaultData/unit';
import FormikShowError from '@/components/ErrorMessage/formikForm';
import BottomFormError from '@/components/ErrorMessage/bottomForm';
import SchemaUnit from '@/backend/validationSchema/unit/unitSchema';
import IUnit from '@/backend/models/data/IUnit';

//Button
import SubmitButton from '@/components/Button/submitButton';
import DeleteButton from '@/components/Button/deleteButton';

interface EditUnitFormProps {
  courseID: string;
  unitID: string;
  data: IUnit;
}

const EditUnitForm: React.FC<EditUnitFormProps> = ({
  courseID,
  unitID,
  data,
}) => {
  const [error, setError] = useState(DefaultUnitErrorValue());
  return (
    <Formik
      initialValues={UnitEditDefaultValue(data)}
      validationSchema={SchemaUnit}
      onSubmit={(editData) =>
        EditUnit(courseID, unitID, editData, data, setError)
      }
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="flex gap-4">
            <div id="unitName_Edit" className="w-full">
              <label
                htmlFor="unitName_EditInput"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Tên bài học
              </label>

              <Field
                id="unitName_EditInput"
                name="unitName"
                type="text"
                placeholder="Điền tên bài học..."
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  ResetError(event, setFieldValue, setError)
                }
                className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              />
              <FormikShowError
                type={'Edit'}
                filedName={'unitName'}
                errorMessage={null}
              />
            </div>
          </div>

          <div id="unitDescription_Edit">
            <label
              htmlFor="unitDescription_EditInput"
              className="text-gray-900 mb-2 mt-3 block text-sm font-medium dark:text-white"
            >
              Mô tả
            </label>

            <Field
              id="unitDescription_EditInput"
              name="unitDescription"
              type="text"
              placeholder="Điền vào mô tả..."
              className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <FormikShowError
              type={'Edit'}
              filedName={'unitDescription'}
              errorMessage={null}
            />
          </div>

          <BottomFormError type={'Edit'} errorMessage={error.systemError} />
          <div className="mb-2 mt-7 flex space-x-4">
            <SubmitButton buttonName="Cập nhật" />
            <DeleteButton
              onClick={async () => await DeleteUnit(courseID, unitID, true)}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditUnitForm;
