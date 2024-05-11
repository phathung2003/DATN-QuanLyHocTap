"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { schemaLogin } from "../models/ILogin";
import { defaultLoginValue, handelSubmit } from "../process/login/login";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");

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
              {...formik.getFieldProps("info")}
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
              {...formik.getFieldProps("password")}
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
    </Formik>
  );
}
