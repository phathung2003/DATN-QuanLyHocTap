'use client';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  ResetChildrenRegisterError,
  RegisterChildren,
} from '@/backend/feature/children';

import {
  DefaultChilrenRegisterValue,
  DefaultRegisteErrorValue,
} from '@/backend/defaultData/children';

import SchemaChildRegister from '@/backend/validationSchema/children/childrenSchema';
import FormikShowError from '@/components/element/notification/formikForm';
import BottomFormError from '@/components/element/notification/bottomForm';

//Button
import AddSubmitButton from '@/components/element/button/addSubmitButton';

interface ContentProperties {
  parentID: string;
}

const RegisterChildrenForm: React.FC<ContentProperties> = ({ parentID }) => {
  const [error, setError] = useState(DefaultRegisteErrorValue());

  return (
    <Formik
      initialValues={DefaultChilrenRegisterValue()}
      validationSchema={SchemaChildRegister}
      onSubmit={(data) => RegisterChildren(parentID, data, setError)}
    >
      {({ setFieldValue }) => (
        <Form>
          <div id="name_Add" className="w-full">
            <label
              htmlFor="name_AddInput"
              className="text-gray-900 mb-3 block text-sm font-medium dark:text-white"
            >
              Họ và tên
            </label>

            <Field
              id="name_AddInput"
              name="name"
              type="text"
              placeholder="Điền tên của bé..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetChildrenRegisterError(event, setFieldValue, setError)
              }
              className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <FormikShowError
              type={'Add'}
              filedName={'name'}
              errorMessage={null}
            />
          </div>

          <div id="username_Add" className="w-full">
            <label
              htmlFor="username_AddInput"
              className="text-gray-900 mb-3 block text-sm font-medium dark:text-white"
            >
              Tên đăng nhập
            </label>

            <Field
              id="username_AddInput"
              name="username"
              type="text"
              placeholder="Chọn tên đăng nhập cho tài khoản"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetChildrenRegisterError(event, setFieldValue, setError)
              }
              className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <FormikShowError
              type={'Add'}
              filedName={'username'}
              errorMessage={error.usernameError}
            />
          </div>

          <div id="password_Add" className="w-full">
            <label
              htmlFor="password_AddInput"
              className="text-gray-900 mb-3 block text-sm font-medium dark:text-white"
            >
              Mật khẩu
            </label>

            <Field
              id="password_AddInput"
              name="password"
              type="password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetChildrenRegisterError(event, setFieldValue, setError)
              }
              placeholder="••••••"
              autoComplete="off"
              className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <FormikShowError
              type={'Add'}
              filedName={'password'}
              errorMessage={null}
            />
          </div>

          <div id="rePassword_Add" className="w-full">
            <label
              htmlFor="rePassword_AddInput"
              className="text-gray-900 mb-3 block text-sm font-medium dark:text-white"
            >
              Nhập lại mật khẩu
            </label>

            <Field
              id="rePassword_AddInput"
              name="rePassword"
              type="password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                ResetChildrenRegisterError(event, setFieldValue, setError)
              }
              placeholder="••••••"
              autoComplete="off"
              className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
            />
            <FormikShowError
              type={'Add'}
              filedName={'rePassword'}
              errorMessage={null}
            />
          </div>

          <BottomFormError type={'Add'} errorMessage={error.systemError} />
          <div className="mt-7">
            <AddSubmitButton buttonName="Thêm tài khoản" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterChildrenForm;
