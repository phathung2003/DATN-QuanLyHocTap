"use client";
import React from "react";
import { Formik, Form } from "formik";
import { schemaRegister } from '../models/IRegister';
import { defaultRegisterValue, handelSubmit } from '../process/register/register'; 

export default function registerPage()
{
  return (
    <Formik
      initialValues={defaultRegisterValue}
      validationSchema={schemaRegister}
      onSubmit={(data) => handelSubmit(data)}
    >
      {(formik) => (
        <Form>
          <div>
            <label id="name_RegisterLable">Họ và tên</label>
            <input 
              id="name_RegisterInput"
              type="text"  
              {...formik.getFieldProps("name")}
            />
            {
              formik.touched.name && formik.errors.name &&
              (<div id="name_RegisterError">{formik.errors.name}</div>)
            }
          </div>


          <div>
            <label id="username_RegisterLable">Tên đăng nhập</label>
            <input 
              id="username_RegisterInput"
              type="text"  
              {...formik.getFieldProps("username")} 
            />
            {
              formik.touched.username && formik.errors.username &&
              <div id="username_RegisterError">{formik.errors.username}</div>
            }
          </div>

          <div>
            <label id="phoneNumber_RegisterLable">Số điện thoại</label>
            <input 
              id="phoneNumber_RegisterInput"
              type="text"  
              {...formik.getFieldProps("phoneNumber")} 
            />
            {
              formik.touched.phoneNumber && formik.errors.phoneNumber &&
              <div id="phoneNumber_RegisterError">{formik.errors.phoneNumber}</div>
            }
          </div>

          <div>
            <label id="email_RegisterLable">Email</label>
            <input 
              id="email_RegisterInput"
              type="email"  
              {...formik.getFieldProps("email")} 
            />
            {
              formik.touched.email && formik.errors.email &&
              <div id="email_RegisterError">{formik.errors.email}</div>
            }
          </div>

          <div>
            <label id="password_RegisterLable">Mật khẩu</label>
            <input 
              id="password_RegisterInput"
              type="password"  
              {...formik.getFieldProps("password")} 
            />
            {
              formik.touched.password && formik.errors.password &&
              <div id="password_RegisterError">{formik.errors.password}</div>
            }
          </div>

          <div>
            <label id="rePassword_RegisterLable">Nhập lại mật khẩu</label>
            <input 
              id="rePassword_RegisterInput"
              type="password"  
              {...formik.getFieldProps("rePassword")} 
            />
            {
              formik.touched.rePassword && formik.errors.rePassword &&
              <div id="rePassword_RegisterError">{formik.errors.rePassword}</div>
            }
          </div>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
