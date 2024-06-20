'use client';
import React, { useState } from 'react';
<<<<<<< HEAD
import { Formik, Form, ErrorMessage, Field } from 'formik';
import SchemaLogin from '@/components/process/validationSchema/loginSchema';
import DefaultLoginValue from '@/components/process/defaultData/login';
import { handelSubmit } from '@/components/process/feature/login';

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <Formik
      initialValues={DefaultLoginValue}
      validationSchema={SchemaLogin}
      onSubmit={(data) => handelSubmit(data, setErrorMessage)}
    >
      <Form>
        <div id="info_Login">
          <label id="info_LoginLable"> Tên đăng nhập/Email/Số điện thoại</label>
          <Field id="info_LoginLable" name="info" type="text" />
          <div>
            <ErrorMessage id="info_LoginError" name="info" />
          </div>
        </div>

        <div id="password_Login">
          <label id="password_LoginLable">Mật khẩu</label>
          <Field id="password_LoginInput" name="password" type="password" />
          <div>
            <ErrorMessage id="password_LoginError" name="password" />
          </div>
        </div>

        {errorMessage != null && <div id="LoginError">{errorMessage}</div>}
        <button id="submit_Login" type="submit">
          Đăng nhập
        </button>
      </Form>
=======
import { Formik, Form } from 'formik';
import { schemaLogin } from '../models/ILogin';
import { defaultLoginValue, handelSubmit } from '../process/login/login';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <Formik
      initialValues={defaultLoginValue}
      validationSchema={schemaLogin}
      onSubmit={(data) => handelSubmit(data, setErrorMessage)}
    >
      {(formik) => (
        <Form>
          <div id="info_Login">
            <label id="info_LoginLable"> Tên đăng nhập</label>
            <input
              id="info_LoginLable"
              type="text"
              {...formik.getFieldProps('info')}
            />
            {formik.touched.info && formik.errors.info && (
              <div id="info_LoginError">{formik.errors.info}</div>
            )}
          </div>

          <div id="password_Login">
            <label id="password_LoginLable">Mật khẩu</label>
            <input
              id="password_LoginInput"
              type="password"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <div id="password_LoginError">{formik.errors.password}</div>
            )}
          </div>

          {errorMessage != null && <div id="LoginError">{errorMessage}</div>}
          <button id="submit_Login" type="submit">
            Submit
          </button>
        </Form>
      )}
>>>>>>> 6fc576352610b9f8c6125fedba7a75af0bb0df06
    </Formik>
  );
}
