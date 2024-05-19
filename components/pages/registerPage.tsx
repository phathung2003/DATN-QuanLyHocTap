import React from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { schemaRegister } from '../models/IRegister';
import {
  defaultRegisterValue,
  handelSubmit,
} from '../process/feature/register/register';

export default function RegisterPage() {
  return (
    <Formik
      initialValues={defaultRegisterValue}
      validationSchema={schemaRegister}
      onSubmit={(data) => handelSubmit(data)}
    >
      <Form>
        <div id="name_Register">
          <label id="name_RegisterLable">Họ và tên</label>
          <Field id="name_RegisterInput" name="name" type="text" />
          <div>
            <ErrorMessage id="name_RegisterError" name="name" />
          </div>
        </div>

        <div id="username_Register">
          <label id="username_RegisterLable">Tên đăng nhập</label>
          <Field id="username_RegisterInput" name="username" type="text" />
          <div>
            <ErrorMessage id="username_RegisterError" name="username" />
          </div>
        </div>

        <div id="phoneNumber_Register">
          <label id="phoneNumber_RegisterLable">Số điện thoại</label>
          <Field
            id="phoneNumber_RegisterInput"
            name="phoneNumber"
            type="text"
          />
          <div>
            <ErrorMessage id="phoneNumber_RegisterError" name="phoneNumber" />
          </div>
        </div>

        <div id="email_Register">
          <label id="email_RegisterLable">Email</label>
          <Field id="email_RegisterInput" name="email" type="email" />
          <div>
            <ErrorMessage id="email_RegisterError" name="email" />
          </div>
        </div>

        <div id="password_Register">
          <label id="password_RegisterLable">Mật khẩu</label>
          <Field id="password_RegisterInput" name="password" type="password" />
          <div>
            <ErrorMessage id="password_RegisterError" name="password" />
          </div>
        </div>

        <div id="rePassword_Register">
          <label id="rePassword_RegisterLable">Nhập lại mật khẩu</label>
          <Field
            id="rePassword_RegisterInput"
            name="rePassword"
            type="password"
          />
          <div>
            <ErrorMessage id="rePassword_RegisterError" name="rePassword" />
          </div>
        </div>

        <button id="sumbit_Register" type="submit">
          Submit
        </button>
      </Form>
    </Formik>
  );
}
