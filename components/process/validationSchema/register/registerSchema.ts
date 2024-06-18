import * as Yup from 'yup';
import RegisterMessage from '@/components/process/messages/registerMessage';
import RegisterCondition from '@/components/process/validationSchema/register/registerCondition';

const SchemaRegister = Yup.object().shape({
  //Kiểm tra tên
  name: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema
      .min(RegisterCondition.NAME.MIN, RegisterMessage.NAME.UNDER_MIN_VALUE)
      .max(RegisterCondition.NAME.MAX, RegisterMessage.NAME.OVER_MAX_VALUE);
    if (RegisterCondition.NAME.REQUIRED) {
      baseSchema = baseSchema.required(RegisterMessage.NAME.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra tên đăng nhập
  username: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema
      .min(
        RegisterCondition.USERNAME.MIN,
        RegisterMessage.USERNAME.UNDER_MIN_VALUE,
      )
      .max(
        RegisterCondition.USERNAME.MAX,
        RegisterMessage.USERNAME.OVER_MAX_VALUE,
      );
    if (RegisterCondition.USERNAME.REQUIRED) {
      baseSchema = baseSchema.required(RegisterMessage.USERNAME.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra số điện thoại
  phoneNumber: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema.length(
      RegisterCondition.PHONE_NUMBER.LENGTH,
      RegisterMessage.PHONE_NUMBER.UNDER_LENGTH_VALUE,
    );
    if (RegisterCondition.PHONE_NUMBER.ALLOWED_CHARACTERS === true) {
      baseSchema = baseSchema.matches(
        RegisterCondition.PHONE_NUMBER.REGEX_HAVE_CHARACTER,
        RegisterMessage.PHONE_NUMBER.HAVE_BANNED_CHARACTERS,
      );
    } else {
      baseSchema = baseSchema.matches(
        RegisterCondition.PHONE_NUMBER.REGEX_NO_CHARACTER,
        RegisterMessage.PHONE_NUMBER.DONT_ALLOWED_CHARACTERS,
      );
    }

    if (RegisterCondition.PHONE_NUMBER.REQUIRED) {
      baseSchema = baseSchema.required(RegisterMessage.PHONE_NUMBER.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra email
  email: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema.email(RegisterMessage.EMAIL.WRONG_EMAIL_FORMAT);

    if (RegisterCondition.EMAIL.REQUIRED) {
      baseSchema = baseSchema.required('Email is required');
    }

    return baseSchema;
  }),

  //Kiểm tra mật khẩu
  password: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema
      .min(
        RegisterCondition.PASSWORD.MIN,
        RegisterMessage.PASSWORD.UNDER_MIN_VALUE,
      )
      .max(
        RegisterCondition.PASSWORD.MAX,
        RegisterMessage.PASSWORD.OVER_MAX_VALUE,
      );

    if (RegisterCondition.PASSWORD.REQUIRED) {
      baseSchema = baseSchema.required(RegisterMessage.PASSWORD.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra nhâp lại mật khẩu
  rePassword: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;
    if (RegisterCondition.RE_PASSWORD.REQUIRED) {
      baseSchema = baseSchema
        .oneOf(
          [Yup.ref('password'), undefined],
          RegisterMessage.RE_PASSWORD.NO_MATCH,
        )
        .nullable()
        .required(RegisterMessage.RE_PASSWORD.REQUIRED);
    }
    return baseSchema;
  }),
});

export default SchemaRegister;
