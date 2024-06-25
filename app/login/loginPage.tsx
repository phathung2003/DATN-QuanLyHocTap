'use client';
import React, { useState } from 'react';
import { Providers } from '@/app/providers';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import SchemaLogin from '@/backend/validationSchema/loginSchema';
import DefaultLoginValue from '@/backend/defaultData/login';
import { handelSubmit } from '@/app/login/process';

export default function SigninPage() {
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <>
      <Providers>
        <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
          <div className="container">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4">
                <div className="dark:bg-slate-800 mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-md sm:p-[60px]">
                  <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                    Đăng nhập
                  </h3>

                  <div className="mb-8 flex items-center justify-center">
                    <span className="hidden h-[1px] w-full max-w-[70px] bg-slate-200 sm:block"></span>
                  </div>
                  <Formik
                    initialValues={DefaultLoginValue}
                    validationSchema={SchemaLogin}
                    onSubmit={(data) => handelSubmit(data, setErrorMessage)}
                  >
                    <Form>
                      <div id="info_Login" className="mb-8">
                        <label
                          id="info_LoginLable"
                          className="text-dark mb-3 block text-sm dark:text-white"
                        >
                          {' '}
                          Tên đăng nhập/Email/Số điện thoại
                        </label>
                        <Field
                          id="info_LoginLable"
                          name="info"
                          type="text"
                          placeholder="Tên đăng nhập/Email/Số điện thoại"
                          className="dark:text-body-color-dark dark:shadow-two text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                        />
                        <div>
                          <ErrorMessage id="info_LoginError" name="info" />
                        </div>
                      </div>

                      <div id="password_Login" className="mb-8">
                        <label
                          id="password_LoginLable"
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
                        <div>
                          <ErrorMessage
                            id="password_LoginError"
                            name="password"
                          />
                        </div>
                      </div>

                      {errorMessage != null && (
                        <div id="LoginError">{errorMessage}</div>
                      )}
                      <div>
                        <a
                          href="#0"
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Quên mật khẩu ?
                        </a>
                      </div>
                      <div className="mb-6"></div>
                      <button
                        id="submit_Login"
                        type="submit"
                        className="mb-3 shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-[#FF5580] px-9 py-4 text-base font-medium text-white duration-300 hover:bg-[#FF5580]/70"
                      >
                        Đăng nhập
                      </button>
                    </Form>
                  </Formik>

                  <p className="text-body-color text-center text-base font-medium">
                    Bạn không có tài khoản?{' '}
                    <Link
                      href="/register"
                      className="text-primary hover:underline"
                    >
                      Đăng Ký
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
