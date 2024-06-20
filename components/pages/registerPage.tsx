// import React from 'react';
// import { useState } from 'react';
// import { Formik, Form, ErrorMessage, Field } from 'formik';
// import SchemaRegister from '@/backend/validationSchema/register/registerSchema';
// import {
//   DefaultRegisterValue,
//   DefaultRegisteErrorValue,
// } from '../process/defaultData/register';
// import {
//   handelSubmit,
//   ResetError,
// } from '@/components/process/feature/register';

// export default function RegisterPage() {
//   const [error, setError] = useState(DefaultRegisteErrorValue);
//   return (
//     <Formik
//       initialValues={DefaultRegisterValue}
//       validationSchema={SchemaRegister}
//       onSubmit={(data) => handelSubmit(data, setError)}
//     >
//       {({ setFieldValue }) => (
//         <Form>
//           <div id="name_Register">
//             <label id="name_RegisterLable">Họ và tên</label>
//             <Field
//               id="name_RegisterInput"
//               name="name"
//               type="text"
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 ResetError(e, setFieldValue, setError)
//               }
//             />
//             <div>
//               <ErrorMessage id="name_RegisterError" name="name" />
//             </div>
//           </div>

//           <div id="username_Register">
//             <label id="username_RegisterLable">Tên đăng nhập</label>
//             <Field
//               id="username_RegisterInput"
//               name="username"
//               type="text"
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 ResetError(e, setFieldValue, setError)
//               }
//             />
//             <div>
//               <p id="username_RegisterError">{error.usernameError}</p>
//               <ErrorMessage id="username_RegisterError" name="username" />
//             </div>
//           </div>

//           <div id="phoneNumber_Register">
//             <label id="phoneNumber_RegisterLable">Số điện thoại</label>
//             <Field
//               id="phoneNumber_RegisterInput"
//               name="phoneNumber"
//               type="text"
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 ResetError(e, setFieldValue, setError)
//               }
//             />
//             <div>
//               <p id="phoneNumber_RegisterError">{error.phoneNumberError}</p>
//               <ErrorMessage id="phoneNumber_RegisterError" name="phoneNumber" />
//             </div>
//           </div>

//           <div id="email_Register">
//             <label id="email_RegisterLable">Email</label>
//             <Field
//               id="email_RegisterInput"
//               name="email"
//               type="email"
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 ResetError(e, setFieldValue, setError)
//               }
//             />
//             <div>
//               <p id="email_RegisterError">{error.emailError}</p>
//               <ErrorMessage id="email_RegisterError" name="email" />
//             </div>
//           </div>

//           <div id="password_Register">
//             <label id="password_RegisterLable">Mật khẩu</label>
//             <Field
//               id="password_RegisterInput"
//               name="password"
//               type="password"
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 ResetError(e, setFieldValue, setError)
//               }
//             />
//             <div>
//               <ErrorMessage id="password_RegisterError" name="password" />
//             </div>
//           </div>

//           <div id="rePassword_Register">
//             <label id="rePassword_RegisterLable">Nhập lại mật khẩu</label>
//             <Field
//               id="rePassword_RegisterInput"
//               name="rePassword"
//               type="password"
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 ResetError(e, setFieldValue, setError)
//               }
//             />
//             <div>
//               <ErrorMessage id="rePassword_RegisterError" name="rePassword" />
//             </div>
//           </div>

//           <p id="system_RegisterError">{error.systemError}</p>
//           <button id="sumbit_Register" type="submit">
//             Submit
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// }
