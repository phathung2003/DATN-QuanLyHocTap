'use client';
import React, { useState } from 'react';
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
    </Formik>
  );
}
