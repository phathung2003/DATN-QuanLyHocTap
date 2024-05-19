import * as Yup from 'yup';
import {
  Condition,
  ErrorMessage,
} from '../process/feature/register/registerErrorMesage';
import { CheckInfoExist } from '../process/database/users';

export interface IRegister {
  name: string;
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
  rePassword: string;
}

export const schemaRegister = Yup.object().shape({
  //Kiểm tra tên
  name: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema
      .min(Condition.NAME.MIN, ErrorMessage.NAME.UNDER_MIN_VALUE)
      .max(Condition.NAME.MAX, ErrorMessage.NAME.OVER_MAX_VALUE);
    if (Condition.NAME.REQUIRED) {
      baseSchema = baseSchema.required(ErrorMessage.NAME.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra tên đăng nhập
  username: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema
      .min(Condition.USERNAME.MIN, ErrorMessage.USERNAME.UNDER_MIN_VALUE)
      .max(Condition.USERNAME.MAX, ErrorMessage.USERNAME.OVER_MAX_VALUE)
      .test(
        'username-exists',
        ErrorMessage.USERNAME.USERNAME_EXIST, // Message to display on validation failure
        async (value) => {
          if (value) {
            return await CheckInfoExist('username', value);
          }
          return true;
        },
      );
    if (Condition.USERNAME.REQUIRED) {
      baseSchema = baseSchema.required(ErrorMessage.USERNAME.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra số điện thoại
  phoneNumber: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema
      .length(
        Condition.PHONE_NUMBER.LENGTH,
        ErrorMessage.PHONE_NUMBER.UNDER_LENGTH_VALUE,
      )
      .test(
        'phoneNumber-exists',
        ErrorMessage.PHONE_NUMBER.PHONE_NUMBER_EXIST, // Message to display on validation failure
        async (value) => {
          if (value) {
            return await CheckInfoExist('phoneNumber', value);
          }
          return true;
        },
      );

    if (Condition.PHONE_NUMBER.ALLOWED_CHARACTERS === true) {
      baseSchema = baseSchema.matches(
        Condition.PHONE_NUMBER.REGEX_HAVE_CHARACTER,
        ErrorMessage.PHONE_NUMBER.HAVE_BANNED_CHARACTERS,
      );
    } else {
      baseSchema = baseSchema.matches(
        Condition.PHONE_NUMBER.REGEX_NO_CHARACTER,
        ErrorMessage.PHONE_NUMBER.DONT_ALLOWED_CHARACTERS,
      );
    }

    if (Condition.PHONE_NUMBER.REQUIRED) {
      baseSchema = baseSchema.required(ErrorMessage.PHONE_NUMBER.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra email
  email: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema.email(ErrorMessage.EMAIL.WRONG_EMAIL_FORMAT).test(
      'email-exists',
      ErrorMessage.EMAIL.EMAIL_EXIST, // Message to display on validation failure
      async (value) => {
        if (value) {
          return await CheckInfoExist('email', value);
        }
        return true;
      },
    );

    if (Condition.EMAIL.REQUIRED) {
      baseSchema = baseSchema.required('Email is required');
    }

    return baseSchema;
  }),

  //Kiểm tra mật khẩu
  password: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema
      .min(Condition.PASSWORD.MIN, ErrorMessage.PASSWORD.UNDER_MIN_VALUE)
      .max(Condition.PASSWORD.MAX, ErrorMessage.PASSWORD.OVER_MAX_VALUE);

    if (Condition.PASSWORD.REQUIRED) {
      baseSchema = baseSchema.required(ErrorMessage.PASSWORD.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra nhâp lại mật khẩu
  rePassword: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;
    if (Condition.RE_PASSWORD.REQUIRED) {
      baseSchema = baseSchema
        .oneOf(
          [Yup.ref('password'), undefined],
          ErrorMessage.RE_PASSWORD.NO_MATCH,
        )
        .nullable()
        .required(ErrorMessage.RE_PASSWORD.REQUIRED);
    }
    return baseSchema;
  }),
});
