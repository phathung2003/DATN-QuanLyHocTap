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
          <div>
            <label id="info_LoginLable"> Tên đăng nhập
              <input id="info_LoginLable"
                type="text"
                {...formik.getFieldProps("info")}
              />
              {formik.touched.info && formik.errors.info && (
                <div id="info_LoginError">{formik.errors.info}</div>
              )}
            </label>
          </div>

          <div>
            <label id="password_LoginLable">Mật khẩu
              <input id="password_LoginInput"
                type="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div id="password_LoginError">{formik.errors.password}</div>
              )}
            </label>
          </div>

          {errorMessage != null && <div id="LoginError">{errorMessage}</div>}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
