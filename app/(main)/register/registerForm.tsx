'use client';
import React, { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import SchemaRegister from '@/backend/validationSchema/register/registerSchema';
import {
  DefaultRegisterValue,
  DefaultRegisteErrorValue,
} from '@/backend/defaultData/register';
import { handelSubmit, ResetError } from '@/backend/feature/register';

export default function RegisterForm() {
  //Ghi nhận lỗi báo từ server
  const [error, setError] = useState(DefaultRegisteErrorValue());
  return (
    <Formik
      initialValues={DefaultRegisterValue()}
      validationSchema={SchemaRegister}
      onSubmit={(data) => handelSubmit(data, setError)}
    >
      {({ setFieldValue }) => (
        <Form>
          <div id="name_Register" className="mb-8">
            <label
              htmlFor="name_RegisterInput"
              className="text-dark mb-3 block text-sm dark:text-white"
            >
              Họ và tên
            </label>
            <Field
              id="name_RegisterInput"
              name="name"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(e, setFieldValue, setError)
              }
              placeholder="Họ và tên"
              autoComplete="off"
              className="dark:text-body-color-dark dark:shadow-two text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
            />
            <div>
              <ErrorMessage id="name_RegisterError" name="name" />
            </div>
          </div>

          <div id="username_Register" className="mb-8">
            <label
              htmlFor="username_RegisterInput"
              className="text-dark mb-3 block text-sm dark:text-white"
            >
              Tên đăng nhập
            </label>
            <Field
              id="username_RegisterInput"
              name="username"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(e, setFieldValue, setError)
              }
              placeholder="Chọn tên đăng nhập của bạn"
              autoComplete="off"
              className="dark:text-body-color-dark dark:shadow-two text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
            />
            <div>
              <p id="username_RegisterError">{error.usernameError}</p>
              <ErrorMessage id="username_RegisterError" name="username" />
            </div>
          </div>

          <div id="phoneNumber_Register" className="mb-8">
            <label
              htmlFor="phoneNumber_RegisterInput"
              className="text-dark mb-3 block text-sm dark:text-white"
            >
              Số điện thoại
            </label>
            <Field
              id="phoneNumber_RegisterInput"
              name="phoneNumber"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(e, setFieldValue, setError)
              }
              placeholder="Số điện thoại của bạn"
              autoComplete="off"
              className="dark:text-body-color-dark dark:shadow-two text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
            />
            <div>
              <p id="phoneNumber_RegisterError">{error.phoneNumberError}</p>
              <ErrorMessage id="phoneNumber_RegisterError" name="phoneNumber" />
            </div>
          </div>

          <div id="email_Register" className="mb-8">
            <label
              htmlFor="email_RegisterInput"
              className="text-dark mb-3 block text-sm dark:text-white"
            >
              Email
            </label>
            <Field
              id="email_RegisterInput"
              name="email"
              type="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(e, setFieldValue, setError)
              }
              placeholder="Địa chỉ email của bạn"
              autoComplete="off"
              className="dark:text-body-color-dark dark:shadow-two text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
            />
            <div>
              <p id="email_RegisterError">{error.emailError}</p>
              <ErrorMessage id="email_RegisterError" name="email" />
            </div>
          </div>

          <div id="password_Register" className="mb-8">
            <label
              htmlFor="password_RegisterInput"
              className="text-dark mb-3 block text-sm dark:text-white"
            >
              Mật khẩu
            </label>
            <Field
              id="password_RegisterInput"
              name="password"
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(e, setFieldValue, setError)
              }
              placeholder="••••••"
              autoComplete="off"
              className="dark:text-body-color-dark dark:shadow-two text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
            />
            <div>
              <ErrorMessage id="password_RegisterError" name="password" />
            </div>
          </div>

          <div id="rePassword_Register" className="mb-8">
            <label
              htmlFor="rePassword_RegisterInput"
              className="text-dark mb-3 block text-sm dark:text-white"
            >
              Nhập lại mật khẩu
            </label>
            <Field
              id="rePassword_RegisterInput"
              name="rePassword"
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                ResetError(e, setFieldValue, setError)
              }
              placeholder="••••••"
              autoComplete="off"
              className="dark:text-body-color-dark dark:shadow-two text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
            />
            <div>
              <ErrorMessage id="rePassword_RegisterError" name="rePassword" />
            </div>
          </div>

          <p id="system_RegisterError">{error.systemError}</p>

          <div className="mb-6">
            <button
              id="sumbit_Register"
              type="submit"
              className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-[#FF5580] px-9 py-4 text-base font-medium text-white duration-300 hover:bg-[#FF5580]/80"
            >
              Đăng ký
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
