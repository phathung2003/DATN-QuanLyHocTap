'use client';
import React, { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import SchemaRegister from '@/backend/validationSchema/register/registerSchema';
import {
  DefaultRegisterValue,
  DefaultRegisteErrorValue,
} from '@/backend/defaultData/register';
import { handelSubmit, ResetError } from '@/app/register/registerProcess';
import { Providers } from '@/app/providers';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';

export default function RegisterPage() {
  //Ghi nhận lỗi báo từ server
  const [error, setError] = useState(DefaultRegisteErrorValue);
  return (
    <>
      <Providers>
        <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
          <div className="container">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4">
                <div className="dark:bg-dark mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-md sm:p-[60px]">
                  <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                    Tạo tài khoản mới
                  </h3>

                  <div className="mb-8 flex items-center justify-center">
                    <span className="hidden h-[1px] w-full max-w-[70px] bg-slate-200 sm:block"></span>
                  </div>

                  <Formik
                    initialValues={DefaultRegisterValue}
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => ResetError(e, setFieldValue, setError)}
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => ResetError(e, setFieldValue, setError)}
                            placeholder="Chọn tên đăng nhập của bạn"
                            autoComplete="off"
                            className="dark:text-body-color-dark dark:shadow-two text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                          />
                          <div>
                            <p id="username_RegisterError">
                              {error.usernameError}
                            </p>
                            <ErrorMessage
                              id="username_RegisterError"
                              name="username"
                            />
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => ResetError(e, setFieldValue, setError)}
                            placeholder="Số điện thoại của bạn"
                            autoComplete="off"
                            className="dark:text-body-color-dark dark:shadow-two text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                          />
                          <div>
                            <p id="phoneNumber_RegisterError">
                              {error.phoneNumberError}
                            </p>
                            <ErrorMessage
                              id="phoneNumber_RegisterError"
                              name="phoneNumber"
                            />
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => ResetError(e, setFieldValue, setError)}
                            placeholder="Địa chỉ email của bạn"
                            autoComplete="off"
                            className="dark:text-body-color-dark dark:shadow-two text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                          />
                          <div>
                            <p id="email_RegisterError">{error.emailError}</p>
                            <ErrorMessage
                              id="email_RegisterError"
                              name="email"
                            />
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => ResetError(e, setFieldValue, setError)}
                            placeholder="••••••"
                            autoComplete="off"
                            className="dark:text-body-color-dark dark:shadow-two text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                          />
                          <div>
                            <ErrorMessage
                              id="password_RegisterError"
                              name="password"
                            />
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => ResetError(e, setFieldValue, setError)}
                            placeholder="••••••"
                            autoComplete="off"
                            className="dark:text-body-color-dark dark:shadow-two text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                          />
                          <div>
                            <ErrorMessage
                              id="rePassword_RegisterError"
                              name="rePassword"
                            />
                          </div>
                        </div>

                        <p id="system_RegisterError">{error.systemError}</p>

                        <div className="mb-6">
                          <button
                            id="sumbit_Register"
                            type="submit"
                            className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-[#FF5580] px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90"
                          >
                            Đăng ký
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>

                  <p className="text-body-color text-center text-base font-medium">
                    Bạn đã có tài khoản ?{' '}
                    <Link
                      href="/login"
                      className="text-primary hover:underline"
                    >
                      Đăng nhập
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-0 top-0 z-[-1]">
            <svg
              width="1440"
              height="969"
              viewBox="0 0 1440 969"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_95:1005"
                style={{ maskType: 'alpha' }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1440"
                height="969"
              >
                <rect width="1440" height="969" fill="#090E34" />
              </mask>
              <g mask="url(#mask0_95:1005)">
                <path
                  opacity="0.1"
                  d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                  fill="url(#paint0_linear_95:1005)"
                />
                <path
                  opacity="0.1"
                  d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                  fill="url(#paint1_linear_95:1005)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_95:1005"
                  x1="1178.4"
                  y1="151.853"
                  x2="780.959"
                  y2="453.581"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF69B4" />
                  <stop offset="1" stopColor="#FF69B4" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_95:1005"
                  x1="160.5"
                  y1="220"
                  x2="1099.45"
                  y2="1192.04"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF69B4" />
                  <stop offset="1" stopColor="#FF69B4" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </section>
        <ScrollToTop />
      </Providers>
    </>
  );
}
