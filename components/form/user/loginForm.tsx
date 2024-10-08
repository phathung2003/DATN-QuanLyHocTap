'use client';
import React, { useState } from 'react';
import { Login } from '@/backend/feature/user/user';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import SchemaLogin from '@/backend/validationSchema/loginSchema';
import DefaultLoginValue from '@/backend/defaultData/login';

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <Formik
      initialValues={DefaultLoginValue()}
      validationSchema={SchemaLogin}
      onSubmit={(data) => Login(data, setErrorMessage)}
    >
      <Form>
        <div id="info_Login" className="mb-8">
          <label
            htmlFor="info_LoginInput"
            className="text-dark mb-3 block text-sm dark:text-white"
          >
            {' '}
            Tên đăng nhập/Email/Số điện thoại
          </label>
          <Field
            id="info_LoginInput"
            name="info"
            type="text"
            placeholder="Tên đăng nhập/Email/Số điện thoại"
            className="dark:text-body-color-dark dark:shadow-two text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
          />
          <div className="pt-2 font-bold text-rose-500">
            <ErrorMessage id="info_LoginError" name="info" />
          </div>
        </div>

        <div id="password_Login" className="mb-8">
          <label
            htmlFor="password_LoginInput"
            className="text-dark mb-3 block text-sm dark:text-white"
          >
            Mật khẩu
          </label>
          <Field
            id="password_LoginInput"
            name="password"
            type="password"
            placeholder="••••••"
            className="dark:text-body-color-dark dark:shadow-two text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
          />
          <div className="pt-2 font-bold text-rose-500">
            <ErrorMessage id="password_LoginError" name="password" />
          </div>
        </div>

        {errorMessage != null && (
          <div id="LoginError" className="font-bold text-rose-500">
            {errorMessage}
          </div>
        )}
        <div>
          <a
            href="#0"
            className="text-sm font-medium text-blue-500 hover:underline"
          >
            Quên mật khẩu ?
          </a>
        </div>
        <div className="mb-6"></div>
        <button
          id="submit_Login"
          type="submit"
          className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-[#FF5580] px-9 py-4 text-base font-medium text-white duration-300 hover:bg-[#FF5580]/80"
        >
          Đăng nhập
        </button>
      </Form>
    </Formik>
  );
}
